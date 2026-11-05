import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Monetag Production Zone Isolation & Final Release Audit Suite', () => {
  test('1. Production Cleanliness: Experimental Zone 12200453 and nap5k.com are ABSENT from index.html', () => {
    const indexPath = path.resolve('index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    const html = fs.readFileSync(indexPath, 'utf-8');

    // Confirm experimental In-Page Push zone 12200453 is completely absent
    expect(html).not.toContain('12200453');
    expect(html).not.toContain('nap5k.com');
    expect(html).not.toContain('jhnwr.com');
    expect(html).not.toContain('aichouphaugn.com');

    // Confirm Google Analytics 4 is preserved
    expect(html).toContain('G-D6RM3NJ0N3');
    expect(html).toContain('https://www.googletagmanager.com/gtag/js?id=G-D6RM3NJ0N3');
  });

  test('2. Approved Monetag Service Worker Continuity: Zone 12199537 preserved in public/sw.js', () => {
    const swPath = path.resolve('public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);
    const sw = fs.readFileSync(swPath, 'utf-8');

    // Approved Service Worker Zone ID preserved
    expect(sw).toContain('"zoneId": 12199537');
    expect(sw).toContain('"domain": "5gvci.com"');
    expect(sw).toContain("importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')");
    expect(sw).toContain("url.hostname.includes('5gvci.com')");

    // Ensure all experimental domains are absent from sw.js
    expect(sw).not.toContain('12200453');
    expect(sw).not.toContain('nap5k.com');
    expect(sw).not.toContain('jhnwr.com');
    expect(sw).not.toContain('aichouphaugn.com');
  });

  test('3. CSP Security Audit: Only verified origins allowed, zero wildcards, zero experimental domains', () => {
    const headersPath = path.resolve('public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headers = fs.readFileSync(headersPath, 'utf-8');

    // Confirm experimental domains are removed
    expect(headers).not.toContain('nap5k.com');
    expect(headers).not.toContain('jhnwr.com');
    expect(headers).not.toContain('rtmark.net');
    expect(headers).not.toContain('aichouphaugn.com');

    // Confirm approved domains and analytics are preserved
    expect(headers).toContain('https://5gvci.com');
    expect(headers).toContain('https://www.googletagmanager.com');
    expect(headers).toContain('https://www.google-analytics.com');
    expect(headers).toContain('https://static.cloudflareinsights.com');

    // Zero wildcard domains and zero unsafe-eval
    expect(headers).not.toContain('*.nap5k.com');
    expect(headers).not.toContain('*.aichouphaugn.com');
    expect(headers).not.toContain('https://*.');
    expect(headers).not.toContain("'unsafe-eval'");
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

  test('5. Real Browser Runtime: Clean load with zero CSP errors and GA4 active', async ({ page }) => {
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

    // Confirm no script for Zone 12200453 exists
    const experimentalTag = await page.evaluate(() => {
      return document.querySelector('script[data-zone="12200453"]');
    });
    expect(experimentalTag).toBeNull();

    // Verify Google Analytics initialized
    const isGtagPresent = await page.evaluate(() => {
      return typeof (window as any).gtag === 'function' && Array.isArray((window as any).dataLayer);
    });
    expect(isGtagPresent).toBe(true);

    // Verify zero CSP violations
    expect(cspErrors).toEqual([]);
  });

  test('6. Non-Duplication During SPA Navigation: Zero experimental scripts injected on route change', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const routes = ['/festivals', '/wishes', '/greeting-cards'];
    for (const route of routes) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const expTags = await page.evaluate(() => {
        return document.querySelectorAll('script[data-zone="12200453"], script[src*="nap5k"], script[src*="aichouphaugn"]').length;
      });
      expect(expTags).toBe(0);
    }
  });

  test('7. Content & UX Protection: Greeting Studio remains completely ad-free and free downloads work', async ({ page }) => {
    await page.goto('/greeting-cards', { waitUntil: 'domcontentloaded' });

    // Ensure Studio UI container is present
    const studio = page.locator('main');
    await expect(studio).toBeVisible();

    // Verify zero ad slots or iframes inside Greeting Studio
    const adsInStudio = await page.evaluate(() => {
      return document.querySelectorAll('[data-ad-slot], iframe[src*="5gvci"], iframe[src*="nap5k"], iframe[src*="aichouphaugn"]').length;
    });
    expect(adsInStudio).toBe(0);

    // Verify download controls are not obstructed
    const downloadButtons = page.locator('button:has-text("Download")');
    if (await downloadButtons.count() > 0) {
      await expect(downloadButtons.first()).toBeEnabled();
    }
  });

  test('8. Mobile Viewport (390 x 844) Responsiveness: No layout overflow or broken controls', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allowing minor subpixel jitter
  });
});
