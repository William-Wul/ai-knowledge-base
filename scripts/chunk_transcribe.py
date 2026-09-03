#!/usr/bin/env python3
"""分段转写辅助：split 切音频 / merge 合并转写稿并重建帧索引
用法:
  python3 chunk_transcribe.py split <entry_dir> <chunk_sec>
  python3 chunk_transcribe.py merge <entry_dir>
"""
import json, re, subprocess, sys
from pathlib import Path

def fmt(sec: float) -> str:
    m, s = divmod(int(sec), 60)
    h, m = divmod(m, 60)
    return f"{h:d}:{m:02d}:{s:02d}" if h else f"{m:d}:{s:02d}"

def split(entry: Path, chunk: int):
    audio = entry / "audio.m4a"
    dur = float(subprocess.run(["ffprobe","-v","quiet","-show_entries","format=duration",
                                "-of","csv=p=0", str(audio)], capture_output=True, text=True).stdout.strip())
    tmp = entry / "_chunks"; tmp.mkdir(exist_ok=True)
    n = 0
    start = 0.0
    while start < dur:
        out = tmp / f"c{n}.m4a"
        subprocess.run(["ffmpeg","-y","-v","quiet","-ss",str(start),"-t",str(chunk),
                        "-i",str(audio),"-c","copy",str(out)], check=True)
        print(f"{out}  [{int(start)}s - {min(start+chunk,dur):.0f}s]")
        start += chunk; n += 1
    print(f"total {n} chunks, duration {dur:.0f}s")

def merge(entry: Path):
    tmp = entry / "_chunks"
    parts = sorted(tmp.glob("c*.m4a"), key=lambda p: int(re.search(r"c(\d+)", p.name).group(1)))
    rows = []
    for p in parts:
        idx = int(re.search(r"c(\d+)", p.name).group(1))
        tj = tmp / f"c{idx}_out" / "transcript.json"
        data = json.loads(tj.read_text(encoding="utf-8"))
        # 用 ffprobe 实测每段起点 = 前面各段时长之和
        offset = 0.0
        for q in parts[:idx]:
            offset += float(subprocess.run(["ffprobe","-v","quiet","-show_entries","format=duration",
                                            "-of","csv=p=0", str(q)], capture_output=True, text=True).stdout.strip())
        for r in data["segments"]:
            rows.append({"start": round(r["start"]+offset,1), "end": round(r["end"]+offset,1), "text": r["text"]})
    rows.sort(key=lambda r: r["start"])
    duration = rows[-1]["end"] if rows else 0
    (entry/"transcript.json").write_text(
        json.dumps({"source":"audio.m4a","language":"zh","duration":round(duration,1),
                    "segments":rows}, ensure_ascii=False, indent=1), encoding="utf-8")
    md = ["# 转写文字稿（自动生成）", "",
          f"> 来源音频：audio.m4a · 时长 {fmt(duration)} · 模型 large-v3-turbo",
          "> 机器转写，可能有错别字；时间戳可用于定位原视频片段",
          "> 专名错误以 notes.md 勘误表为准（正文保持 ASR 原样，不改）",
          "> 注：受单次执行时长限制，音频分段转写后按时间戳合并，段界处可能有轻微断句", ""]
    for r in rows:
        md += [f"**[{fmt(r['start'])}]** {r['text']}", ""]
    (entry/"transcript.md").write_text("\n".join(md), encoding="utf-8")
    # 重建 frames/index.md（同 transcribe.py build_index 逻辑）
    thumbs_dir = entry/"frames"/"thumbs"
    if thumbs_dir.exists():
        thumbs = sorted((p.name for p in thumbs_dir.glob("t-*.jpg")),
                        key=lambda n: int(re.search(r"t-(\d+)s", n).group(1)))
        lines = ["# 可视化索引（写作导航用）", "",
                 "> 每 20 秒一帧缩略图 + 该时刻文字稿内容。写图文配图时：先在这里浏览定位 → "
                 "需要高清帧时用 `ffmpeg -ss <秒数> -i video.mp4 -frames:v 1 xxx.png` 从留档视频重抽。",
                 "> 机器转写含专名错误，引用以 notes.md 勘误表为准。", "",
                 "| 时间 | 画面 | 此刻在讲 |", "|---|---|---|"]
        for th in thumbs:
            sec = int(re.search(r"t-(\d+)s", th).group(1))
            text = next((r["text"] for r in rows if r["start"] <= sec < r["end"]),
                        next((r["text"] for r in rows if r["start"] <= sec), ""))
            lines.append(f"| {fmt(sec)} | ![t{sec}](thumbs/{th}) | {text or '（无解说）'} |")
        (entry/"frames"/"index.md").write_text("\n".join(lines)+"\n", encoding="utf-8")
    print(f"merged: {len(rows)} 段, duration {fmt(duration)}")

if __name__ == "__main__":
    cmd, entry = sys.argv[1], Path(sys.argv[2])
    if cmd == "split": split(entry, int(sys.argv[3]))
    else: merge(entry)
