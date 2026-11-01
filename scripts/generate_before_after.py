# -*- coding: utf-8 -*-
"""Generates side-by-side before-and-after comparison sheets for Phase 4.1."""

import os
import shutil
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QA_DIR = os.path.join(BASE_DIR, "artifacts", "qa", "phase-4-1")
INITIAL_DIR = os.path.join(QA_DIR, "initial-audit")
FINAL_DIR = os.path.join(QA_DIR, "final-contact-sheets")
BEFORE_AFTER_DIR = os.path.join(QA_DIR, "before-after")
BRAIN_DIR = r"C:\Users\abhis\.gemini\antigravity\brain\63fca421-aaed-4c0a-b95f-26ad7a8666c1"

os.makedirs(BEFORE_AFTER_DIR, exist_ok=True)

CATEGORIES = [
    'premium-purple-gold',
    'traditional-indian',
    'modern-minimal',
    'floral-rangoli',
    'cute-creative',
    'corporate-professional',
    'family-friends',
    'story-special'
]

def create_comparison(cat):
    init_path = os.path.join(INITIAL_DIR, f"initial-category-{cat}.jpg")
    final_path = os.path.join(FINAL_DIR, f"final-category-{cat}.jpg")

    if not os.path.exists(init_path) or not os.path.exists(final_path):
        print(f"Skipping {cat}: missing initial or final image")
        return

    img_init = Image.open(init_path)
    img_final = Image.open(final_path)

    # Normalize heights if different
    target_h = max(img_init.height, img_final.height)
    if img_init.height != target_h:
        new_w = int(img_init.width * (target_h / img_init.height))
        img_init = img_init.resize((new_w, target_h), Image.Resampling.LANCZOS)
    if img_final.height != target_h:
        new_w = int(img_final.width * (target_h / img_final.height))
        img_final = img_final.resize((new_w, target_h), Image.Resampling.LANCZOS)

    header_h = 90
    gutter = 20
    comp_w = img_init.width + img_final.width + gutter
    comp_h = target_h + header_h

    comp = Image.new("RGB", (comp_w, comp_h), "#0B0414")
    draw = ImageDraw.Draw(comp)

    # Header bar
    draw.rectangle([0, 0, comp_w, header_h], fill="#150826")
    draw.rectangle([0, header_h - 2, comp_w, header_h], fill="#F2D98B")

    # Main titles
    draw.text((img_init.width // 2, 45), f"BEFORE: {cat.upper()} (Initial Baseline)", fill="#E06666", anchor="mm")
    draw.text((img_init.width + gutter + img_final.width // 2, 45), f"AFTER: {cat.upper()} (Phase 4.1 Transformed)", fill="#F2D98B", anchor="mm")

    # Paste panels
    comp.paste(img_init, (0, header_h))
    comp.paste(img_final, (img_init.width + gutter, header_h))

    out_filename = f"before-after-{cat}.jpg"
    out_path = os.path.join(BEFORE_AFTER_DIR, out_filename)
    comp.save(out_path, quality=88)
    print(f"Saved {out_filename} ({comp_w}x{comp_h})")

    # Brain copy
    if os.path.exists(BRAIN_DIR):
        brain_path = os.path.join(BRAIN_DIR, out_filename)
        shutil.copyfile(out_path, brain_path)

def create_master_comparison():
    init_path = os.path.join(INITIAL_DIR, "initial-100-contact-sheet.jpg")
    final_path = os.path.join(FINAL_DIR, "final-100-contact-sheet.jpg")

    if not os.path.exists(init_path) or not os.path.exists(final_path):
        print("Skipping master: missing initial or final master sheet")
        return

    img_init = Image.open(init_path)
    img_final = Image.open(final_path)

    # Scale both down to manageable web display width (1920 each, total ~3860)
    target_w = 1920
    ratio_init = target_w / img_init.width
    target_h_init = int(img_init.height * ratio_init)
    img_init = img_init.resize((target_w, target_h_init), Image.Resampling.LANCZOS)

    ratio_final = target_w / img_final.width
    target_h_final = int(img_final.height * ratio_final)
    img_final = img_final.resize((target_w, target_h_final), Image.Resampling.LANCZOS)

    target_h = max(target_h_init, target_h_final)
    header_h = 100
    gutter = 20
    comp_w = target_w * 2 + gutter
    comp_h = target_h + header_h

    comp = Image.new("RGB", (comp_w, comp_h), "#0B0414")
    draw = ImageDraw.Draw(comp)

    # Header bar
    draw.rectangle([0, 0, comp_w, header_h], fill="#150826")
    draw.rectangle([0, header_h - 2, comp_w, header_h], fill="#F2D98B")

    draw.text((target_w // 2, 50), "BEFORE: INITIAL 100 TEMPLATES (Procedural Baseline)", fill="#E06666", anchor="mm")
    draw.text((target_w + gutter + target_w // 2, 50), "AFTER: PHASE 4.1 MASTER COLLECTION (Atmospheric Luxury)", fill="#F2D98B", anchor="mm")

    comp.paste(img_init, (0, header_h))
    comp.paste(img_final, (target_w + gutter, header_h))

    out_filename = "master-before-after-100.jpg"
    out_path = os.path.join(BEFORE_AFTER_DIR, out_filename)
    comp.save(out_path, quality=85)
    print(f"Saved {out_filename} ({comp_w}x{comp_h})")

    if os.path.exists(BRAIN_DIR):
        brain_path = os.path.join(BRAIN_DIR, out_filename)
        shutil.copyfile(out_path, brain_path)

if __name__ == "__main__":
    print("Generating Before-and-After comparisons...")
    for c in CATEGORIES:
        create_comparison(c)
    create_master_comparison()
    print("All Before-and-After comparisons completed.")

