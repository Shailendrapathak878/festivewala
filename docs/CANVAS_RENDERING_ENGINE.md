# FestiveWala — Canvas Rendering Engine Specifications
**Phase 3: Premium Greeting Studio & Personalized Card Editor**  
**Document Version:** 3.0.0  
**Status:** Approved & Verified

---

## 1. Engine Overview

The FestiveWala Canvas Rendering Engine is a high-performance, client-side graphics subsystem built on the native HTML5 2D Canvas API. It renders complex cultural vector motifs, multiline Devanagari and English typography, user-uploaded photographs, and ornate festive borders at **ultra-high resolution (1080p to 1920p+)**.

### Architectural Goals:
- **Zero Third-Party Graphics Dependencies:** No Pixi.js, Fabric.js, or Konva.js; built natively for maximum performance, minimal bundle size, and total control over pixel rendering.
- **Unified Coordinate System:** Logical layout coordinates are expressed in high-resolution canvas space (1080 × 1080, 1080 × 1920, 1080 × 1350, 1920 × 1080) and dynamically scaled via `ctx.scale(scale, scale)` for fluid preview responsiveness.
- **Font-Ready Guarantee:** Uses `await document.fonts.ready` before any text measurement or painting begins, completely eliminating font-swap layout jumps.
- **Native Offscreen Export:** Generates crystal-clear PNG blobs on detached offscreen canvases without affecting the visible UI.

---

## 2. Layered Rendering Pipeline

When `renderCardToCanvas` is called, the pipeline executes the following sequential passes:

```
Pass 1: Canvas Preparation (Dimension computation, scale transform)
   │
Pass 2: Background Layer (Radial/linear luxury gradients, theme variants)
   │
Pass 3: Ambient Atmosphere (Deterministic starlight sparkles & particles)
   │
Pass 4: Decorative Borders (Double gold, rangoli dots, royal filigree, hairline)
   │
Pass 5: Top/Perimeter Embellishments (Hanging toran garlands, kandils, floating petals)
   │
Pass 6: Focal Centerpiece:
         ├── If Photo Uploaded: Clipped photo frame (circle/rect), pan/zoom transform, gold rim
         └── Else: Procedural vector motif (Lotus, Diya, Rangoli, Mandala, Seal, Crest)
   │
Pass 7: Structural Dividers (Split hairline rule for landscape compositions)
   │
Pass 8: Typography Layer:
         ├── Recipient line (Accent gold, centered)
         ├── Title headline (Display serif/Cinzel, 700 weight, auto-shrink guard)
         ├── Subtitle / Vedic blessing (Italicized, medium tracking)
         ├── Main greeting message (Multiline word-wrapped paragraph)
         └── Sender name (Signature cursive or royal serif)
```

---

## 3. Format Layout Architecture (`layoutEngine.ts`)

Instead of naively stretching identical layouts across different screens, `computeLayout` applies format-specific compositions:

### A. Square (1080 × 1080) — Balanced Symmetry
- Ideal for feeds.
- Focal motif at `y: 250`, radius `140px`.
- Typography clustered symmetrically from `y: 430` to `y: 960`.

### B. Story (1080 × 1920) — Vertical Storytelling Hierarchy
- Generous breathing room across top and bottom.
- Canopy at top (`y: 120` to `240px`).
- Elevated focal motif/photo at `y: 420` (radius `200px`).
- Generous paragraph line height (`44px`) to maximize mobile legibility.

### C. Portrait (1080 × 1350) — Classic Editorial Card
- Proportionally balanced 4:5 ratio.
- Motif radius `160px` at `y: 290`.
- Text baseline positioned for print-like elegance.

### D. Landscape (1920 × 1080) — Split-Panel Banner
- Rather than squeezing text under a flattened motif, the engine splits the canvas:
  - **Left Half (`cx: 500`):** Expansive focal motif or photo frame (radius `240px`).
  - **Center Divider:** Thin gold hairline with diamond knot at `x: 960`.
  - **Right Half (`cx: 1320`):** Complete typography block (recipient, title, subtitle, wrapped message, sender).

---

## 4. Typography & Devanagari Word-Wrapping (`textRenderer.ts`)

### Font Family Synchronization:
- English typography utilizes `'Cinzel'`, `'Playfair Display'`, and `'Plus Jakarta Sans'`.
- Devanagari / Hindi script utilizes `'Noto Sans Devanagari'`.
- Regular expression detection (`/[\u0900-\u097F]/`) automatically prefixes `'Noto Sans Devanagari'` whenever Hindi glyphs are detected, ensuring proper conjuncts (*samyuktakshar*) and vowel diacritics (*matras*).

### Intelligent Word-Wrapper:
```typescript
export function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[]
```
- Splits input into natural paragraphs (`\n`).
- Iterates over tokens, measuring cumulative width with `ctx.measureText`.
- Wraps at whitespace boundaries without splitting composite words.
- Caps maximum lines (5 lines) to guarantee zero overlap with lower signature lines.

---

## 5. Procedural Vector Motifs (`vectorDrawing.ts`)

All motifs are authored mathematically using Canvas 2D paths:

1. **`drawLotus`:** 12 outer petals and 8 inner petals constructed with quadratic bezier curves, dual-tone linear petal gradients, and stamen satellite dots.
2. **`drawDiya`:** Clay/brass bowl rendered with cubic beziers, radial illumination aureole, and a multi-gradient core flame (crimson tip, amber mantle, pure white wick core).
3. **`drawRangoli`:** 8-axis rotational symmetry with teardrop petals, inner saffron insets, and a 32-dot rice-flour perimeter.
4. **`drawMandala`:** 4 concentric gold rings, 16 diamond-tipped radial spokes, and an inner 8-point sacred Yantra star.
5. **`drawMinimalSeal`:** Razor-sharp double hairline concentric rings with stylized modern flame insignia.
6. **`drawFloralToran`:** 11-node sinusoidal marigold festoon with alternating mango leaves (*Amra Pallav*) and golden link chains.
7. **`drawJoyfulLanterns`:** Swaying octagonal *Aakash Kandils* with streamer paper tassels and suspension cords.
8. **`drawCorporateCrest`:** Architectural linear horizontal rules with diamond endcaps and minimalist Diya crest.

---

## 6. User Photo Compositing & Cover Math

When a photograph is attached:
1. An offscreen clipping path is created based on `template.decorative.photoFrameShape` (`circle` or `rounded-rect`).
2. An aspect-fill ratio is computed:
   $$\text{scale} = \max\left(\frac{\text{frameWidth}}{\text{imageWidth}}, \frac{\text{frameHeight}}{\text{imageHeight}}\right) \times \text{userZoom}$$
3. The image is drawn with high-quality bicubic smoothing (`ctx.imageSmoothingQuality = 'high'`).
4. Pan offsets (`panX`, `panY`) are applied to let the user reposition the focal subject.
5. A metallic gold bezel (`lineWidth: 5px`) and drop shadow are stroked around the frame.

---

## 7. Export & Sharing Pipeline (`exportService.ts`)

1. **Native 1080p+ Offscreen Canvas:** `exportCardToBlob` instantiates a standalone canvas matching the format's exact dimensions (e.g. 1080 × 1920), renders all elements at 100% scale, and converts to a PNG blob via `canvas.toBlob(..., 'image/png', 1.0)`.
2. **Semantic Filename:** Output files follow standard naming conventions:
   `festivewala-diwali-[templateId]-[format]-2026.png`.
3. **Web Share API with File Support:** If `navigator.canShare({ files: [file] })` is supported (mobile Chrome / Safari), it launches the native OS share sheet.
4. **Zero-Failure Fallback:** If file sharing is unavailable or cancelled, it triggers the PNG download and automatically copies the celebratory message to the user's clipboard.

