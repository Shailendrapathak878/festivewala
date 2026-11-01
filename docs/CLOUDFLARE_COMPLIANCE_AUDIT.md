# FestiveWala — Cloudflare Compliance & Architecture Audit (Post-Implementation Revision)

**Target Domain:** `festivewala.in`  
**Deployment Target:** Cloudflare Pages (Free Plan)  
**Document Status:** Verified in Local Production Environment; Live Edge Deployment Pending  
**Audit Date:** November 2026  
**Auditor:** Principal Cloudflare Platform Architect, Application Security & Privacy Auditor

---

## 1. Executive Summary & Audit Scope

This document provides an independent post-implementation compliance audit of **FestiveWala** (`festivewala.in`) targeted for **Cloudflare Pages Free Plan**.

### Production Status Clarification:
> [!IMPORTANT]
> The FestiveWala codebase, production build configuration, SPA routing (`_redirects`), custom headers (`_headers`), Service Worker (`sw.js`), and asset chunking have been compiled and verified in a production-identical preview environment (`dist/` build served via Vite preview on Node 20).
> **Live deployment to public DNS (`festivewala.in`) has NOT yet been authorized by the project owner and remains PENDING.** All live Cloudflare edge network assertions in this document reflect architectural compliance and local verification, not live DNS resolution.

---

## 2. Cloudflare Pages Free Plan Limits vs. Measured Metrics

All figures below are derived from empirical measurements of `dist/` created by `npm run build`:

| Free Plan Parameter | Official Cloudflare Limit | FestiveWala Measured Metric | Compliance Status | Technical Analysis & Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Total Files per Deployment** | 20,000 files | **51 static assets** | **PASS** (0.255% of limit) | Measured via `scripts/measure_assets.mjs` across `dist/`. |
| **Max Individual File Size** | 25 MiB (26.2 MB) | **1.03 MB** uncompressed / **200.3 KB** gzip (`WishesShowcase`) | **PASS** (3.9% of limit) | No file exceeds 1.05 MB. All files minified and hashed. |
| **Monthly Builds** | 500 builds / month | ~10–20 builds / month planned | **PASS** (Estimated ~3%) | Documented `[skip ci]` strategy for markdown/docs commits. |
| **Concurrent Builds** | 1 build at a time | 1 build | **PASS** | Sequential Git commit triggers. |
| **Build Timeout** | 20 minutes | **~2.62 seconds** (`vite build`) | **PASS** (0.22% of timeout) | Measured in PowerShell build pipeline. |
| **Pages Functions Requests** | 100,000 requests / day | **0 requests / day** | **PASS** (Zero backend) | Zero serverless functions, zero backend endpoints. |
| **Custom Domains** | Unlimited | 2 (`festivewala.in`, `www.festivewala.in`) | **PASS (Configured)** / **PENDING (Live DNS)** | Awaiting final user approval for DNS pointing. |
| **Bandwidth (Static Assets)** | Unlimited for legitimate HTML/CSS/JS/SVG | Modeled at ~6.13 GB for 30k visitors | **PASS** | Legitimate web application static content. |

---

## 3. Cloudflare CDN Service-Specific Terms Audit (Section 2.8)

### Cloudflare Terms Requirement:
Cloudflare Application Services Specific Terms (§2.8) prohibit using the CDN primarily for video streaming, audio delivery, or disproportionate bulk binary storage without an enterprise agreement.

### FestiveWala Empirical Evidence:
1. **Zero Video / Audio Hosting (PASS):**
   - Source code audit across all `.ts`, `.tsx`, `.html`, `.json`, and `.css` files confirms **zero `.mp4`, `.webm`, `.mp3`, `.wav`, or `.ogg` assets**.
2. **Zero Server-Side User Photos (PASS):**
   - Photos uploaded by users in the Personal Photo Wishes Studio are read strictly in-memory via `FileReader` / `URL.createObjectURL`.
   - Inspection of source code and browser network requests confirms **no HTTP POST, PUT, or WebSocket transmission of images**.
3. **Canvas-Based High-DPI Generation (PASS):**
   - Greeting cards are rendered as vectors and rendered locally onto high-DPI HTML5 `<canvas>`.
   - Card downloads are produced locally via `canvas.toBlob()` / `canvas.toDataURL()`. Cloudflare edge servers store zero user-generated cards.
4. **Proportionate Artwork Payload (PASS):**
   - Total static visual assets (SVGs, favicon, and brand motifs) total **under 45 KB**.

---

## 4. Complete Inventory of External Requests & Privacy Assessment

A strict regex and network scan was performed to identify every external resource request:

| External Resource | Protocol & Destination | Purpose | Receives Personal Data? | Privacy & Security Assessment |
| :--- | :--- | :--- | :--- | :--- |
| **Google Fonts Stylesheets** | `https://fonts.googleapis.com` | Festive typography stylesheets (Cinzel, Cormorant Garamond, Noto Sans Devanagari, Rozha One, Yatra One) | **NO** (Only standard browser User-Agent/IP) | Whitelisted in CSP `style-src`. Preconnected in `index.html`. |
| **Google Fonts Webfonts** | `https://fonts.gstatic.com` | Binary `.woff2` font files | **NO** | Whitelisted in CSP `font-src`. Cached in browser via Service Worker. |
| **MediaPipe WASM Runtime** | `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm` | WebAssembly face detector runtime binary | **NO** | Whitelisted in CSP `connect-src`. Loaded only when user opens Photo Studio mode. |
| **BlazeFace Model Weights** | `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite` | 220 KB short-range face detection model | **NO** | Whitelisted in CSP `connect-src`. Loaded only on demand. |
| **WhatsApp Share Intent** | `https://wa.me/?text=...` | Standard external hyperlink for user-initiated sharing | **NO** (Client-side URL navigation) | Opened via standard `window.open` on explicit user click. |
| **Google AdSettings Link** | `https://adssettings.google.com` | Informational anchor tag in Privacy Policy text | **NO** | Static anchor link. |

> [!NOTE]
> **No Remote Analytics or Telemetry:** There are no analytics libraries (Google Analytics, Meta Pixel, Amplitude, Sentry, Mixpanel, LogRocket) bundled in the application.

---

## 5. Architectural Findings & Verified Corrections

### Correction 1: HSTS Preload Status
- **Initial Claim:** "HSTS preloaded (`max-age=31536000`)."
- **Correction:** The HTTP response header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` is configured in `_headers`. However, `festivewala.in` has **not yet been submitted** to the Chrome HSTS Preload list (`hstspreload.org`) because submission requires active HTTPS serving on public DNS. Status is corrected to **HSTS Preload-Ready**.

### Correction 2: SPA Routing and HTTP 404 Status
- **Initial Claim:** "Unknown routes must show a useful 404 experience."
- **Correction:** Cloudflare Pages uses `/* /index.html 200` in `_redirects`. Under this rule, when a visitor or web crawler requests an unmapped URL (e.g. `/unknown-fest-123`), the edge server returns HTTP status **200 OK** with `index.html`. React Router then mounts `<NotFoundPage />` on the client. 
- **SEO Implication:** This constitutes a **Soft 404** to search engines. Because FestiveWala publishes an exact canonical `sitemap.xml` with all 22 legitimate routes and references it in `robots.txt`, search engines index only canonical routes. A true edge 404 requires either static site generation (SSG) of all routes or Cloudflare Workers, which was excluded from the Free Plan architecture.

---

## 6. Audit Verdict

| Audit Domain | Verdict | Notes |
| :--- | :--- | :--- |
| **Free Plan Limits** | **PASS** | 51 assets, 1.03 MB max asset, 0 functions. |
| **CDN §2.8 Acceptable Use** | **PASS** | Zero video/audio, zero server photos, local canvas generation. |
| **Local-First Privacy** | **PASS** | All user data stays on device; zero tracking scripts. |
| **Configuration Correctness** | **PASS** | `_headers`, `_redirects`, `sw.js`, `manifest.json` verified. |
| **Live Edge Deployment** | **PENDING** | Awaiting user authorization before live DNS configuration. |
