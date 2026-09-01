#!/usr/bin/env python3
"""Report citation risks for article IDs before using them in derived content."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, Iterable, List


RISKY_IMAGE_STATUSES = {"partially_unverified", "unverified_legacy"}


def load_json(path: Path) -> Dict:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize_id(value: str) -> str:
    match = re.fullmatch(r"[Aa](\d+)", value.strip())
    if not match:
        raise ValueError(f"Invalid article ID: {value}")
    return f"A{int(match.group(1)):03d}"


def expand_ids(values: Iterable[str]) -> List[str]:
    article_ids: List[str] = []
    for value in values:
        range_match = re.fullmatch(r"[Aa](\d+)\s*[-–—]\s*[Aa]?(\d+)", value.strip())
        if range_match:
            start, end = (int(part) for part in range_match.groups())
            if end < start:
                raise ValueError(f"Descending article range is not allowed: {value}")
            article_ids.extend(f"A{number:03d}" for number in range(start, end + 1))
        else:
            article_ids.append(normalize_id(value))
    return list(dict.fromkeys(article_ids))


def article_dirs(kb_root: Path) -> Dict[str, Path]:
    bundles: Dict[str, Path] = {}
    for path in kb_root.glob("A[0-9]*-*"):
        if path.is_dir():
            bundles[path.name.split("-", 1)[0]] = path
    return bundles


def verification_actions(status: str) -> List[str]:
    if status in RISKY_IMAGE_STATUSES:
        return [
            "文字内容可用于提炼与改写",
            "引用图片、图表、截图数据或判断图文对应关系前，必须打开原文核验",
            "原文无法访问时，不使用任何由图片推导的信息",
        ]
    if status == "preserved":
        return [
            "文字和图片可作为候选素材",
            "原话、关键数字、时效性事实和争议性结论仍需按内容风险核验",
        ]
    if status == "not_applicable":
        return [
            "仅使用文字内容",
            "原话、关键数字、时效性事实和争议性结论仍需按内容风险核验",
        ]
    return ["质量标记缺失或未知；在补齐标记前按高风险处理并核对原文"]


def inspect_article(article_id: str, bundle: Path) -> Dict:
    metadata_path = bundle / "metadata.json"
    if not metadata_path.exists():
        return {"id": article_id, "status": "error", "error": "metadata.json is missing"}
    metadata = load_json(metadata_path)
    quality = metadata.get("archive_quality") if isinstance(metadata.get("archive_quality"), dict) else {}
    image_status = str(quality.get("image_position_status") or "unknown")
    safe_use = str(quality.get("safe_use") or "source_verification_required")
    return {
        "id": article_id,
        "title": metadata.get("title", ""),
        "url": metadata.get("url", ""),
        "local_path": metadata.get("local_path", bundle.name),
        "image_position_status": image_status,
        "safe_use": safe_use,
        "requires_image_source_verification": image_status in RISKY_IMAGE_STATUSES or image_status == "unknown",
        "actions": verification_actions(image_status),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Check article citation risks before drafting or publishing.")
    parser.add_argument("article_ids", nargs="+", help="Article IDs or ranges, for example A105 A200 or A100-A110.")
    parser.add_argument("--kb-root", default="kb-articles", help="kb-articles root directory.")
    parser.add_argument("--json", action="store_true", help="Print a JSON report.")
    args = parser.parse_args()

    try:
        requested = expand_ids(args.article_ids)
    except ValueError as exc:
        parser.error(str(exc))

    bundles = article_dirs(Path(args.kb_root))
    results = []
    missing = []
    for article_id in requested:
        bundle = bundles.get(article_id)
        if bundle is None:
            missing.append(article_id)
            results.append({"id": article_id, "status": "error", "error": "article bundle not found"})
            continue
        results.append(inspect_article(article_id, bundle))

    risky = sum(bool(item.get("requires_image_source_verification")) for item in results)
    report = {
        "status": "error" if missing else ("verification_required" if risky else "ok"),
        "summary": {"requested": len(requested), "risky_image_context": risky, "missing": len(missing)},
        "articles": results,
    }
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(
            f"status={report['status']} requested={len(requested)} "
            f"risky_image_context={risky} missing={len(missing)}"
        )
        for item in results:
            if item.get("status") == "error":
                print(f"ERROR {item['id']} :: {item['error']}")
            else:
                print(
                    f"{item['id']} image_position={item['image_position_status']} "
                    f"safe_use={item['safe_use']} :: {item['title']}"
                )
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
