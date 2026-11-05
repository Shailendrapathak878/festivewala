# FestiveWala — Four Implementations Baseline & Architecture Report

**Document:** `docs/release/four-feature-baseline.md`  
**Date:** November 5, 2026  
**Auditor:** Principal Software Engineer & QA Architect  
**Repository:** `Shailendrapathak878/festivewala`  
**Hosting Target:** Cloudflare Pages (Static Hosting)  

---

## 1. Scope & Objective

This baseline audit establishes the initial architecture, state, and test baseline for the four implementations under release review:
1. **Implementation 1:** Complete Dhanteras Festival Experience (Listing, Countdown, 25 Greetings, 100 Wishes, 10 Photo Frames, 15 Gifts, 19-Section Cultural Guide).
2. **Implementation 2:** Greeting Details Input Performance (Controlled input responsiveness, Backspace latency, decoupled canvas rendering).
3. **Implementation 3:** Expanded Diwali Festival Blog (Historical, spiritual, and regional coverage across 12 chapters, 9,000+ words).
4. **Implementation 4:** Photo Greeting Touch/Scroll Interaction Fix (Explicit gesture separation between native mobile page scroll and canvas photo manipulation).

---

## 2. Codebase & Route Map Baseline

### Active Public Routes
| Route Path | Primary Component | Scope Implementation |
| :--- | :--- | :---: |
| `/` | `HomePage.tsx` | Core navigation & discovery |
| `/festivals` | `FestivalsPage.tsx` | Festival directory |
| `/festivals/dhanteras` | `FestivalDetailPage.tsx` + `DhanterasGuideArticle.tsx` | **Implementation 1** |
| `/festivals/diwali` | `FestivalDetailPage.tsx` + `DiwaliGuideArticle.tsx` | **Implementation 3** |
| `/greeting-cards` | `GreetingCardsPreviewPage.tsx` + `GreetingStudio.tsx` | **Implementation 2 & 4** |
| `/greetings/:festivalId` | `GreetingCardsPreviewPage.tsx` (Dhanteras / Diwali) | **Implementation 1 & 4** |
| `/photo-greetings/:festivalId` | `GreetingCardsPreviewPage.tsx` (`mode=photo`) | **Implementation 1 & 4** |
| `/wishes` | `WishesPreviewPage.tsx` + `WishesShowcase.tsx` | Global wishes hub |
| `/wishes/:festivalId` | `WishesPreviewPage.tsx` (Dhanteras 100 / Diwali 500) | **Implementation 1** |
| `/gift-ideas` | `GiftIdeasPage.tsx` | **Implementation 1** |
| `/festival-guides` | `FestivalGuidesPage.tsx` | Guides directory |
| `/rangoli` | `RangoliPage.tsx` | Rangoli showcase |
| `/decorations` | `DecorationsPage.tsx` | Home decor gallery |
| `/about`, `/contact`, `/terms`, `/privacy`, `/disclaimer` | Static informational pages | Compliance & trust |

---

## 3. Implementation Baselines

### Implementation 1 — Complete Dhanteras Festival Experience
- **Calendar Entry:** `FESTIVAL_CALENDAR.dhanteras` in [`src/data/festivals/festivalCalendar.ts`](file:///d:/FestiveWala/src/data/festivals/festivalCalendar.ts) with date `2026-11-06T18:00:00+05:30` (Asia/Kolkata).
- **Greetings Collection:** [`src/data/greetings/dhanterasGreetings.ts`](file:///d:/FestiveWala/src/data/greetings/dhanterasGreetings.ts) — exactly 25 templates with `festivalId: 'dhanteras'`.
- **Photo Templates:** [`src/data/greetings/dhanterasPhotoTemplates.ts`](file:///d:/FestiveWala/src/data/greetings/dhanterasPhotoTemplates.ts) — exactly 10 photo frames with `category: 'photo-studio'`.
- **Wishes Collection:** [`src/data/wishes/dhanterasWishes.ts`](file:///d:/FestiveWala/src/data/wishes/dhanterasWishes.ts) — exactly 100 wishes in 9 categories:
  - Family: 15
  - Friends: 15
  - Health & Happiness: 10
  - Wealth & Prosperity: 15
  - Traditional & Spiritual: 15
  - Professional & Corporate: 10
  - Short: 10
  - Emotional: 5
  - Captions: 5
- **Gift Ideas:** [`src/data/gifts/dhanterasGifts.ts`](file:///d:/FestiveWala/src/data/gifts/dhanterasGifts.ts) — exactly 15 curated items with `festivalId: 'dhanteras'`.
- **Comprehensive Guide:** [`src/components/festivals/DhanterasGuideArticle.tsx`](file:///d:/FestiveWala/src/components/festivals/DhanterasGuideArticle.tsx) — all 19 sections, interactive regional tabs, 8 trilingual FAQs, schema.org JSON-LD.
- **Repository Gateway:** [`src/data/festivals/festivalRepository.ts`](file:///d:/FestiveWala/src/data/festivals/festivalRepository.ts) — enforces strict separation via `getGreetingsByFestival`, `getPhotoTemplatesByFestival`, `getWishesByFestival`, `getGiftIdeasByFestival`.

### Implementation 2 — Greeting Details Input Performance
- **Input Architecture:** Controlled inputs in [`TextControls.tsx`](file:///d:/FestiveWala/src/features/greeting-studio/components/TextControls.tsx) wired to `useEditorHistory`.
- **State Management:** [`useEditorHistory.ts`](file:///d:/FestiveWala/src/features/greeting-studio/hooks/useEditorHistory.ts) immediately applies synchronous state changes to `present` state on keystrokes (`pushState(updates, immediate = false)`), while debouncing undo-stack snapshotting by 400ms.
- **Canvas Decoupling:** [`CanvasPreview.tsx`](file:///d:/FestiveWala/src/features/greeting-studio/components/CanvasPreview.tsx) debounces canvas redraw by 60ms with `requestAnimationFrame`, preventing expensive canvas rendering from blocking the main typing thread.

### Implementation 3 — Expanded Diwali Festival Blog
- **Component:** [`DiwaliGuideArticle.tsx`](file:///d:/FestiveWala/src/components/festivals/DiwaliGuideArticle.tsx) (1,496 lines, ~9,150 words).
- **Core Chapters:**
  1. What is Diwali (Deepavali) & light symbolism.
  2. Why we celebrate Diwali (Ayodhya, Lakshmi-Ganesh, Narakasura).
  3. Historical & cross-faith significance (Jain Mahavira Nirvana, Sikh Bandi Chhor Divas).
  4. The Five Sacred Days of Deepavali (Dhanteras, Choti Diwali, Lakshmi Puja, Govardhan Puja, Bhai Dooj).
  5. Domestic celebration customs (Deepdaan, Puja, Rangoli, Aarti).
  6. Regional celebrations across India (Ayodhya, Varanasi, Gujarat, Bengal Kali Puja, Tamil Nadu, Goa).
  7. Deeper spiritual philosophy of inner illumination.
  8. Traditional festive foods & sacred naivedyam.
  9. Eco-friendly celebrations & green alternatives.
  10. Family bonding & relationships.
  11. 10 verified scriptural & cultural facts.
  12. Trilingual FAQs with schema.org `FAQPage` markup.

### Implementation 4 — Photo Greeting Touch/Scroll Interaction Fix
- **Interaction Architecture:** Explicit gesture separation implemented in [`CanvasPreview.tsx`](file:///d:/FestiveWala/src/features/greeting-studio/components/CanvasPreview.tsx) and [`PhotoFramingAdjuster.tsx`](file:///d:/FestiveWala/src/features/greeting-studio/components/PhotoFramingAdjuster.tsx).
- **Default State:** `touch-action: pan-y` active. Normal touch scrolling scrolls the webpage; photo coordinates remain locked.
- **Reposition Mode:** User explicitly toggles `[ ✋ Reposition Photo ]` to engage `touch-action: none` with a 5px movement threshold before drag initialization. User taps `[ ✓ Done ]` to lock coordinates and restore normal scrolling.
- **Adjuster Gesture Filter:** In `PhotoFramingAdjuster.tsx`, `touch-action: pan-y` is applied, and vertical swipes on touch devices (`Math.abs(dy) > Math.abs(dx) * 1.4`) are recognized as page scrolls and suppressed from dragging.

---

## 4. Current Test Suite & Build Status

- **Automated Test Suites:** 23 tests configured in Playwright (`playwright.config.ts`):
  - `critical-photo-export.spec.ts` (1 test)
  - `dhanteras-festival-suite.spec.ts` (7 tests)
  - `exact-viewports.spec.ts` (7 tests)
  - `greeting-editor.spec.ts` (1 test)
  - `mobile-touch-gesture.spec.ts` (1 test)
  - `navigation-and-language.spec.ts` (2 tests)
  - `signature-greetings.spec.ts` (2 tests)
  - `wishes-hub.spec.ts` (2 tests)
- **Current Test Run:** 23 Passed / 0 Failed (100% pass rate).
- **Production Build:** `npm run build` runs `scripts/generate_sitemap.mjs`, `tsc -b`, and `vite build`. Successfully generates `dist/` with 29 canonical URLs in 2.5 seconds.

