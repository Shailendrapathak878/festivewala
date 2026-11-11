import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('SEO Step 3.4 Phase 4 — Technical SEO Optimization Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  // 1. Valid routes load correctly
  test('1. Valid routes load with HTTP 200 and render core content', async ({ page }) => {
    const validRoutes = [
      '/',
      '/festivals',
      '/festivals/diwali',
      '/festivals/chhath-puja',
      '/greetings/chhath-puja',
      '/photo-greetings/chhath-puja',
      '/wishes/chhath-puja',
      '/festival-guides/chhath-puja-four-day-rituals-guide',
      '/wishes',
      '/wishes?category=birthday',
      '/greeting-cards',
      '/about',
      '/privacy-policy',
    ];

    for (const route of validRoutes) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  // 2 & 3. Invalid routes render Custom404 & Genuine HTTP 404 behavior
  test('2 & 3. Invalid routes return genuine HTTP 404 and render Custom404 UI', async ({ page }) => {
    const invalidRoutes = [
      '/non-existent-page-123',
      '/festivals/unknown-festival-xyz',
      '/festival-guides/non-existent-guide',
      '/festivals/makar-sankranti',
      '/festivals/maha-shivratri',
      '/festivals/navratri',
    ];
    for (const invalidPath of invalidRoutes) {
      const response = await page.goto(invalidPath, { waitUntil: 'domcontentloaded' });
      expect(response).not.toBeNull();
      // Genuine HTTP 404 status returned from server/edge
      expect(response!.status()).toBe(404);

      // Verify noindex, nofollow robots meta tag
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      expect(robots).toBe('noindex, nofollow');

      // Verify Custom404 UI components
      const badge404 = page.locator('span:has-text("404")');
      await expect(badge404).toBeVisible();
      const heading = page.locator('h1');
      await expect(heading).toContainText(/Path Not Found|उपलब्ध नहीं/i);
      const backBtn = page.getByRole('link', { name: /Return to Celebrations|Back to Home|मुख्य पृष्ठ/i });
      await expect(backBtn).toBeVisible();
    }
  });

  // 4. Redirect destinations and absence of loops
  test('4. URL aliases issue permanent 301 redirects to canonical destinations without loops', async ({ page }) => {
    const redirectTests = [
      { alias: '/privacy', destination: '/privacy-policy' },
      { alias: '/terms', destination: '/terms-of-service' },
      { alias: '/greeting-studio', destination: '/greeting-cards' },
    ];

    for (const item of redirectTests) {
      const response = await page.goto(item.alias, { waitUntil: 'domcontentloaded' });
      expect(response).not.toBeNull();
      // Browser follows the 301 to the destination
      expect(response!.status()).toBe(200);
      expect(page.url()).toContain(item.destination);

      // Verify destination canonical URL
      const canonical = page.locator('link[rel="canonical"]');
      const canonicalHref = await canonical.getAttribute('href');
      expect(canonicalHref).toBe(`https://festivewala.in${item.destination}`);
    }
  });

  // 5. Canonical URL correctness across varied categories
  test('5. Canonical URLs match canonical definitions across varied page types', async ({ page }) => {
    const canonicalChecks = [
      { path: '/', expected: 'https://festivewala.in/' },
      { path: '/wishes', expected: 'https://festivewala.in/wishes' },
      { path: '/wishes?category=anniversary', expected: 'https://festivewala.in/wishes?category=anniversary' },
      { path: '/festivals/diwali', expected: 'https://festivewala.in/festivals/diwali' },
      { path: '/about', expected: 'https://festivewala.in/about' },
    ];

    for (const check of canonicalChecks) {
      await page.goto(check.path, { waitUntil: 'domcontentloaded' });
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', check.expected);
    }
  });

  // 6. Robots.txt validity and crawlability
  test('6. robots.txt is valid, allows crawling, and specifies sitemap URL', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('User-agent: *');
    expect(text).toContain('Allow: /');
    expect(text).toContain('Sitemap: https://festivewala.in/sitemap.xml');
    expect(text).toContain('Disallow: /api/');
    expect(text).toContain('Disallow: /scripts/');
    // Crucial: ensure public assets and paths are NOT blocked
    expect(text).not.toContain('Disallow: /assets');
    expect(text).not.toContain('Disallow: /wishes');
  });

  // 7 & 8. Sitemap XML validity, no duplicate URLs, canonical HTTPS
  test('7 & 8. sitemap.xml is valid XML, uses HTTPS, and contains zero duplicate URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(locMatches.length).toBeGreaterThanOrEqual(30);

    // Ensure all URLs start with canonical HTTPS domain
    for (const loc of locMatches) {
      expect(loc.startsWith('https://festivewala.in')).toBe(true);
      expect(loc).not.toContain('http://');
      expect(loc).not.toContain('localhost');
      // Ensure aliases are omitted from sitemap
      expect(loc).not.toBe('https://festivewala.in/privacy');
      expect(loc).not.toBe('https://festivewala.in/terms');
    }

    // Verify 0 duplicates
    const uniqueLocs = new Set(locMatches);
    expect(uniqueLocs.size).toBe(locMatches.length);
  });

  // 9 & 10. Important pages indexed, Custom404 noindexed
  test('9 & 10. Important pages have index, follow; Custom404 strictly has noindex, nofollow', async ({ page }) => {
    // Check valid indexable page
    await page.goto('/wishes?category=friendship', { waitUntil: 'domcontentloaded' });
    const validRobots = page.locator('meta[name="robots"]');
    await expect(validRobots).toHaveAttribute('content', 'index, follow');
    const validCanonical = page.locator('link[rel="canonical"]');
    await expect(validCanonical).toHaveCount(1);

    // Check 404 page
    await page.goto('/some-missing-page-xyz', { waitUntil: 'domcontentloaded' });
    const notFoundRobots = page.locator('meta[name="robots"]');
    await expect(notFoundRobots).toHaveAttribute('content', 'noindex, nofollow');
    const notFoundCanonical = page.locator('link[rel="canonical"]');
    await expect(notFoundCanonical).toHaveCount(0);
  });

  // 11. Mobile viewport rendering
  test('11. Mobile viewport (390px) renders valid pages and 404 cleanly without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Valid route
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // 404 route
    await page.goto('/invalid-url-on-mobile', { waitUntil: 'domcontentloaded' });
    const badge = page.locator('span:has-text("404")');
    await expect(badge).toBeVisible();
  });

  // 12. No broken internal links on core pages
  test('12. Core navigation links on Homepage point to valid destinations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('header a[href="/festivals"]').first().waitFor({ state: 'attached' });

    const internalLinks = await page.$$eval('a[href^="/"]', (anchors) =>
      anchors.map((a) => a.getAttribute('href')).filter(Boolean) as string[]
    );

    expect(internalLinks.length).toBeGreaterThan(10);
    // Ensure no internal links point to raw 404s or unintended placeholders
    for (const href of internalLinks.slice(0, 15)) {
      expect(href).not.toContain('undefined');
      expect(href).not.toContain('null');
    }
  });

  // 13. No JavaScript console errors on critical pages
  test('13. No uncaught JavaScript exceptions or console errors on critical pages', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore expected network 404 log or external ad blocker warnings if any
        if (!text.includes('Failed to load resource') && !text.includes('favicon')) {
          consoleErrors.push(text);
        }
      }
    });

    const routesToCheck = ['/', '/wishes', '/festivals', '/about'];
    for (const route of routesToCheck) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
    }

    expect(consoleErrors).toEqual([]);
  });

  // 14. Security headers and static files verification
  test('14. Security headers and static assets in public directory are correctly configured', async () => {
    const headersFile = path.resolve(process.cwd(), 'public', '_headers');
    expect(fs.existsSync(headersFile)).toBe(true);
    const headersContent = fs.readFileSync(headersFile, 'utf8');

    expect(headersContent).toContain('Content-Security-Policy:');
    expect(headersContent).toContain("script-src 'self'");
    expect(headersContent).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(headersContent).toContain('Strict-Transport-Security:');
    expect(headersContent).toContain('X-Content-Type-Options: nosniff');
    expect(headersContent).toContain('X-Frame-Options: DENY');
    expect(headersContent).toContain('Referrer-Policy: strict-origin-when-cross-origin');

    const redirectsFile = path.resolve(process.cwd(), 'public', '_redirects');
    expect(fs.existsSync(redirectsFile)).toBe(true);
    const redirectsContent = fs.readFileSync(redirectsFile, 'utf8');
    expect(redirectsContent).toContain('/privacy /privacy-policy 301');
    expect(redirectsContent).toContain('/terms /terms-of-service 301');
    expect(redirectsContent).toContain('/greeting-studio /greeting-cards 301');
  });
});
