# FestiveWala — Static Asset Optimization & Performance Verification (Post-Implementation Revision)

**Target Domain:** `festivewala.in`  
**Platform:** Cloudflare Pages (Free Plan)  
**Measurement Basis:** Actual Production Build (`dist/`) & Chrome DevTools Performance Trace  
**Audit Date:** November 2026  
**Auditor:** Principal Frontend Performance & DevOps Engineer

---

## 1. Bundle Optimization & Code-Splitting Audit

### Initial Monolith vs. Optimized Modular Chunking:
- **Pre-Optimization Monolith:** A single `index-BIFk0nMk.js` file of **2,647.43 KB** uncompressed (636.92 KB gzip).
- **Post-Optimization Chunked Build:** Code-split into **51 modular static assets** totaling **2.681 MB raw** and **677.28 KB gzip** across the entire website.
- **Initial Homepage Payload:** Reduced to **~193.25 KB gzip** (HTML + CSS + core runtime + Homepage chunk + favicons).

---

## 2. Measured Production Asset Inventory (`dist/`)

Extracted via `scripts/measure_assets.mjs` on the compiled `dist/` directory:

| Asset Name | Raw Size | Gzip Size | Cache Strategy | Purpose / Load Trigger |
| :--- | :--- | :--- | :--- | :--- |
| `WishesShowcase-Bw0E7v4e.js` | 1,031.78 KB | **200.34 KB** | 1-Year Immutable | 5,400+ trilingual wishes database (deferred on Homepage) |
| `GreetingCardsPreviewPage-CgQ80-EY.js` | 474.22 KB | **109.96 KB** | 1-Year Immutable | Greeting Card Studio & Canvas compositor (on demand) |
| `vendor-react-CE6H0GrF.js` | 243.23 KB | **76.42 KB** | 1-Year Immutable | React 19, React DOM, React Router 7 |
| `vendor-motion-D8v0pMMj.js` | 133.37 KB | **44.26 KB** | 1-Year Immutable | Framer Motion animation engine |
| `vendor-mediapipe-D3kxTpdk.js` | 150.40 KB | **44.06 KB** | 1-Year Immutable | MediaPipe Tasks Vision wrapper (Photo Studio on demand) |
| `festivalDetails-Cy2LoEeV.js` | 99.70 KB | **30.85 KB** | 1-Year Immutable | Detailed ritual, muhurat & recipe database |
| `HomePage-eefGbu5V.js` | 76.92 KB | **19.08 KB** | 1-Year Immutable | Homepage hero carousel, countdown, quick actions |
| `index-DC5H8HGy.js` | 64.70 KB | **17.40 KB** | 1-Year Immutable | Application bootstrap & router shell |
| `index-33O5yfxw.css` | 85.99 KB | **13.40 KB** | 1-Year Immutable | Compiled Tailwind CSS styles |
| `RangoliPage-Bv0_9jQ-.js` | 45.22 KB | **13.05 KB** | 1-Year Immutable | Rangoli showcase & filter gallery (on demand) |
| `DecorationsPage-Rf71rL0u.js` | 38.36 KB | **11.71 KB** | 1-Year Immutable | Festive decor ideas & photo inspirations (on demand) |
| `vendor-lucide-Ci4eKn3T.js` | 32.16 KB | **11.42 KB** | 1-Year Immutable | Tree-shaken Lucide icons |
| `FestivalGuidesPage-CpUTshfh.js` | 32.43 KB | **10.54 KB** | 1-Year Immutable | Ritual guides & celebration how-to articles |
| `GiftIdeasPage-CjzGhCjk.js` | 31.22 KB | **9.27 KB** | 1-Year Immutable | Festive gifting recommendations |
| `FestivalDetailPage-DF9QwpZR.js` | 37.04 KB | **8.69 KB** | 1-Year Immutable | Festival detail route component |
| `seoMetadata-BZOk_0OH.js` | 18.58 KB | **4.90 KB** | 1-Year Immutable | Trilingual SEO keywords & meta schema |
| `EditorialSection-BrCqKPis.js` | 12.25 KB | **4.35 KB** | 1-Year Immutable | Cultural editorial insights section |
| `PrivacyPolicyPage-B7wPYtZo.js` | 10.80 KB | **3.62 KB** | 1-Year Immutable | Privacy Policy legal page |
| `AboutPage-zZZcJSe4.js` | 11.00 KB | **3.59 KB** | 1-Year Immutable | About FestiveWala brand page |
| `DisclaimerPage-B6EJfQ7I.js` | 8.81 KB | **3.23 KB** | 1-Year Immutable | Legal disclaimer page |
| `FestivalsPage-B0FgkXd8.js` | 10.43 KB | **3.08 KB** | 1-Year Immutable | Festival catalog index page |
| `TermsPage-CrufSZuc.js` | 9.09 KB | **3.07 KB** | 1-Year Immutable | Terms of Service legal page |
| `festivals-BDxdnbsH.js` | 8.18 KB | **3.01 KB** | 1-Year Immutable | Festival core data catalog |
| `ContactPage-B7bWw8aM.js` | 9.89 KB | **2.92 KB** | 1-Year Immutable | Contact form & details |
| `index.html` | 2.26 KB | **0.92 KB** | Revalidate (max-age=0) | HTML entry document |
| 16 Brand SVGs & PNGs | ~3.4 KB each | ~1.16 KB each | 1-Year Immutable | OpenGraph social preview images |
| Other minor chunks & SVGs | < 2 KB each | < 1 KB each | 1-Year Immutable | Utility components, mandala motifs |
| **TOTAL (All 51 Assets)** | **2,745.14 KB** | **677.28 KB** | — | **Entire Website Payload** |

---

## 3. Verified Performance Metrics (Chrome DevTools Performance Trace)

Measured in Chromium on production build (`http://localhost:4173/`):

| Performance Metric | Measured Value (Desktop) | Measured Value (Mobile 390×844) | Google Core Web Vitals Threshold | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Time to First Byte (TTFB)** | **16 ms** | **18 ms** | < 800 ms (Good) | **PASS** |
| **DOMContentLoaded** | **89 ms** | **99 ms** | — | **PASS** |
| **First Paint (FP)** | **104 ms** | **140 ms** | — | **PASS** |
| **First Contentful Paint (FCP)** | **176 ms** | **204 ms** | < 1,800 ms (Good) | **PASS** |
| **Largest Contentful Paint (LCP)** | **924 ms** | **980 ms** | < 2,500 ms (Good) | **PASS** |
| **Cumulative Layout Shift (CLS)** | **0.00** | **0.00** | < 0.10 (Good) | **PASS (Zero Shift)** |
| **Used JS Heap Memory** | **50.92 MB** | **48.10 MB** | < 150 MB (Healthy) | **PASS** |

---

## 4. Service Worker Caching & Offline Capabilities

### Verified Caching Mechanics:
1. **Cache Storage Buckets:**
   - `fw-static-festivewala-v1.0.0`: Pre-caches the core application shell (`/`, `index.html`, `manifest.json`, `favicon.svg`) and immutable hashed JS/CSS assets.
   - `fw-runtime-festivewala-v1.0.0`: Caches navigated routes and runtime Google Fonts (`.woff2`).
2. **Update Handling:**
   - Verified that when a new build is deployed, `sw.js` detects the update and logs: `[FestiveWala SW] New content available; please refresh to update.`.
3. **Offline Limitations Audit:**
   - **Shell & Visited Routes:** Fully accessible offline.
   - **First-Visit Studio Limitations:** If a user goes offline before ever navigating to `/greeting-cards`, the dynamic studio chunk and external MediaPipe WASM binary cannot be fetched.
   - **Offline Fallback Guarantee:** FestiveWala's built-in mathematical Saliency/Rule-of-Thirds heuristic engine is bundled in the studio chunk and operates 100% offline with zero external network dependencies once the studio chunk is loaded.
