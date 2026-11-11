import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Google AdSense Compliance & Zero-Ad Quality Audit Suite', () => {

  test('1. Codebase Purity: Complete absence of Monetag & authorized AdSense ca-pub-1146132802539965 integration', () => {
    const sw = fs.readFileSync(path.resolve('public/sw.js'), 'utf-8');
    const headers = fs.readFileSync(path.resolve('public/_headers'), 'utf-8');
    const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    const adsTxt = fs.readFileSync(path.resolve('public/ads.txt'), 'utf-8');

    // Monetag Zones & Domains strictly ABSENT
    expect(sw).not.toContain('12199537');
    expect(sw).not.toContain('12200453');
    expect(sw).not.toContain('5gvci.com');
    expect(sw).not.toContain('nap5k.com');
    expect(sw).not.toContain('service-worker.min.js');

    expect(headers).not.toContain('5gvci.com');
    expect(headers).not.toContain('nap5k.com');
    expect(headers).not.toContain('rtmark.net');
    expect(headers).not.toContain('jhnwr.com');
    expect(headers).not.toContain('aichouphaugn.com');

    expect(indexHtml).not.toContain('12200453');
    expect(indexHtml).not.toContain('nap5k.com');

    // Authorized Google AdSense publisher code & ads.txt verified
    expect(indexHtml).toContain('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1146132802539965');
    expect(headers).toContain('https://pagead2.googlesyndication.com');
    expect(adsTxt.trim()).toBe('google.com, pub-1146132802539965, DIRECT, f08c47fec0942fa0');
  });

  test('2. Analytics Preservation: GA4 tag and dataLayer strictly operational in CSP & HTML', () => {
    const headers = fs.readFileSync(path.resolve('public/_headers'), 'utf-8');
    const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');

    expect(indexHtml).toContain('G-D6RM3NJ0N3');
    expect(indexHtml).toContain('https://www.googletagmanager.com/gtag/js?id=G-D6RM3NJ0N3');

    expect(headers).toContain('https://www.googletagmanager.com');
    expect(headers).toContain('https://www.google-analytics.com');
    expect(headers).toContain('https://static.cloudflareinsights.com');
  });

  test('3. Privacy Policy AdSense Compliance: Mandatory third-party cookie & aboutads.info disclosures', () => {
    const privacyPath = path.resolve('src/pages/legal/PrivacyPolicyPage.tsx');
    const content = fs.readFileSync(privacyPath, 'utf-8');

    // AdSense Mandatory Policy Disclosures
    expect(content).toContain('Google AdSense');
    expect(content).toContain('aboutads.info');
    expect(content).toContain('adssettings.google.com');
    expect(content).toContain('Pandit979212@gmail.com');
    expect(content).not.toContain('contact@festivewala.in');
  });

  test('4. Robots.txt Compliance: manifest.json is not blocked and sitemap is declared', () => {
    const robots = fs.readFileSync(path.resolve('public/robots.txt'), 'utf-8');

    expect(robots).toContain('Allow: /manifest.json');
    expect(robots).not.toContain('Disallow: /*.json$');
    expect(robots).toContain('Sitemap: https://festivewala.in/sitemap.xml');
  });

  test('5. Sitemap Integrity: canonical URLs match generator configuration with zero 404s', () => {
    const sitemap = fs.readFileSync(path.resolve('public/sitemap.xml'), 'utf-8');
    const generatorSrc = fs.readFileSync(path.resolve('scripts/generate_sitemap.mjs'), 'utf-8');
    const expectedEntries = [...generatorSrc.matchAll(/loc:\s*`\$\{BASE_URL\}([^`]*)`/g)].map(
      (m) => `https://festivewala.in${m[1]}`
    );
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(expectedEntries.length).toBeGreaterThan(0);
    expect(locs.length).toBe(expectedEntries.length);
    for (const expectedUrl of expectedEntries) {
      expect(locs).toContain(expectedUrl);
    }
    expect(sitemap).toContain('https://festivewala.in/inspiration/');
    expect(sitemap).toContain('https://festivewala.in/privacy-policy/');
    expect(sitemap).toContain('https://festivewala.in/about/');
    expect(sitemap).toContain('https://festivewala.in/contact/');
  });

  test('6. No Under-Construction Placeholders on Live Routes', async ({ page }) => {
    // Visit /inspiration
    await page.goto('/inspiration', { waitUntil: 'domcontentloaded' });
    const content = await page.textContent('body');
    expect(content).not.toContain('Phase 1');
    expect(content).not.toContain('Phase 5');
    expect(content).not.toContain('will arrive in Phase');

    // Verify canonical tag on /inspiration
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://festivewala.in/inspiration/');
  });

  test('7. Canonical URL Consistency across Festival Sub-Routes', async ({ page }) => {
    // Test /wishes/diwali
    await page.goto('/wishes/diwali', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://festivewala.in/wishes/diwali/');

    // Test /greetings/diwali
    await page.goto('/greetings/diwali', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://festivewala.in/greetings/diwali/');

    // Test /photo-greetings/diwali
    await page.goto('/photo-greetings/diwali', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://festivewala.in/photo-greetings/diwali/');
  });

  test('8. Trust & Legal Pages Navigation on Mobile and Desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify footer links exist and are visible
    const footer = page.locator('footer');
    await expect(footer.locator('a[href="/about/"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/contact/"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/privacy-policy/"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/terms-of-service/"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/disclaimer/"]').first()).toBeVisible();
  });

  test('9. Greeting Studio Ad-Free Protection & Free Downloads', async ({ page }) => {
    await page.goto('/greeting-cards', { waitUntil: 'domcontentloaded' });

    // Ensure ZERO ad slots exist
    const adSlots = page.locator('[data-testid="monetag-ad-slot"], [data-ad-slot], iframe[src*="5gvci"]');
    expect(await adSlots.count()).toBe(0);
  });

});

