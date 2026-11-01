# FestiveWala — Component Inventory (Phase 1)

This document catalogs all reusable components built in Phase 1, their file locations, interfaces, and accessibility features.

---

## 1. Required Foundation Components (Section 7)

| # | Component | Location | Description & Props | Accessibility & Motion |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **`BrandLogo`** | `src/components/common/BrandLogo.tsx` | Handcrafted Diya + Lotus SVG emblem, wordmark, and tagline.<br>`variant?: 'dark' \| 'light' \| 'gold'`<br>`size?: 'sm' \| 'md' \| 'lg'`<br>`showTagline?: boolean` | `aria-label="FestiveWala Home"`, keyboard focus ring, scalable vector graphics. |
| 2 | **`Header`** | `src/components/layout/Header.tsx` | Sticky announcement strip + glassmorphism navigation bar. Responsive hamburger toggle. | `role="banner"`, `aria-expanded`, scroll listener with passive event listeners. |
| 3 | **`DesktopNavigation`** | `src/components/navigation/DesktopNavigation.tsx` | Horizontal navigation with active route gold underline indicators. | `aria-label="Main Navigation"`, `layoutId="activeNavIndicator"` spring animation. |
| 4 | **`MobileNavigation`** | `src/components/navigation/MobileNavigation.tsx` | Accessible slide-down drawer with full touch targets (>= 48px). | `aria-controls`, `AnimatePresence` height transition, keyboard navigation. |
| 5 | **`LanguageSwitcher`** | `src/components/common/LanguageSwitcher.tsx` | Fluid sliding pill toggle between English and Hindi. | `role="group"`, `aria-pressed`, spring physics layout animation. |
| 6 | **`PrimaryButton`** | `src/components/common/PrimaryButton.tsx` | Luxury button in royal deep purple or metallic gold gradient.<br>`variant?: 'royal' \| 'gold'`<br>`size?: 'sm' \| 'md' \| 'lg'`<br>`icon?: ReactNode` | `whileHover={{ y: -2 }}`, `whileTap={{ scale: 0.98 }}`, respects `prefers-reduced-motion`. |
| 7 | **`SecondaryButton`** | `src/components/common/SecondaryButton.tsx` | Refined ivory / gold border button with deep purple typography.<br>`variant?: 'ivory' \| 'glass'` | High contrast text, gold shimmer glow on hover, tactile tap feedback. |
| 8 | **`AnimatedSection`** | `src/components/animation/AnimatedSection.tsx` | Scroll-triggered reveal container.<br>`delay?: number`<br>`id?: string` | `whileInView`, `viewport: { once: true, margin: '-60px' }`, zero layout shifts. |
| 9 | **`SectionHeading`** | `src/components/common/SectionHeading.tsx` | Editorial title lockup with gold eyebrow badge, italic serif highlights, and flourish divider. | Semantic `<h2>`, balanced max-width line length for comfortable reading. |
| 10 | **`PageTransition`** | `src/components/animation/PageTransition.tsx` | Smooth page-level route transition container. | Subtle vertical translation (`y: 8 -> 0`), `0.35s` cap for snappy navigation. |
| 11 | **`Footer`** | `src/components/layout/Footer.tsx` | Rich deep purple footer with background mandala, brand bio, categorized links, and copyright. | Semantic `<footer>`, high-contrast text ratios exceeding WCAG AAA. |
| 12 | **`BackToTop`** | `src/components/common/BackToTop.tsx` | Floating gold action button triggered after 300px scroll. | Smooth window scrolling, `aria-label`, exit animation via `AnimatePresence`. |
| 13 | **`LoadingState`** | `src/components/common/LoadingState.tsx` | Luminous pulsating diya flame with rotating outer dashed ring. | `role="status"`, `aria-live="polite"`, localized loading message. |
| 14 | **`Custom404`** | `src/components/common/Custom404.tsx` | Sacred arch motif with dignified *"Sacred Path Not Found"* messaging and home button. | Clean recovery path, localized Hindi & English versions. |

---

## 2. Initial Visual Prototype Sections (Section 9)

| Section | Location | Key Design Elements |
| :--- | :--- | :--- |
| **Hero Section** | `src/components/layout/HeroSection.tsx` | Asymmetric 7-5 column layout, cultural eyebrow badge, dual CTAs, trust pillars, and royal illuminated Diwali card centerpiece with clay diya SVG. |
| **Festival Spotlight** | `src/components/layout/FestivalFeaturePreview.tsx` | Deep purple atmospheric showcase for **Diwali 2026**, authentic Sanskrit shloka card with Hindi/English translation, gold bullet points. |
| **Greeting Template Preview** | `src/components/layout/GreetingTemplatePreview.tsx` | Tactile card mockup of **The Sovereign Lotus Edition**, dual gold borders, corner floral rosettes, personalized signature, and action toolbar. |
| **Editorial Philosophy** | `src/components/layout/EditorialSection.tsx` | Editorial pull-quote in serif typography, 3 craftsmanship pillars (*Mindful Cultural Craft*, *Poetic Resonance*, *Architectural Simplicity*). |

