import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Monetag Advertisement Integration & QA Audit Suite', () => {

  test('SW & Headers: Service Worker and CSP properly configured with official Monetag directives', async () => {
    // 1. Inspect public/sw.js
    const swPath = path.resolve('public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);
    const swContent = fs.readFileSync(swPath, 'utf-8');
    expect(swContent).toContain('12199537');
    expect(swContent).toContain('5gvci.com');
    expect(swContent).toContain("importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')");

    // 2. Inspect public/_headers
    const headersPath = path.resolve('public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headersContent = fs.readFileSync(headersPath, 'utf-8');
    expect(headersContent).toContain('https://5gvci.com');
    expect(headersContent).toContain("worker-src 'self' blob: https://5gvci.com");
    expect(headersContent).toContain("frame-src 'self' https://5gvci.com");
  });

  test('Homepage: Hero remains clean, no top ads, strictly 1 content ad present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify hero section has NO ads inside
    const hero = page.locator('header, section#hero, [data-testid="hero-carousel"]');
    const heroAds = hero.locator('[data-testid="monetag-ad-slot"]');
    await expect(heroAds).toHaveCount(0);

    // Verify exactly one ad slot present in content section
    const adSlots = page.locator('[data-testid="monetag-ad-slot"]');
    await expect(adSlots).toHaveCount(1);
    await expect(adSlots.first()).toBeVisible();

    // Verify ad has clear distinction badge
    const badge = adSlots.first().locator('text=/SPONSORED|ADVERTISEMENT|प्रायोजित/');
    await expect(badge).toBeVisible();
  });

  test('Wishes Showcase: Ads appear between wishes, copy buttons remain unobstructed', async ({ page }) => {
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });

    // Verify wish cards exist
    const wishCards = page.locator('[data-testid="wish-card"]');
    await expect(wishCards.first()).toBeVisible({ timeout: 10000 });
    const count = await wishCards.count();
    expect(count).toBeGreaterThan(5);

    // Verify in-grid ad slot exists between wishes
    const adSlots = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await adSlots.count()).toBeGreaterThanOrEqual(1);

    // Verify copy button is interactive on wish card
    const firstCopyBtn = wishCards.first().locator('button:has-text("Copy"), button:has-text("कॉपी")');
    await expect(firstCopyBtn).toBeVisible();
  });

  test('Greeting Studio: Strictly PROTECTED AREA — zero intrusive ads in canvas/editor', async ({ page }) => {
    // Navigate directly to editor mode
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });

    // In active editor mode, check that download button is visible
    const downloadBtn = page.locator('button:has-text("Download"), button:has-text("डाउनलोड"), button:has-text("Download Karein")').first();
    await expect(downloadBtn).toBeVisible({ timeout: 10000 });

    // Assert that ZERO Monetag ads exist inside the active studio editing view
    const editorAds = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await editorAds.count()).toBe(0);

    // Verify free download button is present and not disabled/blocked
    await expect(downloadBtn).toBeEnabled();
  });

  test('Dhanteras Guide: In-content ads render correctly without interrupting text', async ({ page }) => {
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });

    // Verify article has loaded
    const article = page.locator('article');
    await expect(article).toBeVisible({ timeout: 10000 });

    // Check Monetag ad slots in article
    const adSlots = article.locator('[data-testid="monetag-ad-slot"]');
    expect(await adSlots.count()).toBeGreaterThanOrEqual(2);

    // Verify sections are not obscured
    const sec1 = page.locator('#sec-what-is-dhanteras');
    await expect(sec1).toBeVisible();
    const sec2 = page.locator('#sec-meaning-origin');
    await expect(sec2).toBeVisible();
  });

});
