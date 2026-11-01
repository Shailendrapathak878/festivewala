# FESTIVEWALA — PERSONAL PHOTO WISHES STUDIO ARCHITECTURE

## 1. Executive Summary & Design Philosophy

The **Personal Photo Wishes Studio** is FestiveWala's premier personalized greeting creation experience. It empowers users to celebrate Indian festivals by placing their own cherished photographs (individual portraits, couple celebrations, family gatherings, and friends groups) inside mastercrafted festive card compositions.

### Core Architectural Axiom: 100% Client-Side Privacy & Zero AI
Unlike conventional greeting platforms that rely on expensive, latency-heavy, privacy-invasive generative AI APIs or remote image processing servers:
- **Zero AI Dependency**: All apertures, borders, lighting scrims, and compositions are rendered procedurally using HTML5 `<canvas>` 2D rendering contexts.
- **Zero Cloud Uploads**: User photos are loaded into browser memory via the HTML5 `FileReader` API (`readAsDataURL`) and transformed exclusively within local CPU/GPU memory.
- **Zero Remote Storage / Persistence**: No user photo is ever sent over the network, saved to remote databases, or cached in persistent storage (`localStorage` / `sessionStorage`). Once the browser tab is closed, photo memory is immediately garbage-collected.
- **Instant Latency & Infinite Offline Capability**: Zero network roundtrips for image rendering, panning, zooming, rotation, or card export.

---

## 2. Layout Taxonomy & The 8 Design Families (14 Templates)

FestiveWala provides 14 handcrafted photo greeting layouts across 8 distinct architectural layout families:

| # | Template ID | Family | Frame Shape | Default Ratio | Aspect Optimization |
|---|-------------|--------|-------------|---------------|---------------------|
| 1 | `photo-royal-portrait` | Elegant Portrait | `oval` | 1:1.25 | Classical oval aperture with dual concentric 24K gold foil trim and diya base |
| 2 | `photo-gilded-heritage` | Elegant Portrait | `arch` | 1:1.3 | Sacred temple shikhara arch with lotus finial crown and floral filigree |
| 3 | `photo-eternal-flame-couple` | Couple Celebration | `arch` | 1:1.15 | Sacred warm flame archway with floating twin diyas and marigold garlands |
| 4 | `photo-starlight-romance` | Couple Celebration | `oval` | 1:1 | Midnight navy medallion with celestial gold constellations and twinkling stars |
| 5 | `photo-parivar-panoramic` | Family Moments | `panoramic` | 16:9 / 16:10 | Wide horizontal aperture preventing clipping of multi-generational family groups |
| 6 | `photo-hearth-and-home` | Family Moments | `rounded-rect` | 4:3 | Warm domestic hearth frame with marigold toran border and sacred rangoli base |
| 7 | `photo-yaari-sparklers` | Friends Forever | `polaroid` | 1:1 | Vintage polaroid frame with playful -2.5° tilt, golden sparkler embers, and washi tape |
| 8 | `photo-rooftop-gang` | Friends Forever | `panoramic` | 16:9 | Expansive panoramic festive party frame with hanging paper lanterns and sky sparkles |
| 9 | `photo-festive-duet-collage` | Multi-Photo Memories | `rounded-rect` (2 slots) | 1:1 each | Dual side-by-side / vertical photo pairing with independent pan, zoom, and crop |
| 10 | `photo-quad-memories-collage`| Multi-Photo Memories | `rounded-rect` (4 slots) | 1:1 each | 2×2 memory grid with ornate gold divider cross and center diya medallion |
| 11 | `photo-cinematic-scrim` | Full Photo Background | `full-bleed` | Full Canvas | Edge-to-edge photo canvas with 4-stop dark vignette gradient scrim for typography |
| 12 | `photo-golden-hour-full` | Full Photo Background | `full-bleed` | Full Canvas | Full-bleed photo with ornate 24K gold foil perimeter border and lower protective scrim |
| 13 | `photo-modern-split-duo` | Modern Split Layout | `split-half` | 1:1 | Clean 50/50 editorial split pairing high-contrast imagery with luxury typography |
| 14 | `photo-traditional-jharokha` | Traditional Festive Frame | `jharokha` | 1:1.2 | Rajasthani royal palace window arch with ornate cusped arches and brass hanging bells |

---

## 3. Canvas Rendering & Geometric Aperture Engine

The photo rendering pipeline is isolated within `src/features/greeting-studio/services/photoRenderer.ts` and integrated cleanly into `canvasRenderer.ts`.

### Clipping Geometry
1. **Circle & Oval**: Evaluated using `ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)`.
2. **Rounded Rectangle**: Native `ctx.roundRect(x, y, w, h, radius)`.
3. **Temple Arch**: Straight vertical stiles terminating in a semicircular arch top.
4. **Rajasthani Jharokha (Cusped Arch)**: Custom cubic Bézier curves forming 5 distinct cusps crowned with an ornate finial apex.
5. **Polaroid Frame**: Geometric matrix rotation (`ctx.rotate(angle)`) accompanied by a white border skirt and dropped shadow.

### Image Transformation Pipeline
To ensure user photographs remain sharp and perfectly framed:
$$\text{Scale} = \max\left(\frac{W_{\text{frame}}}{W_{\text{img}}}, \frac{H_{\text{frame}}}{H_{\text{img}}}\right) \times \text{Zoom}$$
- **Fit Mode**:
  - `cover`: Fills the entire aperture without black bars, allowing pan adjustments.
  - `contain`: Preserves the complete original photo within the frame borders.
- **Rotation**: Hardware-accelerated $\pm 90^\circ$ transformations around the aperture center.
- **Pan / Nudge**: Normalized coordinate offsets $(\Delta x, \Delta y)$ clamped or stepped via D-pad controls.

### Typographic Legibility Protection (Gradient Scrims)
For full-bleed layouts (`photo-cinematic-scrim` and `photo-golden-hour-full`), background photographs can vary wildly in brightness. To guarantee strict WCAG contrast compliance:
```typescript
const scrim = ctx.createLinearGradient(0, height * 0.45, 0, height);
scrim.addColorStop(0.0, 'rgba(11, 4, 24, 0.0)');
scrim.addColorStop(0.3, 'rgba(11, 4, 24, 0.65)');
scrim.addColorStop(0.7, 'rgba(11, 4, 24, 0.90)');
scrim.addColorStop(1.0, 'rgba(11, 4, 24, 0.98)');
ctx.fillStyle = scrim;
ctx.fillRect(0, height * 0.45, width, height * 0.55);
```

---

## 4. Multi-Format Layout Adaptation Matrix

All 14 photo layouts compute tailored aperture coordinates and text bounding boxes dynamically across all 4 export aspect ratios:

| Format | Dimensions | Aspect Ratio | Aperture Adjustment Strategy |
|--------|------------|--------------|------------------------------|
| **Square** | 1080 × 1080 | 1:1 | Balanced central aperture occupying 45–50% of vertical canvas |
| **Story** | 1080 × 1920 | 9:16 | Aperture positioned in upper-middle 50% with generous typographic breathing room below |
| **Portrait** | 1080 × 1350 | 4:5 | Aperture optimized for Instagram feed previews (approx. 48% height) |
| **Landscape** | 1920 × 1080 | 16:9 | Horizontal split-flow: Left aperture (45% width), right typography block (50% width) |

---

## 5. 300 Curated Wishes Library Integration

The studio integrates FestiveWala's 300 curated bilingual festival wishes through `PhotoWishSelectorModal.tsx`:
- **Categorical Navigation**: All 10 categories (Traditional Shlokas, Family & Elders, Romantic, Friends, Joyful Sparklers, Deeply Emotional, Festive Short, Festive Captions, Corporate, Funny & Relatable).
- **Instant Search**: Real-time substring matching across Hindi and English messages and tags.
- **Language Toggle**: One-click toggle between English and authentic Hindi (Devanagari).
- **Direct 1-Click Card Injection**: Replaces the greeting card title and message synchronously with automatic canvas re-render.

---

## 6. Verification & Quality Standards

- **Zero AI**: Verified by code audit and network inspection (0 external API calls during upload or render).
- **Zero Persistence**: `localStorage` audit confirms no image data is persisted.
- **Export Verification**: 14 templates × 4 formats = 56 high-resolution PNG exports generated and verified for dimensional accuracy and rendering integrity.
- **Responsive Test Matrix**: Verified at 360px, 390px, 430px, 768px, and 1440px across Chrome.

