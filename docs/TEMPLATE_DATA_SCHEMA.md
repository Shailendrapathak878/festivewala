# FestiveWala — Template Data Schema & Catalog Specifications
**Phase 3: Premium Greeting Studio & Personalized Card Editor**  
**Document Version:** 3.0.0  
**Status:** Approved & Verified

---

## 1. Schema Definitions (`src/features/greeting-studio/types/template.ts`)

```typescript
export type OutputFormat = 'square' | 'story' | 'portrait' | 'landscape';

export type TemplateCategory =
  | 'premium-purple-gold'
  | 'traditional-indian'
  | 'modern-minimal'
  | 'floral-rangoli'
  | 'cute-creative'
  | 'story-special'
  | 'corporate-professional';

export interface TemplatePalette {
  primary: string;       // Dominant canvas background color
  secondary: string;     // Gradient or framing hue
  gold: string;          // Primary metallic highlight
  ivory: string;         // Light text / paper highlight
  accent: string;        // Secondary cultural accent
  textPrimary: string;   // High-contrast title text color
  textSecondary: string; // Subtitle and body message color
  textMuted: string;     // Secondary notes and captions
}

export interface DefaultTextConfig {
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  recipientEn: string;
  recipientHi: string;
  messageEn: string;
  messageHi: string;
  senderEn: string;
  senderHi: string;
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
    | 'elegant-corporate-diwali';
  borderStyle: 'double-gold' | 'rangoli-dots' | 'royal-filigree' | 'minimal-hairline' | 'festive-toran' | 'brushed-brass';
  hasCornerFlourish: boolean;
  hasParticles: boolean;
  hasPhotoFrame: boolean;
  photoFrameShape?: 'circle' | 'rounded-rect' | 'arch';
  bgGradientType: 'radial' | 'linear-vertical' | 'linear-diagonal' | 'solid';
}

export interface GreetingTemplate {
  id: string;
  name: string;
  nameHi: string;
  category: TemplateCategory;
  categoryLabelEn: string;
  categoryLabelHi: string;
  badge?: string;
  badgeHi?: string;
  description: string;
  descriptionHi: string;
  festivalId: string;
  supportedFormats: OutputFormat[];
  palette: TemplatePalette;
  defaultText: DefaultTextConfig;
  decorative: DecorativeConfig;
  qaStatus: 'passed' | 'ready';
}
```

---

## 2. Complete Phase 3 Initial Template Catalog (Exactly 10 Designs)

| # | Template ID | English & Hindi Name | Category | Motif Style | Primary Colors | Supported Formats |
|---|---|---|---|---|---|---|
| 1 | `sovereign-lotus` | Sovereign Lotus Edition<br>*सम्राट कमल संस्करण* | Premium Purple & Gold | `sovereign-lotus` | Deep Purple `#24113D`, Champagne Gold `#F2D98B` | Square, Story, Portrait, Landscape |
| 2 | `royal-diya` | Royal Diya Edition<br>*शाही दीप संस्करण* | Premium Purple & Gold | `royal-diya` | Royal Purple `#31104D`, Amber Gold `#FBBF24` | Square, Story, Portrait, Landscape |
| 3 | `traditional-rangoli` | Traditional Rangoli Edition<br>*पारंपरिक रंगोली संस्करण* | Traditional Indian | `traditional-rangoli` | Deep Crimson `#701A1E`, Turmeric Gold `#FBBF24` | Square, Story, Portrait, Landscape |
| 4 | `sacred-mandala` | Sacred Mandala Edition<br>*पवित्र मंडला संस्करण* | Traditional Indian | `sacred-mandala` | Rich Maroon `#4A0E2E`, Antique Bronze `#D4AF37` | Square, Story, Portrait, Landscape |
| 5 | `minimal-champagne` | Minimal Champagne Edition<br>*सुरुचिपूर्ण शैंपेन संस्करण* | Modern Minimal | `minimal-champagne` | Warm Ivory `#FAF7F0`, Charcoal Purple `#24113D` | Square, Story, Portrait, Landscape |
| 6 | `floral-celebration` | Floral Celebration Edition<br>*पुष्प उत्सव संस्करण* | Floral & Rangoli | `floral-celebration` | Emerald Green `#0F382A`, Marigold Orange `#EA580C` | Square, Story, Portrait, Landscape |
| 7 | `golden-petals` | Golden Petals Edition<br>*स्वर्ण पंखुड़ी संस्करण* | Floral & Rangoli | `golden-petals` | Velvet Plum `#3B0764`, Bright Lustre `#FBBF24` | Square, Story, Portrait, Landscape |
| 8 | `joyful-festive` | Joyful Festive Edition<br>*हर्षोल्लास उत्सव संस्करण* | Cute & Creative | `joyful-festive` | Vibrant Crimson `#881337`, Festive Yellow `#FACC15` | Square, Story, Portrait, Landscape |
| 9 | `diwali-story-special` | Diwali Story Special Edition<br>*इंस्टाग्राम स्टोरी स्पेशल* | Instagram Story Special | `diwali-story-special` | Cosmic Midnight `#110C24`, Starlight Gold `#FDE68A` | Story, Square, Portrait, Landscape |
| 10 | `elegant-corporate-diwali`| Elegant Corporate Edition<br>*शाही कॉरपोरेट संस्करण* | Corporate & Professional | `elegant-corporate-diwali`| Executive Navy `#0B1329`, Brushed Brass `#D4AF37` | Square, Story, Portrait, Landscape |

---

## 3. Category Distribution Verification

The 10 templates strictly adhere to the required design distribution:

- **Premium Purple & Gold:** 2 templates (`sovereign-lotus`, `royal-diya`)
- **Traditional Indian:** 2 templates (`traditional-rangoli`, `sacred-mandala`)
- **Modern Minimal:** 1 template (`minimal-champagne`)
- **Floral & Rangoli:** 2 templates (`floral-celebration`, `golden-petals`)
- **Cute & Creative:** 1 template (`joyful-festive`)
- **Instagram Story Special:** 1 template (`diwali-story-special`)
- **Corporate & Professional:** 1 template (`elegant-corporate-diwali`)
- **Total:** **Exactly 10 original templates**.

---

## 4. Multi-Format Dimensions Specification

Each template supports 4 distinct rendering compositions:

1. **Square (`square`):** `1080 × 1080px` (Aspect Ratio 1:1) — Balanced for Instagram feeds, WhatsApp profile sharing, and square digital invitations.
2. **Instagram Story (`story`):** `1080 × 1920px` (Aspect Ratio 9:16) — Tailored for vertical mobile storytelling, WhatsApp status updates, and full-screen smartphone wallpapers.
3. **Portrait (`portrait`):** `1080 × 1350px` (Aspect Ratio 4:5) — Classic editorial portrait greeting for Instagram feeds and print cards.
4. **Landscape (`landscape`):** `1920 × 1080px` (Aspect Ratio 16:9) — Split-panel horizontal composition for email banners, widescreen displays, and digital letterheads.

---

## 5. Guidelines for Future Template Expansion

When adding new festival templates (e.g. Holi, Raksha Bandhan):
1. Define a unique ID formatted as `kebab-case`.
2. Provide complete bilingual name, description, badge, and default greeting texts.
3. Define balanced light and dark color values in `palette`.
4. Specify appropriate vector motifs in `decorative.vectorStyle`.
5. Ensure `qaStatus: 'passed'` is assigned only after visual verification in Chrome DevTools MCP.

