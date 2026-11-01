# -*- coding: utf-8 -*-
"""
Phase 5 Wishes Generator: Compiles the 300 existing wishes and generates 200 brand new bilingual wishes
to achieve exactly 500 unique wishes across 10 categories.
"""

import os
import re
import json

WISHES_DIR = "src/data/wishes"

# 1. Inspect existing 300 wishes
EXISTING_CATEGORIES = [
    ("traditional", "traditional.ts", 30),
    ("family", "family.ts", 36),
    ("friends", "friends.ts", 36),
    ("love", "love.ts", 30),
    ("professional", "professional.ts", 30),
    ("funny", "funny.ts", 24),
    ("emotional", "emotional.ts", 30),
    ("short", "short.ts", 36),
    ("captions", "captions.ts", 24),
    ("business", "business.ts", 24),
]

print("Ready to generate 200 new wishes.")

