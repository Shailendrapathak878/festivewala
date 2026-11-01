import os
import json

QA_DIR = "artifacts/qa/phase-5"
os.makedirs(QA_DIR, exist_ok=True)
os.makedirs(os.path.join(QA_DIR, "screenshots"), exist_ok=True)

print("Phase 5 QA directory initialized.")

