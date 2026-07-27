#!/usr/bin/env python3
"""Script-led kb-articles ingest.

The script owns mechanical work: fetch, dedupe, ID allocation, directory
creation, image copy, original/metadata/notes skeletons, index update, and
candidate topic reporting. AI should still review images, write notes, judge
article value, and synthesize topic notes.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import math
import os
import re
import shutil
import sys
import tempfile
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple
from urllib.parse import urlparse


SCRIPT_DIR = Path(__file__).resolve().parent
FETCH_PATH = SCRIPT_DIR / "wechat_fetch.py"
spec = importlib.util.spec_from_file_location("wechat_fetch", FETCH_PATH)
wechat_fetch = importlib.util.module_from_spec(spec)
assert spec and spec.loader
sys.modules["wechat_fetch"] = wechat_fetch
spec.loader.exec_module(wechat_fetch)


CORE_METADATA_FIELDS = [
    "id",
    "slug",
    "title",
    "author",
    "source_platform",
    "url",
    "published_at",
    "ingested_at",
    "local_path",
    "char_count",
    "reading_time_min",
]


def today() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def load_json(path: Path) -> Dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def article_num(article_id: str) -> int:
    match = re.fullmatch(r"A(\d+)", article_id or "")
    if not match:
        raise ValueError(f"Invalid article id: {article_id}")
    return int(match.group(1))


def format_id(number: int) -> str:
    return f"A{number:03d}"


def next_id(index: Dict) -> str:
    last_id = index.get("last_id", "A000")
    number = article_num(last_id)
    return format_id(number + 1)


def canonical_url(url: str) -> str:
    parsed = urlparse(url.strip())
    if parsed.netloc == "mp.weixin.qq.com" and parsed.path.startswith("/s/"):
        return f"{parsed.scheme or 'https'}://{parsed.netloc}{parsed.path}"
    return url.strip()


def find_duplicate(index: Dict, url: str) -> Optional[Dict]:
    wanted = canonical_url(url)
    for article in index.get("articles", []):
        if canonical_url(str(article.get("url", ""))) == wanted:
            return article
    return None


def slugify(title: str, author: str, url: str) -> str:
    raw = f"{title} {author}".lower()
    words = re.findall(r"[a-z0-9]+", raw)
    stop = {"the", "a", "an", "and", "of", "to", "in", "for", "with", "is", "ai"}
    kept = [word for word in words if word not in stop]
    if len(kept) >= 2:
        slug = "-".join(kept[:8])
    elif kept:
        slug = kept[0]
    else:
        token = urlparse(url).path.rstrip("/").split("/")[-1] or url
        slug = "wechat-" + hashlib.sha1(token.encode("utf-8")).hexdigest()[:10]
    return re.sub(r"-+", "-", slug).strip("-")[:80] or "wechat-article"


def unique_slug(kb_root: Path, article_id: str, base_slug: str) -> str:
    slug = base_slug
    suffix = 2
    while (kb_root / f"{article_id}-{slug}").exists():
        slug = f"{base_slug}-{suffix}"
        suffix += 1
    return slug


def reading_time(text: str) -> int:
    chars = len(text or "")
    return max(1, math.ceil(chars / 500))


def copy_images(raw_dir: Path, target_dir: Path, images: List[Dict]) -> List[Dict]:
    imgs_dir = target_dir / "imgs"
    imgs_dir.mkdir(parents=True, exist_ok=True)
    copied = []
    for item in images:
        new_item = dict(item)
        local_path = str(item.get("local_path", ""))
        if local_path:
            source = raw_dir / local_path
            if source.exists():
                dest = imgs_dir / source.name
                shutil.copy2(source, dest)
                new_item["local_path"] = f"imgs/{source.name}"
        copied.append(new_item)
    return copied


def notes_skeleton(article: Dict, metadata: Dict, candidate_topics: List[Dict]) -> str:
    topic_lines = "\n".join(
        f"- {item['slug']}（{item['title']}，命中 {item['score']}）" for item in candidate_topics[:8]
    )
    candidate_images = [
        item for item in article.get("images", []) if item.get("candidate_for_ai") and item.get("local_path")
    ]
    image_lines = "\n".join(
        f"- [ ] 原文配图 {item['index']}: {item['local_path']} ({item.get('actual_width') or '?'}x{item.get('actual_height') or '?'})"
        for item in candidate_images
    )
    return f"""# {metadata['title']}

<!-- KB_NOTES_SKELETON: true -->

> **出处声明**
> 本文档为**阅读笔记与结构化摘要**，非原文搬运。
> 原文标题：《{metadata['title']}》
> 原文作者 / 来源：**{metadata['author']} / 微信公众号**
> 原文发布：{metadata['published_at']}
> 原文链接：{metadata['url']}
> 笔记整理：{metadata['ingested_at']} · William · 存入 AI 知识库项目参考资料
> 仅供个人学习与内容创作参考，引用请注明原出处与原作者。

---

## 一句话摘要

待 AI 补写。

---

## 核心要点（Key Takeaways）

待 AI 补写。

---

## 配图候选清单

{image_lines or '本次脚本未得到可候选图片。'}

---

## 配图精选

待 AI 看图后选择，并补充说明文字。

---

## 为什么值得入库

待 AI 判断。

---

## 候选主题（脚本按 signals 粗筛，只供 AI 判断）

{topic_lines or '暂无明显候选主题。'}

---

## 可关联主题

待 AI synthesize 进 topic 笔记后补齐。
"""


def topic_score(text: str, signals: Iterable[str]) -> Tuple[int, List[str]]:
    haystack = text.lower()
    hits = []
    for signal in signals or []:
        sig = str(signal).strip()
        if not sig:
            continue
        if sig.lower() in haystack:
            hits.append(sig)
    return len(hits), hits[:10]


def candidate_topics(kb_root: Path, text: str) -> List[Dict]:
    topic_index_path = kb_root / "topics" / "_topics-index.json"
    if not topic_index_path.exists():
        return []
    topic_index = load_json(topic_index_path)
    candidates = []
    for topic in topic_index.get("topics", []):
        score, hits = topic_score(text, topic.get("signals", []))
        if score:
            candidates.append(
                {
                    "slug": topic.get("slug", ""),
                    "title": topic.get("title", ""),
                    "score": score,
                    "signals": hits,
                }
            )
    return sorted(candidates, key=lambda item: (-item["score"], item["slug"]))


def build_metadata(article_id: str, slug: str, article: Dict, images: List[Dict]) -> Dict:
    text = str(article.get("text", ""))
    downloaded = sum(1 for item in images if item.get("download_status") == "ok" or item.get("local_path"))
    failed = len(images) - downloaded
    return {
        "id": article_id,
        "slug": slug,
        "title": article.get("title", ""),
        "short_title": "",
        "author": article.get("author", ""),
        "byline_author": article.get("byline_author", ""),
        "source_platform": "微信公众号",
        "url": article.get("source_url") or article.get("url", ""),
        "published_at": article.get("publishTime", ""),
        "ingested_at": today(),
        "tags": [],
        "applicable_stages": [],
        "topics": [],
        "related_articles": [],
        "local_path": f"{article_id}-{slug}/",
        "char_count": len(text),
        "reading_time_min": reading_time(text),
        "one_line_summary": "",
        "imgs_total": len(images),
        "imgs_downloaded": downloaded,
        "imgs_failed": failed,
    }


def build_original(article: Dict, images: List[Dict]) -> Dict:
    return {
        "host": article.get("host", ""),
        "title": article.get("title", ""),
        "author": article.get("author", ""),
        "byline_author": article.get("byline_author", ""),
        "publishTime": article.get("publishTime", ""),
        "description": article.get("description", ""),
        "source_url": article.get("source_url") or article.get("url", ""),
        "cover_url": article.get("cover_url", ""),
        "external_links": article.get("external_links", []),
        "text": article.get("text", ""),
        "paragraphs": article.get("paragraphs", []),
        "raw_html": article.get("raw_html", ""),
        "raw_html_source": article.get("raw_html_source", ""),
        "images": images,
        "image_candidates": [
            {
                "index": item.get("index"),
                "local_path": item.get("local_path", ""),
                "url": item.get("url", ""),
                "width": item.get("actual_width"),
                "height": item.get("actual_height"),
            }
            for item in images
            if item.get("candidate_for_ai")
        ],
    }


def index_entry(metadata: Dict) -> Dict:
    entry = {}
    for key in [
        "id",
        "slug",
        "title",
        "short_title",
        "author",
        "source_platform",
        "url",
        "published_at",
        "ingested_at",
        "tags",
        "applicable_stages",
        "topics",
        "local_path",
        "char_count",
        "reading_time_min",
        "one_line_summary",
    ]:
        entry[key] = metadata.get(key)
    return entry


def load_raw_bundle(path: Path) -> Tuple[Dict, Path]:
    bundle = load_json(path)
    return bundle, path.parent


def fetch_raw_bundle(url: str) -> Tuple[Dict, Path, tempfile.TemporaryDirectory]:
    tmp = tempfile.TemporaryDirectory(prefix="kb-ingest-fetch-")
    raw_dir = Path(tmp.name)
    article = wechat_fetch.fetch_to_bundle(url, raw_dir, download=True)
    return article, raw_dir, tmp


def ingest_article(kb_root: Path, source: str, from_raw: bool = False) -> Dict:
    index_path = kb_root / "index.json"
    index = load_json(index_path)
    tmp_handle = None
    if from_raw:
        article, raw_dir = load_raw_bundle(Path(source))
    else:
        duplicate = find_duplicate(index, source)
        if duplicate:
            return {"status": "duplicate", "id": duplicate.get("id"), "slug": duplicate.get("slug"), "url": source}
        article, raw_dir, tmp_handle = fetch_raw_bundle(source)

    url = str(article.get("source_url") or article.get("url") or source)
    duplicate = find_duplicate(index, url)
    if duplicate:
        if tmp_handle:
            tmp_handle.cleanup()
        return {"status": "duplicate", "id": duplicate.get("id"), "slug": duplicate.get("slug"), "url": url}

    article_id = next_id(index)
    if article_num(article_id) <= article_num(index.get("last_id", "A000")):
        raise RuntimeError("Refusing to write a non-incrementing last_id.")
    base_slug = slugify(str(article.get("title", "")), str(article.get("author", "")), url)
    slug = unique_slug(kb_root, article_id, base_slug)
    target_dir = kb_root / f"{article_id}-{slug}"
    if target_dir.exists():
        raise RuntimeError(f"Target directory already exists: {target_dir}")
    target_dir.mkdir(parents=True)

    images = copy_images(raw_dir, target_dir, list(article.get("images", article.get("imgs", []))))
    metadata = build_metadata(article_id, slug, article, images)
    original = build_original(article, images)
    candidates = candidate_topics(kb_root, str(article.get("text", "")))

    write_json(target_dir / "metadata.json", metadata)
    write_json(target_dir / "original.json", original)
    (target_dir / "notes.md").write_text(notes_skeleton(article, metadata, candidates), encoding="utf-8")

    index["last_id"] = article_id
    index["updated_at"] = today()
    index.setdefault("articles", []).append(index_entry(metadata))
    write_json(index_path, index)

    if tmp_handle:
        tmp_handle.cleanup()

    return {
        "status": "success",
        "id": article_id,
        "slug": slug,
        "title": metadata["title"],
        "author": metadata["author"],
        "published_at": metadata["published_at"],
        "text_length": metadata["char_count"],
        "local_path": metadata["local_path"],
        "images": {
            "total": metadata["imgs_total"],
            "downloaded": metadata["imgs_downloaded"],
            "failed": metadata["imgs_failed"],
            "candidates_for_ai": len(original["image_candidates"]),
        },
        "candidate_topics": candidates[:8],
    }


def read_url_file(path: Path) -> List[str]:
    urls = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        urls.append(line)
    return urls


def main() -> int:
    parser = argparse.ArgumentParser(description="Ingest WeChat articles into kb-articles.")
    parser.add_argument("urls", nargs="*", help="Article URL(s).")
    parser.add_argument("--url-file", help="Text file with one URL per line.")
    parser.add_argument("--raw-bundle", help="Use an existing raw_bundle.json instead of fetching.")
    parser.add_argument("--kb-root", default="kb-articles", help="kb-articles root directory.")
    parser.add_argument("--json", action="store_true", help="Print JSON report.")
    args = parser.parse_args()

    kb_root = Path(args.kb_root)
    sources: List[Tuple[str, bool]] = []
    if args.raw_bundle:
        sources.append((args.raw_bundle, True))
    for url in args.urls:
        sources.append((url, False))
    if args.url_file:
        sources.extend((url, False) for url in read_url_file(Path(args.url_file)))
    if not sources:
        parser.error("Provide at least one URL, --url-file, or --raw-bundle.")

    results = []
    for source, from_raw in sources:
        try:
            results.append(ingest_article(kb_root, source, from_raw=from_raw))
        except Exception as exc:
            results.append({"status": "failed", "source": source, "error": str(exc)})

    summary = {
        "total": len(results),
        "success": sum(1 for item in results if item["status"] == "success"),
        "duplicate": sum(1 for item in results if item["status"] == "duplicate"),
        "failed": sum(1 for item in results if item["status"] == "failed"),
        "results": results,
    }
    if args.json:
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    else:
        print(f"total={summary['total']} success={summary['success']} duplicate={summary['duplicate']} failed={summary['failed']}")
        for item in results:
            if item["status"] == "success":
                print(
                    f"SUCCESS {item['id']} {item['slug']} images={item['images']} "
                    f"candidate_topics={[topic['slug'] for topic in item['candidate_topics']]}"
                )
            elif item["status"] == "duplicate":
                print(f"DUPLICATE {item.get('id')} {item.get('slug')} url={item.get('url')}")
            else:
                print(f"FAILED source={item.get('source')} error={item.get('error')}")
    return 1 if summary["failed"] else 0


if __name__ == "__main__":
    sys.exit(main())
