#!/usr/bin/env python3
"""Render Obsidian-readable article full text from a kb-articles bundle.

The renderer keeps the curated ``notes.md`` separate from the source article:
``original.md`` is a mechanically cleaned full-text view, while
``original.json`` remains the machine-readable/raw evidence layer.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set, Tuple

try:
    from bs4 import BeautifulSoup
    import html2text
except ImportError:  # Text fallback remains usable on minimal Python installs.
    BeautifulSoup = None
    html2text = None


NOTES_LINK = "> **公众号全文**：[在 Obsidian 中查看完整正文与全部本地图片](original.md)"
ARCHIVE_QUALITY_VERSION = 1
NOTES_RISK_START = "<!-- KB_SOURCE_RISK_START -->"
NOTES_RISK_END = "<!-- KB_SOURCE_RISK_END -->"


def load_json(path: Path) -> Dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def image_items(original: Dict) -> List[Dict]:
    items = original.get("images") or original.get("imgs") or []
    return [item for item in items if isinstance(item, dict)]


def local_path(item: Dict) -> str:
    return str(item.get("local_path") or item.get("local") or "").strip()


def source_url(item: Dict) -> str:
    return html.unescape(
        str(item.get("url") or item.get("source_url") or item.get("src") or "").strip()
    )


def downloaded_images(bundle: Path, original: Dict) -> List[Dict]:
    image_dir = bundle / "imgs"
    files = sorted(
        (path for path in image_dir.glob("*") if path.is_file() and not path.name.startswith(".")),
        key=lambda path: path.name,
    ) if image_dir.exists() else []
    file_by_stem = {path.stem: path for path in files}
    items = original.get("images") or original.get("imgs") or []
    downloaded: List[Dict] = []
    seen: Set[str] = set()
    for position, raw_item in enumerate(items, start=1):
        item = dict(raw_item) if isinstance(raw_item, dict) else {"src": str(raw_item)}
        rel = local_path(item)
        candidate = bundle / rel if rel else None
        if not candidate or not candidate.is_file():
            index = item.get("index") or position
            candidate = file_by_stem.get(f"{int(index):03d}") if str(index).isdigit() else None
            if candidate is None and position <= len(files):
                candidate = files[position - 1]
            if candidate is not None:
                rel = f"imgs/{candidate.name}"
                item["local_path"] = rel
        if not rel or rel in seen or not (bundle / rel).is_file():
            continue
        seen.add(rel)
        downloaded.append(item)
    for path in files:
        rel = f"imgs/{path.name}"
        if rel in seen:
            continue
        seen.add(rel)
        index_match = re.match(r"(\d+)", path.stem)
        downloaded.append({"index": int(index_match.group(1)) if index_match else len(downloaded) + 1, "local_path": rel})
    return downloaded


def image_markdown(item: Dict, fallback_index: int) -> str:
    index = item.get("index") or fallback_index
    return f"![原文配图 {index}]({local_path(item)})"


def append_unplaced_images(body: str, images: Iterable[Dict], placed: Set[str], *, legacy: bool) -> str:
    missing = [item for item in images if local_path(item) not in placed]
    if not missing:
        return body
    heading = "## 原文图片（旧素材无法复原准确插入位置）" if legacy else "## 原文补充图片"
    note = (
        "> 这些图片已随原文保存，但旧版入库数据没有记录它们在正文中的准确位置。"
        if legacy
        else "> 这些图片已随原文保存，但在清洗网页结构时无法可靠定位到正文段落。"
    )
    blocks = [heading, note]
    for fallback_index, item in enumerate(missing, start=1):
        blocks.append(image_markdown(item, fallback_index))
    return body.rstrip() + "\n\n" + "\n\n".join(blocks)


def normalize_for_fulltext_check(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[`*_#>]", "", text)
    return re.sub(r"\s+", "", text)


def render_html_body(original: Dict, images: List[Dict]) -> Optional[Tuple[str, Set[str]]]:
    raw_source = str(original.get("raw_html_source") or original.get("content_html") or "")
    if not raw_source.strip() or BeautifulSoup is None or html2text is None:
        return None

    soup = BeautifulSoup(raw_source, "lxml")
    by_url = {source_url(item): item for item in images if source_url(item)}
    placed: Set[str] = set()
    for tag in soup.find_all("img"):
        src = html.unescape(
            str(
                tag.get("data-src")
                or tag.get("data-original")
                or tag.get("data-actualsrc")
                or tag.get("src")
                or ""
            )
        )
        item = by_url.get(src)
        rel = local_path(item or {})
        if not item or not rel or rel in placed:
            tag.decompose()
            continue
        tag["src"] = rel
        tag["alt"] = f"原文配图 {item.get('index') or len(placed) + 1}"
        placed.add(rel)

    for tag in soup.find_all(["script", "style", "noscript"]):
        tag.decompose()

    converter = html2text.HTML2Text()
    converter.body_width = 0
    converter.ignore_images = False
    converter.ignore_links = False
    converter.skip_internal_links = True
    body = converter.handle(str(soup))
    body = re.sub(r"\)\s*!\[", ")\n\n![", body)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    source_text = str(original.get("text") or original.get("raw_text") or "")
    source_norm = normalize_for_fulltext_check(source_text)
    body_norm = normalize_for_fulltext_check(body)
    if source_norm:
        suffix = source_norm[-min(160, len(source_norm)) :]
        if len(body_norm) < len(source_norm) * 0.7 or suffix not in body_norm:
            return None
    return body, placed


def render_body(bundle: Path, original: Dict) -> Tuple[str, str, int, int]:
    images = downloaded_images(bundle, original)
    html_result = render_html_body(original, images)
    if html_result:
        body, placed = html_result
        body = append_unplaced_images(body, images, placed, legacy=False)
        return body, "html", len(placed), len(images)

    text = str(original.get("text") or original.get("raw_text") or "").strip()
    if not text:
        raise ValueError("original.json does not contain article text")
    body = append_unplaced_images(text, images, set(), legacy=True)
    return body, "text_fallback", 0, len(images)


def build_archive_quality(mode: str, placed_count: int, image_count: int) -> Dict:
    if image_count == 0:
        position_status = "not_applicable"
        safe_use = "text_only"
    elif placed_count == image_count:
        position_status = "preserved"
        safe_use = "text_and_images"
    elif placed_count:
        position_status = "partially_unverified"
        safe_use = "text_only_until_source_verified"
    else:
        position_status = "unverified_legacy"
        safe_use = "text_only_until_source_verified"
    return {
        "version": ARCHIVE_QUALITY_VERSION,
        "text_status": "complete_extracted_text",
        "render_mode": mode,
        "image_position_status": position_status,
        "safe_use": safe_use,
        "images_local": image_count,
        "images_positioned": placed_count,
    }


def quality_notice(quality: Dict) -> str:
    status = quality["image_position_status"]
    if status == "preserved":
        return "- **图片语境**：图片已按抓取到的原网页位置保留，可结合相邻正文使用。"
    if status == "partially_unverified":
        return (
            "> [!warning] 引用风险：部分图片无法恢复到原段落。引用图片、图表或截图数据前，"
            "必须打开原文核对图注和上下文；未核验时只使用文字内容。"
        )
    if status == "unverified_legacy":
        return (
            "> [!warning] 引用风险：旧素材的图文对应关系未恢复。不得根据文末图片顺序推断它对应哪段文字；"
            "引用图片、图表或截图数据前必须打开原文核验。原文无法访问时，只使用文字内容。"
        )
    return "- **图片语境**：本地留档中没有文章图片；仅使用文字内容。"


def original_header(metadata: Dict, original: Dict, image_count: int, mode: str, quality: Dict) -> str:
    title = str(metadata.get("title") or original.get("title") or "未命名文章")
    article_id = str(metadata.get("id") or "")
    author = str(metadata.get("author") or original.get("author") or "未知")
    platform = str(metadata.get("source_platform") or "原文")
    published_at = str(metadata.get("published_at") or original.get("publishTime") or "未知")
    url = str(metadata.get("url") or original.get("source_url") or original.get("url") or "")
    char_count = metadata.get("char_count")
    if not isinstance(char_count, int):
        char_count = len(str(original.get("text") or original.get("raw_text") or ""))
    mode_note = (
        "正文与图片按原网页结构自动清洗。"
        if mode == "html"
        else "该旧素材缺少可复原排版的网页结构，正文完整保留，图片集中附于文末。"
    )
    notice = quality_notice(quality)
    status = quality["image_position_status"]
    safe_use = quality["safe_use"]
    return f"""# {title}

<!-- KB_ARCHIVE_QUALITY: image_position_status={status}; safe_use={safe_use} -->

> **公众号全文留档 · 未摘要、未改写**  
> {mode_note}供 Obsidian 阅读与全文搜索。原文中的网页脚本、评论区、视频、音频及互动组件可能无法保留；图片均使用本地文件。

{notice}

- **入库编号**：{article_id}
- **作者 / 来源**：{author} / {platform}
- **发布时间**：{published_at}
- **原文链接**：{url}
- **正文长度**：{char_count:,} 字
- **本地图片**：{image_count} 张
- **结构化笔记**：[查看 notes.md](notes.md)

---

## 原文正文

"""


def ensure_notes_link(notes_path: Path) -> bool:
    if not notes_path.exists():
        return False
    text = notes_path.read_text(encoding="utf-8")
    if "(original.md)" in text:
        return False
    separator = "\n---\n"
    position = text.find(separator)
    if position >= 0:
        updated = text[:position].rstrip() + "\n>\n" + NOTES_LINK + "\n" + text[position:]
    else:
        lines = text.splitlines()
        insert_at = 1 if lines else 0
        lines[insert_at:insert_at] = ["", NOTES_LINK]
        updated = "\n".join(lines).rstrip() + "\n"
    notes_path.write_text(updated, encoding="utf-8")
    return True


def update_notes_risk_notice(notes_path: Path, quality: Dict) -> bool:
    if not notes_path.exists():
        return False
    text = notes_path.read_text(encoding="utf-8")
    pattern = re.compile(
        rf"\n?{re.escape(NOTES_RISK_START)}.*?{re.escape(NOTES_RISK_END)}\n?",
        re.DOTALL,
    )
    updated = pattern.sub("\n", text)
    status = quality["image_position_status"]
    if status in {"partially_unverified", "unverified_legacy"}:
        block = (
            f"{NOTES_RISK_START}\n"
            "> [!warning] **引用限制：图文对应关系未完全恢复**  \n"
            "> 文字内容可以正常用于提炼；引用图片、图表、截图数据或判断图片对应段落前，"
            "必须打开公众号原文核验。原文无法访问时，不使用图片推导的信息。\n"
            f"{NOTES_RISK_END}"
        )
        if NOTES_LINK in updated:
            updated = updated.replace(NOTES_LINK, NOTES_LINK + "\n\n" + block, 1)
        else:
            lines = updated.splitlines()
            insert_at = 1 if lines else 0
            lines[insert_at:insert_at] = ["", block]
            updated = "\n".join(lines)
    updated = re.sub(r"\n{3,}", "\n\n", updated).rstrip() + "\n"
    if updated == text:
        return False
    notes_path.write_text(updated, encoding="utf-8")
    return True


def render_bundle(bundle: Path, *, overwrite: bool = False, update_notes_link: bool = True) -> Dict:
    bundle = bundle.resolve()
    metadata_path = bundle / "metadata.json"
    original_path = bundle / "original.json"
    target_path = bundle / "original.md"
    if not metadata_path.exists() or not original_path.exists():
        raise FileNotFoundError("bundle must contain metadata.json and original.json")
    if target_path.exists() and not overwrite:
        raise FileExistsError(f"{target_path} already exists; pass --overwrite to replace it")

    metadata = load_json(metadata_path)
    original = load_json(original_path)
    body, mode, placed_count, image_count = render_body(bundle, original)
    quality = build_archive_quality(mode, placed_count, image_count)
    metadata["archive_quality"] = quality
    write_json(metadata_path, metadata)
    output = original_header(metadata, original, image_count, mode, quality) + body.rstrip() + "\n"
    target_path.write_text(output, encoding="utf-8")
    notes_link_added = ensure_notes_link(bundle / "notes.md") if update_notes_link else False
    notes_risk_notice_updated = update_notes_risk_notice(bundle / "notes.md", quality) if update_notes_link else False
    return {
        "id": metadata.get("id"),
        "bundle": bundle.name,
        "status": "ok",
        "mode": mode,
        "text_chars": len(str(original.get("text") or original.get("raw_text") or "")),
        "images_local": image_count,
        "images_placed_in_body": placed_count,
        "archive_quality": quality,
        "notes_link_added": notes_link_added,
        "notes_risk_notice_updated": notes_risk_notice_updated,
    }


def select_bundles(paths: List[str], kb_root: Optional[str], ids: List[str]) -> List[Path]:
    bundles = [Path(path) for path in paths]
    if kb_root:
        root = Path(kb_root)
        wanted = set(ids)
        for bundle in sorted(root.glob("A[0-9]*-*")):
            if not bundle.is_dir():
                continue
            article_id = bundle.name.split("-", 1)[0]
            if wanted and article_id not in wanted:
                continue
            bundles.append(bundle)
    unique = []
    seen = set()
    for bundle in bundles:
        resolved = bundle.resolve()
        if resolved not in seen:
            seen.add(resolved)
            unique.append(bundle)
    return unique


def main() -> int:
    parser = argparse.ArgumentParser(description="Render kb-articles original.md files for Obsidian.")
    parser.add_argument("bundles", nargs="*", help="One or more article bundle directories.")
    parser.add_argument("--kb-root", help="Render article directories under this kb-articles root.")
    parser.add_argument("--ids", nargs="*", default=[], help="With --kb-root, limit to these article IDs.")
    parser.add_argument("--overwrite", action="store_true", help="Replace an existing original.md.")
    parser.add_argument("--no-notes-link", action="store_true", help="Do not add the notes.md -> original.md link.")
    parser.add_argument("--json", action="store_true", help="Print a JSON report.")
    args = parser.parse_args()

    bundles = select_bundles(args.bundles, args.kb_root, args.ids)
    if not bundles:
        parser.error("Provide at least one bundle directory or --kb-root.")
    results = []
    for bundle in bundles:
        try:
            results.append(
                render_bundle(bundle, overwrite=args.overwrite, update_notes_link=not args.no_notes_link)
            )
        except Exception as exc:
            results.append({"bundle": str(bundle), "status": "failed", "error": str(exc)})
    report = {
        "total": len(results),
        "success": sum(item["status"] == "ok" for item in results),
        "failed": sum(item["status"] == "failed" for item in results),
        "results": results,
    }
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(f"total={report['total']} success={report['success']} failed={report['failed']}")
        for item in results:
            if item["status"] == "ok":
                print(
                    f"OK {item.get('id')} mode={item.get('mode')} "
                    f"images={item.get('images_local')} placed={item.get('images_placed_in_body')}"
                )
            else:
                print(f"FAILED {item.get('bundle')} :: {item.get('error')}")
    return 1 if report["failed"] else 0


if __name__ == "__main__":
    sys.exit(main())
