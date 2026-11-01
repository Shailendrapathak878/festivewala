# FestiveWala — SEO-Friendly Website & URL Architecture Plan

**Brand:** FestiveWala  
**Domain:** `festivewala.in`  
**Architecture Framework:** Flat, Topical, Semantic Hierarchy  
**Date:** November 2026  
**Auditor:** Principal Frontend Systems Architect & Technical SEO Lead  

---

## 1. Architectural Philosophy & URL Conventions

The primary purpose of FestiveWala's URL structure is to establish clear topical hierarchy, maximize crawl efficiency, and match search intent while strictly avoiding thin doorway pages.

### Canonical URL Rules:
1. **Root Domain:** All production URLs are hosted on `https://festivewala.in`.
2. **Path Casing:** Strictly lowercase alphanumeric strings separated by hyphens (kebab-case).
3. **Trailing Slashes:** Unified canonical convention without trailing slashes for standard React Router SPA paths (e.g. `/festivals/diwali`).
4. **Depth Limit:** Maximum URL hierarchy depth is kept to 2 levels (`/category/slug`) to prevent crawler drop-off and maintain link equity distribution.

---

## 2. Evaluation of Current vs. Future Target URL Architecture

```
CURRENT ARCHITECTURE (Phase 6 / 7.1)                PROPOSED EVOLUTION (Phase 7.2 & Future)
─────────────────────────────────────                ───────────────────────────────────────
/                                                    /
/festivals                                           /festivals
/festivals/:festivalId                               /festivals/:festivalId
/wishes                                              /wishes
  (in-page category pills & filters)                   ├── /wishes/:festivalId (e.g. /wishes/diwali)
                                                       └── /wishes/:category   (e.g. /wishes/family)
/greeting-cards                                      /greeting-cards
  (in-page ?mode=simple & ?mode=photo)                 ├── /greeting-cards/photo
                                                       └── /greeting-cards/:festivalId
/rangoli                                             /rangoli
  (in-page category pills)                             └── /rangoli/:category (e.g. /rangoli/peacock)
/decoration-ideas                                    /decoration-ideas
  (in-page category pills)                             └── /decoration-ideas/:category
/gift-ideas                                          /gift-ideas
  (in-page budget dropdowns)                           └── /gift-ideas/:category
/festival-guides                                     /festival-guides
/festival-guides/:guideId                            /festival-guides/:guideId
/inspiration (Legacy; recommend retire)               (301 Redirect to /festival-guides)
```

---

## 3. Comprehensive Route Specifications & Page Justification

### Route 1: `/` (Homepage)
- **Page Purpose:** Sovereign brand landing; introduces festival calendar, countdown timer, featured greetings, top wishes, and editorial inspiration.
- **Primary Search Intent:** Navigational & Broad Informational.
- **Primary Keyword:** *FestiveWala Indian festival celebration platform*
- **Secondary Keywords:** *Indian festival greetings*, *festival wishes in hindi*, *rangoli and decor ideas*
- **Target Language:** Bilingual (English & Hindi)
- **Required Content:** Hero banner, upcoming festival countdown, festival discovery grid, interactive card showcase, top wishes carousel, and final CTA.
- **Schema.org:** `WebSite` with `SearchAction`.
- **Justification:** Essential root domain.

---

### Route 2: `/festivals` (Festival Directory Hub)
- **Page Purpose:** Master index of all major Indian festivals with seasonal classification (Autumn/Winter, Spring/Summer) and quick discovery jump links.
- **Primary Search Intent:** Broad Informational / Navigational.
- **Primary Keyword:** *Indian festivals calendar 2026*
- **Secondary Keywords:** *list of indian festivals*, *hindu festival dates*, *tyohar kab hai*
- **Target Language:** Bilingual.
- **Required Content:** Seasonal filter tabs, trilingual search bar, quick hub cards (Rangoli, Decor, Gifts, Guides), and festival cards.
- **Internal Linking:** Links directly to all individual `/festivals/:festivalId` pages and all four experience hubs.
- **Justification:** Essential discovery pillar.

---

### Route 3: `/festivals/:festivalId` (Dedicated Festival Pillar Pages)
- **Current Live Slugs:** `diwali`, `holi`, `raksha-bandhan`, `christmas`, `new-year`.
- **Planned Additions:** `navratri`, `chhath-puja`, `makar-sankranti`, `maha-shivratri`.
- **Page Purpose:** Definitive, authoritative 360-degree celebration guide for an individual festival.
- **Primary Search Intent:** Informational & Inspirational.
- **Primary Keyword:** `[Festival Name] celebration, date and rituals` (e.g. *Diwali 2026 date and Lakshmi Puja muhurat*)
- **Secondary Keywords:** `[Festival Name] puja vidhi`, `[Festival Name] recipes`, `[Festival Name] history and lore`, `[Festival Name] faqs in hindi`
- **Target Language:** Bilingual with Trilingual FAQ section.
- **Required Content:** 8 dedicated sections: Hero Banner, About & Cultural Lore, Step-by-Step Traditions, Decor Ideas, Iconic Festive Recipes, Gift Ideas, Wishes & Studio Connect, Trilingual FAQs, and Related Discoveries.
- **Schema.org:** `Event` Schema and `FAQPage` Schema.
- **Justification:** Unquestionably justified. These are the core topical authority pillars of FestiveWala.

---

### Route 4: `/wishes` (Wishes Hub & Smart Generator)
- **Page Purpose:** Master repository of 500 curated, emotionally engaging wishes across 10 categories, plus custom Smart Generator tool and saved favorites.
- **Primary Search Intent:** Inspirational.
- **Primary Keyword:** *Festival wishes and quotes in Hindi and English*
- **Secondary Keywords:** *diwali ki shubhkamnaye*, *holi quotes*, *rakhi wishes for brother*, *festival status for whatsapp*
- **Target Language:** Bilingual (English & Hindi).
- **Required Content:** Tabbed layout (Readymade Wishes default, Custom Generator, Favorites), category pills (Family, Friends, Love, Traditional, etc.), copy & WhatsApp share buttons.
- **Justification:** Primary content destination for shareable text.
- **Phase 7.2 Enhancement Recommendation:** Introduce crawlable route parameters or sub-routes for high-demand clusters:
  - `/wishes/diwali` (Diwali wishes collection)
  - `/wishes/family` (Family relationship wishes)
  - *Crucial Rule:* Do NOT create deep thin routes like `/wishes/diwali/family/mother/short` (produces thin pages with only 2–3 items). Keep the maximum depth to `/wishes/:festivalId` or `/wishes/:category`.

---

### Route 5: `/greeting-cards` (Greeting Studio & Photo Wishes)
- **Page Purpose:** Interactive web application for designing personalized greeting cards using 100 templates or personal photo framing.
- **Primary Search Intent:** Commercial / Action-Oriented.
- **Primary Keyword:** *Online festival greeting card maker free*
- **Secondary Keywords:** *photo greeting card with name for whatsapp*, *diwali greeting card maker*, *apni photo wala tyohar card*
- **Target Language:** Bilingual.
- **Required Content:** Mode switcher (`?mode=simple` vs `?mode=photo`), relationship selector (14 relationships), template gallery, live canvas preview, text controls, and high-res PNG export.
- **Justification:** Primary interactive product.

---

### Route 6: `/rangoli` (Rangoli Art Gallery)
- **Page Purpose:** Curated showcase of 8 procedural vector Rangoli designs across 8 categories with difficulty ratings and free vector SVG / 1200x1200px PNG downloads.
- **Primary Search Intent:** Inspirational & Practical.
- **Primary Keyword:** *Rangoli designs simple and easy with dots*
- **Secondary Keywords:** *diwali rangoli designs*, *peacock rangoli patterns*, *kolam designs download*, *phoolon ki rangoli*
- **Target Language:** Bilingual.
- **Required Content:** Category pills, difficulty badges, materials checklist, step-by-step instructions, detail modals, and vector export buttons.
- **Justification:** High-intent visual celebration asset.

---

### Route 7: `/decoration-ideas` (Festival Home Decoration Hub)
- **Page Purpose:** Practical DIY festival decoration guides across 10 home areas (Entrance, Balcony, Living Room, etc.).
- **Primary Search Intent:** Inspirational & Informational.
- **Primary Keyword:** *Festival decoration ideas for home on a budget*
- **Secondary Keywords:** *diwali home decor*, *eco friendly flower decoration*, *balcony lighting ideas*, *toran making diy*
- **Target Language:** Bilingual.
- **Required Content:** 10 curated categories, time estimates, difficulty tags, required materials lists, step-by-step instructions, and expert styling tips.
- **Justification:** High-volume lifestyle & festive home search intent.

---

### Route 8: `/gift-ideas` (Festival Gifting Hub)
- **Page Purpose:** Curated gift recommendations across 10 relationship categories and 5 budget brackets (Under ₹250 to ₹2,500+).
- **Primary Search Intent:** Commercial Investigation.
- **Primary Keyword:** *Festival gift ideas for family and friends*
- **Secondary Keywords:** *diwali gifts under 500*, *rakhi gifts for sister*, *secret santa gifts*, *corporate festive hampers*
- **Target Language:** Bilingual.
- **Required Content:** Dual budget & recipient dropdown filters, price tier badges, gift rationale ("Why it's a great gift"), and personal touch DIY tips.
- **Justification:** High commercial value; serves users preparing to purchase gifts.

---

### Route 9: `/festival-guides` & `/festival-guides/:guideId`
- **Page Purpose:** Authoritative long-form cultural, environmental, and practical guides.
- **Primary Search Intent:** Informational.
- **Primary Keyword:** *Comprehensive festival celebration guides*
- **Secondary Keywords:** *diwali cleaning checklist*, *how to make herbal gulal*, *navratri fasting rules*
- **Live Guide Slugs:**
  1. `diwali-home-preparation`
  2. `organic-herbal-holi-colors`
  3. `navratri-traditions-rituals`
  4. `eco-friendly-green-festivals`
- **Required Content:** Reading times, interactive Table of Contents, structured H2/H3 headings, actionable tips checklists, key takeaways, and cross-links to related festival pages.
- **Schema.org:** `Article` Schema.
- **Justification:** Core vehicle for long-form topical authority and high-engagement reading sessions.

---

## 4. Deprecation & Redirect Strategy for Legacy Routes

### Route: `/inspiration`
- **Current Status:** Prototype preview route containing duplicate editorial content and an outdated Phase 1 notice.
- **Recommendation:** In Phase 7.2, remove `/inspiration` from the active navigation and configure a clean redirect to `/festival-guides`.
- **SEO Impact:** Eliminates internal keyword competition, removes user-confusing phase notices, and consolidates domain authority into the canonical guides hub.

