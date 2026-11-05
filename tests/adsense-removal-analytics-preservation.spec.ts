import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Google AdSense Restoration & Google Analytics Preservation Audit', () => {

  test('1. Codebase Verification: Exact recovered AdSense ca-pub-1146132802539965 script in index.html & matching CSP', async () => {
    // A. index.html
    const htmlPath = path.resolve('index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    expect(htmlContent).toContain('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1146132802539965');
    expect(htmlContent).toContain('ca-pub-1146132802539965');

    // B. public/_headers
    const headersPath = path.resolve('public/_headers');
    const headersContent = fs.readFileSync(headersPath, 'utf-8');
    expect(headersContent).toContain('https://pagead2.googlesyndication.com');

    // C. public/ads.txt
    const adsTxtPath = path.resolve('public/ads.txt');
    expect(fs.existsSync(adsTxtPath)).toBe(true);
    const adsTxtContent = fs.readFileSync(adsTxtPath, 'utf-8');
    expect(adsTxtContent.trim()).toBe('google.com, pub-1146132802539965, DIRECT, f08c47fec0942fa0');
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

  test('3. Browser Runtime Verification: window.dataLayer and gtag initialize alongside AdSense head tag', async ({ page }) => {
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

    // Verify AdSense script tag exists in head
    const adsenseTag = await page.evaluate(() => {
      const tag = document.querySelector('script[src*="pagead2.googlesyndication.com"]') as HTMLScriptElement | null;
      return tag ? tag.src : null;
    });
    expect(adsenseTag).toContain('ca-pub-1146132802539965');
  });

  test('4. Complete Monetag Absence: Zero Monetag ad networks, GA4 & AdSense clean, Greeting Studio protected', async ({ page }) => {
    // Verify Service Worker file has NO Monetag Zone or domain
    const swPath = path.resolve('public/sw.js');
    const swContent = fs.readFileSync(swPath, 'utf-8');
    expect(swContent).not.toContain('12199537');
    expect(swContent).not.toContain('5gvci.com');
    expect(swContent).not.toContain('nap5k.com');

    // Verify Homepage has ZERO intrusive ad slots
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hpAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await hpAds.count()).toBe(0);

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

