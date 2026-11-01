import os
import base64
import math
import random
from PIL import Image, ImageDraw, ImageFilter

QA_BASE = "artifacts/qa/phase-4-3"
DIRS = [
    f"{QA_BASE}/layout-gallery",
    f"{QA_BASE}/test-photos",
    f"{QA_BASE}/single-portrait",
    f"{QA_BASE}/couple-celebration",
    f"{QA_BASE}/family-group",
    f"{QA_BASE}/friends-forever",
    f"{QA_BASE}/multi-collage",
    f"{QA_BASE}/full-photo-scrim",
    f"{QA_BASE}/modern-split",
    f"{QA_BASE}/traditional-jharokha",
    f"{QA_BASE}/export-verification",
    f"{QA_BASE}/browser-qa",
]

for d in DIRS:
    os.makedirs(d, exist_ok=True)
print("QA directories ready.")

def create_festive_test_photo(filename, width, height, title, mood="warm"):
    # Base background gradient
    img = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(img)

    if mood == "warm":
        c_top = (45, 12, 60)
        c_mid = (165, 52, 28)
        c_bot = (235, 150, 45)
    elif mood == "golden":
        c_top = (30, 20, 10)
        c_mid = (140, 95, 25)
        c_bot = (240, 195, 80)
    elif mood == "night":
        c_top = (10, 12, 35)
        c_mid = (30, 40, 85)
        c_bot = (120, 70, 110)
    elif mood == "vibrant":
        c_top = (65, 10, 45)
        c_mid = (185, 30, 70)
        c_bot = (255, 120, 50)
    else:
        c_top = (25, 15, 35)
        c_mid = (110, 45, 60)
        c_bot = (215, 130, 65)

    for y in range(height):
        t = y / float(height)
        if t < 0.5:
            st = t / 0.5
            r = int(c_top[0] * (1 - st) + c_mid[0] * st)
            g = int(c_top[1] * (1 - st) + c_mid[1] * st)
            b = int(c_top[2] * (1 - st) + c_mid[2] * st)
        else:
            st = (t - 0.5) / 0.5
            r = int(c_mid[0] * (1 - st) + c_bot[0] * st)
            g = int(c_mid[1] * (1 - st) + c_bot[1] * st)
            b = int(c_mid[2] * (1 - st) + c_bot[2] * st)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Bokeh / glowing light circles
    rng = random.Random(42 + len(title))
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)

    for _ in range(35):
        bx = rng.randint(0, width)
        by = rng.randint(0, height)
        brad = rng.randint(int(min(width, height) * 0.03), int(min(width, height) * 0.12))
        alpha = rng.randint(30, 110)
        gold_shade = rng.choice([
            (255, 235, 150, alpha),
            (255, 190, 80, alpha),
            (255, 140, 40, alpha),
            (255, 255, 220, alpha)
        ])
        odraw.ellipse([bx - brad, by - brad, bx + brad, by + brad], fill=gold_shade)

    # Blur overlay for bokeh feel
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=int(min(width, height) * 0.02)))
    img = Image.alpha_composite(img.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(img)

    # Draw festive silhouette or festive central glow
    cx = width // 2
    cy = int(height * 0.55)
    
    # Golden festive Diya or warm lantern glow in center
    diya_glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d_draw = ImageDraw.Draw(diya_glow)
    d_draw.ellipse([cx - width//4, cy - height//5, cx + width//4, cy + height//5], fill=(255, 210, 110, 90))
    diya_glow = diya_glow.filter(ImageFilter.GaussianBlur(radius=40))
    img = Image.alpha_composite(img, diya_glow)
    draw = ImageDraw.Draw(img)

    # Sparkler trails
    for _ in range(60):
        sx = cx + rng.randint(-int(width*0.35), int(width*0.35))
        sy = cy + rng.randint(-int(height*0.25), int(height*0.25))
        s_len = rng.randint(10, 40)
        ang = rng.uniform(0, math.pi * 2)
        ex = sx + s_len * math.cos(ang)
        ey = sy + s_len * math.sin(ang)
        draw.line([(sx, sy), (ex, ey)], fill=(255, 250, 210, 200), width=2)
        draw.ellipse([sx-3, sy-3, sx+3, sy+3], fill=(255, 255, 255, 230))

    # Label badge on bottom-left for QA clarity
    badge_w = int(width * 0.5)
    badge_h = 44
    draw.rectangle([20, height - badge_h - 20, 20 + badge_w, height - 20], fill=(15, 10, 25, 200))
    draw.rectangle([20, height - badge_h - 20, 20 + badge_w, height - 20], outline=(230, 180, 80), width=2)
    # Simple text
    draw.text((32, height - badge_h - 8), f"FESTIVEWALA TEST: {title}", fill=(255, 235, 190))

    # Final RGB conversion & save
    final_img = img.convert("RGB")
    path = f"{QA_BASE}/test-photos/{filename}"
    final_img.save(path, "JPEG", quality=95)
    print(f"Saved test photo: {path} ({width}x{height})")
    return path

# 1. Single Portrait
p1 = create_festive_test_photo("portrait_individual.jpg", 1200, 1600, "Single Portrait", "golden")
# 2. Couple Celebration
p2 = create_festive_test_photo("couple_festive.jpg", 1400, 1400, "Couple Celebration", "warm")
# 3. Family Moments (Wide Group)
p3 = create_festive_test_photo("family_group.jpg", 1920, 1080, "Family Moments Panoramic", "night")
# 4. Friends Forever
p4 = create_festive_test_photo("friends_gang.jpg", 1200, 1200, "Friends Sparklers", "vibrant")
# 5. Traditional Scenic
p5 = create_festive_test_photo("traditional_scenic.jpg", 1200, 1600, "Heritage Festive Scene", "warm")

# Also create base64 JSON catalog for browser automation
photo_catalog = {}
for fn in ["portrait_individual.jpg", "couple_festive.jpg", "family_group.jpg", "friends_gang.jpg", "traditional_scenic.jpg"]:
    fp = f"{QA_BASE}/test-photos/{fn}"
    with open(fp, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
        photo_catalog[fn] = f"data:image/jpeg;base64,{b64}"

import json
with open(f"{QA_BASE}/test-photos/test_photos_data.json", "w", encoding="utf-8") as f:
    json.dump(photo_catalog, f)
print("Base64 photo catalog saved for automated verification.")

