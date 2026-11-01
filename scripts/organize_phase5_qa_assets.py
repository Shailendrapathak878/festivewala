import os
import shutil

BRAIN_DIR = r"C:\Users\abhis\.gemini\antigravity\brain\63fca421-aaed-4c0a-b95f-26ad7a8666c1"
QA_DIR = "artifacts/qa/phase-5"

SCREENSHOTS = [
    (r"2852\media_0.png", "01-smart-wishes-generator-desktop.png"),
    (r"2858\media_0.png", "02-smart-wishes-generator-mobile.png"),
    (r"2864\media_0.png", "03-personalization-controls.png"),
    (r"2870\media_0.png", "04-generated-wish-results.png"),
    (r"2874\media_0.png", "05-english-wishes.png"),
    (r"2878\media_0.png", "06-hindi-wishes.png"),
    (r"2882\media_0.png", "07-category-and-tone-filters.png"),
    (r"2886\media_0.png", "08-favorites-page.png"),
    (r"2892\media_0.png", "09-whatsapp-sharing-interaction.png"),
    (r"2912\media_0.png", "10-empty-search-results.png"),
]

for step_rel, filename in SCREENSHOTS:
    src_path = os.path.join(BRAIN_DIR, ".system_generated", "steps", step_rel)
    if os.path.exists(src_path):
        # copy to artifacts/qa/phase-5/
        qa_dest = os.path.join(QA_DIR, filename)
        shutil.copy2(src_path, qa_dest)
        # copy to brain root
        brain_dest = os.path.join(BRAIN_DIR, filename)
        shutil.copy2(src_path, brain_dest)
        print(f"Copied {filename} ({os.path.getsize(src_path)} bytes)")
    else:
        print(f"Warning: {src_path} not found!")

print("All Phase 5 QA screenshots organized.")

