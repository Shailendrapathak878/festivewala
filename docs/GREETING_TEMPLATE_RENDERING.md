# FestiveWala — Greeting Template Rendering Engine (Phase 4.1)

## Architecture Overview
The greeting rendering pipeline is a high-performance, deterministic client-side engine built around HTML5 Canvas 2D. It renders pixel-perfect high-resolution digital stationery without server-side rendering or binary dependencies.

```
Template Configuration (JSON/TS)
               │
               ▼
   Layout Computation Engine (`layoutEngine.ts`)
   - Computes bounds for 1:1, 9:16, 4:5, 16:9
   - Insets safe margins and allocates text bounding boxes
               │
               ▼
   Backdrop Atmospheric Painter (`canvasRenderer.ts`)
   - Multi-tier radial gradients & radiant motif auras
   - Category textures (pinstripes, mandalas, stardust)
               │
               ▼
   Border & Frame Painter (`vectorDrawing.ts`)
   - Ornate filigree, festive torans, brushed brass
               │
               ▼
   Motif Vector Engine (`vectorDrawing.ts`)
   - Procedural culturally authentic motifs (diyas, mandalas, kalash)
               │
               ▼
   Typographic & Divider Compositor (`canvasRenderer.ts` & `textRenderer.ts`)
   - Recipient, Display Title, Subtitle, Message, Sender
   - Procedural ornamental flourish dividers
               │
               ▼
   High-Resolution Export (1080p / 4K Ready)
```

---

## Export Formats & Spatial Dimension Mapping

| Format ID | Aspect Ratio | Dimensions | Use Case | Key Spatial Adjustments |
| :--- | :--- | :--- | :--- | :--- |
| **`square`** | 1:1 | **1080 × 1080 px** | Instagram Post, WhatsApp | Symmetrical vertical stack, central focal balance |
| **`story`** | 9:16 | **1080 × 1920 px** | Instagram Story, Status | 340px top / 380px bottom safe margin; sender at y=1540 |
| **`portrait`**| 4:5 | **1080 × 1350 px** | Feed Portrait, Pinterest | Extended vertical body line-height; balanced padding |
| **`landscape`**| 16:9 | **1920 × 1080 px** | Banner, Desktop, Email | Two-column open booklet layout with vertical divider |

---

## Rendering Components

### 1. Vector Drawing Engine (`vectorDrawing.ts`)
- **`drawBorder(ctx, bounds, style, palette)`**: Draws high-precision cultural frames. Supports `festive-toran`, `royal-filigree`, `rangoli-dots`, `brushed-brass`, `double-gold`, and `minimal-hairline`.
- **`drawOrnamentalDivider(ctx, cx, cy, width, style, color)`**: Renders procedural dividers between typographic blocks to eliminate empty visual dead zones.
- **`withAlpha(color, alphaHex)`**: Utility preventing CSS hexadecimal syntax errors by ensuring clean 8-character hex strings (`#RRGGBBAA`).

### 2. Layout Engine (`layoutEngine.ts`)
- **`computeLayout(format, hasPhoto, templateId, compositionStyle)`**: Calculates bounding boxes and font scales tailored to each of the four export formats.
- Ensures typographic safe margins and provides coordinate pairs for `titleDivider` and `divider`.

### 3. Canvas Compositor (`canvasRenderer.ts`)
- **`paintAtmosphericBackdrop(...)`**: Renders radiant 3D aura halos and atmospheric texture overlays.
- **`drawLandscapeVerticalDivider(...)`**: Creates two-column booklet structure for 1920×1080 landscape formats.
- **`renderCardToCanvas(options)`**: The master pipeline method orchestrating backdrop, framing, motif, photo frame, text, and dividers.
