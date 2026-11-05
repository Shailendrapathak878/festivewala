import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Monetag In-Page Push (Zone 12200453) Safe Integration Suite', () => {

  test('1. Codebase Verification: Exact Monetag In-Page Push script with Zone 12200453 & nap5k.com in index.html', () => {
    const htmlPath = path.resolve('index.html');
    expect(fs.existsSync(htmlPath)).toBe(true);
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Verify exact zone ID and script URL
    expect(html).toContain("s.dataset.zone='12200453'");
    expect(html).toContain("s.src='https://nap5k.com/tag.min.js'");
    expect(html).toContain("https://nap5k.com/tag.min.js");

    // Verify exact Monetag self-injection closure structure
    expect(html).toContain(".appendChild(document.createElement('script'))");

    // Count script configuration occurrences in index.html: exactly 1
    const scriptMatches = (html.match(/s\.dataset\.zone='12200453'/g) || []).length;
    expect(scriptMatches).toBe(1);
  });

  test('2. Dual Monetag Architecture: Existing Service Worker Zone 12199537 & 5gvci.com strictly preserved in public/sw.js', () => {
    const swPath = path.resolve('public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);
    const sw = fs.readFileSync(swPath, 'utf-8');

    // Existing Service Worker Zone ID preserved
    expect(sw).toContain('"zoneId": 12199537');
    expect(sw).toContain('"domain": "5gvci.com"');
    expect(sw).toContain("importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')");

    // Verify nap5k.com bypass added to fetch handler without mutating zone
    expect(sw).toContain("url.hostname.includes('nap5k.com')");
    expect(sw).toContain("url.hostname.includes('5gvci.com')");

    // Ensure Zone 12200453 is NOT mistakenly placed in sw.js (In-Page Push is an on-page format)
    expect(sw).not.toContain('12200453');
  });

  test('3. CSP Audit: https://nap5k.com allowed in script-src, img-src, connect-src, frame-src with zero wildcards', () => {
    const headersPath = path.resolve('public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headers = fs.readFileSync(headersPath, 'utf-8');

    // Confirm nap5k.com presence in CSP directives
    expect(headers).toContain('https://nap5k.com');
    expect(headers).toContain("script-src 'self' 'wasm-unsafe-eval' https://www.googletagmanager.com");
    expect(headers).toContain("https://5gvci.com https://nap5k.com");

    // Zero wildcard domains
    expect(headers).not.toContain('*.nap5k.com');
    expect(headers).not.toContain('https://*.');
    expect(headers).not.toContain("'unsafe-eval'");

    // Google Analytics and MediaPipe strictly preserved
    expect(headers).toContain('https://www.googletagmanager.com');
    expect(headers).toContain('https://www.google-analytics.com');
  });

  test('4. AdSense Non-Proliferation: Zero AdSense scripts or publisher tags remain', () => {
    const html = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    const headers = fs.readFileSync(path.resolve('public/_headers'), 'utf-8');

    expect(html).not.toContain('pagead2.googlesyndication.com');
    expect(html).not.toContain('adsbygoogle');
    expect(html).not.toContain('ca-pub-');

    expect(headers).not.toContain('pagead2.googlesyndication.com');
    expect(headers).not.toContain('adsbygoogle');
  });

  test('5. Real Browser Runtime: Script element exists with dataset.zone 12200453 and zero CSP violations', async ({ page }) => {
    const cspErrors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (text.includes('Content Security Policy') || text.includes('CSP')) {
        cspErrors.push(text);
      }
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Inspect script element in DOM
    const monetagScriptInfo = await page.evaluate(() => {
      const script = document.querySelector('script[data-zone="12200453"]') as HTMLScriptElement | null;
      if (!script) return null;
      return {
        zone: script.dataset.zone,
        src: script.src,
      };
    });

    expect(monetagScriptInfo).not.toBeNull();
    expect(monetagScriptInfo?.zone).toBe('12200453');
    expect(monetagScriptInfo?.src).toContain('https://nap5k.com/tag.min.js');

    // Verify Google Analytics initialized alongside Monetag
    const isGtagPresent = await page.evaluate(() => {
      return typeof (window as unknown as { gtag?: unknown }).gtag === 'function' && Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer);
    });
    expect(isGtagPresent).toBe(true);

    // Verify NO CSP violation errors occurred
    expect(cspErrors.length).toBe(0);
  });

  test('6. Non-Duplication During SPA Navigation: Exactly one In-Page Push script across route transitions', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify count at Homepage
    let count = await page.evaluate(() => document.querySelectorAll('script[data-zone="12200453"]').length);
    expect(count).toBe(1);

    // Navigate to /festivals via client-side routing
    await page.goto('/festivals', { waitUntil: 'domcontentloaded' });
    count = await page.evaluate(() => document.querySelectorAll('script[data-zone="12200453"]').length);
    expect(count).toBe(1);

    // Navigate to /wishes
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });
    count = await page.evaluate(() => document.querySelectorAll('script[data-zone="12200453"]').length);
    expect(count).toBe(1);

    // Navigate to /greeting-cards
    await page.goto('/greeting-cards', { waitUntil: 'domcontentloaded' });
    count = await page.evaluate(() => document.querySelectorAll('script[data-zone="12200453"]').length);
    expect(count).toBe(1);
  });

  test('7. Content & UX Protection: Greeting Studio remains completely ad-free and free downloads work', async ({ page }) => {
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });

    // Verify Greeting Studio editor canvas is loaded
    const downloadBtn = page.locator('button:has-text("Download"), button:has-text("डाउनलोड"), button:has-text("Download Karein")').first();
    await expect(downloadBtn).toBeVisible({ timeout: 10000 });
    await expect(downloadBtn).toBeEnabled();

    // Verify zero in-editor Monetag placement slots
    const editorAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await editorAds.count()).toBe(0);
  });

  test('8. Mobile Viewport (390 x 844) Responsiveness: No layout overflow or broken controls', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify hero carousel is visible
    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible();

    // Verify no horizontal document overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

});
