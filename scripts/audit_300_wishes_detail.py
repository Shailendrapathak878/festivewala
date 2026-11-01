# -*- coding: utf-8 -*-
"""Comprehensive initial audit of all 300 wishes for Phase 4.2."""

import os
import re
import json
from collections import Counter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(BASE_DIR, "scripts")
QA_DIR = os.path.join(BASE_DIR, "artifacts", "qa", "phase-4-2", "initial-content-audit")
os.makedirs(QA_DIR, exist_ok=True)

import sys
sys.path.append(SCRIPTS_DIR)
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
    ("family", FAMILY_WISHES, 36, (20, 40)),
    ("friends", FRIENDS_WISHES, 36, (20, 40)),
    ("love", LOVE_WISHES, 30, (20, 45)),
    ("professional", PROFESSIONAL_WISHES, 30, (20, 40)),
    ("funny", FUNNY_WISHES, 24, (15, 35)),
    ("emotional", EMOTIONAL_WISHES, 30, (25, 45)),
    ("short", SHORT_WISHES, 36, (8, 20)),
    ("traditional", TRADITIONAL_WISHES, 30, (20, 40)),
    ("captions", CAPTIONS_WISHES, 24, (10, 35)),
    ("business", BUSINESS_WISHES, 24, (20, 40)),
]

EMOJI_PATTERN = re.compile(
    r'[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50]|[\u3030]|[\u00a9\u00ae]'
)

CLICHE_PATTERNS = [
    r"may your life be filled with",
    r"wishing you joy, peace and success",
    r"may all your dreams come true",
    r"may your home shine with",
    r"wishing you and your family a very happy diwali",
    r"filled with happiness and prosperity",
    r"health, wealth, and prosperity",
]

def analyze_wish(w, cat_id, target_range):
    wid = w["id"]
    text_en = w.get("textEn", "").strip()
    text_hi = w.get("textHi", "").strip()
    
    words_en = len(text_en.split())
    words_hi = len(text_hi.split())
    
    emojis_en = EMOJI_PATTERN.findall(text_en)
    emojis_hi = EMOJI_PATTERN.findall(text_hi)
    
    # Cliche detection
    cliches_found = []
    text_en_lower = text_en.lower()
    for cp in CLICHE_PATTERNS:
        if re.search(cp, text_en_lower):
            cliches_found.append(cp)
            
    # Word count check
    min_w, max_w = target_range
    length_status = "Optimal"
    if words_en < min_w:
        length_status = f"Too Short ({words_en} < {min_w})"
    elif words_en > max_w:
        length_status = f"Too Long ({words_en} > {max_w})"
        
    return {
        "id": wid,
        "category": cat_id,
        "wordsEn": words_en,
        "wordsHi": words_hi,
        "emojiCountEn": len(emojis_en),
        "emojiCountHi": len(emojis_hi),
        "emojis": emojis_en,
        "cliches": cliches_found,
        "lengthStatus": length_status,
        "headlineEn": w.get("headlineEn", ""),
        "headlineHi": w.get("headlineHi", ""),
        "textEn": text_en,
        "textHi": text_hi,
    }

def run_audit():
    all_audit_items = []
    category_summaries = {}
    total_cliches = 0
    all_openings = []
    
    for cat_id, items, expected_count, target_range in CATEGORIES:
        cat_items = []
        for item in items:
            analysis = analyze_wish(item, cat_id, target_range)
            cat_items.append(analysis)
            all_audit_items.append(analysis)
            if analysis["cliches"]:
                total_cliches += len(analysis["cliches"])
            
            # Record first 4 words of English
            first_words = " ".join(analysis["textEn"].split()[:3]).lower()
            all_openings.append(first_words)
            
        avg_w_en = sum(a["wordsEn"] for a in cat_items) / len(cat_items)
        avg_w_hi = sum(a["wordsHi"] for a in cat_items) / len(cat_items)
        avg_emojis = sum(a["emojiCountEn"] for a in cat_items) / len(cat_items)
        
        category_summaries[cat_id] = {
            "count": len(cat_items),
            "expectedCount": expected_count,
            "targetRange": f"{target_range[0]}-{target_range[1]} words",
            "avgWordsEn": round(avg_w_en, 1),
            "avgWordsHi": round(avg_w_hi, 1),
            "avgEmojis": round(avg_emojis, 1),
            "clicheCount": sum(len(a["cliches"]) for a in cat_items),
            "lengthIssues": sum(1 for a in cat_items if a["lengthStatus"] != "Optimal")
        }

    # Count repeated openings
    opening_counts = Counter(all_openings).most_common(10)

    # Save JSON summary
    summary_data = {
        "totalAudited": len(all_audit_items),
        "categories": category_summaries,
        "commonOpenings": opening_counts,
        "totalClichesFound": total_cliches,
        "items": all_audit_items
    }
    
    with open(os.path.join(QA_DIR, "initial_content_audit.json"), "w", encoding="utf-8") as f:
        json.dump(summary_data, f, ensure_ascii=False, indent=2)

    # Generate Markdown Report
    md_lines = [
        "# FestiveWala — Phase 4.2 Initial Wishes & Messages Content Audit",
        "",
        "## Executive Summary",
        f"- **Total Messages Audited**: {len(all_audit_items)} / 300",
        "- **Categories Audited**: 10 distinct festive categories",
        f"- **Total Cliché Formulations Detected**: {total_cliches}",
        "- **Target**: Transform every message to authentic, emotionally engaging, literary-grade copy with natural Devanagari Hindi and purposeful emoji usage.",
        "",
        "---",
        "",
        "## 1. Category-Wise Distribution & Metrics",
        "",
        "| Category | Count | Target Range | Avg Words (EN) | Avg Words (HI) | Avg Emojis | Clichés Flagged | Length Outliers |",
        "| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |"
    ]
    
    for cat_id, s in category_summaries.items():
        md_lines.append(
            f"| **{cat_id.capitalize()}** | {s['count']} | {s['targetRange']} | {s['avgWordsEn']} | {s['avgWordsHi']} | {s['avgEmojis']} | {s['clicheCount']} | {s['lengthIssues']} |"
        )
    md_lines.append(f"| **TOTAL** | **{len(all_audit_items)}** | — | — | — | — | **{total_cliches}** | — |")
    
    md_lines.extend([
        "",
        "---",
        "",
        "## 2. Repetitive Formula & Opening Analysis",
        "",
        "Top repetitive message openings identified across the baseline dataset:",
        ""
    ])
    for opening, cnt in opening_counts:
        md_lines.append(f"- `\"{opening}...\"`: used **{cnt} times**")
        
    md_lines.extend([
        "",
        "---",
        "",
        "## 3. Key Weaknesses & Transformation Directives",
        "",
        "1. **Elevate from Functional Wishes to Evocative Storytelling**:",
        "   - Replace formulaic wishes with sensory imagery: clay diyas flickering on terracotta ledges, roasted cardamom kaju katli, courtyard chalk rangolis, marigold garlands, childhood sparkler nostalgia, silent elder blessings.",
        "2. **Natural, Heart-Touching Hindi (Devanagari)**:",
        "   - Eliminate translated-sounding syntax. Replace stiff Hindi with warm, conversational Hindustani and culturally deep expressions (e.g. 'घर का आँगन', 'बड़ों का आशीष', 'बचपन की यादें', 'मिठास', 'अटूट विश्वास').",
        "3. **Emoji Restraint & Purposeful Placement**:",
        "   - Strictly restrict to 1–3 meaningful emojis per message, placed naturally at sentence ends or transitional pauses rather than clustering or interrupting syntax.",
        "4. **Preserve Original 18 Messages with Literary Polish**:",
        "   - Retain IDs (`wish-shloka-1..3`, `wish-trad-1..2`, `wish-family-1..3`, `wish-friends-1..2`, `wish-love-1..2`, `wish-prof-1..2`, `wish-short-1..2`, `wish-caption-1..2`) and enhance their emotional depth and rhythmic cadence."
    ])

    report_path = os.path.join(QA_DIR, "INITIAL_300_WISHES_AUDIT.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))
    print(f"Wrote audit report to {report_path}")

if __name__ == "__main__":
    run_audit()

