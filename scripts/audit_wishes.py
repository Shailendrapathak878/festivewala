# -*- coding: utf-8 -*-
"""Audits the existing 300 wishes in FestiveWala for Phase 4.2."""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WISHES_DIR = os.path.join(BASE_DIR, "src", "data", "wishes")

FILES = [
    "family.ts",
    "friends.ts",
    "love.ts",
    "professional.ts",
    "funny.ts",
    "emotional.ts",
    "short.ts",
    "traditional.ts",
    "captions.ts",
    "business.ts"
]

def parse_wishes_from_ts(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Match each object { ... }
    # A cleaner way is regex on id, festivalId, category, textEn, textHi, headlineEn, headlineHi
    # or AST. Let's do a reliable regex parser for each object block.
    # Objects are within export const ...: WishMessage[] = [ ... ];
    items = []
    # Find all object blocks
    blocks = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"].*?^\s*\},?', content, re.MULTILINE | re.DOTALL)
    
    # Let's extract each field carefully
    raw_objects = re.finditer(r'\{\s*id:\s*[\'"](?P<id>[^\'"]+)[\'"].*?(?=\n\s*\{|\n\s*\];)', content, re.DOTALL)
    for m in raw_objects:
        block = m.group(0)
        
        def get_field(name):
            match = re.search(rf'{name}:\s*[\'"](?P<val>.*?)[\'"](?=,\s*\n|\s*\n|\s*\}})', block, re.DOTALL)
            return match.group("val") if match else ""
        
        wid = m.group("id")
        cat = get_field("category")
        text_en = get_field("textEn")
        text_hi = get_field("textHi")
        head_en = get_field("headlineEn")
        head_hi = get_field("headlineHi")
        
        items.append({
            "id": wid,
            "category": cat,
            "headlineEn": head_en,
            "headlineHi": head_hi,
            "textEn": text_en,
            "textHi": text_hi,
            "raw": block
        })
    return items

def main():
    print("=== FESTIVEWALA WISHES AUDIT ===")
    total = 0
    all_wishes = {}
    for filename in FILES:
        path = os.path.join(WISHES_DIR, filename)
        if not os.path.exists(path):
            print(f"File missing: {filename}")
            continue
        items = parse_wishes_from_ts(path)
        print(f"{filename}: {len(items)} messages")
        all_wishes[filename] = items
        total += len(items)
    print(f"Total parsed: {total}")

if __name__ == "__main__":
    main()

