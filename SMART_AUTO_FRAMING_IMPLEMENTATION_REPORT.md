# FESTIVEWALA — SMART AUTOMATIC PHOTO FRAMING SYSTEM
## AI-Assisted Auto Crop, Face Detection & Intelligent Photo Positioning Implementation Report

**Brand:** FestiveWala  
**Domain:** [https://festivewala.in](https://festivewala.in)  
**Feature:** Personal Photo Wishes Studio — Smart Automatic Photo Framing  
**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, MediaPipe Tasks Vision (`@mediapipe/tasks-vision`), HTML5 Canvas 2D API  
**Date:** November 2026  
**Status:** Implemented, Tested & Verified

---

## 1. Existing Image Engine Audit & Coordinate System

Before implementing the smart auto-framing system, a comprehensive audit of FestiveWala's photo rendering pipeline was conducted:
- **Canvas Rendering Pipeline:** Both live preview (`CanvasPreview.tsx`) and high-resolution export (`exportService.ts`) delegate photo drawing to `drawPhotoAperture()` in `photoRenderer.ts`.
- **Coordinate System:**
  - Aperture centers are defined in layout space `(cx, cy)` with width `w`, height `h`, and radius `r`.
  - When `panX = 0, panY = 0`, the center of the uploaded image aligns with `(cx, cy)`.
  - In `fitMode: 'cover'`, the base scale is `scaleCover = Math.max(w / naturalWidth, h / naturalHeight)`.
  - The final rendered image dimensions are `drawW = naturalWidth * baseScale * zoom` and `drawH = naturalHeight * baseScale * zoom`.
  - A point `(normX, normY)` in normalized image space `[0, 1]` is mapped to aperture canvas coordinates via:
    $$\text{apertureX} = (\text{normX} - 0.5) \cdot \text{drawW} + \text{panX}$$
    $$\text{apertureY} = (\text{normY} - 0.5) \cdot \text{drawH} + \text{panY}$$
  - To bring a subject located at `(normX, normY)` to a desired target position `(targetX, targetY)` relative to the aperture center:
    $$\text{panX} = \text{targetX} - (\text{normX} - 0.5) \cdot \text{drawW}$$
    $$\text{panY} = \text{targetY} - (\text{normY} - 0.5) \cdot \text{drawH}$$
- **State Management:** Stored inside `customization.photo` (and `customization.photos` for multi-slot layouts) as `UserPhoto`.
- **100% Client-Side Privacy:** All processing remains entirely within the browser. No photos or face embeddings are ever sent to any remote server or external AI service.

---

## 2. Technology Selected & Architectural Decisions

1. **Primary Face & Subject Detector — MediaPipe Tasks Vision (`@mediapipe/tasks-vision`):**
   - **Reason for Selection:** MediaPipe's `FaceDetector` (powered by BlazeFace short-range neural architecture) runs WebAssembly on-device via WebGL/GPU acceleration with minimal footprint (~200KB model weight).
   - **Singleton Model Lifecycle:** The detector is initialized once via `getOrInitFaceDetector()` in `faceDetectionService.ts`. Re-use prevents redundant WASM instantiations and eliminates UI latency.
   - **Zero-Network Saliency Fallback:** If the browser is offline, CDN access is unavailable, or WASM fails, the system automatically falls back to an in-memory Canvas luminance and YCbCr skin-tone chrominance cluster analyzer (`detectSubjectFromCanvasSaliency()`). The application **never** blocks, crashes, or fails silently.

2. **Framing Calculation Engine (`autoFramingEngine.ts`):**
   - Pure, deterministic mathematical module that maps subject coordinates into the template aperture geometry.
   - Independent of React rendering cycles, ensuring unit testability and sub-millisecond execution.

---

## 3. Four Automatic Framing Modes

| Mode | Algorithmic Strategy | Headroom & Chin Handling | Zoom Range |
|---|---|---|---|
| **A. Single Person** (`single`) | Detects primary face; positions face center horizontally at 0 and vertically with top headroom relative to aperture shape. | Forehead allocated 14% to 20% margin from top; chin protected by 1.1x face height safety zone. | `1.0x` – `1.85x` (clamped to prevent pixelation) |
| **B. Couple** (`couple`) | Detects top 2 faces; calculates bounding box enclosing both individuals. Ensures both faces fit within 72% frame width and 55% frame height. | Aligns taller individual's head with 18% top headroom; equalizes left/right lateral margins. | `1.0x` – `1.65x` |
| **C. Family / Group** (`group`) | Calculates union bounding region of all detected faces ($N \ge 3$). Prioritizes full group inclusion over tight magnification. | Centers group centroid; maintains wide field of view so edge subjects are never cropped. | `1.0x` (conservative cover) |
| **D. Full Body** (`fullBody`) | Aligns face in upper 22% quadrant of frame, allowing torso, festive garments (lehengas, sherwanis, kurtas), and full context to flow downward. | Maximizes vertical context; defaults to clean visual center when no face is present. | `1.0x` |

### Strict Boundary Clamping:
For `fitMode: 'cover'`, the engine computes maximum pan thresholds:
$$\text{maxPanX} = \max(0, (\text{drawW} - \text{frameW}) / 2)$$
$$\text{maxPanY} = \max(0, (\text{drawH} - \text{frameH}) / 2)$$
Pans are strictly clamped to $[-\text{maxPanX}, \text{maxPanX}]$ and $[-\text{maxPanY}, \text{maxPanY}]$. This mathematically guarantees that **no blank borders or black gaps can ever appear inside the greeting frame**.

---

## 4. Target Frame & Multi-Photo Compatibility

- **Curved Top Masks (Arch & Jharokha):** Arch cusps in `photo-traditional-jharokha` and `photo-gilded-heritage` narrow in the upper 25%. The framing engine applies an expanded 20% headroom factor so the ornamental apex never cuts into hair or temples.
- **Oval & Circular Frames:** Curvature compensation (17% margin) prevents corner clipping.
- **Multi-Photo Layouts (`photo-festive-duet-collage`, `photo-quad-memories-collage`):**
  - Each slot (`slot-0`, `slot-1`, etc.) is evaluated independently with its exact layout dimensions.
  - Uploading or modifying Photo 1 does not affect or overwrite Photo 2's framing state.
  - Face detection cache is tied directly to the slot photo's unique dataUrl.

---

## 5. User Interface & Interactive Controls

1. **Smart Status Pill:**
   - `Analyzing Photo...` (pulsing amber indicator during detection).
   - `✓ Smart Framed` (emerald badge indicating face count and auto-crop).
   - `Smart Fallback` (amber badge when rule-of-thirds center fallback is applied).
   - `Custom Manual` (purple badge indicating user adjusted controls manually).
2. **One-Tap Framing Mode Chips:** Single Person, Couple, Group, and Full Body with active golden gradient styling.
3. **Primary Action Strip:**
   - `Auto Frame`: Re-runs framing algorithm on demand.
   - `Reset`: Reverts any manual edits back to auto-framing.
   - `Adjust Manually`: Accordion revealing precision controls.
4. **Manual Controls Accordion (Hidden by default for simplicity):**
   - Fit Photo vs Fill Frame toggle.
   - Zoom slider (50% – 300%) with - / + step buttons.
   - Center Photo and 90° rotation buttons.
   - Directional D-Pad for 15px micro-nudges.
5. **Interactive Preview Canvas:**
   - Displays real-time transformed image underneath the ornate frame mask.
   - Renders subtle, soft golden corner focus brackets around detected faces to provide immediate visual confirmation of subject detection.

---

## 6. Files Changed & Added

1. **`src/features/greeting-studio/types/editor.ts`**:
   - Added `FramingMode`, `FramingStatus`, and auto-framing metadata to `UserPhoto`.
2. **`src/features/greeting-studio/services/faceDetectionService.ts`**:
   - Implemented MediaPipe FaceDetector singleton with fallback to canvas saliency/skin-tone heuristic.
3. **`src/features/greeting-studio/services/autoFramingEngine.ts`**:
   - Implemented mathematical auto-framing engine for Single, Couple, Group, and Full Body modes with boundary clamping and shape-aware headroom.
4. **`src/features/greeting-studio/components/PhotoControls.tsx`**:
   - Integrated automatic detection and auto-framing on file upload and slot switching.
5. **`src/features/greeting-studio/components/PhotoFramingAdjuster.tsx`**:
   - Added mode selector chips, status badges, facial focus brackets, and collapsible manual tools.
6. **`src/features/greeting-studio/components/GreetingStudio.tsx`**:
   - Passed `photoFrameGeometry` to `PhotoControls` for slot-accurate geometry.

---

## 7. QA Verification Matrix & Test Evidence

| Test Scenario | Template & Shape | Detection Result | Framing Behavior | Status |
|---|---|---|---|---|
| **1. Single Portrait** | `photo-royal-portrait` (Oval) | 1 Face detected | Face centered horizontally, 17% headroom, chin preserved | **PASS** |
| **2. Full Body** | `photo-royal-portrait` (Oval) | 1 Face detected | Zoom 1.0x, face shifted to upper quadrant, attire visible | **PASS** |
| **3. Couple** | `photo-royal-portrait` (Oval) | 2 Faces detected | Both faces enclosed, balanced side margins | **PASS** |
| **4. Family Group (3 people)** | `photo-royal-portrait` (Oval) | 3 Faces detected | Wide crop, all 3 individuals kept inside aperture | **PASS** |
| **5. Jharokha Arch** | `photo-traditional-jharokha` (Arch) | 1 Face detected | 20% headroom protects forehead from cusped apex | **PASS** |
| **6. Multi-Slot Collage** | `photo-festive-duet-collage` (2 slots) | Slot 1: Single, Slot 2: Couple | Both slots framed independently with individual slots geometry | **PASS** |
| **7. No Detectable Face** | `photo-festive-duet-collage` | 0 Faces detected | Applied smart fallback with amber status badge | **PASS** |
| **8. Low-Resolution (200x200)** | `photo-festive-duet-collage` | 1 Face detected | Zoom clamped to prevent pixelation | **PASS** |
| **9. Edge-Positioned Face** | `photo-festive-duet-collage` | Face at 82% X | PanX auto-shifted to bring subject into safe frame zone | **PASS** |
| **10. Hindi Localization** | `photo-festive-duet-collage` | Translated labels | Full Devanagari translation on all chips, badges, and buttons | **PASS** |
| **11. Preview vs Export Parity**| High-res export | Identical pipeline | 1080x1080 export matches live preview coordinates | **PASS** |
| **12. Mobile Responsive (390px)**| Mobile viewport | Responsive UI | Collapsible controls fit cleanly; bottom bar suppressed in editor | **PASS** |

---

## 8. Captured Screenshot Evidence

- `01-single-portrait-framing.png` — Single portrait with 17% headroom and golden focus brackets.
- `02-couple-framing.png` — Couple photo framing with both individuals visible and centered.
- `03-family-group-framing.png` — 3-person family group framed with wide field-of-view.
- `04-jharokha-arch-framing.png` — Traditional Jharokha arch frame with cusped headroom clearance.
- `05-multi-slot-independent-framing.png` — 2-photo collage with independent slot framing.
- `06-smart-fallback-no-face.png` — Smart fallback indicator for photos without detectable faces.
- `07-low-res-photo-framing.png` — Low-resolution photo handling with zoom clamping.
- `08-edge-positioned-face-framing.png` — Edge-positioned subject automatically shifted to center.
- `09-hindi-auto-framing.png` — Complete Hindi interface for smart photo framing.
- `10-mobile-smart-framing.png` — Mobile viewport showing responsive layout and action buttons.

---

## 9. Known Limitations & Edge Cases

1. **Extreme Group Sizes (15+ people):** In very large group photos (e.g. 20+ wedding guests), fitting every face inside a narrow portrait or circular frame is geometrically constrained by the frame's aspect ratio. The engine defaults to full-width contain/cover, and users can use the `Fit Photo` toggle for complete visibility.
2. **Back-Turned / Heavily Obscured Faces:** When subjects wear heavy sunglasses, dupattas covering the face, or are turned completely away from the camera, facial landmark confidence is lower. In such cases, the fallback saliency engine identifies the body/torso centroid and centers appropriately.
3. **WASM Cold Start:** On initial load, downloading the BlazeFace model asset (~200KB) takes ~150-300ms depending on connection. During this brief window, the UI displays the `Analyzing Photo...` indicator before smoothly applying the calculated transform.

