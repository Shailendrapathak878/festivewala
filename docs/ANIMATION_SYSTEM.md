# FestiveWala — Animation & Motion Design System (Phase 1)

## 1. Motion Principles

FestiveWala views motion not as decorative noise, but as **digital hospitality**. Just as a traditional Indian host receives guests with grace and warmth, our animations should welcome, guide, and delight users without causing friction or delay.

### The Four Guardrails:
1. **Dignified & Subtle:** No playful elastic bounces, no chaotic flying confetti, and no perpetual spinning elements. Motion must convey the serene dignity of a temple lamp flame.
2. **Performant & Lightweight:** We avoid heavy Canvas particle engines or WebGL bloat. All animations use GPU-accelerated CSS transforms (`translate3d`, `scale`, `opacity`).
3. **Respect for Preferences:** Every motion variant listens to `prefers-reduced-motion: reduce`. Users with vestibular sensitivity receive instant transitions (`duration: 0.01ms`).
4. **Snappy Navigation:** Route and page transitions are strictly capped at `0.35s` to maintain crisp, immediate response times.

---

## 2. Easing Curves & Timings

```typescript
export const EASINGS = {
  luxuryEase: [0.22, 1, 0.36, 1], // Custom smooth ease-out (fluid deceleration)
  gentleEase: [0.4, 0, 0.2, 1],   // Material-like balanced curve
  snappyEase: [0.25, 0.1, 0.25, 1], // Instant micro-interactions
};
```

| Movement Type | Duration | Easing | Purpose |
| :--- | :--- | :--- | :--- |
| **Page Transition** | `0.35s` | `luxuryEase` | Subtle vertical translation (`y: 8 -> 0`) and fade. |
| **Section Scroll Reveal** | `0.60s` | `luxuryEase` | Triggers once at 60px viewport threshold. |
| **Button Tap / Click** | `0.18s` | `snappyEase` | Immediate tactile feedback (`scale: 0.98`). |
| **Card Hover Lift** | `0.30s` | `luxuryEase` | Elevates `-6px` with softened shadow. |
| **Ambient Diya Pulse** | `4.00s` | `easeInOut` | Gentle floating respiration (`y: [-3, 3, -3]`). |

---

## 3. Reusable Variants Inventory

### A. Page Transition (`pageTransitionVariants`)
```typescript
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
};
```

### B. Scroll Reveal Section (`AnimatedSection`)
* Uses `whileInView` with `viewport: { once: true, margin: '-60px' }` to avoid repeated re-triggering upon scroll reversal.
* Seamlessly renders plain `<section>` when `useReducedMotion()` returns `true`.

### C. Language Switcher Sliding Pill
* Uses Framer Motion's `layout` animation with spring physics (`stiffness: 450, damping: 32`) for an instantaneous fluid sliding indicator between `EN` and `हिन्दी`.

### D. Mobile Navigation Drawer (`mobileMenuVariants`)
* Smooth accordion expansion using `height: 'auto'` and `opacity: 1` over `0.35s` with `AnimatePresence`.

