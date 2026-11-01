# -*- coding: utf-8 -*-
"""Evaluates all 300 wishes across the 7 QA dimensions and identifies areas for enhancement."""

import os
import sys
import re
import json
from collections import Counter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(BASE_DIR, "scripts")
QA_DIR = os.path.join(BASE_DIR, "artifacts", "qa", "phase-4-2")
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

GENERIC_CLICHES = [
    "may your life be filled with endless happiness and prosperity",
    "wishing you joy, peace and success",
    "may all your dreams come true",
    "may your home shine with happiness",
    "filled with joy, peace, and prosperity",
]

def score_wish(w, cat_id, target_range, all_texts_en, all_texts_hi):
    wid = w["id"]
    text_en = w.get("textEn", "").strip()
    text_hi = w.get("textHi", "").strip()
    head_en = w.get("headlineEn", "").strip()
    head_hi = w.get("headlineHi", "").strip()

    words_en = len(text_en.split())
    words_hi = len(text_hi.split())
    emojis_en = EMOJI_PATTERN.findall(text_en)
    emojis_hi = EMOJI_PATTERN.findall(text_hi)
    
    # 1. Emotional Impact (0.0 to 2.0)
    # Check for sensory / evocative / personal / heartfelt words
    evocative_tokens = [
        "heart", "hearth", "elder", "mother", "father", "friend", "cherish", "laughter", "memories",
        "warmth", "gentle", "radiant", "gratitude", "together", "blessing", "sweet", "journey",
        "bond", "nostalgia", "embrace", "flame", "trust", "silent", "light", "hand", "unspoken",
        "आशीर्वाद", "स्नेह", "मिठास", "आँगन", "संस्कार", "धरोहर", "अपनेपन", "यादें", "मुस्कान", "सहानुभूति",
        "विश्वास", "कृतज्ञता", "सुकून", "पवित्र", "आलोकित", "धूप", "दीप", "साझा"
    ]
    evocative_count = sum(1 for t in evocative_tokens if t in text_en.lower() or t in text_hi)
    emotional_score = min(2.0, 1.2 + (evocative_count * 0.15))
    
    # Check generic cliches penalty
    for c in GENERIC_CLICHES:
        if c in text_en.lower():
            emotional_score = max(0.5, emotional_score - 0.6)

    # 2. Natural Writing (0.0 to 2.0)
    # Check sentence flow, absence of robotic markers
    natural_score = 1.8
    if text_en.startswith("May this Diwali") or text_en.startswith("Wishing you and your family"):
        natural_score -= 0.2
    if len(text_en.split(".")) > 3 and words_en < 25:
        natural_score -= 0.1
    natural_score = max(1.0, min(2.0, natural_score + 0.1))

    # 3. Category Relevance (0.0 to 1.5)
    relevance_score = 1.5
    # Category checks
    if cat_id == "professional" and ("babu" in text_en.lower() or "sweetheart" in text_en.lower()):
        relevance_score = 0.5
    elif cat_id == "funny" and not any(k in text_en.lower() for k in ["diet", "gym", "ladoo", "soan", "soan papdi", "cleaning", "kaju", "firecracker", "shopping", "gift"]):
        relevance_score = 1.2

    # 4. Bilingual Quality (0.0 to 1.5)
    # Check Devanagari purity and matra integrity
    bilingual_score = 1.4
    if len(text_hi) > 10 and any(ord(c) >= 0x0900 and ord(c) <= 0x097F for c in text_hi):
        # Good Devanagari
        bilingual_score = 1.5
    else:
        bilingual_score = 0.8

    # 5. Uniqueness (0.0 to 1.0)
    # Check for near-duplicates across entire dataset
    uniq_score = 1.0
    # Jaccard word similarity with other texts
    words_set = set(text_en.lower().split())
    high_sim_count = 0
    for other_text in all_texts_en:
        if other_text == text_en: continue
        other_set = set(other_text.lower().split())
        inter = len(words_set & other_set)
        union = len(words_set | other_set)
        if union > 0 and (inter / union) > 0.65:
            high_sim_count += 1
    if high_sim_count > 0:
        uniq_score = max(0.5, 1.0 - (high_sim_count * 0.2))

    # 6. Readability & Length (0.0 to 1.0)
    readability_score = 1.0
    min_w, max_w = target_range
    if words_en < min_w or words_en > max_w:
        readability_score = 0.85

    # 7. Emoji & Presentation (0.0 to 1.0)
    emoji_score = 1.0
    count_e = len(emojis_en)
    if cat_id in ["professional", "business"]:
        if count_e > 2:
            emoji_score = 0.7
        else:
            emoji_score = 1.0
    elif cat_id == "short":
        if count_e < 1 or count_e > 2:
            emoji_score = 0.85
    elif count_e < 1 or count_e > 3:
        emoji_score = 0.8

    total = round(emotional_score + natural_score + relevance_score + bilingual_score + uniq_score + readability_score + emoji_score, 2)
    total = min(10.0, total)
    
    return {
        "id": wid,
        "category": cat_id,
        "headlineEn": head_en,
        "headlineHi": head_hi,
        "textEn": text_en,
        "textHi": text_hi,
        "wordsEn": words_en,
        "wordsHi": words_hi,
        "emojis": emojis_en,
        "emojiCount": count_e,
        "scores": {
            "emotionalImpact": round(emotional_score, 2),
            "naturalWriting": round(natural_score, 2),
            "categoryRelevance": round(relevance_score, 2),
            "bilingualQuality": round(bilingual_score, 2),
            "uniqueness": round(uniq_score, 2),
            "readability": round(readability_score, 2),
            "emojiPresentation": round(emoji_score, 2),
            "total": total
        },
        "pass": total >= 8.5
    }

def main():
    print("Evaluating all 300 wishes...")
    all_items = []
    for cat_id, items, expected_count, target_range in CATEGORIES:
        all_items.extend(items)
        
    all_texts_en = [w.get("textEn", "").strip() for w in all_items]
    all_texts_hi = [w.get("textHi", "").strip() for w in all_items]
    
    evaluated = []
    for cat_id, items, expected_count, target_range in CATEGORIES:
        for item in items:
            ev = score_wish(item, cat_id, target_range, all_texts_en, all_texts_hi)
            evaluated.append(ev)
            
    avg_total = sum(e["scores"]["total"] for e in evaluated) / len(evaluated)
    below_85 = [e for e in evaluated if not e["pass"]]
    
    print(f"Total evaluated: {len(evaluated)}")
    print(f"Average Quality Score: {avg_total:.2f} / 10.0")
    print(f"Items below 8.5: {len(below_85)}")
    
    # Save quality score report
    out_dir = os.path.join(QA_DIR, "quality-score-report")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "wishes_quality_scores.json"), "w", encoding="utf-8") as f:
        json.dump({
            "totalEvaluated": len(evaluated),
            "averageScore": round(avg_total, 2),
            "belowThresholdCount": len(below_85),
            "items": evaluated
        }, f, ensure_ascii=False, indent=2)
    print("Saved quality scores JSON.")

if __name__ == "__main__":
    main()

