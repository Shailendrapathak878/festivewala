# FestiveWala — Technical Architecture (Phase 1)

## 1. Core Technology Stack

* **Core Framework:** React 19 (`react`, `react-dom`) with TypeScript.
* **Build Tooling:** Vite 8.3 (`@vitejs/plugin-react`).
* **Styling Engine:** Tailwind CSS 3.4 with custom theme extensions, PostCSS, and Autoprefixer.
* **Routing:** React Router 7 (`react-router-dom`).
* **Motion Library:** Framer Motion 12 (`framer-motion`).
* **Iconography:** Lucide React (`lucide-react`).
* **Typography:** Google Fonts (`Plus Jakarta Sans`, `Cinzel`, `Playfair Display`, `Noto Sans Devanagari`).

---

## 2. Directory Architecture & Scalability

```text
d:\FestiveWala/
├── docs/                             # Architecture, Design & QA Documentation
│   ├── BRAND_GUIDELINES.md
│   ├── DESIGN_SYSTEM.md
│   ├── ANIMATION_SYSTEM.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── COMPONENT_INVENTORY.md
│   └── PHASE_1_QA_REPORT.md
├── artifacts/
│   └── qa/
│       └── phase-1/                  # Automated & manual QA screenshots
├── public/
│   └── assets/
│       ├── brand/                    # Brand favicon and vectors
│       ├── patterns/                 # Reusable mandala and rangoli SVG patterns
│       └── illustrations/
└── src/
    ├── app/                          # App configuration & providers
    ├── assets/                       # Static bundled assets
    ├── components/
    │   ├── animation/                # Framer Motion components & variants
    │   ├── common/                   # Shared UI primitives (Buttons, Logo, Switchers)
    │   ├── design-system/            # Token definitions & scales
    │   ├── layout/                   # Header, Footer, Hero, Preview Sections
    │   └── navigation/               # Desktop & Mobile navigation bars
    ├── hooks/                        # Custom hooks (useLanguage, etc.)
    ├── i18n/                         # Scalable type-safe translations
    │   ├── translations/
    │   │   ├── en.ts
    │   │   └── hi.ts
    │   ├── LanguageContext.tsx
    │   └── types.ts
    ├── layouts/                      # Route layouts (RootLayout)
    ├── pages/                        # Page views (Home, Festivals, Cards, Wishes, 404)
    ├── routes/                       # Route definitions (AppRoutes)
    ├── styles/                       # Global CSS & Tailwind layers
    └── utils/                        # Shared utility functions
```

---

## 3. Scalable Internationalization (i18n) Engine

FestiveWala implements a **zero-dependency, fully type-safe translation architecture**:
1. **Strong Typing:** `TranslationDictionary` interface in `src/i18n/types.ts` enforces 100% key parity between English and Hindi. If any key is missing or misspelled in either language, TypeScript throws a compilation error.
2. **Context Persistence:** `LanguageProvider` syncs selection to `localStorage.getItem('festivewala_lang')` and automatically updates `<html lang="en|hi">` and body font classes.
3. **No Heavy External i18n Libraries:** Avoids 50KB+ runtime overhead of generic i18n libraries while delivering immediate, instantaneous switching.

---

## 4. Production Build & Bundle Metrics

* **Production Bundle Size:**
  * `dist/index.html`: `1.42 kB` (gzip: `0.71 kB`)
  * `dist/assets/index.css`: `30.72 kB` (gzip: `6.20 kB`)
  * `dist/assets/index.js`: `469.14 kB` (gzip: `146.60 kB`)
* **Build Time:** `1.03s` with full type-checking (`tsc -b`).
* **Console Errors / Warnings:** `0` (Zero).
* **Network Requests:** 100% `200 OK` (all fonts and SVGs loaded properly).

