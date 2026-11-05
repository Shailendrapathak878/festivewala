import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'mobile-compact', width: 360, height: 800, label: '360x800' },
  { name: 'mobile-standard', width: 390, height: 844, label: '390x844' },
  { name: 'mobile-large', width: 430, height: 932, label: '430x932' },
  { name: 'tablet-portrait', width: 768, height: 1024, label: '768x1024' },
  { name: 'tablet-landscape', width: 1024, height: 768, label: '1024x768' },
  { name: 'desktop-standard', width: 1440, height: 900, label: '1440x900' },
  { name: 'desktop-fullhd', width: 1920, height: 1080, label: '1920x1080' },
];

const ARTIFACT_DIR = 'C:/Users/abhis/.gemini/antigravity/brain/63fca421-aaed-4c0a-b95f-26ad7a8666c1';

test.describe('Exact Viewport Verification Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  for (const vp of VIEWPORTS) {
    test(`Verify Viewport ${vp.label} (${vp.name}) - Zero Horizontal Overflow & Visual Capture`, async ({ page }) => {
      // Explicit viewport configuration - NO OS window substitution
      await page.setViewportSize({ width: vp.width, height: vp.height });
      
      // Navigate to Greeting Cards studio
      await page.goto('/greeting-cards', { waitUntil: 'networkidle' });
      
      // 1. Verify no horizontal overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        return {
          docWidth,
          winWidth,
          bodyWidth,
          hasOverflow: docWidth > winWidth || bodyWidth > winWidth,
        };
      });

      expect(overflow.hasOverflow).toBe(false);
      expect(overflow.docWidth).toBeLessThanOrEqual(vp.width);

      // 2. Verify header navigation and banner presence
      const banner = page.locator('header, banner, nav').first();
      await expect(banner).toBeVisible();

      // 3. Verify main title presence
      const title = page.locator('h1').first();
      await expect(title).toBeVisible();

      // 4. Capture exact viewport screenshot
      const localShotPath = path.join('test-results', 'viewports', `closure-viewport-${vp.label}.png`);
      const artifactShotPath = path.join(ARTIFACT_DIR, `closure-viewport-${vp.label}.png`);
      
      fs.mkdirSync(path.dirname(localShotPath), { recursive: true });
      await page.screenshot({ path: localShotPath, fullPage: false });
      
      if (fs.existsSync(ARTIFACT_DIR)) {
        fs.copyFileSync(localShotPath, artifactShotPath);
      }

      // Verify screenshot file was generated with substantial content
      const stats = fs.statSync(localShotPath);
      expect(stats.size).toBeGreaterThan(15000);
    });
  }
});

