#!/usr/bin/env python3
"""Fetch and normalize a WeChat public-account article.

Contract fixed in this repository:
- Primary path: curl -L --compressed, then retry with a mobile MicroMessenger UA
  when the desktop response looks like a verification or abnormal page.
- Stable WeChat anchors: activity-name, js_author_name, createTime/ct,
  js_content, content_noencode, msg_desc, msg_cdn_url.
- Fallback path: if curl cannot obtain a real article page, try an optional
  patchright browser fetch. No global dependency is installed by this script.
- Image downloads use the article URL as Referer plus a browser-like UA to avoid
  qpic anti-hotlinking failures.
"""

from __future__ import annotations

import argparse
import ast
import asyncio
import hashlib
import html
import json
import mimetypes
import os
import re
import shutil
import struct
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple
from urllib.parse import unquote, urljoin, urlparse


DESKTOP_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)
WECHAT_UA = (
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 "
    "MicroMessenger/8.0.50 NetType/WIFI Language/zh_CN"
)
BLOCK_MARKERS = (
    "环境异常",
    "请输入验证码",
    "访问过于频繁",
    "WeChat Security Center",
    "请在微信客户端打开链接",
    "为了保护你的网络安全",
)


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: List[str] = []

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]) -> None:
        if tag.lower() in {"p", "br", "section", "div", "li", "h1", "h2", "h3"}:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        text = data.strip()
        if text:
            self.parts.append(text)

    def text(self) -> str:
        joined = "\n".join(self.parts)
        lines = [re.sub(r"\s+", " ", line).strip() for line in joined.splitlines()]
        return "\n".join(line for line in lines if line)


class LinkImageExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.images: List[Dict[str, str]] = []
        self.links: List[str] = []

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]) -> None:
        attr = {k.lower(): v for k, v in attrs if v is not None}
        if tag.lower() == "img":
            src = attr.get("data-src") or attr.get("src")
            if src:
                self.images.append(
                    {
                        "url": html.unescape(src),
                        "declared_type": attr.get("data-type") or attr.get("wx_fmt") or "",
                        "ratio": attr.get("data-ratio") or "",
                        "width": attr.get("data-w") or "",
                    }
                )
        if tag.lower() == "a" and attr.get("href"):
            self.links.append(html.unescape(attr["href"]))


@dataclass
class CurlResult:
    html: str
    ua_mode: str


def run_curl(url: str, ua: str, out_path: Path, referer: Optional[str] = None) -> bool:
    cmd = [
        "curl",
        "-L",
        "--compressed",
        "--fail-with-body",
        "--silent",
        "--show-error",
        "--max-time",
        "45",
        "-A",
        ua,
        "-o",
        str(out_path),
    ]
    if referer:
        cmd.extend(["-e", referer])
    cmd.append(url)
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return result.returncode == 0 and out_path.exists() and out_path.stat().st_size > 0


def is_real_article_page(page: str) -> bool:
    if not page or len(page) < 2000:
        return False
    if any(marker in page for marker in BLOCK_MARKERS):
        return False
    return bool(
        re.search(r'id=["\']activity-name["\']', page)
        or "js_content" in page
        or "content_noencode" in page
    )


def fetch_html_with_curl(url: str, work_dir: Path) -> CurlResult:
    attempts = [("desktop", DESKTOP_UA), ("wechat", WECHAT_UA)]
    last_html = ""
    for ua_mode, ua in attempts:
        out_path = work_dir / f"{ua_mode}.html"
        if run_curl(url, ua, out_path):
            html_text = out_path.read_text(encoding="utf-8", errors="replace")
            last_html = html_text
            if is_real_article_page(html_text):
                return CurlResult(html=html_text, ua_mode=ua_mode)
    browser_html = fetch_html_with_patchright(url)
    if browser_html and is_real_article_page(browser_html):
        return CurlResult(html=browser_html, ua_mode="patchright")
    raise RuntimeError("Unable to fetch a real WeChat article page by curl or patchright fallback.")


def fetch_html_with_patchright(url: str) -> Optional[str]:
    """Optional browser fallback; used only when patchright is already installed."""

    try:
        from patchright.async_api import async_playwright  # type: ignore
    except Exception:
        return None

    async def _run() -> Optional[str]:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page(user_agent=WECHAT_UA)
            await page.goto(url, wait_until="networkidle", timeout=60000)
            content = await page.content()
            await browser.close()
            return content

    try:
        return asyncio.run(_run())
    except Exception:
        return None


def first_regex(patterns: Iterable[str], source: str, flags: int = re.S) -> str:
    for pattern in patterns:
        match = re.search(pattern, source, flags)
        if match:
            return clean_text(match.group(1))
    return ""


def clean_text(value: str) -> str:
    value = html.unescape(value or "")
    value = value.replace("\u200b", "").replace("\xa0", " ")
    return re.sub(r"\s+", " ", value).strip()


def js_string_var(name: str, source: str) -> str:
    # Do not let a JavaScript variable lookup start inside an HTML attribute
    # such as `data-nickname="..."`. Without the hyphen guard, the regex can
    # consume most of the page while looking for a later quote + semicolon.
    pattern = rf"(?<![\w-])(?:var\s+)?{re.escape(name)}\s*=\s*(['\"])(.*?)\1\s*;"
    match = re.search(pattern, source, re.S)
    if not match:
        return ""
    raw = match.group(1) + match.group(2) + match.group(1)
    try:
        return str(ast.literal_eval(raw))
    except Exception:
        return html.unescape(match.group(2))


def js_object_string_prop(name: str, source: str) -> str:
    """Read a quoted string from an object literal such as `name: 'value'`."""
    pattern = rf"(?<![\w-]){re.escape(name)}\s*:\s*(['\"])(.*?)\1\s*,"
    match = re.search(pattern, source, re.S)
    if not match:
        return ""
    raw = match.group(1) + match.group(2) + match.group(1)
    try:
        return str(ast.literal_eval(raw))
    except Exception:
        return html.unescape(match.group(2))


def js_number_var(names: Iterable[str], source: str) -> str:
    for name in names:
        match = re.search(rf"(?:var\s+)?{re.escape(name)}\s*=\s*['\"]?(\d{{10,13}})['\"]?", source)
        if match:
            return match.group(1)
    return ""


def format_wechat_time(raw: str) -> str:
    if not raw:
        return ""
    if raw.isdigit():
        stamp = int(raw)
        if stamp > 10_000_000_000:
            stamp //= 1000
        return datetime.fromtimestamp(stamp).strftime("%Y-%m-%d %H:%M")
    return clean_text(raw)


def extract_js_content(page: str) -> str:
    decoded = js_string_var("content_noencode", page) or js_object_string_prop("content_noencode", page)
    if decoded:
        return html.unescape(unquote(decoded))
    match = re.search(
        r'(<div[^>]+id=["\']js_content["\'][^>]*>)(.*?)(?:<script\b|<div[^>]+id=["\']js_sponsor_ad_area["\']|<div[^>]+id=["\']js_pc_qr_code["\'])',
        page,
        re.S,
    )
    if match:
        return match.group(2).strip()
    return ""


def parse_article(url: str, page: str, ua_mode: str) -> Dict[str, object]:
    content_html = extract_js_content(page)
    extractor = LinkImageExtractor()
    extractor.feed(content_html or page)

    title = first_regex(
        [
            r'<h1[^>]*id=["\']activity-name["\'][^>]*>\s*(?:<span[^>]*>)?\s*([^<]+)',
            r'property=["\']og:title["\']\s+content=["\'](.+?)["\']',
            r'var\s+msg_title\s*=\s*["\'](.+?)["\']\.html',
            r'var\s+msg_title\s*=\s*htmlDecode\(["\'](.+?)["\']\)',
        ],
        page,
    )
    author = clean_text(js_string_var("nickname", page) or js_object_string_prop("nick_name", page)) or first_regex(
        [
            r'var\s+nickname\s*=\s*["\'](.+?)["\'];',
            r'id=["\']js_name["\'][^>]*>\s*([^<]+?)\s*</',
        ],
        page,
    )
    byline_author = clean_text(js_string_var("js_author_name", page)) or first_regex(
        [r'js_author_name\s*=\s*["\'](.+?)["\'];'],
        page,
    )
    publish_time = format_wechat_time(js_number_var(["createTime", "ct", "ori_create_time"], page))
    description = clean_text(js_string_var("msg_desc", page))
    cover_url = html.unescape(js_string_var("msg_cdn_url", page))

    text_parser = TextExtractor()
    text_parser.feed(content_html)
    text = text_parser.text()
    paragraphs = [line for line in text.splitlines() if line.strip()]

    external_links = []
    for link in extractor.links:
        full_url = urljoin(url, link)
        if full_url.startswith("http") and "mp.weixin.qq.com/mp/profile_ext" not in full_url:
            external_links.append({"url": full_url, "status": "reference_link_preserved"})

    images = []
    seen_urls = set()
    for item in extractor.images:
        img_url = urljoin(url, item["url"])
        if img_url in seen_urls:
            continue
        seen_urls.add(img_url)
        images.append(
            {
                "index": len(images) + 1,
                "url": img_url,
                "declared_type": item.get("declared_type", ""),
                "ratio": item.get("ratio", ""),
                "width": item.get("width", ""),
            }
        )

    return {
        "host": urlparse(url).netloc,
        "url": url,
        "source_url": url,
        "fetch": {"method": ua_mode, "fetched_at": datetime.now().isoformat(timespec="seconds")},
        "title": title,
        "author": author,
        "byline_author": byline_author,
        "publishTime": publish_time,
        "description": description,
        "cover_url": cover_url,
        "text": text,
        "paragraphs": paragraphs,
        "raw_html": page,
        "raw_html_source": content_html,
        "external_links": external_links,
        "images": images,
        "imgs": images,
    }


def file_type(data: bytes, declared: str = "") -> Tuple[str, str]:
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png", "image/png"
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg", "image/jpeg"
    if data.startswith(b"GIF87a") or data.startswith(b"GIF89a"):
        return "gif", "image/gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "webp", "image/webp"
    ext = (declared or "").lower().strip(".")
    if ext in {"jpeg", "jpg"}:
        return "jpg", "image/jpeg"
    if ext in {"png", "gif", "webp"}:
        return ext, mimetypes.types_map.get("." + ext, "application/octet-stream")
    return "bin", "application/octet-stream"


def image_size(data: bytes) -> Tuple[Optional[int], Optional[int]]:
    try:
        if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
            return struct.unpack(">II", data[16:24])
        if data.startswith(b"GIF87a") or data.startswith(b"GIF89a"):
            return struct.unpack("<HH", data[6:10])
        if data.startswith(b"\xff\xd8\xff"):
            pos = 2
            while pos + 9 < len(data):
                if data[pos] != 0xFF:
                    pos += 1
                    continue
                marker = data[pos + 1]
                length = struct.unpack(">H", data[pos + 2 : pos + 4])[0]
                if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
                    height, width = struct.unpack(">HH", data[pos + 5 : pos + 9])
                    return width, height
                pos += 2 + length
        if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
            chunk = data[12:16]
            if chunk == b"VP8X" and len(data) >= 30:
                width = 1 + int.from_bytes(data[24:27], "little")
                height = 1 + int.from_bytes(data[27:30], "little")
                return width, height
            if chunk == b"VP8 ":
                marker = data.find(b"\x9d\x01\x2a")
                if marker != -1 and marker + 7 < len(data):
                    width, height = struct.unpack("<HH", data[marker + 3 : marker + 7])
                    return width & 0x3FFF, height & 0x3FFF
            if chunk == b"VP8L" and len(data) >= 25:
                bits = int.from_bytes(data[21:25], "little")
                return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    except Exception:
        return None, None
    return None, None


def download_images(article: Dict[str, object], output_dir: Path) -> None:
    imgs_dir = output_dir / "imgs"
    imgs_dir.mkdir(parents=True, exist_ok=True)
    seen_hashes: Dict[str, str] = {}
    updated = []
    for image in article.get("images", []):
        item = dict(image)
        url = str(item["url"])
        tmp_path = imgs_dir / f"download-{item['index']:03d}.tmp"
        success = run_curl(url, WECHAT_UA, tmp_path, referer=str(article["url"]))
        if not success:
            item.update({"download_status": "failed", "local_path": "", "filter_reason": "download_failed"})
            updated.append(item)
            continue
        data = tmp_path.read_bytes()
        ext, mime = file_type(data, str(item.get("declared_type", "")))
        final_name = f"{int(item['index']):03d}.{ext}"
        final_path = imgs_dir / final_name
        tmp_path.replace(final_path)
        sha = hashlib.sha256(data).hexdigest()
        width, height = image_size(data)
        candidate, reason = classify_image(width, height, sha, seen_hashes)
        if sha not in seen_hashes:
            seen_hashes[sha] = f"imgs/{final_name}"
        item.update(
            {
                "local_path": f"imgs/{final_name}",
                "mime_type": mime,
                "sha256": sha,
                "file_size": len(data),
                "actual_width": width,
                "actual_height": height,
                "download_status": "ok",
                "candidate_for_ai": candidate,
                "filter_reason": reason,
            }
        )
        if reason.startswith("duplicate:"):
            item["duplicate_of"] = reason.split(":", 1)[1]
        updated.append(item)
    article["images"] = updated
    article["imgs"] = updated
    article["image_candidates"] = [
        {
            "index": item["index"],
            "local_path": item.get("local_path", ""),
            "url": item.get("url", ""),
            "width": item.get("actual_width"),
            "height": item.get("actual_height"),
        }
        for item in updated
        if item.get("candidate_for_ai")
    ]
    article["image_stats"] = {
        "total": len(updated),
        "downloaded": sum(1 for item in updated if item.get("download_status") == "ok"),
        "failed": sum(1 for item in updated if item.get("download_status") != "ok"),
        "candidates_for_ai": sum(1 for item in updated if item.get("candidate_for_ai")),
    }


def classify_image(
    width: Optional[int],
    height: Optional[int],
    sha: str,
    seen_hashes: Dict[str, str],
) -> Tuple[bool, str]:
    if sha in seen_hashes:
        return False, f"duplicate:{seen_hashes[sha]}"
    if width is not None and height is not None:
        if width < 80 or height < 80 or max(width, height) < 160:
            return False, "small_decorative_threshold"
    return True, "candidate"


def write_bundle(article: Dict[str, object], output_dir: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    bundle_path = output_dir / "raw_bundle.json"
    bundle_path.write_text(json.dumps(article, ensure_ascii=False, indent=2), encoding="utf-8")
    return bundle_path


def fetch_to_bundle(url: str, output_dir: Path, download: bool = True) -> Dict[str, object]:
    output_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="wechat-fetch-") as tmp:
        result = fetch_html_with_curl(url, Path(tmp))
    article = parse_article(url, result.html, result.ua_mode)
    if not article["title"] or not article["text"]:
        raise RuntimeError("Fetched page did not yield a title and article text.")
    if download:
        download_images(article, output_dir)
    write_bundle(article, output_dir)
    return article


def main() -> int:
    parser = argparse.ArgumentParser(description="Fetch a WeChat article into a raw bundle.")
    parser.add_argument("url", help="mp.weixin.qq.com article URL")
    parser.add_argument("-o", "--output", default="", help="Output directory for raw_bundle.json and imgs/")
    parser.add_argument("--no-images", action="store_true", help="Parse only; skip image downloads")
    args = parser.parse_args()

    output = Path(args.output) if args.output else Path("tmp") / f"wechat-{int(time.time())}"
    article = fetch_to_bundle(args.url, output, download=not args.no_images)
    stats = article.get("image_stats", {})
    print(
        json.dumps(
            {
                "status": "ok",
                "bundle": str(output / "raw_bundle.json"),
                "title": article.get("title", ""),
                "author": article.get("author", ""),
                "publishTime": article.get("publishTime", ""),
                "text_length": len(str(article.get("text", ""))),
                "images": stats,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
