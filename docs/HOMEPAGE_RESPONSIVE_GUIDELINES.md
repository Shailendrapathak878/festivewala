# FestiveWala — Homepage Responsive & Mobile-First Design Guidelines
**Phase 2: Complete Premium Animated Homepage Implementation**  
**Document Version:** 2.0.0  
**Status:** Approved & Verified

---

## 1. Mobile-First Philosophy

In alignment with user research across Indian consumer digital behavior, **over 80% of festive card sharing, greeting copy actions, and social messages originate on smartphone devices**.

Therefore, FestiveWala does **not** design for desktop and scale down. Every component, card, button, and navigation layer is designed, authored, and QA-verified at **360px base width first**, before progressively enhancing for tablets and widescreen displays.

```
Smartphone First (360px – 430px)
       ↓
Small Tablet / Portrait (768px – 820px)
       ↓
Landscape Tablet / Small Laptop (1024px – 1280px)
       ↓
Desktop & Ultra-wide (1366px – 1920px+)
```

---

## 2. Breakpoint System

FestiveWala adheres to standard Tailwind CSS responsive boundaries, applied strictly from mobile upward:

| Breakpoint | Minimum Width | Target Device Archetypes | Layout Characteristics |
|---|---|---|---|
| **Default (Base)** | `0px – 639px` | iPhone SE, iPhone 14/15, Samsung Galaxy S23, Pixel 8 | Single column vertical stack, full-width touch cards, fixed bottom CTA pads, full-screen overlay menus. |
| **`sm`** | `640px` | Large smartphones in landscape, compact phablets | 2-column wish grids, compact dual-button layouts. |
| **`md`** | `768px` | iPad Mini, iPad Air portrait, Android tablets | 2-column festival discovery grid, horizontal countdown timer blocks, expanded header with direct nav links. |
| **`lg`** | `1024px` | iPad Pro, MacBook Air, small laptops | 3-column greeting showcases, featured split hero (content left, artwork right), inline editorial essays. |
| **`xl`** | `1280px` | Standard Desktop Displays, 1080p monitors | Maximum container constraint `max-w-7xl` (1280px), generous whitespace padding (`px-8`, `py-24`). |
| **`2xl`** | `1536px+` | High-DPI Desktop & 4K displays | Centered bounded container with subtle ambient decorative gradients. |

---

## 3. Strict Mobile Layout Rules

1. **Zero Horizontal Overflow:**
   - The body element must enforce `overflow-x: hidden`.
   - Elements with decorative ambient blurs (`w-72 h-72 rounded-full blur-3xl`) must be clipped by an explicit `overflow-hidden` container.
   - Text elements must never overflow; long titles wrap with `break-words` and `leading-tight`.
2. **Hero Composition Ordering on Mobile:**
   - **Text & CTAs First:** Headline, subtitle, and primary actions are immediately visible above the fold or on first gesture.
   - **Artwork Below CTAs:** On mobile, greeting card visual previews sit directly below the dual CTAs. This preserves the emotional visual anchor without pushing critical action triggers out of reach.
   - **Trust Indicators Anchored:** The three luxury trust badges (`Bespoke Typography`, `Instant Sharing`, `Ad-Free Heritage`) sit directly beneath the card preview, closing the hero with high credibility.
3. **Minimum Touch Targets (44 × 44px):**
   - Every interactive element (buttons, tabs, language switcher, icon triggers) must have a tap target of at least `44 × 44px` on touch devices.
   - Secondary icon buttons utilize `p-2.5` or `p-3` with min-dimensions to guarantee effortless finger taps without misfires.
4. **Fluid Typography Scaling:**

| Element | Mobile (`<640px`) | Tablet (`md`) | Desktop (`lg`+) |
|---|---|---|---|
| **Hero Headline** | `text-3xl` (30px / 1.15) | `text-4xl` (36px / 1.2) | `text-5xl` to `text-6xl` (48px–60px / 1.1) |
| **Section Headings** | `text-2xl` (24px) | `text-3xl` (30px) | `text-4xl` (36px) |
| **Card Titles** | `text-lg` (18px) | `text-xl` (20px) | `text-xl` (20px) |
| **Body Copy** | `text-sm` (14px / 1.6) | `text-base` (16px / 1.6) | `text-base` (16px / 1.65) |
| **Pill Badges** | `text-xs` (12px) | `text-xs` (12px) | `text-xs` (12px) |

---

## 4. Modal & Overlay Safe-Area Guidelines

1. **Mobile Menu:**
   - Full viewport slide-in panel (`fixed inset-0 z-50 bg-[#24113D]`).
   - Clean dismissal via high-contrast gold close button (`p-3`).
   - Disables window body scroll when active to prevent background slippage.
2. **Detail & Reading Dialogs:**
   - On mobile: bottom-sheet or full-width modal with `max-h-[85vh]` and `overflow-y-auto`.
   - On desktop: centered dialog box with backdrop blur (`backdrop-blur-md bg-black/60`).

---

## 5. Viewport Verification Checklist

| Viewport | Width × Height | Tested Aspect | Result |
|---|---|---|---|
| Small Smartphone | `360 × 800` | Header padding, countdown digit wrapping, touch targets | PASS |
| Standard Smartphone | `390 × 844` | Hero artwork height, wish card action bar, toast placement | PASS |
| Large Smartphone | `430 × 932` | Editorial card spacing, modal dialog dimensions | PASS |
| Tablet Portrait | `768 × 1024` | 2-column grid transitions, countdown timer horizontal layout | PASS |
| Tablet Landscape | `1024 × 768` | 3-column studio grid, split hero alignment | PASS |
| Desktop HD | `1440 × 900` | Fullpage scroll behavior, typography legibility, nav links | PASS |

