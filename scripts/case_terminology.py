"""Normalize explanatory terms without editing source prompts or embedded code."""
import json
import re
from pathlib import Path

_terms = json.loads((Path(__file__).resolve().parent.parent / 'docs/.vitepress/data/case-translations/terminology.json').read_text())
_terms = {k.lower(): v for k, v in _terms.items()}
_pattern = re.compile(r'\b(' + '|'.join(re.escape(k) for k in sorted(_terms, key=len, reverse=True)) + r')\b(?!"\s*:)', re.I)

def normalize_terms(text):
    # Keep code blocks, inline code, URLs, named references and source dialogue intact.
    parts = re.split(r'(```[\s\S]*?```|`[^`]*`|https?://[^\s<>]+|@\[[^\]]+\]|"[^"\n]+"|“[^”\n]+”)', text)
    return ''.join(p if i % 2 else _pattern.sub(lambda m: _terms[m[0].lower()], p) for i, p in enumerate(parts))
