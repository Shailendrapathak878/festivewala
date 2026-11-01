# Google Search Console Setup & Verification Guide
**Brand:** FestiveWala  
**Domain:** `https://festivewala.in`  
**Protocol:** HTTPS  
**Sitemap Index:** `https://festivewala.in/sitemap.xml`  
**Phase:** 7.2 Complete Technical SEO Implementation  
**Status:** Verification Ready (Pre-launch)

---

## 1. Domain Ownership Verification Methods

FestiveWala domain is registered via GoDaddy and will be hosted via Cloudflare Pages. Domain-level verification is the recommended method as it covers all protocols (`http://`, `https://`) and all subdomains (`festivewala.in`, `www.festivewala.in`).

### Method A: DNS TXT Record (Recommended)
1. Log in to the [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain** property type and enter `festivewala.in`.
3. GSC will generate a unique TXT verification token:
   ```
   google-site-verification=[INSERT_GSC_VERIFICATION_CODE_HERE]
   ```
4. Log into GoDaddy DNS Management for `festivewala.in` (or Cloudflare DNS once nameservers are pointed):
   - **Type:** `TXT`
   - **Name:** `@` (root)
   - **Value:** `google-site-verification=[INSERT_GSC_VERIFICATION_CODE_HERE]`
   - **TTL:** `Auto` or `1 Hour` (3600 seconds)
5. Save the DNS record and allow 5–30 minutes for DNS propagation.
6. Click **Verify** in Google Search Console.

### Method B: HTML Meta Tag Verification (Fallback)
If DNS verification takes time to propagate, use the HTML Meta Tag method:
1. Choose **URL prefix** property type: `https://festivewala.in/`.
2. Copy the meta tag provided:
   ```html
   <meta name="google-site-verification" content="[INSERT_GSC_VERIFICATION_CODE_HERE]" />
   ```
3. Insert this tag inside the `<head>` of `index.html` right above Google Fonts.
4. Click **Verify**.

---

## 2. XML Sitemap Submission

Once domain verification is confirmed:
1. Navigate to **Sitemaps** in the left sidebar menu.
2. In the "Add a new sitemap" input field, submit the relative path:
   ```
   sitemap.xml
   ```
   *(Google will append this to `https://festivewala.in/sitemap.xml`)*
3. Verify that the status shows **"Success"** and the discovered URL count matches **22 URLs**.

### Discovered URL Inventory Checklist (22 Canonical Routes)
- [x] `https://festivewala.in/` (Homepage)
- [x] `https://festivewala.in/festivals` (Festival Explorer)
- [x] `https://festivewala.in/festivals/diwali` (Diwali Festival Hub)
- [x] `https://festivewala.in/festivals/holi` (Holi Festival Hub)
- [x] `https://festivewala.in/festivals/raksha-bandhan` (Rakhi Festival Hub)
- [x] `https://festivewala.in/festivals/christmas` (Christmas Festival Hub)
- [x] `https://festivewala.in/festivals/new-year` (New Year Festival Hub)
- [x] `https://festivewala.in/wishes` (Wishes & Shayari Hub)
- [x] `https://festivewala.in/greeting-cards` (Greeting Studio)
- [x] `https://festivewala.in/rangoli` (Rangoli Gallery)
- [x] `https://festivewala.in/decoration-ideas` (Decorations Gallery)
- [x] `https://festivewala.in/gift-ideas` (Gift Ideas Gallery)
- [x] `https://festivewala.in/festival-guides` (Guides Directory)
- [x] `https://festivewala.in/festival-guides/diwali-five-days-significance` (Guide)
- [x] `https://festivewala.in/festival-guides/eco-friendly-festival-guide` (Guide)
- [x] `https://festivewala.in/festival-guides/holi-herbal-colors-safety` (Guide)
- [x] `https://festivewala.in/festival-guides/festival-home-cleaning-declutter` (Guide)
- [x] `https://festivewala.in/about` (About FestiveWala)
- [x] `https://festivewala.in/contact` (Contact Us)
- [x] `https://festivewala.in/privacy-policy` (Privacy Policy)
- [x] `https://festivewala.in/terms-of-service` (Terms of Service)
- [x] `https://festivewala.in/disclaimer` (Disclaimer)

---

## 3. URL Inspection Tool & Priority Indexing Request Order

When the site is pushed live to production, use the **URL Inspection Tool** to verify live rendering and request indexing in the following strict priority batches:

### Tier 1: Core Landing & Pillar Pages (Day 1)
1. `https://festivewala.in/` (Homepage)
2. `https://festivewala.in/wishes` (High-traffic intent)
3. `https://festivewala.in/greeting-cards` (Core product tool)
4. `https://festivewala.in/festivals` (Festival directory)

### Tier 2: Dedicated Festival Hubs (Day 2)
1. `https://festivewala.in/festivals/diwali` (Highest search volume)
2. `https://festivewala.in/festivals/holi` (High seasonal demand)
3. `https://festivewala.in/festivals/raksha-bandhan`
4. `https://festivewala.in/festivals/christmas`
5. `https://festivewala.in/festivals/new-year`

### Tier 3: Inspiration & Guides (Day 3)
1. `https://festivewala.in/rangoli`
2. `https://festivewala.in/decoration-ideas`
3. `https://festivewala.in/gift-ideas`
4. `https://festivewala.in/festival-guides`
5. `https://festivewala.in/festival-guides/diwali-five-days-significance`
6. `https://festivewala.in/festival-guides/eco-friendly-festival-guide`

### Tier 4: Legal & Trust Pages (Day 4)
1. `https://festivewala.in/about`
2. `https://festivewala.in/contact`
3. `https://festivewala.in/privacy-policy`
4. `https://festivewala.in/terms-of-service`
5. `https://festivewala.in/disclaimer`

---

## 4. Coverage & Indexing Status Monitoring

Monitor the **Pages** indexation report weekly:
1. **Valid (Indexed):** Ensure all 22 submitted canonical URLs move to the "Indexed" category within 14–21 days of launch.
2. **Discovered - currently not indexed:** If pages linger in this state, check internal links and run an inspection request.
3. **Crawled - currently not indexed:** Review content depth, trilingual word count, and mobile layout.
4. **Duplicate without user-selected canonical:** Check that `<link rel="canonical" href="https://festivewala.in/..." />` is firing correctly via `SEOHead.tsx`.

---

## 5. Rich Results Status Monitoring

FestiveWala embeds comprehensive JSON-LD schemas. Verify the following rich snippets in GSC:
- **Breadcrumbs:** Active on all subpages via `BreadcrumbList` schema.
- **FAQ:** Active on `/festivals/diwali`, `/festivals/holi`, etc. via `FAQPage` schema.
- **Organization:** Active on `/` and `/about` via `Organization` schema.
- **Event:** Active on festival hubs via `Event` schema.
- **Article / HowTo:** Active on festival guides via `Article` schema.

Ensure zero errors and zero unparseable structured data warnings under **Enhancements** tab.

---

## 6. Core Web Vitals & Mobile Usability Tracking

- **LCP (Largest Contentful Paint):** Target < 2.5 seconds on 4G mobile devices.
- **INP (Interaction to Next Paint):** Target < 200 ms on filter changes and tab switches.
- **CLS (Cumulative Layout Shift):** Target < 0.1 during dynamic card loading.
- **Mobile Usability:** Verify that touch targets are at least 44x44px and no content overflows viewport.

