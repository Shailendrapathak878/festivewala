# FestiveWala — Greeting Studio Architecture & System Design
**Phase 3: Premium Greeting Studio & Personalized Card Editor**  
**Document Version:** 3.0.0  
**Status:** Approved & Verified

---

## 1. Architectural Philosophy

The FestiveWala Greeting Studio is engineered as an **entirely client-side, zero-dependency, privacy-first creative suite**. It enables users on mobile smartphones and desktop computers to customize and export luxury festival greeting cards without user accounts, cloud databases, or third-party image processing servers.

### Core Architectural Principles:
1. **100% Client-Side Processing:** All template configurations, vector graphics, typography layouts, user photograph transformations, and PNG exports occur strictly within the client browser runtime.
2. **Mobile-First UX Hierarchy:** Given that over 80% of greeting card creation occurs on mobile devices, the canvas preview and touch controls are prioritized for 360px–430px viewports before progressively adapting to desktop.
3. **Decoupled Feature Domain:** Isolated under `src/features/greeting-studio/` with clean boundaries between data definitions, canvas rendering routines, state management hooks, and presentation components.
4. **State History via Immutable Stacks:** Undo/Redo/Reset mechanisms use a past-present-future stack model, preventing stale index closures and avoiding heavy memory leaks.
5. **Non-Stretching Responsive Compositions:** Rather than stretching the same canvas layout across different aspect ratios, the layout engine programmatically computes distinct compositions for Square (1:1), Story (9:16), Portrait (4:5), and Landscape (16:9).

---

## 2. Directory Structure

```
src/features/greeting-studio/
├── types/
│   ├── template.ts             # Template metadata, palettes, decorative types, formats
│   └── editor.ts               # Customization state, photo transform, history types
├── data/
│   └── templates.ts            # 10 initial signature Diwali templates & festival directory
├── services/
│   ├── layoutEngine.ts         # Aspect-ratio specific coordinate computation
│   ├── textRenderer.ts         # Multiline wrapping, baseline calculation, Devanagari text
│   ├── vectorDrawing.ts        # Handcrafted canvas vector routines (Diyas, Mandalas, Torans)
│   ├── canvasRenderer.ts       # Master canvas orchestrator (background, motifs, photo, text)
│   ├── imageLoader.ts          # Image caching and font readiness synchronization
│   └── exportService.ts        # Native 1080p+ PNG export, download, and Web Share API
├── hooks/
│   └── useEditorHistory.ts     # Past/present/future history stack for undo/redo
└── components/
    ├── GreetingStudio.tsx      # Top-level coordinator (Gallery Mode & Editor Mode)
    ├── FestivalSelector.tsx    # Multi-festival selector with availability states
    ├── TemplateGallery.tsx     # 10-template filterable grid with category pills
    ├── CanvasPreview.tsx       # Dynamic viewport-scaled live canvas stage
    ├── FormatSelector.tsx      # Segmented pills for Square, Story, Portrait, Landscape
    ├── TextControls.tsx        # Title, recipient, message, font, alignment, color presets
    ├── DesignControls.tsx      # Background variants, border styles, particles, accents
    └── PhotoControls.tsx       # Local photo upload, zoom, pan sliders, privacy guarantee
```

---

## 3. End-to-End User Journey

```
[ Homepage CTA / Navigation ]
              │
              ▼
[ Step 1: Festival Selection ] ──> Initial: Diwali 2026 (Architecture ready for 7 others)
              │
              ▼
[ Step 2: Browse & Filter Gallery ] ──> 10 unique templates across 7 categories
              │
              ▼
[ Step 3: Template Selected ] ──> Enters Personalization Editor Mode (URL synced)
              │
              ▼
[ Step 4: Live Customization ] ◄──► [ Live Dynamic Canvas Preview ]
 ├── Text (Title, Recipient, Message, Sender, Fonts)
 ├── Design (Themes, Borders, Starlight particles)
 └── Photo (Optional local image crop/pan/zoom)
              │
              ▼
[ Step 5: Format Selection ] ──> Square (1:1), Story (9:16), Portrait (4:5), Landscape (16:9)
              │
              ▼
[ Step 6: Export & Sharing ]
 ├── High-Resolution PNG Download (1080p+ semantic filename)
 └── Native Web Share API (File sharing or Clipboard Fallback)
```

---

## 4. State Management & History Reducer Pattern

To ensure seamless Undo/Redo/Reset performance without race conditions or memory bloat, `useEditorHistory` implements a past-present-future stack:

```typescript
interface HistoryState {
  past: CardCustomization[];
  present: CardCustomization;
  future: CardCustomization[];
}
```

- **Push State:** When user edits a setting, `past` captures the previous `present` (limited to 30 snapshots), `present` adopts the new state, and `future` is cleared. Rapid keystrokes and slider drags are debounced by 250ms, while discrete clicks (preset buttons, color swatches) push immediately.
- **Undo:** Pops the top snapshot from `past`, shifts current `present` to `future`, and activates previous state.
- **Redo:** Pops the next snapshot from `future`, pushes current `present` to `past`, and activates next state.
- **Memory Safety:** History snapshots store string primitives, typography configurations, and photo transformation offsets (`zoom`, `panX`, `panY`), referencing the same local data URL without duplicating heavy image binaries.

---

## 5. Responsive Layout Architecture

### Mobile Architecture (`<1024px`):
- **Preview Dominance:** The `CanvasPreview` is allocated up to 58vh, scaling down to fit the container width smoothly while maintaining crisp 2D graphics.
- **Segmented Control Drawer:** Editing controls are organized under three concise tabs (`Text`, `Design`, `Photo`) with a maximum height scroll area.
- **Fixed Floating Action Bar:** Sticky bottom pill bar with high-contrast buttons (`Download PNG` and `Share Card`) providing effortless finger reachability.

### Desktop Architecture (`≥1024px`):
- **Two/Three-Column Studio Workspace:**
  - Left panel (5 columns): Complete scrollable editing controls with expanded options.
  - Right panel (7 columns): Prominent centered canvas stage with real-time feedback and helper notes.
  - Floating bottom bar anchored cleanly beneath the studio workspace.

---

## 6. Route Integration

The Greeting Studio is integrated into the application's root routing infrastructure:
- Primary route: `/greeting-cards`
- Direct studio alias: `/greeting-studio`
- Deep linking: `/greeting-cards?template=<id>` automatically launches the editor for the specified template.
- Homepage CTAs (*"Design Greeting Card"*, *"Create Card"*, *"Explore Studio"*) route directly into the active Studio experience.

