#!/usr/bin/env python3
"""Link/asset audit for v3/**/*.html: resolves href/src/srcset targets,
checks #fragment ids (same-page and cross-page), and lists external https URLs.
Standard library only. Run from repo root: python3 v3/review-audit.py
"""
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
V3 = ROOT / "v3"

ATTR_KEYS = ("href", "src", "srcset")


class RefCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []  # list of (attr, raw_value)
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for k in ATTR_KEYS:
            if k in d and d[k]:
                self.refs.append((k, d[k]))
        if "id" in d and d["id"]:
            self.ids.add(d["id"])
        if "name" in d and d["name"] and tag == "a":
            self.ids.add(d["name"])

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)


def split_srcset(value):
    parts = [p.strip() for p in value.split(",") if p.strip()]
    urls = []
    for p in parts:
        urls.append(p.split()[0])
    return urls


def main():
    files = sorted(V3.rglob("*.html"))
    file_ids = {}
    file_refs = {}
    for f in files:
        text = f.read_text(encoding="utf-8")
        c = RefCollector()
        c.feed(text)
        file_ids[f] = c.ids
        file_refs[f] = c.refs

    total_refs = 0
    missing_files = []
    missing_fragments = []
    external_urls = set()

    per_file_report = []

    for f in files:
        refs = file_refs[f]
        expanded = []
        for attr, raw in refs:
            if attr == "srcset":
                for u in split_srcset(raw):
                    expanded.append((attr, u))
            else:
                expanded.append((attr, raw))

        n_refs = len(expanded)
        total_refs += n_refs
        n_missing_file = 0
        n_missing_frag = 0
        n_external = 0

        for attr, raw in expanded:
            raw = raw.strip()
            if not raw or raw.startswith(("mailto:", "tel:", "javascript:")):
                continue
            parsed = urlsplit(raw)
            if parsed.scheme in ("http", "https"):
                external_urls.add(raw)
                n_external += 1
                continue
            # local reference: path + optional fragment
            path_part = parsed.path
            frag = parsed.fragment
            if path_part == "":
                # same-page fragment only, e.g. "#top"
                if frag and frag not in file_ids[f]:
                    missing_fragments.append((str(f.relative_to(ROOT)), raw, "same-page"))
                    n_missing_frag += 1
                continue
            target = (f.parent / path_part).resolve()
            if not target.exists():
                missing_files.append((str(f.relative_to(ROOT)), raw))
                n_missing_file += 1
                continue
            if frag:
                if target.suffix == ".html" and target in file_ids:
                    ids = file_ids[target]
                elif target.suffix == ".html":
                    # target html file not in our v3 set (shouldn't happen) -- parse it
                    tc = RefCollector()
                    tc.feed(target.read_text(encoding="utf-8"))
                    ids = tc.ids
                else:
                    ids = set()
                if frag not in ids:
                    missing_fragments.append((str(f.relative_to(ROOT)), raw, "cross-page"))
                    n_missing_frag += 1

        per_file_report.append(
            (str(f.relative_to(ROOT)), n_refs, n_missing_file, n_missing_frag, n_external)
        )

    print("=== Per-file audit ===")
    print(f"{'file':45s} {'refs':>5s} {'miss_file':>9s} {'miss_frag':>9s} {'external':>8s}")
    for row in per_file_report:
        print(f"{row[0]:45s} {row[1]:5d} {row[2]:9d} {row[3]:9d} {row[4]:8d}")

    print()
    print("=== Totals ===")
    print(f"files scanned:        {len(files)}")
    print(f"total refs (href/src/srcset, srcset expanded): {total_refs}")
    print(f"missing relative file targets: {len(missing_files)}")
    for m in missing_files:
        print(f"  MISSING FILE: {m[0]} -> {m[1]}")
    print(f"missing #fragment targets: {len(missing_fragments)}")
    for m in missing_fragments:
        print(f"  MISSING FRAGMENT ({m[2]}): {m[0]} -> {m[1]}")

    print()
    print(f"=== Unique external https URLs ({len(external_urls)}) ===")
    for u in sorted(external_urls):
        print(f"  {u}")


if __name__ == "__main__":
    main()
