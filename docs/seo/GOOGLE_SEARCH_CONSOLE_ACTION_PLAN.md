# FestiveWala — Google Search Console Action Plan & Owner Checklist

**Domain:** `https://festivewala.in`  
**Publisher / Owner:** FestiveWala Team  
**Date:** November 6, 2026  
**Auditing Note:** Google Search Console access requires owner-level Google Account authorization. The actions below must be completed directly by the site owner in the Google Search Console dashboard.

---

## 1. Domain Property Verification Checklist

Google Search Console allows verification via several official methods. Choose the most convenient verified method:

### Method A: Domain-Level Verification via DNS TXT Record (Recommended)
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** &rarr; Select **Domain** (e.g., `festivewala.in`).
3. Copy the unique `google-site-verification=...` TXT record provided by Google.
4. Log in to your Cloudflare Dashboard &rarr; select **festivewala.in** &rarr; **DNS** &rarr; **Records**.
5. Add a new record:
   - **Type:** `TXT`
   - **Name:** `@` (or `festivewala.in`)
   - **Content:** Paste the `google-site-verification` string.
   - **TTL:** Auto.
6. Return to Google Search Console and click **Verify**.

### Method B: URL Prefix Verification via Google Analytics 4 (Instant)
Since Google Analytics 4 Measurement ID `G-D6RM3NJ0N3` is already active in the `<head>` of `https://festivewala.in`:
1. Log in to Google Search Console using the same Google Account that owns the GA4 property.
2. Select **URL prefix** &rarr; Enter `https://festivewala.in`.
3. Choose **Google Analytics** as the verification method.
4. Click **Verify** (Instant automatic verification).

---

## 2. Sitemap Submission Workflow

1. In Google Search Console, navigate to the left-hand menu and click **Sitemaps**.
2. Under **Add a new sitemap**, enter:
   ```
   sitemap.xml
   ```
   *(Full URL: `https://festivewala.in/sitemap.xml`)*
3. Click **Submit**.
4. Confirm that the status reports **"Success"** and shows **30 discovered pages**.

---

## 3. Prioritized URL Inspection & Manual Indexing Queue

After sitemap submission, Googlebot schedules crawls based on site authority. To accelerate indexing for the current festive peak (Dhanteras and Diwali), manually request indexing for the following prioritized URLs via the **URL Inspection Tool** (top search bar in Search Console):

### Priority 1: Core Landing & Seasonal Hero Pages (Submit Immediately)
1. `https://festivewala.in/` (Homepage)
2. `https://festivewala.in/festivals/dhanteras` (Dhanteras Celebration & Rituals Guide)
3. `https://festivewala.in/wishes/dhanteras` (100 Best Dhanteras Wishes)
4. `https://festivewala.in/greetings/dhanteras` (Dhanteras Greeting Card Maker)
5. `https://festivewala.in/photo-greetings/dhanteras` (Dhanteras Photo Greeting Frames)
6. `https://festivewala.in/festivals/diwali` (Complete Diwali 5-Day Guide)
7. `https://festivewala.in/wishes/diwali` (Diwali Wishes & Shayari)
8. `https://festivewala.in/greetings/diwali` (Diwali Greeting Cards Studio)

### Priority 2: Core Platform Tools & Creative Galleries
9. `https://festivewala.in/greeting-cards` (Free Online Greeting Card Maker Hub)
10. `https://festivewala.in/wishes` (Festival Wishes Hub in Hindi & English)
11. `https://festivewala.in/rangoli` (Rangoli Designs for Diwali Gallery)
12. `https://festivewala.in/gift-ideas` (Diwali Gift Ideas Hub)
13. `https://festivewala.in/decoration-ideas` (Festive Home Decoration Ideas)
14. `https://festivewala.in/festival-guides` (Indian Festivals and Traditions Hub)
15. `https://festivewala.in/inspiration` (Cultural Inspiration Hub)

### Priority 3: Deep Cultural Guides
16. `https://festivewala.in/festival-guides/diwali-five-days-significance`
17. `https://festivewala.in/festival-guides/festival-home-cleaning-declutter`
18. `https://festivewala.in/festival-guides/eco-friendly-festival-guide`
19. `https://festivewala.in/festival-guides/holi-herbal-colors-safety`

### Priority 4: E-E-A-T Trust & Editorial Pages
20. `https://festivewala.in/about`
21. `https://festivewala.in/contact`
22. `https://festivewala.in/privacy-policy`

---

## 4. Search Console Diagnostics & Troubleshooting Guide

| Issue / Report | What to Look For in Search Console | Recommended Action |
| :--- | :--- | :--- |
| **"Discovered – currently not indexed"** | Googlebot knows the URL exists but hasn't scheduled crawl time. | Common for fresh domains. Use the prioritized manual indexing queue above. Ensure strong internal links from indexed pages. |
| **"Crawled – currently not indexed"** | Googlebot crawled the page but initially evaluated content as thin or low-intent. | Our Phase 4 & 5 content additions (3-step guides, FAQs, Schema.org) directly resolve this. Request re-indexing. |
| **"Page with redirect"** | Checks whether HTTP &rarr; HTTPS or trailing slashes cause redirect chains. | FestiveWala has canonical tags matching Cloudflare Pages URL rules (no trailing slash on subroutes, trailing slash on root `/`). |
| **"Failed: Blocked by robots.txt"** | Checks whether robots.txt disallows necessary assets. | Verified: `robots.txt` explicitly allows `/`, `/festivals/*`, `/wishes/*`, `/greetings/*`, `/rangoli`, and `/manifest.json`. Disallows only `/api/` and `/scripts/`. |
| **"Alternate page with proper canonical tag"** | Parameterized URLs pointing to canonical root. | Normal behavior for clean SEO architectures. |

---

## 5. Ongoing Search Performance Monitoring Framework

Check the **Performance** report weekly to track organic visibility metrics:

1. **Total Clicks & Total Impressions:** Monitor week-over-week growth as festival peak dates approach.
2. **Average CTR (Click-Through Rate):** Target &ge; 4.0% for high-intent long-tail queries. If CTR is below 2.0%, test higher-urgency meta titles and descriptions.
3. **Average Position:**
   - Positions 1–3: High CTR capture.
   - Positions 4–10: Prime candidates for additional internal links and content depth.
   - Positions 11–20 (Page 2): Add specific long-tail keywords identified in Google Search Console queries to page headings (H2/H3).
4. **Queries Report:**
   - Filter queries containing *"photo"*, *"wishes"*, *"shayari"*, *"dhanteras"*, *"diwali"*, *"rangoli"*.
   - Identify unexpected vernacular or Hinglish search terms used by real visitors and add them to our FAQ sections.

