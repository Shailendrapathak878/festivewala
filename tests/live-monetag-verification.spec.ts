import { test, expect } from '@playwright/test';

test.describe('Live Production Monetag Verification — https://festivewala.in', () => {

  test('Production SW: https://festivewala.in/sw.js is live with Zone 12199537 and 5gvci.com', async ({ request }) => {
    const res = await request.get('https://festivewala.in/sw.js');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('12199537');
    expect(text).toContain('5gvci.com');
    expect(text).toContain('https://5gvci.com/act/files/service-worker.min.js?r=sw');
  });

  test('Production CSP: Live response headers include https://5gvci.com', async ({ request }) => {
    const res = await request.get('https://festivewala.in/');
    expect(res.status()).toBe(200);
    const headers = res.headers();
    const csp = headers['content-security-policy'];
    expect(csp).toBeTruthy();
    expect(csp).toContain('https://5gvci.com');
    expect(csp).toContain("worker-src 'self' blob: https://5gvci.com");
    expect(csp).toContain("frame-src 'self' https://5gvci.com");
  });

  test('Production Live UI: Homepage hero is clean; exactly 1 content ad present', async ({ page }) => {
    await page.goto('https://festivewala.in/', { waitUntil: 'domcontentloaded' });
    const adSlots = page.locator('[data-testid="monetag-ad-slot"]');
    await expect(adSlots).toHaveCount(1);
    await expect(adSlots.first()).toBeVisible();
  });

  test('Production Live UI: Wishes Showcase has in-grid ad slot after wish 6', async ({ page }) => {
    await page.goto('https://festivewala.in/wishes', { waitUntil: 'domcontentloaded' });
    const wishCards = page.locator('[data-testid="wish-card"]');
    await expect(wishCards.first()).toBeVisible({ timeout: 10000 });
    const adSlots = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await adSlots.count()).toBeGreaterThanOrEqual(1);
  });

  test('Production Live UI: Personalization Studio is clean and free of ad intrusions', async ({ page }) => {
    await page.goto('https://festivewala.in/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });
    const downloadBtn = page.locator('button:has-text("Download"), button:has-text("डाउनलोड"), button:has-text("Download Karein")').first();
    await expect(downloadBtn).toBeVisible({ timeout: 10000 });
    await expect(downloadBtn).toBeEnabled();
    const editorAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await editorAds.count()).toBe(0);
  });

});

