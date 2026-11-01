# FestiveWala — Design System Specification (Phase 1)

## 1. Typography Hierarchy

FestiveWala pairs an architectural sans-serif for UI clarity, an editorial serif for royal titles, and an authentic Devanagari font for Hindi celebrations.

### Font Families
* **Primary Sans:** `Plus Jakarta Sans`, system-ui, sans-serif
* **Display Serif:** `Cinzel`, `Playfair Display`, serif
* **Editorial Serif:** `Playfair Display`, Georgia, serif
* **Hindi Devanagari:** `Noto Sans Devanagari`, sans-serif

### Type Scale & Hierarchy

| Role | Font Family | Size (Mobile -> Desktop) | Weight | Leading | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline** | `Cinzel` / `Playfair` | `2.25rem` (36px) -> `4.5rem` (72px) | Bold (700) | 1.12 | `-0.02em` |
| **Section Heading** | `Cinzel` | `1.75rem` (28px) -> `2.5rem` (40px) | Bold (700) | 1.18 | `-0.01em` |
| **Card Heading** | `Playfair Display` | `1.25rem` (20px) -> `1.5rem` (24px) | SemiBold (600) | 1.25 | `normal` |
| **Body Large** | `Plus Jakarta Sans` | `1.0rem` (16px) -> `1.125rem` (18px) | Regular (400) | 1.65 | `normal` |
| **Body Regular** | `Plus Jakarta Sans` | `0.875rem` (14px) -> `1.0rem` (16px) | Regular (400) | 1.6 | `normal` |
| **Eyebrow / Label** | `Plus Jakarta Sans` | `0.75rem` (12px) | Bold (700) | 1.0 | `0.22em` (widest) |
| **Caption / Meta** | `Plus Jakarta Sans` | `0.6875rem` (11px) -> `0.75rem` (12px) | Medium (500) | 1.4 | `0.05em` |

### Hindi Devanagari Formatting Rules
* Line heights for Devanagari are increased by `10-15%` compared to Latin text to prevent clipping of upper and lower vowel matras (*मात्राएँ*).
* Body size is maintained at minimum `15px` on mobile for optimal glyph legibility.

---

## 2. Elevation, Borders & Glassmorphism

### Shadow System
* **`shadow-royal`:** `0 12px 32px -8px rgba(36, 17, 61, 0.28)` — deep grounded elevation for dark hero surfaces.
* **`shadow-gold-glow`:** `0 0 25px -5px rgba(212, 175, 55, 0.30)` — luminous warmth around gold buttons and featured cards.
* **`shadow-card-luxury`:** `0 4px 20px -2px rgba(36, 17, 61, 0.05)` — subtle tactile lift for editorial cards.
* **`shadow-card-luxury-hover`:** `0 20px 40px -6px rgba(36, 17, 61, 0.12)` — smooth floating elevation upon hover.

### Border Accents
* **`border-gold-subtle`:** `rgba(212, 175, 55, 0.25)` — thin architectural framing.
* **`border-gold-glow`:** `rgba(212, 175, 55, 0.50)` with `box-shadow: 0 0 15px rgba(212, 175, 55, 0.15)`.

### Glassmorphism
* **Light Glass (`glass-card-light`):** `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)`.
* **Dark Glass (`glass-card-dark`):** `rgba(36, 17, 61, 0.88)` with `backdrop-filter: blur(16px)`.

---

## 3. Responsive Breakpoints

| Key | Width | Target Devices | Design Consideration |
| :--- | :--- | :--- | :--- |
| `mobileSmall` | `360px` | Compact Android phones | Tight padding, stacked buttons, compact logo |
| `mobileMedium`| `375px` | Standard iPhone SE | Balanced font sizes, touch targets >= 48px |
| `mobileStandard`| `390px` | Modern iPhone 13/14/15 | Standard mobile baseline |
| `mobileLarge` | `430px` | iPhone Pro Max, Galaxy Ultra | Fluid typography scaling |
| `tablet` | `768px` | iPad Mini, Portrait tablets | 2-column grids, inline navigation transition |
| `desktopSmall`| `1024px`| Small laptops, Landscape tablets| Desktop navigation active, 3-column grids |
| `desktopMedium`|`1366px`| Standard laptops | Full editorial margins |
| `desktopLarge`| `1440px`| High-res monitors | Max container width `1280px` (`max-w-7xl`) |
| `desktopWide` | `1920px`| Ultrawide desktop | Centered container, generous bilateral margins |

---

## 4. Accessibility & Inclusive Design (WCAG 2.1 AA)

1. **Color Contrast:**
   * Text Dark (`#21182A`) on Warm Ivory (`#FAF7F0`) achieves **14.2:1** (exceeds AAA requirement).
   * Pure White (`#FFFFFF`) on Deep Purple (`#24113D`) achieves **16.5:1** (exceeds AAA requirement).
   * Champagne Gold (`#F2D98B`) on Deep Purple (`#24113D`) achieves **11.4:1** (exceeds AAA requirement).
2. **Keyboard Navigation:**
   * High-contrast focus rings (`outline: 2px solid #D4AF37; outline-offset: 3px`) on all interactive buttons, links, and switches.
3. **Screen Readers:**
   * Semantic HTML structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
   * Explicit `aria-label`, `aria-expanded`, and `aria-controls` on mobile drawers and language toggles.
   * `aria-live="polite"` on loading states.

