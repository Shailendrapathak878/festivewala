# FestiveWala — Cloudflare Security & Privacy Architecture (Post-Implementation Revision)

**Target Domain:** `festivewala.in`  
**Platform:** Cloudflare Pages Free Plan  
**Classification:** Zero-Backend / Privacy-First Architecture  
**Audit Date:** November 2026  
**Auditor:** Principal Application Security Engineer & Privacy Auditor

---

## 1. Security Philosophy & Threat Model

FestiveWala operates on a **Zero-Backend, Local-First Architecture**. Because the application has no origin server, no serverless functions, no databases, and manages no user accounts, passwords, or payment cards:
- **Non-Existent Threats:** SQL Injection (SQLi), Server-Side Request Forgery (SSRF), Remote Code Execution (RCE), Database Leaks, Server Credential Theft.
- **Active Threat Surfaces:** Cross-Site Scripting (XSS), Clickjacking, MIME-type Sniffing, Unauthorized Third-Party Network Exfiltration, and Denial of Service (DoS) targeting edge bandwidth.

---

## 2. Hardened Content Security Policy (CSP)

The CSP has been audited and tightened in `public/_headers` (and copied to `dist/_headers`). 

### Production CSP Header
```ini
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self';
```

### Audited Directive Analysis & Tightening:

| Directive | Configured Value | Verification & Rationale | Status |
| :--- | :--- | :--- | :--- |
| `default-src` | `'self'` | Disallows all untrusted origins by default. | **PASS** |
| `script-src` | `'self' 'wasm-unsafe-eval'` | **Tightened:** Removed `'unsafe-inline'`. Production build uses external module script `<script type="module" src="...">`. Added `'wasm-unsafe-eval'` to allow WebAssembly compilation for MediaPipe face detector without opening full JS `eval()`. | **PASS (Tightened)** |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | Allows compiled Tailwind CSS, Google Fonts stylesheets, and dynamic inline DOM styles required by Framer Motion transforms and Canvas layout coordinate bindings. | **PASS (Required)** |
| `font-src` | `'self' https://fonts.gstatic.com data:` | Allows Google Fonts `.woff2` binaries and inline base64 icon fonts. | **PASS** |
| `img-src` | `'self' data: blob:` | **Tightened:** Removed broad wildcard `https:`. FestiveWala only renders local SVGs, uploaded photos (via `FileReader` / `URL.createObjectURL`), and exported Canvas preview blobs. | **PASS (Tightened)** |
| `connect-src` | `'self' https://cdn.jsdelivr.net https://storage.googleapis.com` | Strictly limits XHR/Fetch/WASM requests to self, jsdelivr (MediaPipe WASM binary), and Google Storage (BlazeFace model weights). Disallows all other remote origins. | **PASS** |
| `worker-src` | `'self' blob:` | Allows Service Worker (`sw.js`) and MediaPipe WASM background worker threads. | **PASS** |
| `manifest-src` | `'self'` | Restricts Web App Manifest to `/manifest.json`. | **PASS** |
| `object-src` | `'none'` | Completely disables Flash, Silverlight, Java applets, and legacy plugin vectors. | **PASS** |
| `base-uri` | `'self'` | Prevents malicious injection of `<base>` tags altering relative URL resolution. | **PASS** |
| `frame-ancestors` | `'none'` | Completely disallows embedding FestiveWala in `<iframe>` on any external domain (complete clickjacking protection). | **PASS** |
| `form-action` | `'self'` | Restricts form submission destinations. | **PASS** |

---

## 3. HTTP Security & Transport Headers

| Header | Production Value | Verification & Standards Compliance | Status |
| :--- | :--- | :--- | :--- |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Instructs browsers to enforce HTTPS for 1 year. Configured for HSTS preload eligibility (submission pending live DNS). | **PASS (Preload-Ready)** |
| `X-Content-Type-Options` | `nosniff` | Disables MIME sniffing across all modern browsers. | **PASS** |
| `X-Frame-Options` | `DENY` | Enforces clickjacking protection in legacy user agents lacking CSP `frame-ancestors`. | **PASS** |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Strips URL paths and query parameters on cross-origin requests; sends only origin. | **PASS** |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()` | Explicitly disables unused browser APIs and hardware permissions. | **PASS** |

---

## 4. Dependency & Vulnerability Audit (`npm audit`)

An automated dependency vulnerability audit was executed across all production and development dependencies:

```powershell
npm audit
```

**Audit Output:**
```
found 0 vulnerabilities
```
- **Audit Result:** **PASS (0 Vulnerabilities)**.
- **Dependencies Audited:** React 19, React Router 7, Framer Motion 14, Lucide React 1.66, Tailwind CSS 3.4, MediaPipe Tasks Vision 1.2.0.

---

## 5. Secrets & Credential Exposure Audit

A regex scan of the repository was conducted for sensitive tokens, API keys, passwords, and `.env` files:
- **`.env` files found:** 0
- **Hardcoded secrets found:** 0
- **Audit Result:** **PASS**. Zero private keys, access tokens, or cloud credentials are baked into client-side JavaScript.

---

## 6. Cloudflare Edge WAF & DDoS Defense Strategy

### Free Plan Capabilities (Documented & Ready for Live Activation):
1. **Unmetered L3/L4/L7 DDoS Defense:** Cloudflare's Anycast architecture absorbs network-layer and HTTP flood attacks automatically without dropping legitimate static asset requests.
2. **Security Level:** Medium recommended for standard days; toggleable to High / Under Attack Mode during peak festival traffic.
3. **Bot Fight Mode:** Challenges automated scrapers while whitelisting verified search crawlers (Googlebot, Bingbot).
4. **WAF Custom Firewall Rules (Free Plan: 5 rules available):**
   - Recommended Rule: Block URI paths targeting WordPress/PHP vulnerabilities (`/wp-admin`, `/xmlrpc.php`, `/.env`).

> [!NOTE]
> **Status:** Edge WAF rules will take effect once the project is connected to Cloudflare Dashboard and live DNS is pointed.
