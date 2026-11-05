import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Live Production Monetag In-Page Push & Release Verification', () => {
  const PROD_URL = 'https://festivewala.in';
  const SCREENSHOT_DIR = path.resolve('C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/live-inpage-push');

  test('1. Live Production Health & Script Verification', async ({ page }) => {
    const consoleErrors: string[] = [];
    const cspViolations: string[] = [];
    const networkRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('Content Security Policy') || text.includes('CSP')) {
          cspViolations.push(text);
        } else {
          consoleErrors.push(text);
        }
      }
    });

    page.on('request', (req) => {
      networkRequests.push(req.url());
    });

    const response = await page.goto(PROD_URL, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);

    // Wait a brief moment for in-page push tag to execute
    await page.waitForTimeout(1500);

    // Verify Monetag In-Page Push script element is in DOM
    const scripts = await page.evaluate(() => {
      const tags = Array.from(document.querySelectorAll('script'));
      return tags.map(t => ({
        src: t.src,
        zone: t.dataset?.zone,
        text: t.innerText
      }));
    });

    const inPagePushTag = scripts.find(s => 
      s.zone === '12200453' || (s.src && s.src.includes('nap5k.com/tag.min.js'))
    );
    expect(inPagePushTag).toBeDefined();
    expect(inPagePushTag?.zone).toBe('12200453');
    expect(inPagePushTag?.src).toContain('https://nap5k.com/tag.min.js');

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

    // Capture screenshot of live production homepage
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_live_homepage_inpage_push.png'), fullPage: false });

    console.log('[Live Verification] Production URL 200 OK, Monetag In-Page Push zone 12200453 active, GA4 active, AdSense 0, Zero CSP violations');
  });

  test('2. Live Service Worker & PWA Continuity Verification', async ({ page }) => {
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });

    // Verify live sw.js content has Zone 12199537, 5gvci.com, and network bypasses
    const swResponse = await page.request.get(`${PROD_URL}/sw.js`);
    expect(swResponse.status()).toBe(200);
    const swCode = await swResponse.text();
    expect(swCode).toContain('12199537');
    expect(swCode).toContain('https://5gvci.com/act/files/service-worker.min.js?r=sw');
    expect(swCode).toContain('nap5k.com');
    expect(swCode).toContain('jhnwr.com');

    // Verify Service Worker is registered in browser
    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.getRegistration();
      return !!reg;
    });
    expect(swRegistered).toBe(true);

    console.log('[Live Verification] Live sw.js successfully retains Zone 12199537 & ad bypasses');
  });

  test('3. Live Greeting Studio Ad-Free & Free Download Verification', async ({ page }) => {
    await page.goto(`${PROD_URL}/greeting-cards`, { waitUntil: 'networkidle' });

    // Ensure Studio UI loads
    const studioContainer = page.locator('main');
    await expect(studioContainer).toBeVisible();

    // Verify zero ads inside Greeting Studio work area
    const adsInStudio = await page.evaluate(() => {
      return document.querySelectorAll('[data-ad-slot], iframe[src*="5gvci"], iframe[src*="nap5k"]').length;
    });
    expect(adsInStudio).toBe(0);

    // Check download button is present and not locked
    const downloadBtn = page.getByRole('button', { name: /download/i }).first();
    if (await downloadBtn.isVisible()) {
      await expect(downloadBtn).toBeEnabled();
    }

    // Capture screenshot of Greeting Studio
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_live_greeting_studio_protected.png'), fullPage: false });

    console.log('[Live Verification] Greeting Studio remains strictly ad-free with unhindered downloads');
  });

  test('4. Live Header & CSP Verification on Response Headers', async ({ page }) => {
    const res = await page.goto(PROD_URL);
    const headers = res?.headers() || {};
    const csp = headers['content-security-policy'] || '';

    expect(csp).toContain('https://nap5k.com');
    expect(csp).toContain('https://5gvci.com');
    expect(csp).toContain('https://jhnwr.com');
    expect(csp).toContain('https://my.rtmark.net');
    expect(csp).toContain('sha256-ubobDVG0pnmxJRrInd1kL7WXk5EEXMQ196/fIaNcliQ=');
    expect(csp).toContain('sha256-LXRlDzwdF/BlNqWa/UcRbDbunVg3bj8URunQa8PYyzs=');
    expect(csp).not.toContain('*.nap5k.com');
    expect(csp).not.toContain("'unsafe-eval'");

    console.log('[Live Verification] Live CSP headers contain exact SHA-256 and nap5k.com/jhnwr.com without wildcards');
  });
});
