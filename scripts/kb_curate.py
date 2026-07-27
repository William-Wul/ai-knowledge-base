#!/usr/bin/env python3
"""Validate kb-articles consistency without modifying the corpus."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Set


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
CORE_ORIGINAL_FIELDS = ["title"]


def load_json(path: Path) -> Dict:
    return json.loads(path.read_text(encoding="utf-8"))


def add_issue(issues: List[Dict], severity: str, code: str, path: Path, message: str) -> None:
    issues.append({"severity": severity, "code": code, "path": str(path), "message": message})


def article_num(article_id: str) -> int:
    match = re.fullmatch(r"A(\d+)", article_id or "")
    return int(match.group(1)) if match else -1


def article_dirs(kb_root: Path) -> Dict[str, Path]:
    dirs = {}
    for path in kb_root.iterdir():
        if path.is_dir():
            match = re.match(r"^(A\d{3,})-", path.name)
            if match:
                dirs[match.group(1)] = path
    return dirs


def is_notes_skeleton(path: Path) -> bool:
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8", errors="replace")
    if "<!-- KB_NOTES_SKELETON: true -->" in text:
        return True
    return text.count("待 AI") >= 3 or len(text.strip()) < 300


def validate(kb_root: Path, strict_raw_html: bool = False) -> Dict:
    issues: List[Dict] = []
    index_path = kb_root / "index.json"
    topic_index_path = kb_root / "topics" / "_topics-index.json"
    if not index_path.exists():
        add_issue(issues, "error", "missing_index", index_path, "kb-articles/index.json is missing.")
        return {"status": "failed", "issues": issues}

    index = load_json(index_path)
    dirs = article_dirs(kb_root)
    articles = index.get("articles", [])
    by_id: Dict[str, Dict] = {}
    seen_urls: Dict[str, str] = {}
    duplicate_ids: Set[str] = set()
    duplicate_urls: Set[str] = set()

    for article in articles:
        article_id = str(article.get("id", ""))
        if article_id in by_id:
            duplicate_ids.add(article_id)
        by_id[article_id] = article
        url = str(article.get("url", ""))
        if url:
            if url in seen_urls:
                duplicate_urls.add(url)
            seen_urls[url] = article_id

    for article_id in sorted(duplicate_ids):
        add_issue(issues, "error", "duplicate_id", index_path, f"Duplicate article id in index: {article_id}")
    for url in sorted(duplicate_urls):
        add_issue(issues, "error", "duplicate_url", index_path, f"Duplicate article URL in index: {url}")

    last_id = str(index.get("last_id", ""))
    max_index_id = max((article_num(str(item.get("id", ""))) for item in articles), default=-1)
    if article_num(last_id) < max_index_id:
        add_issue(issues, "error", "last_id_non_monotonic", index_path, f"last_id={last_id} is below max indexed id A{max_index_id:03d}.")

    for article_id, article in by_id.items():
        if article_id not in dirs:
            add_issue(issues, "error", "missing_article_dir", kb_root, f"Index references {article_id}, but no matching directory exists.")

    for article_id, path in dirs.items():
        if article_id not in by_id:
            add_issue(issues, "warning", "dir_not_in_index", path, f"Directory {path.name} is not listed in index.json.")

    metadata_by_id: Dict[str, Dict] = {}
    for article_id, path in sorted(dirs.items()):
        metadata_path = path / "metadata.json"
        original_path = path / "original.json"
        notes_path = path / "notes.md"
        imgs_path = path / "imgs"

        if not metadata_path.exists():
            add_issue(issues, "error", "missing_metadata", metadata_path, "metadata.json is missing.")
            continue
        try:
            metadata = load_json(metadata_path)
        except Exception as exc:
            add_issue(issues, "error", "invalid_metadata_json", metadata_path, str(exc))
            continue
        metadata_by_id[article_id] = metadata

        for field in CORE_METADATA_FIELDS:
            if field not in metadata or metadata.get(field) in (None, ""):
                add_issue(issues, "error", "metadata_missing_field", metadata_path, f"metadata missing required field: {field}")
        if metadata.get("id") != article_id:
            add_issue(issues, "error", "metadata_id_mismatch", metadata_path, f"metadata id {metadata.get('id')} does not match directory id {article_id}.")
        if metadata.get("local_path") and metadata["local_path"].rstrip("/") != path.name:
            add_issue(issues, "warning", "metadata_local_path_mismatch", metadata_path, "metadata.local_path does not match directory name.")

        if not original_path.exists():
            add_issue(issues, "error", "missing_original", original_path, "original.json is missing.")
        else:
            try:
                original = load_json(original_path)
                for field in CORE_ORIGINAL_FIELDS:
                    if field not in original or original.get(field) in (None, ""):
                        add_issue(issues, "error", "original_missing_field", original_path, f"original missing required field: {field}")
                if not (original.get("text") or original.get("raw_text")):
                    add_issue(issues, "error", "original_missing_field", original_path, "original missing required field: text")
                if strict_raw_html and not original.get("raw_html"):
                    add_issue(issues, "error", "original_missing_raw_html", original_path, "original.raw_html is missing.")
            except Exception as exc:
                add_issue(issues, "error", "invalid_original_json", original_path, str(exc))

        if not notes_path.exists():
            add_issue(issues, "error", "missing_notes", notes_path, "notes.md is missing.")
        elif is_notes_skeleton(notes_path):
            add_issue(issues, "warning", "notes_skeleton_pending", notes_path, "notes.md still looks like an empty AI skeleton.")

        if metadata.get("imgs_total", 0) and not imgs_path.exists():
            add_issue(issues, "error", "missing_imgs_dir", imgs_path, "metadata has images, but imgs/ is missing.")

    validate_topic_refs(kb_root, topic_index_path, metadata_by_id, issues)

    error_count = sum(1 for item in issues if item["severity"] == "error")
    warning_count = sum(1 for item in issues if item["severity"] == "warning")
    return {
        "status": "failed" if error_count else "ok",
        "summary": {
            "articles_in_index": len(articles),
            "article_dirs": len(dirs),
            "errors": error_count,
            "warnings": warning_count,
        },
        "issues": issues,
    }


def validate_topic_refs(kb_root: Path, topic_index_path: Path, metadata_by_id: Dict[str, Dict], issues: List[Dict]) -> None:
    if not topic_index_path.exists():
        add_issue(issues, "error", "missing_topic_index", topic_index_path, "topics/_topics-index.json is missing.")
        return
    try:
        topic_index = load_json(topic_index_path)
    except Exception as exc:
        add_issue(issues, "error", "invalid_topic_index_json", topic_index_path, str(exc))
        return

    topic_articles: Dict[str, Set[str]] = {}
    for topic in topic_index.get("topics", []):
        slug = str(topic.get("slug", ""))
        topic_articles[slug] = set(str(article_id) for article_id in topic.get("articles", []))
        local_path = topic.get("local_path")
        if local_path and not (kb_root / "topics" / str(local_path)).exists():
            add_issue(issues, "error", "topic_note_missing", kb_root / "topics" / str(local_path), f"Topic note for {slug} is missing.")
        for article_id in topic_articles[slug]:
            metadata = metadata_by_id.get(article_id)
            if not metadata:
                add_issue(issues, "error", "topic_ref_missing_article", topic_index_path, f"Topic {slug} references missing article {article_id}.")
                continue
            if slug not in set(metadata.get("topics", [])):
                add_issue(issues, "warning", "topic_index_metadata_mismatch", topic_index_path, f"Topic {slug} lists {article_id}, but metadata.topics does not.")

    for article_id, metadata in metadata_by_id.items():
        for slug in metadata.get("topics", []):
            if slug not in topic_articles:
                add_issue(issues, "error", "metadata_unknown_topic", Path(str(metadata.get("local_path", article_id))) / "metadata.json", f"{article_id} metadata references unknown topic {slug}.")
            elif article_id not in topic_articles[slug]:
                add_issue(issues, "warning", "metadata_topic_missing_reverse_ref", topic_index_path, f"{article_id} metadata has topic {slug}, but topic index does not list it.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate kb-articles consistency.")
    parser.add_argument("--kb-root", default="kb-articles", help="kb-articles root directory.")
    parser.add_argument("--strict-raw-html", action="store_true", help="Treat missing original.raw_html as an error.")
    parser.add_argument("--json", action="store_true", help="Print full JSON report.")
    args = parser.parse_args()

    report = validate(Path(args.kb_root), strict_raw_html=args.strict_raw_html)
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        summary = report.get("summary", {})
        print(
            f"status={report['status']} articles_in_index={summary.get('articles_in_index', 0)} "
            f"article_dirs={summary.get('article_dirs', 0)} errors={summary.get('errors', 0)} warnings={summary.get('warnings', 0)}"
        )
        for issue in report["issues"][:200]:
            print(f"{issue['severity'].upper()} {issue['code']} {issue['path']} :: {issue['message']}")
        if len(report["issues"]) > 200:
            print(f"... {len(report['issues']) - 200} more issues omitted; rerun with --json for full report.")
    return 1 if report["status"] == "failed" else 0


if __name__ == "__main__":
    sys.exit(main())
