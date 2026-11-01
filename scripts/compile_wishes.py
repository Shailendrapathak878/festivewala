# -*- coding: utf-8 -*-
"""Compile, validate, and write 300 wishes into TypeScript data modules."""

import json
import os
import sys

from wishes_traditional import TRADITIONAL_WISHES
from wishes_family import FAMILY_WISHES
from wishes_friends import FRIENDS_WISHES
from wishes_love import LOVE_WISHES
from wishes_professional import PROFESSIONAL_WISHES
from wishes_funny import FUNNY_WISHES
from wishes_emotional import EMOTIONAL_WISHES
from wishes_short import SHORT_WISHES
from wishes_captions import CAPTIONS_WISHES
from wishes_business import BUSINESS_WISHES

CATEGORIES = [
    ("traditional", TRADITIONAL_WISHES, 30, "TRADITIONAL_WISHES"),
    ("family", FAMILY_WISHES, 36, "FAMILY_WISHES"),
    ("friends", FRIENDS_WISHES, 36, "FRIENDS_WISHES"),
    ("love", LOVE_WISHES, 30, "LOVE_WISHES"),
    ("professional", PROFESSIONAL_WISHES, 30, "PROFESSIONAL_WISHES"),
    ("funny", FUNNY_WISHES, 24, "FUNNY_WISHES"),
    ("emotional", EMOTIONAL_WISHES, 30, "EMOTIONAL_WISHES"),
    ("short", SHORT_WISHES, 36, "SHORT_WISHES"),
    ("captions", CAPTIONS_WISHES, 24, "CAPTIONS_WISHES"),
    ("business", BUSINESS_WISHES, 24, "BUSINESS_WISHES"),
]

EXPECTED_EXISTING_IDS = [
    "wish-shloka-1", "wish-shloka-2", "wish-shloka-3",
    "wish-trad-1", "wish-trad-2",
    "wish-family-1", "wish-family-2", "wish-family-3",
    "wish-friends-1", "wish-friends-2",
    "wish-love-1", "wish-love-2",
    "wish-prof-1", "wish-prof-2",
    "wish-short-1", "wish-short-2",
    "wish-caption-1", "wish-caption-2"
]

all_wishes = []
category_counts = {}
ids_seen = set()
text_en_seen = set()
text_hi_seen = set()

errors = []

for cat_id, items, expected_count, const_name in CATEGORIES:
    if len(items) != expected_count:
        errors.append(f"Category '{cat_id}' expected {expected_count} items, found {len(items)}")
    category_counts[cat_id] = len(items)

    for item in items:
        # Validate ID
        wid = item["id"]
        if wid in ids_seen:
            errors.append(f"Duplicate ID found: '{wid}'")
        ids_seen.add(wid)

        # Validate unique text
        t_en = item["textEn"].strip()
        t_hi = item["textHi"].strip()
        if t_en in text_en_seen:
            errors.append(f"Duplicate textEn found in '{wid}': {t_en[:40]}...")
        text_en_seen.add(t_en)

        if t_hi in text_hi_seen:
            errors.append(f"Duplicate textHi found in '{wid}': {t_hi[:40]}...")
        text_hi_seen.add(t_hi)

        # Validate fields
        for field in ["id", "festivalId", "category", "categoryLabelEn", "categoryLabelHi", "textEn", "textHi"]:
            if not item.get(field):
                errors.append(f"Missing required field '{field}' in wish '{wid}'")

        all_wishes.append(item)

# Check total count
if len(all_wishes) != 300:
    errors.append(f"Total wishes expected: 300, found: {len(all_wishes)}")

# Check all 18 existing IDs are present
for eid in EXPECTED_EXISTING_IDS:
    if eid not in ids_seen:
        errors.append(f"Missing expected existing ID: '{eid}'")

if errors:
    print("VALIDATION FAILED:")
    for err in errors:
        print("  -", err)
    sys.exit(1)

print("VALIDATION SUCCESSFUL!")
print(f"Total wishes: {len(all_wishes)}")
print("Category counts:")
for cat_id, count in category_counts.items():
    print(f"  {cat_id}: {count}")

# Generate TypeScript files
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "wishes")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def to_ts_item(item):
    lines = ["  {"]
    lines.append(f"    id: {json.dumps(item['id'])},")
    lines.append(f"    festivalId: {json.dumps(item['festivalId'])},")
    lines.append(f"    category: {json.dumps(item['category'])},")
    lines.append(f"    categoryLabelEn: {json.dumps(item['categoryLabelEn'])},")
    lines.append(f"    categoryLabelHi: {json.dumps(item['categoryLabelHi'])},")
    if "headlineEn" in item:
        lines.append(f"    headlineEn: {json.dumps(item['headlineEn'])},")
    if "headlineHi" in item:
        lines.append(f"    headlineHi: {json.dumps(item['headlineHi'])},")
    if "shloka" in item:
        lines.append(f"    shloka: {json.dumps(item['shloka'])},")
    if "meaningEn" in item:
        lines.append(f"    meaningEn: {json.dumps(item['meaningEn'])},")
    if "meaningHi" in item:
        lines.append(f"    meaningHi: {json.dumps(item['meaningHi'])},")
    lines.append(f"    textEn: {json.dumps(item['textEn'])},")
    lines.append(f"    textHi: {json.dumps(item['textHi'])},")
    if "authorOrSourceEn" in item:
        lines.append(f"    authorOrSourceEn: {json.dumps(item['authorOrSourceEn'])},")
    if "authorOrSourceHi" in item:
        lines.append(f"    authorOrSourceHi: {json.dumps(item['authorOrSourceHi'])},")
    if "tags" in item:
        lines.append(f"    tags: {json.dumps(item['tags'])},")
    lines.append("  },")
    return "\n".join(lines)

for cat_id, items, _, const_name in CATEGORIES:
    file_path = os.path.join(OUTPUT_DIR, f"{cat_id}.ts")
    content = "import type { WishMessage } from '../types';\n\n"
    content += f"export const {const_name}: WishMessage[] = [\n"
    for it in items:
        content += to_ts_item(it) + "\n"
    content += "];\n"

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {len(items)} wishes to {file_path}")

# Write master src/data/wishes.ts
MASTER_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "data", "wishes.ts")
master_content = """import type { WishMessage } from './types';
import { TRADITIONAL_WISHES } from './wishes/traditional';
import { FAMILY_WISHES } from './wishes/family';
import { FRIENDS_WISHES } from './wishes/friends';
import { LOVE_WISHES } from './wishes/love';
import { PROFESSIONAL_WISHES } from './wishes/professional';
import { FUNNY_WISHES } from './wishes/funny';
import { EMOTIONAL_WISHES } from './wishes/emotional';
import { SHORT_WISHES } from './wishes/short';
import { CAPTIONS_WISHES } from './wishes/captions';
import { BUSINESS_WISHES } from './wishes/business';

export {
  TRADITIONAL_WISHES,
  FAMILY_WISHES,
  FRIENDS_WISHES,
  LOVE_WISHES,
  PROFESSIONAL_WISHES,
  FUNNY_WISHES,
  EMOTIONAL_WISHES,
  SHORT_WISHES,
  CAPTIONS_WISHES,
  BUSINESS_WISHES,
};

/**
 * FestiveWala Curated Wishes Repository
 * Exactly 300 unique wishes across 10 categories.
 */
export const WISHES_DATA: WishMessage[] = [
  ...TRADITIONAL_WISHES,   // 30
  ...FAMILY_WISHES,        // 36
  ...FRIENDS_WISHES,       // 36
  ...LOVE_WISHES,          // 30
  ...PROFESSIONAL_WISHES,  // 30
  ...FUNNY_WISHES,         // 24
  ...EMOTIONAL_WISHES,     // 30
  ...SHORT_WISHES,         // 36
  ...CAPTIONS_WISHES,      // 24
  ...BUSINESS_WISHES,      // 24
];
"""

with open(MASTER_PATH, "w", encoding="utf-8") as f:
    f.write(master_content)
print(f"Master file updated: {MASTER_PATH} with {len(all_wishes)} wishes.")

