# FestiveWala — Festival-Aware Discovery & Priority System Report

**Date:** November 5, 2026  
**System Status:** Production Ready  
**Scope:** Dynamic Upcoming Festival Discovery, Priority Engine, 7-Day Automatic Countdown, Strict Festival Isolation in Greeting Studio & Wishes Hub  
**Test Suite Verdict:** 31 Passed / 0 Failed (100% Test Pass Rate)

---

## 1. Executive Summary

A scalable, single-source-of-truth **Festival Priority Engine** was implemented across FestiveWala. Prior to this implementation, festivals were hardcoded across several standalone components, Dhanteras was absent from the homepage carousel and countdown, Greeting Studio defaulted to Diwali, and wishes for different festivals were returned in an unstructured concatenation.

### Key Achievements
1. **Unified Priority Engine (`src/services/festivalPriorityEngine.ts`):** Calculates chronological festival priority, auto-promotes upcoming celebrations, handles timezones (`Asia/Kolkata`), checks feature availability, and enforces the 7-day countdown activation rule.
2. **Homepage Two-Festival Showcase (`CountdownSection.tsx`):** Dynamically displays the **next two upcoming festivals** (Priority 1: Dhanteras, Priority 2: Diwali in November 2026) with distinct cards, dynamic countdown timers, sacred tithis, and available feature links.
3. **Dynamic Hero Festival Carousel (`HeroFestivalCarousel.tsx`):** Integrated Dhanteras with custom SVG artwork (golden Kalash, coconut, mango leaves, and radiant coins) and Sanskrit benediction (`"Arogyam Dhana Sampada"`). Slides are sorted dynamically based on upcoming dates.
4. **7-Day Automatic Countdown Rule:** Countdown automatically runs seconds-level ticking when a festival is $\le 7$ days away. If $> 7$ days away, it displays an informative upcoming date status message. No click-to-start required.
5. **Greeting Studio Priority & Separation (`GreetingStudio.tsx`):** Opening `/greeting-cards` without parameters automatically displays Priority 1 templates (Dhanteras) in Section 1, and Priority 2 templates (Diwali) in Section 2 below it. Zero unstructured mixing. An "🌟 Upcoming First (Auto)" selector restores automatic prioritization.
6. **Wishes Section Strict Festival Isolation (`WishesShowcase.tsx`):** Dhanteras wishes appear first in the default view. Selecting Dhanteras shows exactly 100 Dhanteras wishes with zero Diwali bleed. Selecting Diwali shows 500 Diwali wishes with zero Dhanteras bleed.

---

## 2. Architecture & File Changes

| File | Type | Changes & Purpose |
| :--- | :--- | :--- |
| `src/services/festivalPriorityEngine.ts` | **New Service** | Centralized priority calculation, 7-day rule, feature catalog map, passed-festival pruning. |
| `src/data/festivals/festivalCalendar.ts` | **Updated Data** | Added authentic Vedic calendar entries for all 10 festivals with start/end ISO dates and timezones. |
| `src/components/layout/HeroFestivalCarousel.tsx` | **Updated Component** | Added Dhanteras slide, dynamic slide sorting via `getUpcomingFestivals()`, custom Kalash SVG, and Sanskrit motto. |
| `src/components/layout/CountdownSection.tsx` | **Updated Component** | Refactored into a responsive 2-festival showcase displaying Priority 1 and Priority 2 cards with dynamic countdowns and feature links. |
| `src/components/layout/FestivalDiscoverySection.tsx` | **Updated Component** | Dynamically spotlight Priority 1 festival; support Dhanteras dedicated route; dynamic days-remaining pill. |
| `src/components/festivals/FestivalCountdown.tsx` | **Updated Component** | Enforced 7-day countdown activation rule on festival detail pages. |
| `src/features/greeting-studio/components/GreetingStudio.tsx` | **Updated Component** | Default to upcoming priority ('auto'), distinct Section 1 (Priority 1) and Section 2 (Priority 2) gallery views. |
| `src/features/greeting-studio/components/FestivalSelector.tsx` | **Updated Component** | Added "🌟 Upcoming First (Auto)" pill to restore upcoming festival priority. |
| `src/components/layout/WishesShowcase.tsx` | **Updated Component** | Strict festival isolation, quick festival selection bar, upcoming priority ordering on initial load. |
| `tests/festival-discovery-priority.spec.ts` | **New Test Suite** | 7 automated tests verifying priority engine, simulated date progression, 7-day rule, Greeting Studio priority, and Wishes isolation. |
| `tests/capture-discovery-evidence.spec.ts` | **QA Evidence** | Automated capture of 5 visual validation screenshots across desktop and mobile. |

---

## 3. Dynamic Priority & 7-Day Countdown Rules

### Priority Progression Logic
```
Current Date: 2026-11-05 (Before Dhanteras)
  -> Priority 1: Dhanteras (Nov 6)
  -> Priority 2: Diwali (Nov 8)

Simulated Date: 2026-11-07 (After Dhanteras)
  -> Priority 1: Diwali (Nov 8)
  -> Priority 2: Chhath Puja (Nov 15)

Simulated Date: 2026-11-09 (After Diwali)
  -> Priority 1: Chhath Puja (Nov 15)
  -> Priority 2: Christmas (Dec 25)
```

### 7-Day Countdown Activation Rule
- $\text{Time remaining} \le 7 \times 24 \times 60 \times 60 \times 1000 \text{ ms}$: Dynamic 4-unit countdown grid (`Days : Hours : Minutes : Seconds`) with real-time second ticks.
- $\text{Time remaining} > 7 \text{ days}$: Informative card with scheduled celebration date and notification: *"Live countdown begins automatically 7 days prior to celebration."*
- $\text{Time is celebrating}$: Live celebration badge: *"✨ Sacred Celebration is Happening Now! ✨"*.
- $\text{Time has passed}$: Automatically promoted out of the upcoming array.

---

## 4. Strict Festival Isolation Verification

### Greeting Studio
- **Default View (`/greeting-cards`):**
  - Section 1: `🪙 Dhanteras 2026 (Priority 1 • Nearest Festival)` — 25 Simple & 10 Photo layouts.
  - Section 2: `🪔 Diwali 2026 (Priority 2 • Following Celebration)` — 100 Simple & 14 Photo layouts.
  - Result: 100% structured separation; zero cross-mixing.
- **Specific Festival Selection:**
  - Selecting `Dhanteras`: Displays only 25/25 Dhanteras simple and 10/10 Dhanteras photo templates.
  - Selecting `Diwali`: Displays only 100/100 Diwali simple and 14/14 Diwali photo templates.

### Wishes Showcase
- **Default View (`/wishes`):**
  - Dhanteras wishes (100 items) appear first.
  - Diwali wishes (500 items) appear next.
- **Specific Festival Selection:**
  - Selecting `Dhanteras`: Exactly 100 wishes. 0 Diwali wishes.
  - Selecting `Diwali`: Exactly 500 wishes. 0 Dhanteras wishes.
  - Filter by Tone, Recipient, and Category operates strictly within the active festival.

---

## 5. Automated Test Pass Matrix

```
Running 31 tests using 1 worker

  ok  1 [chromium] › tests/critical-photo-export.spec.ts (9.2s)
  ok  2 [chromium] › tests/dhanteras-festival-suite.spec.ts: Exact counts (780ms)
  ok  3 [chromium] › tests/dhanteras-festival-suite.spec.ts: Strict isolation (17ms)
  ok  4 [chromium] › tests/dhanteras-festival-suite.spec.ts: Calendar config (12ms)
  ok  5 [chromium] › tests/dhanteras-festival-suite.spec.ts: Detail page (1.2s)
  ok  6 [chromium] › tests/dhanteras-festival-suite.spec.ts: Greetings gallery (1.3s)
  ok  7 [chromium] › tests/dhanteras-festival-suite.spec.ts: Photo studio (1.2s)
  ok  8 [chromium] › tests/dhanteras-festival-suite.spec.ts: Wishes 100 count (1.1s)
  ok  9 [chromium] › tests/exact-viewports.spec.ts: 360x800 mobile-compact (6.2s)
  ok 10 [chromium] › tests/exact-viewports.spec.ts: 390x844 mobile-standard (6.4s)
  ok 11 [chromium] › tests/exact-viewports.spec.ts: 430x932 mobile-large (8.0s)
  ok 12 [chromium] › tests/exact-viewports.spec.ts: 768x1024 tablet-portrait (8.9s)
  ok 13 [chromium] › tests/exact-viewports.spec.ts: 1024x768 tablet-landscape (6.5s)
  ok 14 [chromium] › tests/exact-viewports.spec.ts: 1440x900 desktop-standard (9.9s)
  ok 15 [chromium] › tests/exact-viewports.spec.ts: 1920x1080 desktop-fullhd (5.6s)
  ok 16 [chromium] › tests/festival-discovery-priority.spec.ts: Priority ordering Nov 2026 (8ms)
  ok 17 [chromium] › tests/festival-discovery-priority.spec.ts: Date progression -> Diwali (7ms)
  ok 18 [chromium] › tests/festival-discovery-priority.spec.ts: Date progression -> Chhath (11ms)
  ok 19 [chromium] › tests/festival-discovery-priority.spec.ts: 7-Day Countdown rule (7ms)
  ok 20 [chromium] › tests/festival-discovery-priority.spec.ts: Homepage top 2 countdown cards (3.7s)
  ok 21 [chromium] › tests/festival-discovery-priority.spec.ts: Greeting Studio priority & isolation (6.9s)
  ok 22 [chromium] › tests/festival-discovery-priority.spec.ts: Wishes isolation & upcoming priority (6.0s)
  ok 23 [chromium] › tests/greeting-editor.spec.ts: Editing & text latency (3.1s)
  ok 24 [chromium] › tests/mobile-touch-gesture.spec.ts: Touch scroll vs drag separation (12.3s)
  ok 25 [chromium] › tests/navigation-and-language.spec.ts: Routes navigation (7.3s)
  ok 26 [chromium] › tests/navigation-and-language.spec.ts: Trilingual switcher (5.0s)
  ok 27 [chromium] › tests/signature-greetings.spec.ts: 100 templates verification (191ms)
  ok 28 [chromium] › tests/signature-greetings.spec.ts: Signature section rendering (7.2s)
  ok 29 [chromium] › tests/wishes-hub.spec.ts: Wishes library navigation (1.7s)
  ok 30 [chromium] › tests/wishes-hub.spec.ts: Smart generator (2.2s)
  ok 31 [chromium] › tests/capture-discovery-evidence.spec.ts: Visual QA captures (14.4s)

-------------------------------------------------------
Total Tests: 31 | Passed: 31 | Failed: 0 | Skipped: 0
Test Pass Rate: 100%
Build Time: 1.85s (0 TypeScript errors)
-------------------------------------------------------
```

---

## 6. QA Visual Evidence Artifacts

The following visual evidence files were captured and verified in `artifacts/qa/festival-discovery/`:

1. `01_homepage_hero_carousel_dhanteras.png` (494 KB) — Hero carousel actively displaying Dhanteras with Kalash artwork, date, and CTA links.
2. `02_homepage_countdown_two_festivals.png` (397 KB) — Desktop 2-column view of Priority 1 (Dhanteras) and Priority 2 (Diwali) countdown cards with live ticks and feature buttons.
3. `03_greeting_studio_auto_priority_view.png` (269 KB) — Greeting Studio in Auto mode rendering Section 1 (Dhanteras) and Section 2 (Diwali) separately.
4. `04_wishes_showcase_festival_priority.png` (144 KB) — Wishes Showcase displaying quick selector pills (`Upcoming Priority`, `Dhanteras (100)`, `Diwali (500)`) with Dhanteras wishes leading.
5. `05_mobile_countdown_two_festivals.png` (255 KB) — Mobile 390px viewport verifying responsive stacked layout of top 2 upcoming festival cards with zero horizontal overflow.

---

## 7. Sign-Off Verdict

**VERDICT: APPROVED & READY FOR PRODUCTION**  
The Festival Discovery & Priority Engine is completely integrated, tested across unit and browser automated suites, and strictly protects festival data isolation.

