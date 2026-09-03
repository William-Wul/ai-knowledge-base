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
IMAGE_POSITION_STATUSES = {
    "preserved",
    "partially_unverified",
    "unverified_legacy",
    "not_applicable",
}
SAFE_USE_BY_STATUS = {
    "preserved": "text_and_images",
    "partially_unverified": "text_only_until_source_verified",
    "unverified_legacy": "text_only_until_source_verified",
    "not_applicable": "text_only",
}


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
            match = re.match(r"^([AV]\d{3,})-", path.name)
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


def downloaded_image_paths(bundle: Path, original: Dict) -> Set[str]:
    paths: Set[str] = set()
    imgs_path = bundle / "imgs"
    if imgs_path.exists():
        paths.update(
            f"imgs/{path.name}"
            for path in imgs_path.glob("*")
            if path.is_file() and not path.name.startswith(".")
        )
    for item in original.get("images") or original.get("imgs") or []:
        if not isinstance(item, dict):
            continue
        rel = str(item.get("local_path") or item.get("local") or "").strip()
        if rel and (bundle / rel).is_file():
            paths.add(rel)
    return paths


def markdown_image_paths(markdown: str) -> Set[str]:
    return set(re.findall(r"!\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)", markdown))


def normalize_for_fulltext_check(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[`*_#>]", "", text)
    return re.sub(r"\s+", "", text)


def inferred_image_position_status(markdown: str, image_count: int) -> str:
    if image_count == 0:
        return "not_applicable"
    if "## 原文图片（旧素材无法复原准确插入位置）" in markdown:
        return "unverified_legacy"
    if "## 原文补充图片" in markdown:
        return "partially_unverified"
    return "preserved"


def validate_archive_quality(
    metadata: Dict,
    markdown: str,
    image_count: int,
    metadata_path: Path,
    markdown_path: Path,
    issues: List[Dict],
) -> None:
    quality = metadata.get("archive_quality")
    if not isinstance(quality, dict):
        add_issue(issues, "error", "missing_archive_quality", metadata_path, "metadata.archive_quality is missing.")
        return

    status = str(quality.get("image_position_status") or "")
    if status not in IMAGE_POSITION_STATUSES:
        add_issue(issues, "error", "invalid_image_position_status", metadata_path, f"Invalid image_position_status: {status}")
        return
    expected_status = inferred_image_position_status(markdown, image_count)
    if status != expected_status:
        add_issue(
            issues,
            "error",
            "archive_quality_status_mismatch",
            metadata_path,
            f"image_position_status={status}, expected {expected_status} from original.md.",
        )

    safe_use = str(quality.get("safe_use") or "")
    expected_safe_use = SAFE_USE_BY_STATUS[status]
    if safe_use != expected_safe_use:
        add_issue(
            issues,
            "error",
            "archive_quality_safe_use_mismatch",
            metadata_path,
            f"safe_use={safe_use}, expected {expected_safe_use} for {status}.",
        )
    if quality.get("text_status") != "complete_extracted_text":
        add_issue(issues, "error", "archive_quality_text_status", metadata_path, "text_status must be complete_extracted_text.")
    if quality.get("images_local") != image_count:
        add_issue(
            issues,
            "error",
            "archive_quality_image_count_mismatch",
            metadata_path,
            f"images_local={quality.get('images_local')}, expected {image_count}.",
        )

    marker = f"image_position_status={status}; safe_use={safe_use}"
    if marker not in markdown:
        add_issue(issues, "error", "original_markdown_quality_marker_mismatch", markdown_path, "Quality marker does not match metadata.")
    if status in {"partially_unverified", "unverified_legacy"} and "引用风险" not in markdown:
        add_issue(issues, "error", "original_markdown_missing_risk_warning", markdown_path, "Risky image context is not visibly warned in original.md.")


def validate_original_markdown(
    bundle: Path,
    original: Dict,
    metadata: Dict,
    notes_path: Path,
    issues: List[Dict],
    *,
    allow_missing: bool,
) -> None:
    markdown_path = bundle / "original.md"
    if not markdown_path.exists():
        if not allow_missing:
            add_issue(issues, "error", "missing_original_markdown", markdown_path, "original.md is missing.")
        return

    markdown = markdown_path.read_text(encoding="utf-8", errors="replace")
    if "## 原文正文" not in markdown:
        add_issue(issues, "error", "original_markdown_missing_body", markdown_path, "original.md is missing the full-text body marker.")
        body = markdown
    else:
        body = markdown.split("## 原文正文", 1)[1]

    if "[查看 notes.md](notes.md)" not in markdown:
        add_issue(issues, "error", "original_markdown_missing_notes_link", markdown_path, "original.md does not link back to notes.md.")
    notes_text = notes_path.read_text(encoding="utf-8", errors="replace") if notes_path.exists() else ""
    if notes_path.exists() and "(original.md)" not in notes_text:
        add_issue(issues, "error", "notes_missing_original_link", notes_path, "notes.md does not link to original.md.")

    referenced = markdown_image_paths(markdown)
    remote = sorted(path for path in referenced if path.startswith(("http://", "https://")))
    if remote:
        add_issue(issues, "error", "original_markdown_remote_image", markdown_path, f"original.md contains remote image references: {remote[:3]}")
    missing_files = sorted(path for path in referenced if not path.startswith(("http://", "https://")) and not (bundle / path).is_file())
    if missing_files:
        add_issue(issues, "error", "original_markdown_missing_image", markdown_path, f"original.md references missing local images: {missing_files[:5]}")
    expected = downloaded_image_paths(bundle, original)
    unreferenced = sorted(expected - referenced)
    if unreferenced:
        add_issue(issues, "error", "original_markdown_unreferenced_image", markdown_path, f"Downloaded article images are absent from original.md: {unreferenced[:5]}")

    validate_archive_quality(
        metadata,
        markdown,
        len(expected),
        bundle / "metadata.json",
        markdown_path,
        issues,
    )
    quality = metadata.get("archive_quality") if isinstance(metadata.get("archive_quality"), dict) else {}
    status = quality.get("image_position_status")
    has_notes_risk = "KB_SOURCE_RISK_START" in notes_text and "引用限制：图文对应关系未完全恢复" in notes_text
    if status in {"partially_unverified", "unverified_legacy"} and not has_notes_risk:
        add_issue(issues, "error", "notes_missing_source_risk_warning", notes_path, "Risky image context is not visibly warned in notes.md.")
    if status in {"preserved", "not_applicable"} and "KB_SOURCE_RISK_START" in notes_text:
        add_issue(issues, "error", "notes_stale_source_risk_warning", notes_path, "notes.md has a stale image-context risk warning.")

    source_text = str(original.get("text") or original.get("raw_text") or "")
    source_norm = normalize_for_fulltext_check(source_text)
    body_norm = normalize_for_fulltext_check(body)
    if source_norm:
        prefix = source_norm[: min(120, len(source_norm))]
        suffix = source_norm[-min(160, len(source_norm)) :]
        if prefix not in body_norm:
            add_issue(issues, "error", "original_markdown_missing_start", markdown_path, "original.md does not preserve the start of the extracted article text.")
        if suffix not in body_norm:
            add_issue(issues, "error", "original_markdown_missing_end", markdown_path, "original.md does not preserve the end of the extracted article text.")


def validate(kb_root: Path, strict_raw_html: bool = False, allow_missing_original_md: bool = False) -> Dict:
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
    quality_counts: Dict[str, int] = {}
    for article_id, path in sorted(dirs.items()):
        metadata_path = path / "metadata.json"
        original_path = path / "original.json"
        notes_path = path / "notes.md"
        imgs_path = path / "imgs"
        original: Dict = {}

        if not metadata_path.exists():
            add_issue(issues, "error", "missing_metadata", metadata_path, "metadata.json is missing.")
            continue
        try:
            metadata = load_json(metadata_path)
        except Exception as exc:
            add_issue(issues, "error", "invalid_metadata_json", metadata_path, str(exc))
            continue
        metadata_by_id[article_id] = metadata
        is_video = metadata.get("type") == "video"
        quality = metadata.get("archive_quality")
        quality_status = str(quality.get("image_position_status")) if isinstance(quality, dict) else ("not_applicable" if is_video else "missing")
        quality_counts[quality_status] = quality_counts.get(quality_status, 0) + 1

        for field in CORE_METADATA_FIELDS:
            if is_video and field in ("char_count", "reading_time_min"):
                continue
            if field not in metadata or metadata.get(field) in (None, ""):
                add_issue(issues, "error", "metadata_missing_field", metadata_path, f"metadata missing required field: {field}")
        if metadata.get("id") != article_id:
            add_issue(issues, "error", "metadata_id_mismatch", metadata_path, f"metadata id {metadata.get('id')} does not match directory id {article_id}.")
        if metadata.get("local_path") and metadata["local_path"].rstrip("/") != path.name:
            add_issue(issues, "warning", "metadata_local_path_mismatch", metadata_path, "metadata.local_path does not match directory name.")

        if is_video:
            # 视频条目没有 original.json/original.md，等价物是转写稿 + 封面
            if not (path / "transcript.md").exists():
                add_issue(issues, "error", "missing_transcript", path / "transcript.md", "video entry transcript.md is missing.")
            if not (path / "cover.jpg").exists():
                add_issue(issues, "error", "missing_cover", path / "cover.jpg", "video entry cover.jpg is missing.")
            if not metadata.get("bvid"):
                add_issue(issues, "error", "metadata_missing_field", metadata_path, "video metadata missing required field: bvid")
        elif not original_path.exists():
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

        if original:
            validate_original_markdown(
                path,
                original,
                metadata,
                notes_path,
                issues,
                allow_missing=allow_missing_original_md,
            )

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
            "archive_quality": quality_counts,
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
    parser.add_argument(
        "--allow-missing-original-md",
        action="store_true",
        help="Transitional mode: do not fail legacy bundles that have not been backfilled with original.md.",
    )
    parser.add_argument("--json", action="store_true", help="Print full JSON report.")
    args = parser.parse_args()

    report = validate(
        Path(args.kb_root),
        strict_raw_html=args.strict_raw_html,
        allow_missing_original_md=args.allow_missing_original_md,
    )
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
