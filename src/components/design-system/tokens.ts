/**
 * FestiveWala Design System Tokens
 * Phase 1: Technical Foundation & Creative Direction
 */

export const BRAND_COLORS = {
  deepPurple: '#24113D',
  royalPurple: '#45216B',
  lightPurple: '#F3ECFA',
  champagneGold: '#F2D98B',
  metallicGold: '#D4AF37',
  warmIvory: '#FAF7F0',
  pureWhite: '#FFFFFF',
  textDark: '#21182A',
  mutedText: '#766D7D',
} as const;

export const TYPOGRAPHY = {
  fontFamilies: {
    primary: '"Plus Jakarta Sans", "Noto Sans Devanagari", system-ui, sans-serif',
    display: '"Cinzel", "Playfair Display", serif',
    editorial: '"Playfair Display", Georgia, serif',
    hindi: '"Noto Sans Devanagari", sans-serif',
  },
  scale: {
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.1]',
    sectionTitle: 'text-2xl sm:text-3xl md:text-4xl font-display tracking-normal leading-[1.2]',
    pageTitle: 'text-3xl sm:text-4xl md:text-5xl font-display leading-[1.15]',
    cardTitle: 'text-xl sm:text-2xl font-serif font-semibold leading-snug',
    bodyLarge: 'text-base sm:text-lg font-sans leading-relaxed text-brand-dark/90',
    body: 'text-sm sm:text-base font-sans leading-relaxed text-brand-dark/80',
    caption: 'text-xs sm:text-sm font-sans tracking-wide text-brand-muted',
    label: 'text-xs font-sans uppercase tracking-widest-luxury font-semibold text-brand-gold',
  },
} as const;

export const BREAKPOINTS = {
  mobileSmall: '360px',
  mobileMedium: '375px',
  mobileStandard: '390px',
  mobileLarge: '430px',
  tablet: '768px',
  desktopSmall: '1024px',
  desktopMedium: '1366px',
  desktopLarge: '1440px',
  desktopWide: '1920px',
} as const;

export const SHADOWS = {
  goldGlow: '0 0 25px -5px rgba(212, 175, 55, 0.3)',
  royal: '0 12px 32px -8px rgba(36, 17, 61, 0.28)',
  cardLuxury: '0 4px 20px -2px rgba(36, 17, 61, 0.05), 0 2px 6px -1px rgba(36, 17, 61, 0.03)',
  cardLuxuryHover: '0 20px 40px -6px rgba(36, 17, 61, 0.12), 0 8px 16px -2px rgba(36, 17, 61, 0.06)',
} as const;

