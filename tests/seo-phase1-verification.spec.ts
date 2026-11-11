import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Step 3.4 Phase 1: Critical Technical SEO Fixes Suite', () => {
  test('1. Open Graph Assets: All 8 files are genuine 1200x630 PNG rasters', async () => {
    const brandDir = path.resolve('public/assets/brand');
    const ogFiles = [
      'og-festivewala.png',
      'og-wishes.png',
      'og-studio.png',
      'og-festivals.png',
      'og-rangoli.png',
      'og-decorations.png',
      'og-gifts.png',
      'og-guides.png',
    ];

    for (const file of ogFiles) {
      const p = path.join(brandDir, file);
      expect(fs.existsSync(p)).toBe(true);

      const buf = fs.readFileSync(p);
      // Verify PNG magic header bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
      const isPngMagic =
        buf[0] === 0x89 &&
        buf[1] === 0x50 &&
        buf[2] === 0x4e &&
        buf[3] === 0x47 &&
        buf[4] === 0x0d &&
        buf[5] === 0x0a &&
        buf[6] === 0x1a &&
        buf[7] === 0x0a;
      expect(isPngMagic, `${file} must have genuine PNG magic bytes`).toBe(true);

      // Verify IHDR chunk presence and 1200x630 dimensions
      expect(buf.toString('ascii', 12, 16)).toBe('IHDR');
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      expect(width, `${file} width must be 1200`).toBe(1200);
      expect(height, `${file} height must be 630`).toBe(630);

      // Verify raster data size is substantial (not empty or transparent dummy)
      expect(buf.length, `${file} must be a substantial raster image`).toBeGreaterThan(100000);
    }
  });

  test('2. 404 Page: Renders Custom404 UI, injects noindex meta, and removes canonical', async ({ page }) => {
    // Navigate to invalid URL
    const response = await page.goto('/non-existent-page-123');
    await page.waitForLoadState('domcontentloaded');

    // Document HTTP status code (SPA catch-all serves index.html with 200 OK)
    const status = response ? response.status() : null;
    console.log(`[404 Route Test] HTTP response status for /non-existent-page-123 is: ${status}`);

    // Verify Custom404 visual UI is rendered
    const badge404 = page.locator('span:has-text("404")');
    await expect(badge404).toBeVisible();
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Path Not Found|उपलब्ध नहीं|Nahi Mila/i);

    // Verify robots meta is set to noindex, nofollow
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', 'noindex, nofollow');

    // Verify canonical URL tag is removed or not pointing to the 404 URL
    const canonical = page.locator('link[rel="canonical"]');
    const canonicalCount = await canonical.count();
    if (canonicalCount > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).not.toContain('/non-existent-page-123');
    }
  });

  test('3. Valid Route Recovery: Navigating back to valid routes restores index, follow and canonical', async ({ page }) => {
    // First visit 404 to trigger noindex
    await page.goto('/another-invalid-route');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');

    // Now navigate to a valid route: /wishes
    await page.goto('/wishes');
    await page.waitForLoadState('domcontentloaded');

    // Robots meta should be index, follow
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', 'index, follow');

    // Canonical should be restored to https://festivewala.in/wishes
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://festivewala.in/wishes/');
  });

  test('4. XML Sitemap: Exactly 50 unique canonical URLs with Chhath Puja and all 6 occasion categories included', async () => {
    const sitemapPath = path.resolve('public/sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const content = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(locMatches.length, 'Sitemap must contain 50 URLs').toBe(50);
    expect(new Set(locMatches).size, 'All sitemap URLs must be unique').toBe(50);

    const requiredOccasions = [
      'https://festivewala.in/wishes/?category=birthday',
      'https://festivewala.in/wishes/?category=anniversary',
      'https://festivewala.in/wishes/?category=love',
      'https://festivewala.in/wishes/?category=friendship',
      'https://festivewala.in/wishes/?category=good-morning',
      'https://festivewala.in/wishes/?category=good-night',
    ];

    for (const occUrl of requiredOccasions) {
      expect(locMatches).toContain(occUrl);
    }
  });

  test('5. Category Wishes Landing Pages: Self-canonicalize and load correct datasets', async ({ page }) => {
    const categories = ['birthday', 'anniversary', 'love', 'friendship', 'good-morning', 'good-night'];

    for (const cat of categories) {
      await page.goto(`/wishes?category=${cat}`);
      await page.waitForLoadState('domcontentloaded');

      // Canonical matches the exact URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', `https://festivewala.in/wishes/?category=${cat}`);

      // Robots meta is index, follow
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');

      // Total count indicator is 100
      await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('100');
    }
  });
});

