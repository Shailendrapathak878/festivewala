export type OutputFormat = 'square' | 'story' | 'portrait' | 'landscape';

export interface FormatDimension {
  width: number;
  height: number;
  label: string;
  labelHi: string;
  aspectRatioLabel: string;
}

export const FORMAT_DIMENSIONS: Record<OutputFormat, FormatDimension> = {
  square: {
    width: 1080,
    height: 1080,
    label: 'Square (1:1)',
    labelHi: 'वर्गाकार (१:१)',
    aspectRatioLabel: 'Instagram Feed, WhatsApp, FB',
  },
  story: {
    width: 1080,
    height: 1920,
    label: 'Story (9:16)',
    labelHi: 'स्टोरी (९:१६)',
    aspectRatioLabel: 'Instagram Story, WhatsApp Status',
  },
  portrait: {
    width: 1080,
    height: 1350,
    label: 'Portrait (4:5)',
    labelHi: 'पोर्ट्रेट (४:५)',
    aspectRatioLabel: 'Instagram Portrait, Pinterest',
  },
  landscape: {
    width: 1920,
    height: 1080,
    label: 'Landscape (16:9)',
    labelHi: 'लैंडस्केप (१६:९)',
    aspectRatioLabel: 'Banner, Email, LinkedIn',
  },
};

export type TemplateCategory =
  | 'premium-purple-gold'
  | 'traditional-indian'
  | 'modern-minimal'
  | 'floral-rangoli'
  | 'cute-creative'
  | 'story-special'
  | 'corporate-professional'
  | 'family-friends'
  | 'photo-studio';

export interface TemplatePalette {
  primary: string;       // Main background / dominant deep color
  secondary: string;     // Accents / framing
  gold: string;          // Gold / highlight color
  ivory: string;         // Light / text highlight
  accent: string;        // Vibrant secondary accent
  textPrimary: string;   // Main title & heading text
  textSecondary: string; // Subtitle and body text
  textMuted: string;     // Secondary notes
}

export interface DefaultTextConfig {
  titleEn: string;
  titleHi: string;
  titleHinglish?: string;
  subtitleEn: string;
  subtitleHi: string;
  subtitleHinglish?: string;
  recipientEn: string;
  recipientHi: string;
  recipientHinglish?: string;
  messageEn: string;
  messageHi: string;
  messageHinglish?: string;
  senderEn: string;
  senderHi: string;
  senderHinglish?: string;
  fontFamily: string;
  titleFontSize: number;
  bodyFontSize: number;
  textAlign: 'center' | 'left' | 'right';
}

export interface DecorativeConfig {
  vectorStyle:
    | 'sovereign-lotus'
    | 'royal-diya'
    | 'traditional-rangoli'
    | 'sacred-mandala'
    | 'minimal-champagne'
    | 'floral-celebration'
    | 'golden-petals'
    | 'joyful-festive'
    | 'diwali-story-special'
    | 'elegant-corporate-diwali'
    | 'royal-peacock'
    | 'sacred-kalash'
    | 'jharokha-arch'
    | 'shubh-labh'
    | 'hanging-deepam'
    | 'kolam-heritage'
    | 'marigold-toran'
    | 'sparkler-celebration'
    | 'family-hearth'
    | 'corporate-prism'
    | 'festive-sweets'
    | 'celestial-galaxy'
    | 'modern-diya';
  borderStyle: 'double-gold' | 'rangoli-dots' | 'royal-filigree' | 'minimal-hairline' | 'festive-toran' | 'brushed-brass';
  compositionStyle?:
    | 'traditional-ornamental'
    | 'hero-artwork'
    | 'minimal-invitation'
    | 'floral-border'
    | 'joyful-celebratory'
    | 'vertical-story'
    | 'corporate-letterhead';
  hasCornerFlourish: boolean;
  hasParticles: boolean;
  hasPhotoFrame: boolean;
  photoFrameShape?: 'circle' | 'rounded-rect' | 'arch' | 'oval' | 'panoramic' | 'polaroid' | 'full-bleed' | 'split-half' | 'jharokha';
  photoLayoutType?:
    | 'single-portrait'
    | 'couple'
    | 'family-panoramic'
    | 'friends-polaroid'
    | 'multi-duo'
    | 'multi-quad'
    | 'full-bleed'
    | 'split-half'
    | 'jharokha-arch';
  photoSlotCount?: number;
  bgGradientType: 'radial' | 'linear-vertical' | 'linear-diagonal' | 'solid';
}

export interface GreetingTemplate {
  id: string;
  name: string;
  nameHi: string;
  nameHinglish?: string;
  category: TemplateCategory;
  categoryLabelEn: string;
  categoryLabelHi: string;
  categoryLabelHinglish?: string;
  description: string;
  descriptionHi: string;
  descriptionHinglish?: string;
  festivalId: string;
  supportedFormats: OutputFormat[];
  palette: TemplatePalette;
  defaultText: DefaultTextConfig;
  decorative: DecorativeConfig;
  thumbnailUrl?: string;
  badge?: string;
  badgeHi?: string;
  badgeHinglish?: string;
  qaStatus: 'passed' | 'ready';
  isFeatured?: boolean;
}

