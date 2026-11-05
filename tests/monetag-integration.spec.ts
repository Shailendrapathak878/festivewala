import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Zero-Ad Integration & Monetag Complete Removal QA Audit Suite', () => {

  test('SW & Headers: Service Worker and CSP are completely free of Monetag directives', async () => {
    // 1. Inspect public/sw.js
    const swPath = path.resolve('public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);
    const swContent = fs.readFileSync(swPath, 'utf-8');
    expect(swContent).not.toContain('12199537');
    expect(swContent).not.toContain('5gvci.com');
    expect(swContent).not.toContain('nap5k.com');
    expect(swContent).not.toContain('service-worker.min.js');

    // 2. Inspect public/_headers
    const headersPath = path.resolve('public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headersContent = fs.readFileSync(headersPath, 'utf-8');
    expect(headersContent).not.toContain('5gvci.com');
    expect(headersContent).not.toContain('nap5k.com');
    expect(headersContent).not.toContain('rtmark.net');
  });

  test('Homepage: Hero and content sections are completely ad-free', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify exactly ZERO ad slots present anywhere on homepage
    const adSlots = page.locator('[data-testid="monetag-ad-slot"]');
    await expect(adSlots).toHaveCount(0);
  });

  test('Wishes Showcase: Wishes flow naturally with zero ads, copy buttons unobstructed', async ({ page }) => {
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });

    // Verify wish cards exist
    const wishCards = page.locator('[data-testid="wish-card"]');
    await expect(wishCards.first()).toBeVisible({ timeout: 10000 });
    const count = await wishCards.count();
    expect(count).toBeGreaterThan(5);

    // Verify exactly ZERO ad slots exist between wishes
    const adSlots = page.locator('[data-testid="monetag-ad-slot"]');
    expect(await adSlots.count()).toBe(0);

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

  test('Dhanteras Guide: Content flows cleanly without any ad interruption', async ({ page }) => {
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });

    // Verify article has loaded
    const article = page.locator('article');
    await expect(article).toBeVisible({ timeout: 10000 });

    // Check ZERO ad slots in article
    const adSlots = article.locator('[data-testid="monetag-ad-slot"]');
    expect(await adSlots.count()).toBe(0);

    // Verify sections are not obscured
    const sec1 = page.locator('#sec-what-is-dhanteras');
    await expect(sec1).toBeVisible();
    const sec2 = page.locator('#sec-meaning-origin');
    await expect(sec2).toBeVisible();
  });

});
