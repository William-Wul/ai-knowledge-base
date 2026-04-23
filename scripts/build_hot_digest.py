#!/usr/bin/env python3
"""
AI 热点日报生成脚本
读取 TrendRadar 的 SQLite 输出,用 LLM 合并去重 + 生成概述,输出 VitePress Markdown。

用法:
  OPENROUTER_API_KEY=xxx python build_hot_digest.py \
      --trendradar-dir /path/to/TrendRadar \
      --date 2026-04-23 \
      --out docs/hot/2026-04-23.md
"""

import argparse
import json
import os
import re
import sqlite3
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

KEYWORDS = [
    "AI", "大模型", "人工智能", "LLM", "AGI", "生成式", "AIGC", "AI生成",
    "OpenAI", "ChatGPT", "GPT-4", "GPT-5", "GPT-6", "Sora", "Dall-E",
    "Claude", "Anthropic", "Gemini", "DeepMind", "Meta AI", "Llama",
    "Mistral", "xAI", "Grok", "Perplexity",
    "DeepSeek", "Kimi", "Moonshot", "通义", "Qwen", "文心",
    "百度 AI", "百度AI", "豆包", "字节 AI", "字节AI", "混元",
    "腾讯 AI", "腾讯AI", "智谱", "GLM", "MiniMax", "零一万物", "百川",
    "AI Agent", "MCP", "Cursor", "Copilot", "Manus", "Claude Code",
    "Codex", "Windsurf", "Devin",
    "AI 编程", "AI编程", "AI 视频", "AI视频", "AI 绘画", "AI绘画",
    "AI 搜索", "AI搜索", "AI 眼镜", "AI眼镜", "AI Pin",
    "具身智能", "人形机器人", "Figure AI", "宇树", "智元", "Optimus",
]

EXCLUDE_KEYWORDS = ["震惊", "AI 诈骗", "AI诈骗", "AI骗局"]

PLATFORM_NAMES = {
    "toutiao": "今日头条",
    "baidu": "百度热搜",
    "wallstreetcn-hot": "华尔街见闻",
    "thepaper": "澎湃新闻",
    "bilibili-hot-search": "B 站热门",
    "cls-hot": "财联社",
    "ifeng": "凤凰网",
    "tieba": "百度贴吧",
    "weibo": "微博热搜",
    "douyin": "抖音热点",
    "zhihu": "知乎热榜",
    "hacker-news": "Hacker News",
    "github-trending": "GitHub Trending",
    "producthunt": "Product Hunt",
}


def match_keywords(title: str) -> list[str]:
    for bad in EXCLUDE_KEYWORDS:
        if bad in title:
            return []
    return [k for k in KEYWORDS if k in title]


def collect_items(trendradar_dir: Path, date: str) -> list[dict]:
    """从 TrendRadar SQLite 读当天所有命中关键词的条目。"""
    items = []

    # CN 热榜
    news_db = trendradar_dir / "output" / "news" / f"{date}.db"
    if news_db.exists():
        conn = sqlite3.connect(news_db)
        for title, platform_id, rank, url in conn.execute(
            "SELECT title, platform_id, rank, url FROM news_items"
        ):
            matched = match_keywords(title)
            if not matched:
                continue
            items.append({
                "title": title,
                "platform": PLATFORM_NAMES.get(platform_id, platform_id),
                "platform_id": platform_id,
                "rank": rank,
                "url": url or "",
                "matched_keywords": matched,
                "source_type": "hotlist",
            })
        conn.close()

    # RSS (HN 等) — RSS 源没有"热榜排名"概念,给固定中等热度等级
    RSS_DEFAULT_RANK = 5
    rss_db = trendradar_dir / "output" / "rss" / f"{date}.db"
    if rss_db.exists():
        conn = sqlite3.connect(rss_db)
        for title, feed_id, url in conn.execute(
            "SELECT title, feed_id, url FROM rss_items "
            "WHERE feed_id != 'yahoo-finance' "
            "ORDER BY published_at DESC LIMIT 100"
        ):
            matched = match_keywords(title)
            if not matched:
                continue
            items.append({
                "title": title,
                "platform": PLATFORM_NAMES.get(feed_id, feed_id),
                "platform_id": feed_id,
                "rank": RSS_DEFAULT_RANK,
                "url": url or "",
                "matched_keywords": matched,
                "source_type": "rss",
            })
        conn.close()

    return items


def heat_score(platform_count: int, ranks: list[int]) -> int:
    """综合热度: 命中平台数 × 10 + Σ(15 - min(rank, 15))"""
    platform_part = platform_count * 10
    rank_part = sum(max(0, 15 - min(r, 15)) for r in ranks)
    return min(100, platform_part + rank_part)


def fire_emoji(score: int) -> str:
    if score >= 80:
        return "🔥🔥🔥🔥🔥"
    if score >= 60:
        return "🔥🔥🔥🔥"
    if score >= 40:
        return "🔥🔥🔥"
    if score >= 20:
        return "🔥🔥"
    return "🔥"


SYSTEM_PROMPT = """你是 AI 新闻编辑。用户会给你一批今天从微博、知乎、B 站、Hacker News 等平台抓取到的 AI 相关热榜条目,每条带有"在该平台的排名位置"。

请完成三件事:

1) **去重合并**:同一事件在多个平台出现、标题不同的,合并为一条。合并判据是"是同一件事",不是"关键词相似"。

2) **综合打分**(0-100 的 heat_score):对每个合并后的事件综合以下四个维度打一个分数:
   - **重要性**:事件在 AI 行业的战略级别(头部公司旗舰发布/重大并购/监管政策 > 二线产品更新/小众讨论)
   - **时效性**:今日首次发生的硬核事件 > 持续讨论中的老话题
   - **讨论度**:跨平台覆盖面 + 各平台排名位置(排名越靠前越热) + Hacker News 等专业媒体上榜是真实热度证据
   - **影响面**:对普通用户或工作者是否有直接影响

   评分参考:
   - 90-100:全网级大事(如 OpenAI 发布新旗舰模型、数百亿美元级并购、能力质变)
   - 70-89:重要行业进展(如头部公司重要产品更新、开源 SOTA 模型、重要政策)
   - 50-69:值得关注(如细分赛道突破、Benchmark 刷榜、专业圈讨论)
   - 30-49:有点意思(如单平台热议、工具小更新、老话题新视角)
   - 0-29:边缘/擦边 AI(如顺带提到 AI 的财经、军事、娱乐新闻)

3) **写 200-300 字概述**,每条覆盖:
   - 发生了什么(事实层,具体到产品/版本/数字)
   - 为什么重要(放在行业趋势里看有什么信号)
   - 对普通用户或工作者有什么影响(非开发者友好)

写作调性要求:
- 资深非技术实战者口吻,像给同事讲清楚一件事
- 不煽动、不写扎心金句、不写"起飞/封神/塌房/震动"这类网络热词
- 英文技术术语首次出现必须用中文类比或解释(如 Benchmark 指各类标准考试分数)
- 避免破折号 "——"

重要:你只能基于输入的标题做内容推理,不要编造事实。如果信息不够具体,就讲结构和影响层面,不要硬造数字/版本号。heat_score 低于 25 的条目(擦边 AI)直接不收录进 events。

输出严格 JSON 格式,不要加 markdown 代码块包裹:
{
  "tldr": "80-150 字的今日 AI 圈速览,提炼最重要的 2-3 条主线",
  "events": [
    {
      "title": "20-30 字的事件标题",
      "heat_score": 85,
      "summary": "200-300 字概述",
      "source_ids": [输入条目的下标数字列表]
    }
  ]
}

events 按 heat_score 降序排列,最多 10 条。"""


def call_llm(raw_items: list[dict], api_key: str, model: str) -> dict:
    """调用 OpenRouter 做合并 + 概述。"""
    # 给 LLM 精简输入,但把平台排名位置传过去作为客观热度证据
    llm_input = [
        {
            "i": idx,
            "title": item["title"],
            "platform": item["platform"],
            "rank_on_platform": item["rank"],
        }
        for idx, item in enumerate(raw_items)
    ]
    user_msg = (
        f"今天(北京时间 {datetime.now().strftime('%Y-%m-%d')})抓到 "
        f"{len(llm_input)} 条 AI 相关条目:\n\n"
        f"{json.dumps(llm_input, ensure_ascii=False, indent=2)}\n\n"
        "请按系统指令输出 JSON。"
    )

    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        data=json.dumps({
            "model": model,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_msg},
            ],
            "temperature": 0.3,
            "max_tokens": 8000,
        }).encode("utf-8"),
    )

    with urllib.request.urlopen(req, timeout=180) as resp:
        body = json.loads(resp.read())

    content = body["choices"][0]["message"]["content"].strip()
    # 容错:去掉可能的 ```json ... ``` 包装
    content = re.sub(r"^```(?:json)?\s*|\s*```$", "", content, flags=re.MULTILINE).strip()
    usage = body.get("usage", {})
    print(f"[LLM] tokens: in={usage.get('prompt_tokens')} out={usage.get('completion_tokens')} cost=${usage.get('cost')}", file=sys.stderr)

    return json.loads(content)


def render_markdown(date: str, tldr: str, events: list[dict], raw_items: list[dict]) -> str:
    sections = [
        "---",
        f"title: {date} · AI 热榜日报",
        f"description: {date} 全网 AI 相关热榜汇总(自动生成)",
        f"date: {date}",
        "---",
        "",
        f"# {date} · AI 热榜日报",
        "",
        f"> 抓取时间:{datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "",
        "## 📝 今日速览",
        "",
        tldr,
        "",
        "---",
        "",
        f"## 🔥 今日热度榜 Top {len(events)}",
        "",
        "> 点击每条可展开查看 200-300 字概述和代表链接。",
        "",
    ]

    # 按 LLM 返回的 heat_score 降序排(LLM 综合重要性/时效性/讨论度/影响面判断)
    events_sorted = sorted(events, key=lambda x: -x.get("heat_score", 0))

    for rank, ev in enumerate(events_sorted, 1):
        score = ev.get("heat_score", 0)
        fires = fire_emoji(score)
        sources = [raw_items[i] for i in ev.get("source_ids", []) if 0 <= i < len(raw_items)]

        # 代表链接:选排名最靠前那条的 URL(优先有 url 的)
        rep = next((s for s in sorted(sources, key=lambda x: x["rank"]) if s["url"]), None)
        rep_url = rep["url"] if rep else None

        sections.extend([
            "<details>",
            f"<summary><b>{rank}. {ev['title']}</b>　{fires}</summary>",
            "",
            ev["summary"],
            "",
        ])
        if rep_url:
            sections.extend([f"**[查看代表报道 →]({rep_url})**", ""])
        sections.extend([
            "</details>",
            "",
        ])

    sections.append("")
    return "\n".join(sections)


def strip_frontmatter(content: str) -> str:
    """去掉 YAML frontmatter（--- ... ---）和第一个 h1 标题行。"""
    lines = content.splitlines()
    if lines and lines[0].strip() == "---":
        end = next((i for i, l in enumerate(lines[1:], 1) if l.strip() == "---"), None)
        if end is not None:
            lines = lines[end + 1:]
    # 去掉开头空行后的第一个 h1（# xxxx）
    non_empty = next((i for i, l in enumerate(lines) if l.strip()), None)
    if non_empty is not None and lines[non_empty].startswith("# "):
        lines.pop(non_empty)
    return "\n".join(lines).lstrip("\n")


def date_label(date_str: str) -> str:
    """'2026-04-23' → '4月23日热点'"""
    try:
        d = datetime.strptime(date_str, "%Y-%m-%d")
        return f"{d.month}月{d.day}日热点"
    except ValueError:
        return date_str


def rebuild_index_md(hot_dir: Path) -> None:
    """重写 hot/index.md：最新一天全文展示，过去 7 天折叠。"""
    daily_files = sorted(
        [f for f in hot_dir.glob("????-??-??.md")],
        reverse=True,
    )[:7]

    if not daily_files:
        return

    latest_file = daily_files[0]
    latest_date = latest_file.stem
    latest_label = date_label(latest_date)
    latest_body = strip_frontmatter(latest_file.read_text(encoding="utf-8"))

    parts = [
        "---",
        f"title: {latest_label}",
        "description: 每日自动抓取各大平台的 AI 相关热榜，去重汇总",
        "---",
        "",
        f"# {latest_label}",
        "",
        latest_body,
    ]

    if len(daily_files) > 1:
        parts += ["", "---", "", "## 往期热点", ""]
        for f in daily_files[1:]:
            date_str = f.stem
            label = date_label(date_str)
            body = strip_frontmatter(f.read_text(encoding="utf-8"))
            parts += [
                "<details>",
                f"<summary><b>{label}</b></summary>",
                "",
                body,
                "</details>",
                "",
            ]

    (hot_dir / "index.md").write_text("\n".join(parts), encoding="utf-8")
    print(f"      hot/index.md 已更新（最新: {latest_label}，归档: {len(daily_files)-1} 天）", file=sys.stderr)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--trendradar-dir", required=True, type=Path)
    ap.add_argument("--date", required=True, help="YYYY-MM-DD")
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--model", default="deepseek/deepseek-chat")
    args = ap.parse_args()

    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        sys.exit("ERROR: OPENROUTER_API_KEY env var is required")

    print(f"[1/3] 读取 TrendRadar 数据: {args.trendradar_dir}, 日期: {args.date}", file=sys.stderr)
    raw_items = collect_items(args.trendradar_dir, args.date)
    print(f"      命中关键词的条目: {len(raw_items)} 条", file=sys.stderr)
    if not raw_items:
        sys.exit("ERROR: 今天没有命中关键词的条目,跳过生成")

    print(f"[2/3] 调用 LLM 合并去重 + 生成概述 (model={args.model})", file=sys.stderr)
    llm_out = call_llm(raw_items, api_key, args.model)
    print(f"      LLM 合并成 {len(llm_out.get('events', []))} 个独立事件", file=sys.stderr)

    print(f"[3/3] 渲染 Markdown: {args.out}", file=sys.stderr)
    md = render_markdown(args.date, llm_out["tldr"], llm_out["events"], raw_items)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(md, encoding="utf-8")
    print(f"      完成: {args.out}", file=sys.stderr)

    print(f"[4/3] 重建 hot/index.md", file=sys.stderr)
    rebuild_index_md(args.out.parent)


if __name__ == "__main__":
    main()
