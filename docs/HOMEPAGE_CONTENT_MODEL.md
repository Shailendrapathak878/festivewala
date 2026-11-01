# FestiveWala — Homepage Content Model & Data Architecture
**Phase 2: Complete Premium Animated Homepage Implementation**  
**Document Version:** 2.0.0  
**Status:** Approved & Verified

---

## 1. Overview

To prevent UI brittleness and avoid hardcoded strings across visual components, FestiveWala establishes a centralized, strongly typed data layer in `src/data/`.

This document specifies the exact TypeScript data contracts, field semantics, timezone-handling rules, and step-by-step procedures for extending content throughout future phases.

---

## 2. Type Definitions (`src/data/types.ts`)

```typescript
export type Language = 'en' | 'hi';

export interface FestivalItem {
  id: string;
  name: string;
  nameHi: string;
  date: string;              // ISO format: YYYY-MM-DD
  dateFormatted: string;     // e.g., "Nov 08, 2026"
  dateFormattedHi: string;   // e.g., "८ नवंबर २०२६"
  season: 'autumn' | 'winter' | 'spring' | 'monsoon';
  seasonLabel: string;
  seasonLabelHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  culturalSignificance: string;
  culturalSignificanceHi: string;
  accentColor: string;       // Hex or Tailwind color token
  badge: string;
  badgeHi: string;
  route: string;             // Functional anchor route (e.g. "/festivals#diwali")
  isFeatured?: boolean;
}

export interface GreetingEdition {
  id: string;
  title: string;
  titleHi: string;
  collection: string;
  collectionHi: string;
  category: string;
  aspectRatio: 'portrait' | 'square';
  accentColor: string;
  badge: string;
  badgeHi: string;
  description: string;
  descriptionHi: string;
  blessingText: string;
  blessingTextHi: string;
  vectorStyle: string;       // Design style: 'lotus' | 'diya' | 'rangoli' | 'marigold' | 'minimal-gold' | 'constellation'
}

export interface WishMessage {
  id: string;
  category: 'sacred' | 'family' | 'friends' | 'corporate';
  categoryLabel: string;
  categoryLabelHi: string;
  festival: string;
  festivalHi: string;
  headline: string;
  headlineHi: string;
  bodyEn: string;
  bodyHi: string;
  tone: string;
  toneHi: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  readTime: string;
  readTimeHi: string;
  author: string;
  excerpt: string;
  excerptHi: string;
  contentEn: string[];
  contentHi: string[];
  accentColor: string;
}
```

---

## 3. Verified Festival Calendar (`src/data/festivals.ts`)

Festival dates in India follow the lunisolar calendar (*Panchang*). Dates configured in FestiveWala are calibrated to the **Indian Standard Time (IST, UTC+05:30)** zone.

### Verified Festival Manifest:

| Festival ID | English Name | Hindi Name | Verified Target Date | Season | Featured Status |
|---|---|---|---|---|---|
| `diwali` | Diwali — Deepavali | दिवाली — दीपोत्सव | `2026-11-08` | Autumn | **Featured Hero** |
| `chhath-puja` | Chhath Puja | छठ पूजा | `2026-11-15` | Autumn | Showcase Tile |
| `christmas` | Christmas | क्रिसमस | `2026-12-25` | Winter | Showcase Tile |
| `new-year` | New Year 2027 | नव वर्ष २०२७ | `2027-01-01` | Winter | Showcase Tile |
| `makar-sankranti` | Makar Sankranti | मकर संक्रांति | `2027-01-14` | Winter | Showcase Tile |
| `maha-shivratri` | Maha Shivratri | महाशिवरात्रि | `2027-03-06` | Spring | Showcase Tile |
| `holi` | Holi — Festival of Colors | होली — रंगोत्सव | `2027-03-22` | Spring | Showcase Tile |
| `raksha-bandhan` | Raksha Bandhan | रक्षाबंधन | `2027-08-28` | Monsoon | Showcase Tile |

### Dynamic Roll-Over Logic (`getNextUpcomingFestival`):
The countdown component consumes the helper function:
```typescript
export function getNextUpcomingFestival(): FestivalItem {
  const now = new Date();
  const upcoming = festivals
    .filter(f => new Date(`${f.date}T00:00:00+05:30`).getTime() > now.getTime())
    .sort((a, b) => new Date(`${a.date}T00:00:00+05:30`).getTime() - new Date(`${b.date}T00:00:00+05:30`).getTime());
  
  return upcoming.length > 0 ? upcoming[0] : festivals[0];
}
```
**Safety Guarantee:** If all dates pass, the function gracefully wraps to the primary flagship festival, preventing `null` pointer exceptions or layout breakage.

---

## 4. Greeting Card Signature Editions (`src/data/greetings.ts`)

Phase 2 ships with 6 studio-grade editions representing distinct artistic traditions:

1. **The Sovereign Lotus (`sovereign-lotus`):**
   - Palette: Deep Royal Purple (`#24113D`) + Champagne Gold (`#F2D98B`).
   - Motif: Symmetric geometric lotus with starlight constellation points.
2. **Royal Diya Luminary (`royal-diya`):**
   - Palette: Warm Amber (`#B45309`) + Burnished Gold (`#D4AF37`).
   - Motif: Handcrafted terracotta Diya flame with radial light rays.
3. **Sacred Rangoli Mandalic (`sacred-rangoli`):**
   - Palette: Crimson Red (`#991B1B`) + Saffron Accent (`#F59E0B`).
   - Motif: 8-fold circular sacred kolam geometry.
4. **Marigold Garland Garlandry (`marigold-garland`):**
   - Palette: Festive Orange (`#C2410C`) + Saffron Gold (`#FBBF24`).
   - Motif: Interlocking *Genda Phool* festoons and torans.
5. **Minimalist Gold Crest (`minimalist-gold`):**
   - Palette: Warm Ivory (`#FAF7F0`) + Metallic Gold (`#D4AF37`).
   - Motif: Crisp editorial typography and single gold embossed seal.
6. **Luminous Constellation (`luminous-constellation`):**
   - Palette: Midnight Blue (`#1E1B4B`) + Starlight Gold (`#FDE68A`).
   - Motif: Celestial celestial fireworks and cosmic spark vectors.

---

## 5. Curated Bilingual Wishes (`src/data/wishes.ts`)

Wishes are organized into four distinct social communication spheres:
- **Sacred Verses (`sacred`):** Traditional Sanskrit shlokas accompanied by poetic Hindi & English renderings.
- **Family Blessings (`family`):** Warm, reverent messages crafted for elders, parents, and siblings.
- **Friends & Camaraderie (`friends`):** Energetic, joyful, and contemporary celebration wishes.
- **Corporate & Professional (`corporate`):** Prestigious, respectful, and culturally astute greetings for partners and colleagues.

Every entry contains complete English (`bodyEn`) and Hindi (`bodyHi`) text with verified typographic punctuation and tone markers.

---

## 6. Cultural Editorial Library (`src/data/editorial.ts`)

Three long-form essays provide thoughtful context for modern celebratory rituals:
1. **The Sacred Rhythm of Indian Celebrations:** Philosophy of cyclical time (*Ritu Chakra*) and community illumination.
2. **The Living Geometry of Rangoli & Kolam:** Sacred threshold art, cosmic symmetry, and natural powdered colors.
3. **How Thoughtful Words Bridge Generations:** The craft of heartfelt correspondence in a rapid digital age.

---

## 7. Protocol for Adding New Content

To append a new festival, greeting card, or wish:
1. Open the corresponding file under `src/data/`.
2. Adhere strictly to the defined interface in `src/data/types.ts`.
3. Provide both English and Hindi strings for all user-facing properties.
4. For festivals, specify `YYYY-MM-DD` and IST timezone semantics.
5. Run `npm run build` to verify type compliance and zero compilation errors.

