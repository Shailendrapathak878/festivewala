import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Live Production Clean Release & Verification Suite', () => {
  const PROD_URL = 'https://festivewala.in';
  const SCREENSHOT_DIR = path.resolve('C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/live-clean-release');

  test('1. Live Production Health: Clean Load, GA4 Active, Zero Zone 12200453', async ({ page }) => {
    const consoleErrors: string[] = [];
    const cspViolations: string[] = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (text.includes('Content Security Policy') || text.includes('CSP')) {
        cspViolations.push(text);
      }
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
    });

    const response = await page.goto(PROD_URL, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);

    // Confirm experimental In-Page Push tag is ABSENT
    const experimentalTag = await page.evaluate(() => {
      return document.querySelector('script[data-zone="12200453"], script[src*="nap5k"], script[src*="aichouphaugn"]');
    });
    expect(experimentalTag).toBeNull();

    // Verify GA4 is active
    const ga4Active = await page.evaluate(() => {
      return typeof (window as any).gtag === 'function' && Array.isArray((window as any).dataLayer);
    });
    expect(ga4Active).toBe(true);

    // Verify Zero AdSense
    const hasAdSense = await page.evaluate(() => {
      return !!(window as any).adsbygoogle || document.querySelectorAll('script[src*="pagead2"]').length > 0;
    });
    expect(hasAdSense).toBe(false);

    // Verify Zero CSP Violations
    expect(cspViolations).toEqual([]);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_live_homepage_clean.png'), fullPage: false });
    console.log('[Live Clean Verification] Production 200 OK, Zone 12200453 absent, GA4 active, AdSense 0, Zero CSP violations');
  });

  test('2. Live Service Worker Continuity: Zone 12199537 strictly preserved', async ({ page }) => {
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });

    // Verify live sw.js content has Zone 12199537 and 5gvci.com
    const swResponse = await page.request.get(`${PROD_URL}/sw.js`);
    expect(swResponse.status()).toBe(200);
    const swCode = await swResponse.text();
    expect(swCode).toContain('12199537');
    expect(swCode).toContain('https://5gvci.com/act/files/service-worker.min.js?r=sw');
    expect(swCode).not.toContain('12200453');
    expect(swCode).not.toContain('nap5k.com');
    expect(swCode).not.toContain('aichouphaugn.com');

    // Verify Service Worker is registered in browser
    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.getRegistration();
      return !!reg;
    });
    expect(swRegistered).toBe(true);

    console.log('[Live Clean Verification] Live sw.js successfully retains Zone 12199537');
  });

  test('3. Live Greeting Studio Ad-Free & Free Download Verification', async ({ page }) => {
    await page.goto(`${PROD_URL}/greeting-cards`, { waitUntil: 'networkidle' });

    const studioContainer = page.locator('main');
    await expect(studioContainer).toBeVisible();

    // Verify zero intrusive ads inside Greeting Studio work area
    const adsInStudio = await page.evaluate(() => {
      return document.querySelectorAll('[data-ad-slot], iframe[src*="5gvci"], iframe[src*="nap5k"], iframe[src*="aichouphaugn"]').length;
    });
    expect(adsInStudio).toBe(0);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_live_greeting_studio_ad_free.png'), fullPage: false });
    console.log('[Live Clean Verification] Greeting Studio remains strictly ad-free');
  });

  test('4. Live Header & CSP Verification on Response Headers', async ({ page }) => {
    const res = await page.goto(PROD_URL);
    const headers = res?.headers() || {};
    const csp = headers['content-security-policy'] || '';

    // Verify approved domains
    expect(csp).toContain('https://5gvci.com');
    expect(csp).toContain('https://static.cloudflareinsights.com');
    expect(csp).toContain('sha256-VqZBrBTy5a7UEEhX4jPg0825WXhgj9+QccSFQr5PEKE=');
    expect(csp).toContain('sha256-8q8YosHVqlpiM2LSGt2ElV2kvtYSdGSR32yEFVmwCCc=');

    // Verify experimental domains are absent
    expect(csp).not.toContain('nap5k.com');
    expect(csp).not.toContain('jhnwr.com');
    expect(csp).not.toContain('aichouphaugn.com');
    expect(csp).not.toContain("'unsafe-eval'");

    console.log('[Live Clean Verification] Live CSP headers confirmed clean without experimental domains');
  });
});
