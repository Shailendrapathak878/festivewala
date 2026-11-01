# FestiveWala — Greeting Design System (Phase 4.1)

## Executive Summary
The FestiveWala Greeting Design System establishes a luxury digital greeting-card stationery aesthetic rooted in classical Indian festive heritage while offering contemporary typographic restraint. Every card is rendered client-side on an HTML5 `<canvas>` with zero external API dependencies, producing crisp, high-resolution vector artwork across four standard export formats.

---

## 1. Visual Hierarchy & Composition Archetypes

The greeting design system is governed by eight distinct composition archetypes:

1. **`traditional-ornamental`**: Symmetrical heritage framing with temple archway or filigree perimeter, top header, central deity/diya motif, body message, and leadership/family sign-off.
2. **`hero-artwork`**: Dominant central celebratory icon (radiant sovereign lotus, ornate brass diya, peacock mandala) anchored by celestial aura rings and ornamental flourish dividers.
3. **`corporate-letterhead`**: Refined editorial luxury for corporate festive greetings, featuring subtle metallic pinstriping, architectural framing, balanced margins, and gold foil dividers.
4. **`minimal-invitation`**: Modernist negative space with hairline borders, understated center emblems, and high-contrast letterspaced serif typography.
5. **`floral-border`**: Cascading marigold blossoms, lotus petals, and mango leaf torans framing central celebratory greetings.
6. **`joyful-celebratory`**: Warm, dynamic compositions with multi-color festive fireworks, sparklers, and joyful family motifs.
7. **`vertical-story`**: Specialized 9:16 vertical storytelling structure engineered for Instagram Stories and WhatsApp Status, with dedicated top/bottom UI safety margins (340px top, 380px bottom) preventing overlay occlusion.
8. **`open-booklet-landscape`**: Horizontal 16:9 layout featuring a gilded vertical dividing rule at $x=940$, splitting the card into left visual showcase and right typographic invitation.

---

## 2. Atmospheric Backdrop & Textural Depth

Phase 4.1 replaces procedural flat/linear fallbacks with `paintAtmosphericBackdrop`, creating multi-layered radiant depth:

- **Central Radiant Halos**: Multi-stop radial gradients centered behind the hero motif (`#F2D98B` at 18% opacity tapering to translucent midnight tones).
- **Category-Specific Texture Overlays**:
  - *Corporate*: Clean vertical hairline pinstripes (`rgba(242, 217, 139, 0.04)`) with mitered chamfered corners.
  - *Traditional & Purple-Gold*: Watermark mandala rings and sacred geometry aureoles.
  - *Story Special*: Stardust particle aureoles and celestial bokeh circles.
  - *Family & Friends*: Soft hearth warmth radiating outward.
- **Deep Velvet Base Tones**: Deep aubergine (`#1E0A36`), obsidian gold (`#0F061C`), royal crimson (`#4A0E17`), and forest emerald (`#0C2E1F`).

---

## 3. Cultural Borders & Framing

1. **`royal-filigree`**: Acanthus scrolls, corner cartouches, and teardrop jewel accents with inset hairline borders.
2. **`festive-toran`**: Strung marigold blossoms (gilded yellow and vermillion) paired with alternating mango leaves and miniature dangling brass bells.
3. **`rangoli-dots`**: Petal rosettes and sacred geometric dot matrices along inner margins.
4. **`brushed-brass`**: Clean architectural chamfered corner frames with metallic brass rivets.
5. **`double-gold`**: Parallel luxury metallic rules with micro-diamonds at each corner junction.
6. **`minimal-hairline`**: Crisp single-pixel metallic border with understated corner weight accents.

---

## 4. Ornamental Dividing Flourishes

To eliminate awkward vertical gaps between message bodies and sign-offs, the engine introduces five procedural divider styles:

- **`diya-flourish`**: Miniature central oil lamp flanked by scrolling leaf tendrils and diamond rules.
- **`lotus-bud`**: Central blooming lotus bud with horizontal graduated metallic needles.
- **`mandala-crest`**: Concentric sunburst crest flanked by tapered rules.
- **`diamond-rule`**: Triple-diamond cluster with bilateral gradient rules.
- **`minimal-dash`**: Triple hairline dashes for contemporary stationery.

---

## 5. Typographic Hierarchy & Font System

| Hierarchy Role | Recommended Font | Default Scale (Square) | Weight | Kerning / Style |
| :--- | :--- | :--- | :--- | :--- |
| **Recipient** | Montserrat / Cormorant | 28–34px | Semi-Bold (600) | Uppercase, +3px letterspacing |
| **Display Title** | Cinzel / Rozha One / Playfair | 72–88px | Bold (700) | Ornate display, subtle drop shadow |
| **Subtitle** | Cormorant Garamond | 26–32px | Medium (400) | Italic editorial cadence |
| **Message Body** | Montserrat / Cormorant | 28–32px | Regular (400) | 48–54px line height, max 5 lines |
| **Sign-off / Sender** | Cormorant Garamond | 30–36px | Semi-Bold (600) | Small caps / Gilded accent |

---

## 6. Color Systems & Cultural Palettes

- **Primary Velvet Darks**: `#1E0A36` (Royal Aubergine), `#0F061C` (Deep Velvet Purple), `#0A192F` (Midnight Navy), `#260B12` (Imperial Ruby).
- **Metallic Gold Accents**: `#F2D98B` (Classic Champagne Gold), `#D4AF37` (Royal Durbar Gold), `#FFE082` (Warm Radiant Amber), `#E5C07B` (Muted Brass).
- **Secondary Warm Accents**: `#E85D04` (Marigold Orange), `#C92A2A` (Sindoor Crimson), `#00B4D8` (Peacock Cyan).
- **Text Primary**: `#FAF7F0` (Ivory White, 95% opacity).
