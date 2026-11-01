/**
 * FestiveWala Motion Design System (Phase 8 Part 1)
 * Standardized Framer Motion Variants, Transitions & Timings
 * Respects prefers-reduced-motion and provides high performance on mobile devices.
 */

import type { Variants, Transition } from 'framer-motion';

// 1. Consistent Timing Scales (Milliseconds mapped to seconds)
export const TIMINGS = {
  fast: 0.16,      // 160ms - micro interactions, button taps, icon toggles
  standard: 0.24,  // 240ms - card hovers, modal reveals, tab shifts
  section: 0.36,   // 360ms - section reveals, content entrance
  page: 0.30,      // 300ms - route transitions
} as const;

// 2. Premium Easing Curves
export const EASINGS = {
  luxuryEase: [0.22, 1, 0.36, 1],  // Custom smooth cubic bezier for high-end luxury feel
  gentleEase: [0.4, 0, 0.2, 1],    // Balanced material ease for exits
  snappyEase: [0.25, 0.1, 0.25, 1],// Snappy feedback for toggles
} as const;

// 3. Centralized Transitions
export const TRANSITIONS = {
  micro: {
    duration: TIMINGS.fast,
    ease: EASINGS.luxuryEase,
  } as Transition,
  card: {
    duration: TIMINGS.standard,
    ease: EASINGS.luxuryEase,
  } as Transition,
  section: {
    duration: TIMINGS.section,
    ease: EASINGS.luxuryEase,
  } as Transition,
  page: {
    duration: TIMINGS.page,
    ease: EASINGS.luxuryEase,
  } as Transition,
  stagger: {
    staggerChildren: 0.05,
    delayChildren: 0.02,
  } as Transition,
};

// 4. Page Transition Variants (Zero flash, smooth entrance & exit)
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.page,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: EASINGS.gentleEase },
  },
};

// 5. Section & Item Reveal Variants
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.section,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITIONS.stagger,
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMINGS.standard,
      ease: EASINGS.luxuryEase,
    },
  },
};

// 6. Interactive Card & Button Variants
export const cardHoverVariants: Variants = {
  initial: { y: 0, boxShadow: '0 4px 20px -2px rgba(36, 17, 61, 0.05)' },
  hover: {
    y: -4,
    boxShadow: '0 16px 32px -4px rgba(36, 17, 61, 0.12)',
    transition: TRANSITIONS.card,
  },
};

export const buttonTapVariants = {
  tap: { scale: 0.98, transition: { duration: 0.12 } },
  hover: { y: -2, transition: { duration: TIMINGS.fast, ease: EASINGS.luxuryEase } },
};

// 7. Tactile Heart Favorite Pop Animation
export const heartPopVariants: Variants = {
  idle: { scale: 1 },
  popped: {
    scale: [1, 1.28, 1],
    transition: { duration: 0.28, times: [0, 0.4, 1], ease: 'easeOut' },
  },
};

// 8. Refined Toast Notification Variants (Replaces harsh animate-bounce)
export const toastNotificationVariants: Variants = {
  initial: {
    opacity: 0,
    y: -14,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TIMINGS.standard,
      ease: EASINGS.luxuryEase,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.96,
    transition: {
      duration: 0.18,
      ease: EASINGS.gentleEase,
    },
  },
};

// 9. Modal Dialog & Backdrop Variants
export const modalBackdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

export const modalDialogVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 16,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.26,
      ease: EASINGS.luxuryEase,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 12,
    transition: {
      duration: 0.18,
      ease: EASINGS.gentleEase,
    },
  },
};
