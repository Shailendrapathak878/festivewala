# FestiveWala — Traffic Capacity, Bandwidth Modeling & Resource Estimates (Post-Implementation Revision)

**Target Domain:** `festivewala.in`  
**Hosting Infrastructure:** Cloudflare Pages (Free Plan)  
**Visitor Scales Modeled:** 1,000 to 100,000 Visitors  
**Model Basis:** Measured Production Build Asset Sizes (`dist/`)  
**Audit Date:** November 2026  
**Auditor:** Principal Infrastructure & Capacity Planning Architect

---

## 1. Important Modeling Assumptions & Caveats

> [!IMPORTANT]
> **Modeled vs. Measured Concurrency:**
> All concurrency, daily distribution, and monthly data transfer figures in this document are **mathematical estimations based on measured asset sizes and standard web traffic arrival distributions**.
> **No synthetic distributed load test (e.g. k6, Locust, or JMeter) has been executed against live Cloudflare infrastructure**, in accordance with Cloudflare policies against unsolicited stress testing.
> Because FestiveWala operates as a 100% static application with **zero origin web server, zero serverless functions, and zero databases**, capacity is bounded by Cloudflare's Anycast edge distribution and user device processing, not origin server compute.

---

## 2. Baseline Measured Payload Metrics

Derived from exact byte sizes measured via `scripts/measure_assets.mjs` on `dist/`:

| Visitor Scenario | Transferred Assets | Measured Data Transfer (Gzip) | Edge Requests |
| :--- | :--- | :--- | :--- |
| **First-Time Homepage Only (Cold Cache)** | `index.html`, `index.css`, core runtime JS (`vendor-react`, `vendor-motion`, `vendor-lucide`), `HomePage.js`, favicons. | **193.25 KB** | ~7 requests |
| **First-Time With Wishes Showcase (Cold)** | Above + `WishesShowcase.js` (deferred trilingual wishes). | **393.59 KB** | ~8 requests |
| **First-Time With Greeting Studio (Cold)** | Above + `GreetingCardsPreviewPage.js` (on demand). | **503.55 KB** | ~9 requests |
| **Weighted Average Session (Cold Cache)** | Blended across homepage (40%), festival browsing (30%), studio (20%), and guides (10%). | **~305.00 KB** | ~8 requests |
| **Returning Visitor (Warm Cache)** | Static assets cached locally for 1 year; only revalidates HTML (`304 Not Modified`). | **~1.50 KB** | 1 request |
| **PWA Active (Service Worker)** | Handled locally from CacheStorage; background revalidation. | **0.00 KB network transfer** | 0 requests |

### Population Distribution Assumption:
- **First-Time Visitors (Cold Cache):** 70% of total visitors.
- **Returning Visitors (Warm Cache):** 30% of total visitors.

---

## 3. Detailed Traffic Models by Visitor Tier

### Tier 1: 1,000 Visitors / Month
- **Daily Visitors (30-day average):** ~33 visitors/day
- **Peak Day (Festival Eve):** ~200 visitors/day
- **Estimated Peak Concurrency (Modeled):** ~3–5 concurrent sessions
- **Data Transfer Calculation:**
  - Cold Cache (700 visitors × 305 KB): 213,500 KB (208.5 MB)
  - Warm Cache (300 visitors × 1.5 KB): 450 KB (0.44 MB)
- **Total Monthly Data Transfer:** **~209 MB (0.21 GB)**
- **Edge HTTP Requests:** ~5,900 requests/month
- **Free Plan Limit Margin:** > 99.9% headroom remaining. Cost: **$0.00**.

---

### Tier 2: 10,000 Visitors / Month
- **Daily Visitors (30-day average):** ~333 visitors/day
- **Peak Day (Festival Eve):** ~2,500 visitors/day
- **Estimated Peak Concurrency (Modeled):** ~25–35 concurrent sessions
- **Data Transfer Calculation:**
  - Cold Cache (7,000 visitors × 305 KB): 2,135,000 KB (2.036 GB)
  - Warm Cache (3,000 visitors × 1.5 KB): 4,500 KB (0.004 GB)
- **Total Monthly Data Transfer:** **~2.04 GB**
- **Edge HTTP Requests:** ~59,000 requests/month
- **Free Plan Limit Margin:** > 99.5% headroom remaining. Cost: **$0.00**.

---

### Tier 3: 20,000 Visitors / Month
- **Daily Visitors (30-day average):** ~667 visitors/day
- **Peak Day (Festival Eve):** ~5,500 visitors/day
- **Estimated Peak Concurrency (Modeled):** ~50–70 concurrent sessions
- **Data Transfer Calculation:**
  - Cold Cache (14,000 visitors × 305 KB): 4,270,000 KB (4.072 GB)
  - Warm Cache (6,000 visitors × 1.5 KB): 9,000 KB (0.009 GB)
- **Total Monthly Data Transfer:** **~4.09 GB**
- **Edge HTTP Requests:** ~118,000 requests/month
- **Free Plan Limit Margin:** > 99.0% headroom remaining. Cost: **$0.00**.

---

### Tier 4: 30,000 Visitors / Month (Target Operational Scale)
- **Daily Visitors (30-day average):** ~1,000 visitors/day
- **Peak Day (Diwali / Holi Day):** ~9,000 visitors/day
- **Peak Hour (Morning Greetings Burst):** ~1,800 visitors/hour (~30 visitors/minute)
- **Estimated Peak Concurrency (Modeled):** ~90–115 concurrent sessions
- **Data Transfer Calculation:**
  - Cold Cache (21,000 visitors × 305 KB): 6,405,000 KB (6.108 GB)
  - Warm Cache (9,000 visitors × 1.5 KB): 13,500 KB (0.013 GB)
- **Total Monthly Data Transfer:** **~6.13 GB**
- **Edge HTTP Requests:** ~177,000 requests/month
- **Transfer Estimate Reconciliation:**
  - Previous Implementation Report Estimated: **6.02 GB**
  - Independent Audit Recalculation: **6.13 GB**
  - Variance: **+1.8%** (attributed to exact gzip accounting of individual utility chunks).
- **Free Plan Compliance Assessment:** 6.13 GB is negligible for Cloudflare Pages, which provides unmetered static bandwidth for legitimate web applications. Cost: **$0.00**.

---

### Tier 5: 100,000 Visitors / Month (Viral Celebration Spike)
- **Daily Visitors (30-day average):** ~3,333 visitors/day
- **Peak Day (Diwali Main Day):** ~35,000 visitors/day
- **Peak Hour (Peak Morning Burst):** ~6,500 visitors/hour (~108 visitors/minute)
- **Estimated Peak Concurrency (Modeled):** ~350–500 concurrent sessions
- **Data Transfer Calculation:**
  - Cold Cache (70,000 visitors × 305 KB): 21,350,000 KB (20.36 GB)
  - Warm Cache (30,000 visitors × 1.5 KB): 45,000 KB (0.043 GB)
- **Total Monthly Data Transfer:** **~20.43 GB**
- **Edge HTTP Requests:** ~590,000 requests/month
- **System Stability Analysis:**
  - At 108 arrivals/minute, edge requests peak at approximately 15–25 requests per second (RPS).
  - Cloudflare's Anycast edge handles millions of RPS globally; 25 RPS on pre-cached static files operates well within edge capabilities.
  - Because all image processing and greeting card generation execute locally on the user's GPU/CPU via Canvas, **there is zero server compute strain**. Cost: **$0.00**.

---

## 4. Summary Matrix of Traffic Models

| Visitor Tier | Monthly Transfer (GB) | Est. Peak Day Visitors | Est. Peak Concurrency (Modeled) | Monthly Edge Requests | Cost on Cloudflare Free |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1,000** | 0.21 GB | ~200 | ~5 | ~5,900 | $0.00 |
| **10,000** | 2.04 GB | ~2,500 | ~35 | ~59,000 | $0.00 |
| **20,000** | 4.09 GB | ~5,500 | ~70 | ~118,000 | $0.00 |
| **30,000** | **6.13 GB** | **~9,000** | **~110** | **~177,000** | **$0.00** |
| **100,000** | 20.43 GB | ~35,000 | ~450 | ~590,000 | $0.00 |
