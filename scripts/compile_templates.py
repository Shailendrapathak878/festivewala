# -*- coding: utf-8 -*-
"""Compiles and validates 100 Greeting Templates across 8 categories."""

import os
import sys
import json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from templates_existing import EXISTING_TEMPLATES
from templates_purple_gold import PURPLE_GOLD_TEMPLATES
from templates_traditional import TRADITIONAL_TEMPLATES
from templates_minimal import MINIMAL_TEMPLATES
from templates_floral import FLORAL_TEMPLATES
from templates_creative import CREATIVE_TEMPLATES
from templates_corporate import CORPORATE_TEMPLATES
from templates_family import FAMILY_TEMPLATES
from templates_story import STORY_TEMPLATES

# Expected category counts:
EXPECTED_COUNTS = {
    "premium-purple-gold": 18,
    "traditional-indian": 18,
    "modern-minimal": 14,
    "floral-rangoli": 14,
    "cute-creative": 10,
    "corporate-professional": 10,
    "family-friends": 8,
    "story-special": 8,
}

def main():
    print("=== FESTIVEWALA GREETING TEMPLATES COMPILER ===")
    
    # 1. Existing templates check
    print(f"Loaded existing templates: {len(EXISTING_TEMPLATES)}")
    existing_ids = {t["id"] for t in EXISTING_TEMPLATES}
    assert len(existing_ids) == 10, f"Expected 10 unique existing templates, got {len(existing_ids)}"
    
    # Collect all templates into their respective categories
    category_templates = {cat: [] for cat in EXPECTED_COUNTS}
    
    # Put existing templates in their categories
    for t in EXISTING_TEMPLATES:
        cat = t["category"]
        if cat not in category_templates:
            raise ValueError(f"Unknown existing template category: {cat}")
        category_templates[cat].append(t)
        
    # Append new templates
    for t in PURPLE_GOLD_TEMPLATES:
        category_templates["premium-purple-gold"].append(t)
    for t in TRADITIONAL_TEMPLATES:
        category_templates["traditional-indian"].append(t)
    for t in MINIMAL_TEMPLATES:
        category_templates["modern-minimal"].append(t)
    for t in FLORAL_TEMPLATES:
        category_templates["floral-rangoli"].append(t)
    for t in CREATIVE_TEMPLATES:
        category_templates["cute-creative"].append(t)
    for t in CORPORATE_TEMPLATES:
        category_templates["corporate-professional"].append(t)
    for t in FAMILY_TEMPLATES:
        category_templates["family-friends"].append(t)
    for t in STORY_TEMPLATES:
        category_templates["story-special"].append(t)

    # 2. Validate counts per category
    total_count = 0
    all_templates = []
    all_ids = set()

    for cat, expected in EXPECTED_COUNTS.items():
        actual = len(category_templates[cat])
        print(f"Category '{cat}': {actual}/{expected} templates")
        if actual != expected:
            raise ValueError(f"Category '{cat}' mismatch: expected {expected}, got {actual}")
        total_count += actual
        for t in category_templates[cat]:
            tid = t["id"]
            if tid in all_ids:
                raise ValueError(f"Duplicate template ID found: '{tid}'")
            all_ids.add(tid)
            all_templates.append(t)

    print(f"\nTotal templates verified: {total_count} (Unique IDs: {len(all_ids)})")
    assert total_count == 100, f"Total templates must be exactly 100, got {total_count}"
    assert len(all_ids) == 100, "All 100 IDs must be distinct"

    # Verify all existing IDs are present
    for eid in existing_ids:
        assert eid in all_ids, f"Existing template '{eid}' missing from compiled dataset!"
    print("All 10 original templates confirmed preserved.")

    # 3. Validate structural fields
    required_keys = ["id", "name", "nameHi", "category", "categoryLabelEn", "categoryLabelHi",
                     "description", "descriptionHi", "festivalId", "supportedFormats",
                     "palette", "decorative", "defaultText", "qaStatus"]
    
    for t in all_templates:
        for k in required_keys:
            if k not in t:
                raise ValueError(f"Template '{t['id']}' missing key: '{k}'")
        if t["supportedFormats"] != ["square", "story", "portrait", "landscape"]:
            raise ValueError(f"Template '{t['id']}' invalid supportedFormats: {t['supportedFormats']}")
        if not t["name"].strip() or not t["nameHi"].strip():
            raise ValueError(f"Template '{t['id']}' missing English or Hindi name")
        if not t["defaultText"]["titleEn"].strip() or not t["defaultText"]["titleHi"].strip():
            raise ValueError(f"Template '{t['id']}' missing defaultText titles")

    print("All 100 templates passed structural integrity and bilingual checks.")

    # 4. Write modular TypeScript files
    out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "features", "greeting-studio", "data")
    templates_dir = os.path.join(out_dir, "templates")
    os.makedirs(templates_dir, exist_ok=True)

    file_mapping = {
        "premium-purple-gold": ("purpleGold.ts", "PURPLE_GOLD_TEMPLATES"),
        "traditional-indian": ("traditional.ts", "TRADITIONAL_TEMPLATES"),
        "modern-minimal": ("minimal.ts", "MINIMAL_TEMPLATES"),
        "floral-rangoli": ("floral.ts", "FLORAL_TEMPLATES"),
        "cute-creative": ("creative.ts", "CREATIVE_TEMPLATES"),
        "corporate-professional": ("corporate.ts", "CORPORATE_TEMPLATES"),
        "family-friends": ("family.ts", "FAMILY_TEMPLATES"),
        "story-special": ("story.ts", "STORY_TEMPLATES"),
    }

    for cat, (fname, varname) in file_mapping.items():
        fpath = os.path.join(templates_dir, fname)
        tmpls = category_templates[cat]
        ts_code = f"import type {{ GreetingTemplate }} from '../../types/template';\n\n"
        ts_code += f"export const {varname}: GreetingTemplate[] = "
        ts_code += json.dumps(tmpls, ensure_ascii=False, indent=2)
        ts_code += ";\n"
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(ts_code)
        print(f"Wrote {len(tmpls)} templates to {fname}")

    # 5. Write master templates.ts
    master_code = """import type { GreetingTemplate } from '../types/template';
import { PURPLE_GOLD_TEMPLATES } from './templates/purpleGold';
import { TRADITIONAL_TEMPLATES } from './templates/traditional';
import { MINIMAL_TEMPLATES } from './templates/minimal';
import { FLORAL_TEMPLATES } from './templates/floral';
import { CREATIVE_TEMPLATES } from './templates/creative';
import { CORPORATE_TEMPLATES } from './templates/corporate';
import { FAMILY_TEMPLATES } from './templates/family';
import { STORY_TEMPLATES } from './templates/story';

export const DIWALI_TEMPLATES: GreetingTemplate[] = [
  ...PURPLE_GOLD_TEMPLATES,
  ...TRADITIONAL_TEMPLATES,
  ...MINIMAL_TEMPLATES,
  ...FLORAL_TEMPLATES,
  ...CREATIVE_TEMPLATES,
  ...CORPORATE_TEMPLATES,
  ...FAMILY_TEMPLATES,
  ...STORY_TEMPLATES,
];

export const FESTIVALS_LIST = [
  { id: 'diwali', name: 'Diwali 2026', nameHi: 'दिवाली २०२६', status: 'available', templateCount: 100 },
  { id: 'chhath-puja', name: 'Chhath Puja', nameHi: 'छठ पूजा', status: 'coming-soon', templateCount: 0 },
  { id: 'christmas', name: 'Christmas', nameHi: 'क्रिसमस', status: 'coming-soon', templateCount: 0 },
  { id: 'new-year', name: 'New Year 2027', nameHi: 'नव वर्ष २०२७', status: 'coming-soon', templateCount: 0 },
  { id: 'makar-sankranti', name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', status: 'coming-soon', templateCount: 0 },
  { id: 'maha-shivratri', name: 'Maha Shivratri', nameHi: 'महाशिवरात्रि', status: 'coming-soon', templateCount: 0 },
  { id: 'holi', name: 'Holi 2027', nameHi: 'होली २०२७', status: 'coming-soon', templateCount: 0 },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', nameHi: 'रक्षाबंधन', status: 'coming-soon', templateCount: 0 },
];
"""
    master_path = os.path.join(out_dir, "templates.ts")
    with open(master_path, "w", encoding="utf-8") as f:
        f.write(master_code)
    print(f"Master templates.ts successfully compiled with 100 templates and updated FESTIVALS_LIST!")

if __name__ == "__main__":
    main()

