# FestiveWala — Cloudflare Pages Configuration Guide

**Target Domain:** `festivewala.in`  
**Platform:** Cloudflare Pages (Free Plan)  
**Configuration Files:** `public/_redirects`, `public/_headers`  
**Last Updated:** November 2026

---

## 1. Project & Build Configuration

When creating the Cloudflare Pages project in the Cloudflare Dashboard, configure the following settings:

| Setting Name | Value | Notes |
| :--- | :--- | :--- |
| **Project Name** | `festivewala` | Generates default preview domain: `festivewala.pages.dev` |
| **Framework Preset** | `Vite` | Automatically configures standard Vite directory paths |
| **Build Command** | `npm run build` | Executes `sitemap.xml` generation, `tsc -b`, and `vite build` |
| **Build Output Directory** | `dist` | Production assets destination |
| **Root Directory** | `/` | Root of repository |
| **Node.js Version** | `20.18.0` or `22.x` | Configured via environment variable `NODE_VERSION: 20` |
| **Package Manager** | `npm` | Uses existing `package-lock.json` |

### Recommended Environment Variables:
- `NODE_VERSION`: `20` (or `22`)
- `NPM_FLAGS`: `--include=dev` (ensures Vite and Tailwind devDependencies are installed)

---

## 2. SPA Client-Side Routing Configuration (`_redirects`)

Because FestiveWala uses `react-router-dom` with HTML5 History API (`BrowserRouter`), direct navigation or hard-refreshing nested routes (such as `https://festivewala.in/festivals/diwali` or `https://festivewala.in/greeting-cards?mode=photo`) requires the Cloudflare edge server to serve `/index.html` with an HTTP status `200` instead of a `404 Not Found`.

### Redirects Rule (`public/_redirects`)
```
# Cloudflare Pages SPA Routing Redirects
# Non-file requests are served index.html with a 200 status code
/* /index.html 200
```

### Routing Mechanics:
1. **Physical Files:** Any request matching a physical file in `dist/` (e.g. `/assets/index-DC5H8HGy.js`, `/favicon.svg`, `/sitemap.xml`) is served directly with that file.
2. **SPA Routes:** Any non-file path (e.g. `/festivals`, `/festivals/diwali`, `/greeting-cards`, `/rangoli`, `/about`) triggers the fallback rule, serving `/index.html` with status `200`.
3. **Client-Side Hydration:** React Router parses the URL path in the browser and mounts the appropriate view (`FestivalDetailPage`, `GreetingStudio`, etc.) without a full page reload.
4. **404 Handling:** If an unknown path is visited (e.g. `/unknown-fest-123`), React Router's `<Route path="*" element={<NotFoundPage />} />` catches it and displays FestiveWala's themed 404 page.

---

## 3. Caching & HTTP Headers Configuration (`_headers`)

Cloudflare Pages natively honors custom response headers specified in `public/_headers` (which Vite copies to `dist/_headers`).

### Complete `public/_headers` Specification
```ini
# Cloudflare Pages Custom Headers Configuration
# Global Security & Privacy Headers for all paths
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self';

# Cache-Control for immutable Vite static assets (1 year, immutable)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache-Control for HTML documents (always revalidate to pick up fresh deployments)
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate

# Cache-Control for Service Worker (never stale)
/sw.js
  Cache-Control: public, max-age=0, no-cache, no-store, must-revalidate

# Cache-Control for SEO & PWA metadata (1 day browser cache, revalidate)
/sitemap.xml
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800

/robots.txt
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800

/manifest.json
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
```

### Header Strategy Rationale:
- **`max-age=31536000, immutable` for `/assets/*`:** Every JS and CSS file built by Vite contains a unique cryptographic hash in its filename (`index-DC5H8HGy.js`). These assets will never change. Setting a 1-year immutable cache ensures repeat visitors download 0 bytes for assets, saving significant bandwidth.
- **`max-age=0, must-revalidate` for `/` and `/*.html`:** The HTML document must never be permanently cached. When a new deployment is pushed, the browser immediately requests the updated `index.html`, which points to the newly hashed asset filenames.
- **`no-cache, no-store` for `/sw.js`:** Prevents the Service Worker script from being cached, ensuring browser update checks immediately detect any Service Worker updates.

---

## 4. Custom Domain Setup (`festivewala.in`)

To connect the production domain:

1. **Add Custom Domain in Pages:**
   - In Cloudflare Dashboard, go to **Workers & Pages** > **festivewala** > **Custom domains**.
   - Click **Set up a domain** and enter `festivewala.in`.
   - Click **Add domain** again for `www.festivewala.in`.
2. **DNS Records (Cloudflare Managed DNS):**
   - **Apex Record (`festivewala.in`):**
     - Type: `CNAME` (or Cloudflare CNAME Flattening for apex)
     - Target: `festivewala.pages.dev`
     - Proxy status: **Proxied (Orange Cloud)**
   - **Subdomain Record (`www.festivewala.in`):**
     - Type: `CNAME`
     - Target: `festivewala.pages.dev`
     - Proxy status: **Proxied (Orange Cloud)**
3. **Canonical Redirection (Apex vs WWW):**
   - In Cloudflare Dashboard > **Rules** > **Page Rules** (or **Redirect Rules**):
     - Rule: `https://www.festivewala.in/*` -> `https://festivewala.in/$1` (301 Permanent Redirect).
     - Consolidates all search ranking equity to canonical `https://festivewala.in`.

---

## 5. Preview & Production Deployment Workflow

Cloudflare Pages automatically creates isolated preview environments for Git branches and Pull Requests:
- **Production Branch:** `main` (deploys to `festivewala.pages.dev` and `festivewala.in`).
- **Preview Branches:** Any feature branch (e.g. `feature/auto-framing`) receives a unique preview URL (e.g. `https://<commit-hash>.festivewala.pages.dev`).
- **Index Protection:** Cloudflare Pages automatically injects `X-Robots-Tag: noindex` on all preview deployment URLs (`*.pages.dev`), preventing search engines from indexing development previews.

