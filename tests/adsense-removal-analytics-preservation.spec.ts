import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Google AdSense Removal & Google Analytics Preservation Audit', () => {

  test('1. Codebase Verification: Zero AdSense scripts, tags, or publisher IDs in index.html & _headers', async () => {
    // A. index.html
    const htmlPath = path.resolve('index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    expect(htmlContent).not.toContain('pagead2.googlesyndication.com');
    expect(htmlContent).not.toContain('adsbygoogle');
    expect(htmlContent).not.toContain('ca-pub-');

    // B. public/_headers
    const headersPath = path.resolve('public/_headers');
    const headersContent = fs.readFileSync(headersPath, 'utf-8');
    expect(headersContent).not.toContain('pagead2.googlesyndication.com');
    expect(headersContent).not.toContain('adsbygoogle');
  });

  test('2. Google Analytics Preservation: GA4 tag, G-D6RM3NJ0N3, dataLayer & CSP strictly intact', async () => {
    // A. Verify index.html contains the exact GA tag and config
    const htmlPath = path.resolve('index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    expect(htmlContent).toContain('https://www.googletagmanager.com/gtag/js?id=G-D6RM3NJ0N3');
    expect(htmlContent).toContain("gtag('config', 'G-D6RM3NJ0N3')");

    // B. Verify CSP retains all Analytics domains
    const headersPath = path.resolve('public/_headers');
    const headersContent = fs.readFileSync(headersPath, 'utf-8');
    expect(headersContent).toContain('https://www.googletagmanager.com');
    expect(headersContent).toContain('https://www.google-analytics.com');
    expect(headersContent).toContain('https://region1.google-analytics.com');
  });

  test('3. Browser Runtime Verification: window.dataLayer and gtag initialize without AdSense network calls', async ({ page }) => {
    const loadedAdsenseUrls: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.includes('pagead2') || url.includes('adsbygoogle') || url.includes('ca-pub')) {
        loadedAdsenseUrls.push(url);
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify window.dataLayer exists
    const hasDataLayer = await page.evaluate(() => {
      return Array.isArray((window as any).dataLayer) && (window as any).dataLayer.length > 0;
    });
    expect(hasDataLayer).toBe(true);

    // Verify window.gtag function exists
    const hasGtag = await page.evaluate(() => {
      return typeof (window as any).gtag === 'function';
    });
    expect(hasGtag).toBe(true);

    // Verify NO AdSense network calls were dispatched
    expect(loadedAdsenseUrls).toHaveLength(0);
  });

  test('4. Monetag Continuity: Zone 12199537, 5gvci.com, and ad placements remain active and unaffected', async ({ page }) => {
    // Verify Service Worker file has Monetag Zone 12199537
    const swPath = path.resolve('public/sw.js');
    const swContent = fs.readFileSync(swPath, 'utf-8');
    expect(swContent).toContain('12199537');
    expect(swContent).toContain('5gvci.com');

    // Verify Homepage ad slot remains in place
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hpAds = page.locator('[data-testid="monetag-ad-slot"]');
    await expect(hpAds).toHaveCount(1);
    await expect(hpAds.first()).toBeVisible();

    // Verify Greeting Studio workspace remains 100% ad-free
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });
    const studioAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await studioAds.count()).toBe(0);

    // Verify Free download button remains available and unblocked
    const downloadBtn = page.locator('button:has-text("Download"), button:has-text("डाउनलोड"), button:has-text("Download Karein")').first();
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toBeEnabled();
  });

});

