# -*- coding: utf-8 -*-
"""
Compile 500 Unique Bilingual Wishes for FestiveWala Phase 5
Preserves 300 existing wishes and adds 200 brand new wishes across 10 categories.
"""

import os
import sys
import re
import json

# Ensure scripts dir is on sys.path
sys.path.insert(0, os.path.abspath("scripts"))

from new_wishes_traditional import NEW_TRADITIONAL
from new_wishes_family import NEW_FAMILY
from new_wishes_friends import NEW_FRIENDS
from new_wishes_love import NEW_LOVE
from new_wishes_professional import NEW_PROFESSIONAL
from new_wishes_funny import NEW_FUNNY
from new_wishes_emotional import NEW_EMOTIONAL
from new_wishes_short import NEW_SHORT
from new_wishes_captions import NEW_CAPTIONS
from new_wishes_business import NEW_BUSINESS

WISHES_DIR = "src/data/wishes"

CATEGORY_CONFIG = [
    {
        "cat": "traditional",
        "file": "traditional.ts",
        "var_name": "TRADITIONAL_WISHES",
        "existing_target": 30,
        "new_target": 20,
        "total_target": 50,
        "new_list": NEW_TRADITIONAL,
        "default_tone": "traditional",
        "default_recipients": ["elders", "family", "general"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "family",
        "file": "family.ts",
        "var_name": "FAMILY_WISHES",
        "existing_target": 36,
        "new_target": 24,
        "total_target": 60,
        "new_list": NEW_FAMILY,
        "default_tone": "heartwarming",
        "default_recipients": ["family", "mother", "father", "brother", "sister"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "friends",
        "file": "friends.ts",
        "var_name": "FRIENDS_WISHES",
        "existing_target": 36,
        "new_target": 24,
        "total_target": 60,
        "new_list": NEW_FRIENDS,
        "default_tone": "heartwarming",
        "default_recipients": ["friends", "best-friend"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "love",
        "file": "love.ts",
        "var_name": "LOVE_WISHES",
        "existing_target": 30,
        "new_target": 20,
        "total_target": 50,
        "new_list": NEW_LOVE,
        "default_tone": "romantic",
        "default_recipients": ["partner", "husband/wife"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "professional",
        "file": "professional.ts",
        "var_name": "PROFESSIONAL_WISHES",
        "existing_target": 30,
        "new_target": 20,
        "total_target": 50,
        "new_list": NEW_PROFESSIONAL,
        "default_tone": "professional",
        "default_recipients": ["colleagues", "teachers"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "funny",
        "file": "funny.ts",
        "var_name": "FUNNY_WISHES",
        "existing_target": 24,
        "new_target": 16,
        "total_target": 40,
        "new_list": NEW_FUNNY,
        "default_tone": "funny",
        "default_recipients": ["friends", "brother", "sister", "colleagues"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "emotional",
        "file": "emotional.ts",
        "var_name": "EMOTIONAL_WISHES",
        "existing_target": 30,
        "new_target": 20,
        "total_target": 50,
        "new_list": NEW_EMOTIONAL,
        "default_tone": "emotional",
        "default_recipients": ["family", "friends", "elders", "general"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "short",
        "file": "short.ts",
        "var_name": "SHORT_WISHES",
        "existing_target": 36,
        "new_target": 24,
        "total_target": 60,
        "new_list": NEW_SHORT,
        "default_tone": "simple",
        "default_recipients": ["general", "friends", "family"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "captions",
        "file": "captions.ts",
        "var_name": "CAPTIONS_WISHES",
        "existing_target": 24,
        "new_target": 16,
        "total_target": 40,
        "new_list": NEW_CAPTIONS,
        "default_tone": "cute",
        "default_recipients": ["general", "friends"],
        "default_festivals": ["diwali", "general-festive"]
    },
    {
        "cat": "business",
        "file": "business.ts",
        "var_name": "BUSINESS_WISHES",
        "existing_target": 24,
        "new_target": 16,
        "total_target": 40,
        "new_list": NEW_BUSINESS,
        "default_tone": "professional",
        "default_recipients": ["customers", "colleagues"],
        "default_festivals": ["diwali", "general-festive"]
    },
]

def parse_existing_ts_file(filepath, cat_info):
    """
    Parses existing objects from TypeScript file.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Find array content between [ ... ]
    start = content.find("[")
    end = content.rfind("]")
    if start == -1 or end == -1:
        raise ValueError(f"Could not find array in {filepath}")
    
    array_content = content[start+1:end]

    # Split by object boundaries: `{` followed by `id:`
    raw_blocks = re.split(r'\n\s*\{', array_content)
    parsed_items = []

    for block in raw_blocks:
        b = block.strip()
        if not b or not ('id:' in b):
            continue
        if not b.startswith('{'):
            b = '{' + b
        if b.endswith(','):
            b = b[:-1].strip()
        if not b.endswith('}'):
            b = b + '}'

        # Parse fields using regex
        def get_field(pat):
            m = re.search(pat, b, re.DOTALL)
            return m.group(1).strip() if m else None

        item_id = get_field(r'id:\s*["\']([^"\']+)["\']')
        festival_id = get_field(r'festivalId:\s*["\']([^"\']+)["\']') or "diwali"
        category = get_field(r'category:\s*["\']([^"\']+)["\']') or cat_info["cat"]
        category_label_en = get_field(r'categoryLabelEn:\s*["\']([^"\']+)["\']') or "Festival Wish"
        category_label_hi = get_field(r'categoryLabelHi:\s*["\']([^"\']+)["\']') or "शुभकामना"
        headline_en = get_field(r'headlineEn:\s*["\']([^"\']+)["\']')
        headline_hi = get_field(r'headlineHi:\s*["\']([^"\']+)["\']')
        shloka = get_field(r'shloka:\s*["\']([^"\']+)["\']')
        meaning_en = get_field(r'meaningEn:\s*["\']([^"\']+)["\']')
        meaning_hi = get_field(r'meaningHi:\s*["\']([^"\']+)["\']')
        text_en = get_field(r'textEn:\s*["\']([^"\']+)["\']')
        text_hi = get_field(r'textHi:\s*["\']([^"\']+)["\']')
        author_en = get_field(r'authorOrSourceEn:\s*["\']([^"\']+)["\']')
        author_hi = get_field(r'authorOrSourceHi:\s*["\']([^"\']+)["\']')

        # Tags
        tags_m = re.search(r'tags:\s*\[(.*?)\]', b, re.DOTALL)
        tags = []
        if tags_m:
            raw_tags = tags_m.group(1)
            tags = re.findall(r'["\']([^"\']+)["\']', raw_tags)

        # Infer length based on text_en word count
        words = len((text_en or "").split())
        length_val = "short" if words <= 14 else ("medium" if words <= 28 else "long")

        item = {
            "id": item_id,
            "festivalId": festival_id,
            "festivalIds": [festival_id, "general-festive"],
            "category": category,
            "categoryLabelEn": category_label_en,
            "categoryLabelHi": category_label_hi,
            "headlineEn": headline_en,
            "headlineHi": headline_hi,
            "textEn": text_en,
            "textHi": text_hi,
            "authorOrSourceEn": author_en,
            "authorOrSourceHi": author_hi,
            "shloka": shloka,
            "meaningEn": meaning_en,
            "meaningHi": meaning_hi,
            "tags": tags if tags else [category, festival_id],
            "recipientTypes": cat_info["default_recipients"],
            "tone": cat_info["default_tone"],
            "length": length_val,
            "dateAdded": "2026-11-01"
        }
        parsed_items.append(item)

    return parsed_items

all_500_wishes = []
category_stats = {}

for cat_info in CATEGORY_CONFIG:
    fpath = os.path.join(WISHES_DIR, cat_info["file"])
    existing_items = parse_existing_ts_file(fpath, cat_info)
    print(f"Loaded {len(existing_items)} existing items from {cat_info['file']} (target {cat_info['existing_target']})")
    assert len(existing_items) == cat_info["existing_target"], f"Mismatch in {cat_info['file']}: got {len(existing_items)}, expected {cat_info['existing_target']}"

    new_items = cat_info["new_list"]
    print(f"Adding {len(new_items)} new items for {cat_info['cat']} (target {cat_info['new_target']})")
    assert len(new_items) == cat_info["new_target"], f"Mismatch in new items for {cat_info['cat']}: got {len(new_items)}, expected {cat_info['new_target']}"

    combined = existing_items + new_items
    assert len(combined) == cat_info["total_target"], f"Mismatch total for {cat_info['cat']}: got {len(combined)}, expected {cat_info['total_target']}"

    all_500_wishes.extend(combined)
    category_stats[cat_info["cat"]] = {
        "existing": len(existing_items),
        "new": len(new_items),
        "total": len(combined),
        "var_name": cat_info["var_name"],
        "file": cat_info["file"]
    }

    # Generate updated TypeScript file content
    ts_code = 'import type { WishMessage } from "../types";\n\n'
    ts_code += f'export const {cat_info["var_name"]}: WishMessage[] = [\n'

    for w in combined:
        ts_code += '  {\n'
        ts_code += f'    id: {json.dumps(w["id"])},\n'
        ts_code += f'    festivalId: {json.dumps(w["festivalId"])},\n'
        ts_code += f'    festivalIds: {json.dumps(w.get("festivalIds", ["diwali"]))},\n'
        ts_code += f'    category: {json.dumps(w["category"])},\n'
        ts_code += f'    categoryLabelEn: {json.dumps(w["categoryLabelEn"])},\n'
        ts_code += f'    categoryLabelHi: {json.dumps(w["categoryLabelHi"])},\n'
        if w.get("headlineEn"):
            ts_code += f'    headlineEn: {json.dumps(w["headlineEn"])},\n'
        if w.get("headlineHi"):
            ts_code += f'    headlineHi: {json.dumps(w["headlineHi"])},\n'
        if w.get("shloka"):
            ts_code += f'    shloka: {json.dumps(w["shloka"])},\n'
        if w.get("meaningEn"):
            ts_code += f'    meaningEn: {json.dumps(w["meaningEn"])},\n'
        if w.get("meaningHi"):
            ts_code += f'    meaningHi: {json.dumps(w["meaningHi"])},\n'
        ts_code += f'    textEn: {json.dumps(w["textEn"])},\n'
        ts_code += f'    textHi: {json.dumps(w["textHi"])},\n'
        if w.get("authorOrSourceEn"):
            ts_code += f'    authorOrSourceEn: {json.dumps(w["authorOrSourceEn"])},\n'
        if w.get("authorOrSourceHi"):
            ts_code += f'    authorOrSourceHi: {json.dumps(w["authorOrSourceHi"])},\n'
        ts_code += f'    tags: {json.dumps(w.get("tags", []))},\n'
        ts_code += f'    recipientTypes: {json.dumps(w.get("recipientTypes", []))},\n'
        ts_code += f'    tone: {json.dumps(w.get("tone", "heartwarming"))},\n'
        ts_code += f'    length: {json.dumps(w.get("length", "medium"))},\n'
        ts_code += f'    dateAdded: {json.dumps(w.get("dateAdded", "2026-11-01"))},\n'
        ts_code += '  },\n'

    ts_code += '];\n'

    with open(fpath, "w", encoding="utf-8") as out_f:
        out_f.write(ts_code)
    print(f"Updated {fpath} with {len(combined)} wishes.")

print(f"\n==========================================")
print(f"TOTAL WISHES COMPILED: {len(all_500_wishes)}")
print(f"==========================================")
assert len(all_500_wishes) == 500, f"Expected 500 wishes, got {len(all_500_wishes)}"

# Verify uniqueness of IDs
ids = [w["id"] for w in all_500_wishes]
unique_ids = set(ids)
assert len(ids) == len(unique_ids), f"Duplicate IDs found! Total: {len(ids)}, Unique: {len(unique_ids)}"
print(f"ID Uniqueness Check: 500/500 unique IDs verified!")

# Verify text non-emptiness
for w in all_500_wishes:
    assert w["textEn"] and len(w["textEn"].strip()) > 5, f"Empty textEn in {w['id']}"
    assert w["textHi"] and len(w["textHi"].strip()) > 5, f"Empty textHi in {w['id']}"
print(f"Bilingual Text Check: 500/500 English & Hindi texts valid and non-empty!")

# Update src/data/wishes.ts comment & exports
wishes_ts_content = """import type { WishMessage } from './types';
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
 * Exactly 500 unique wishes across 10 categories (Phase 5).
 */
export const WISHES_DATA: WishMessage[] = [
  ...TRADITIONAL_WISHES,   // 50
  ...FAMILY_WISHES,        // 60
  ...FRIENDS_WISHES,       // 60
  ...LOVE_WISHES,          // 50
  ...PROFESSIONAL_WISHES,  // 50
  ...FUNNY_WISHES,         // 40
  ...EMOTIONAL_WISHES,     // 50
  ...SHORT_WISHES,         // 60
  ...CAPTIONS_WISHES,      // 40
  ...BUSINESS_WISHES,      // 40
];
"""

with open("src/data/wishes.ts", "w", encoding="utf-8") as f:
    f.write(wishes_ts_content)
print("Updated src/data/wishes.ts with 500 total wishes.")

# Write JSON files for Section 13 maintainability
json_payload = []
for w in all_500_wishes:
    json_payload.append({
        "id": w["id"],
        "category": w["category"],
        "categoryLabelEn": w["categoryLabelEn"],
        "categoryLabelHi": w["categoryLabelHi"],
        "festivalId": w["festivalId"],
        "festivalIds": w.get("festivalIds", [w["festivalId"]]),
        "recipientTypes": w.get("recipientTypes", ["general"]),
        "tone": w.get("tone", "heartwarming"),
        "length": w.get("length", "medium"),
        "englishText": w["textEn"],
        "hindiText": w["textHi"],
        "headlineEn": w.get("headlineEn"),
        "headlineHi": w.get("headlineHi"),
        "shloka": w.get("shloka"),
        "meaningEn": w.get("meaningEn"),
        "meaningHi": w.get("meaningHi"),
        "tags": w.get("tags", []),
        "dateAdded": w.get("dateAdded", "2026-11-01")
    })

with open("src/data/wishes/wishes.json", "w", encoding="utf-8") as f:
    json.dump(json_payload, f, ensure_ascii=False, indent=2)
print("Saved src/data/wishes/wishes.json (500 records)")

# Categories metadata
categories_json = [
    {"id": "family", "nameEn": "Family Wishes", "nameHi": "पारिवारिक मंगल", "count": 60, "icon": "Users"},
    {"id": "friends", "nameEn": "Friends Wishes", "nameHi": "मित्र व साथी", "count": 60, "icon": "Sparkles"},
    {"id": "short", "nameEn": "Short & Sweet Wishes", "nameHi": "संक्षिप्त व मधुर", "count": 60, "icon": "MessageCircle"},
    {"id": "traditional", "nameEn": "Traditional Wishes", "nameHi": "पारंपरिक वंदना", "count": 50, "icon": "Flame"},
    {"id": "love", "nameEn": "Love & Romantic Wishes", "nameHi": "प्रेम व आत्मीयता", "count": 50, "icon": "Heart"},
    {"id": "emotional", "nameEn": "Emotional Wishes", "nameHi": "भावुक व आत्मीय", "count": 50, "icon": "Feather"},
    {"id": "professional", "nameEn": "Professional Wishes", "nameHi": "कॉरपोरेट व व्यावसायिक", "count": 50, "icon": "Briefcase"},
    {"id": "funny", "nameEn": "Funny Wishes", "nameHi": "हास्य व मस्ती", "count": 40, "icon": "Smile"},
    {"id": "captions", "nameEn": "Social Media Captions", "nameHi": "सोशल मीडिया कैप्शन", "count": 40, "icon": "Hash"},
    {"id": "business", "nameEn": "Business & Customers Wishes", "nameHi": "व्यापार व ग्राहक", "count": 40, "icon": "Building2"}
]

with open("src/data/wishes/wish-categories.json", "w", encoding="utf-8") as f:
    json.dump(categories_json, f, ensure_ascii=False, indent=2)
print("Saved src/data/wishes/wish-categories.json")

# Metadata summary
metadata_json = {
    "totalWishes": 500,
    "existingPreserved": 300,
    "newlyAdded": 200,
    "categoriesCount": 10,
    "language": "bilingual (English & Hindi)",
    "categoryBreakdown": {c["id"]: c["count"] for c in categories_json},
    "recipients": [
        "family", "mother", "father", "brother", "sister",
        "friends", "best-friend", "partner", "husband/wife",
        "colleagues", "customers", "teachers", "general"
    ],
    "tones": [
        "emotional", "heartwarming", "romantic", "funny",
        "traditional", "professional", "respectful",
        "inspirational", "cute", "simple"
    ],
    "lengths": ["short", "medium", "long"],
    "festivals": ["diwali", "chath-puja", "bhai-dooj", "govardhan-puja", "dhanteras", "new-year", "general-festive"]
}

with open("src/data/wishes/wish-metadata.json", "w", encoding="utf-8") as f:
    json.dump(metadata_json, f, ensure_ascii=False, indent=2)
print("Saved src/data/wishes/wish-metadata.json")

