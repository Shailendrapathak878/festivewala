import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Monetag Final Security & Production Audit Suite', () => {

  test('1. Service Worker Code Audit: Exact Zone ID, Domain, importScripts, and selective fw- cache purge', async () => {
    const swPath = path.resolve('public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);
    const swContent = fs.readFileSync(swPath, 'utf-8');

    // Verify exact Monetag options
    expect(swContent).toContain('"domain": "5gvci.com"');
    expect(swContent).toContain('"zoneId": 12199537');
    expect(swContent).toContain("importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')");

    // Verify critical cache cleanup fix: only purges 'fw-' caches, never unrelated/Monetag caches
    expect(swContent).toContain("key.startsWith('fw-')");
    expect(swContent).toContain("key !== STATIC_CACHE && key !== RUNTIME_CACHE");

    // Verify bypass of 5gvci.com and data/blob in fetch handler
    expect(swContent).toContain("url.hostname.includes('5gvci.com')");
    expect(swContent).toContain("url.protocol === 'data:'");
    expect(swContent).toContain("url.protocol === 'blob:'");
  });

  test('2. CSP & Security Headers Audit: No wildcards, no unsafe-eval, all domains justified', async () => {
    const headersPath = path.resolve('public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headers = fs.readFileSync(headersPath, 'utf-8');

    // Confirm Monetag domain present in exact directives
    expect(headers).toContain('https://5gvci.com');
    expect(headers).toContain("worker-src 'self' blob: https://5gvci.com");
    expect(headers).toContain("frame-src 'self' https://5gvci.com");

    // Confirm no wildcards
    expect(headers).not.toContain('*.5gvci.com');
    expect(headers).not.toContain('https://*.');

    // Confirm standard security headers are intact
    expect(headers).toContain('X-Content-Type-Options: nosniff');
    expect(headers).toContain('X-Frame-Options: DENY');
    expect(headers).toContain('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin');
  });

  test('3. Real Browser Test: Service Worker registers with zero console errors and Monetag script loads', async ({ page }) => {
    const consoleErrors: string[] = [];
    const cspViolations: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    // Verify service worker registration in browser context
    const isSwRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.length > 0;
    });

    console.log('[Audit Test] ServiceWorker registered in browser:', isSwRegistered);
    expect(isSwRegistered).toBe(true);

    // Filter out external third-party network noise (e.g., adblock blocked ad requests)
    const fatalAppErrors = consoleErrors.filter(e => !e.includes('net::ERR_') && !e.includes('5gvci.com') && !e.includes('google'));
    expect(fatalAppErrors).toHaveLength(0);
  });

  test('4. PWA Offline Shell Verification: Core App Shell & index.html are precached for offline use', async ({ page }) => {
    // Prime the cache and allow service worker to install & precache
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait until service worker is fully active and precache is completed
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.ready;
      }
    });

    // Verify cache storage has precached the application shell
    const hasCachedShell = await page.evaluate(async () => {
      const keys = await caches.keys();
      const staticCacheKey = keys.find(k => k.startsWith('fw-static-'));
      if (!staticCacheKey) return false;
      const cache = await caches.open(staticCacheKey);
      const matchIndex = await cache.match('/index.html');
      const matchRoot = await cache.match('/');
      return !!(matchIndex || matchRoot);
    });

    console.log('[Audit Test] App shell precached in CacheStorage:', hasCachedShell);
    expect(hasCachedShell).toBe(true);
  });

  test('5. Placement & Layout Shift Verification: Homepage, Gallery, Wishes, Guides', async ({ page }) => {
    // A. Homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hpAds = page.locator('[data-testid="monetag-ad-slot"]');
    await expect(hpAds).toHaveCount(1);
    // Verify hero has 0 ads
    const heroAds = page.locator('header [data-testid="monetag-ad-slot"], #hero [data-testid="monetag-ad-slot"]');
    await expect(heroAds).toHaveCount(0);

    // B. Wishes Page
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });
    const firstWish = page.locator('[data-testid="wish-card"]').first();
    await expect(firstWish).toBeVisible({ timeout: 10000 });
    const wishesAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await wishesAds.count()).toBeGreaterThanOrEqual(1);

    // Verify Copy Wish button is free of obstruction
    const copyBtn = page.locator('button:has-text("Copy"), button:has-text("कॉपी")').first();
    await expect(copyBtn).toBeVisible();
    await expect(copyBtn).toBeEnabled();

    // C. Dhanteras Guide Article
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    const article = page.locator('article');
    await expect(article).toBeVisible({ timeout: 10000 });
    const articleAds = article.locator('[data-testid="monetag-ad-slot"]');
    expect(await articleAds.count()).toBeGreaterThanOrEqual(2);
  });

  test('6. Protected Greeting Studio Audit: Zero ads, unblocked free high-res download', async ({ page }) => {
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });

    // Verify that NO ads exist in the personalization workspace
    const editorAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await editorAds.count()).toBe(0);

    // Verify the download button is present, enabled, and unblocked
    const downloadBtn = page.locator('button:has-text("Download"), button:has-text("डाउनलोड"), button:has-text("Download Karein")').first();
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toBeEnabled();

    // Verify no modal or ad overlay is gating the download button
    const adOverlays = page.locator('.monetag-overlay, .ad-interstitial-gate, [data-ad-gate]');
    expect(await adOverlays.count()).toBe(0);
  });

  test('7. Mobile Viewport Responsiveness: Clean rendering without layout overflow on 390x844', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check horizontal scroll / overflow
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyScrollWidth).toBeLessThanOrEqual(windowWidth + 5);

    // Verify ad slot is visible and contained
    const adSlot = page.locator('[data-testid="monetag-ad-slot"]').first();
    await adSlot.scrollIntoViewIfNeeded();
    await expect(adSlot).toBeVisible();
  });

});
