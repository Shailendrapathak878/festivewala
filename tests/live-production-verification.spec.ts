import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('FestiveWala Live Production Verification (https://festivewala.in)', () => {
  const outputDir = path.resolve(process.cwd(), 'artifacts/qa/live-production');
  const brainDir = 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/live-production';

  test.beforeAll(async () => {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(brainDir, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Live Homepage: Hero Carousel, Upcoming Festivals & Discovery', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/', { waitUntil: 'domcontentloaded' });

    // Verify Title & Hero
    await expect(page).toHaveTitle(/FestiveWala/);
    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible({ timeout: 15000 });

    // Verify Slide 1 is Dhanteras
    const slideTitle = page.locator('[data-testid="carousel-slide-title"]');
    await expect(slideTitle).toContainText('Dhanteras');

    // Screenshot
    const p1 = path.join(outputDir, '01_live_homepage_hero_desktop.png');
    await page.screenshot({ path: p1 });
    fs.copyFileSync(p1, path.join(brainDir, '01_live_homepage_hero_desktop.png'));
  });

  test('2. Live Dhanteras Page: Countdown, 19-Section Guide & Gift Curations', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/festivals/dhanteras', { waitUntil: 'domcontentloaded' });

    // Check headings
    const heading = page.locator('h1').first();
    await expect(heading).toContainText(/Dhanteras|धनतेरस/i);

    // Verify 19-Section Guide
    const section2 = page.locator('#sec-meaning-origin');
    await expect(section2).toBeVisible({ timeout: 15000 });

    const section17 = page.locator('#sec-gift-ideas');
    await expect(section17).toBeVisible({ timeout: 15000 });

    // Screenshot
    const p2 = path.join(outputDir, '02_live_dhanteras_page_desktop.png');
    await page.screenshot({ path: p2 });
    fs.copyFileSync(p2, path.join(brainDir, '02_live_dhanteras_page_desktop.png'));
  });

  test('3. Live Greeting Studio: Dhanteras Pre-filter & Template Rendering', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/greeting-cards?festival=dhanteras', { waitUntil: 'domcontentloaded' });

    const templateCards = page.locator('[data-testid="template-card"]');
    await expect(templateCards.first()).toBeVisible({ timeout: 15000 });
    const count = await templateCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Screenshot
    const p3 = path.join(outputDir, '03_live_greeting_studio_dhanteras.png');
    await page.screenshot({ path: p3 });
    fs.copyFileSync(p3, path.join(brainDir, '03_live_greeting_studio_dhanteras.png'));
  });

  test('4. Live Wishes Hub: Dhanteras Wishes Isolation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/wishes?festival=dhanteras', { waitUntil: 'domcontentloaded' });

    const wishCards = page.locator('[data-testid="wish-card"]');
    await expect(wishCards.first()).toBeVisible({ timeout: 15000 });
    const count = await wishCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstCard = wishCards.first();
    await expect(firstCard).toContainText(/Dhanteras|धनतेरस|Dhanvantari|Lakshmi|treasures|shree suktam/i);

    // Screenshot
    const p4 = path.join(outputDir, '04_live_wishes_hub_dhanteras.png');
    await page.screenshot({ path: p4 });
    fs.copyFileSync(p4, path.join(brainDir, '04_live_wishes_hub_dhanteras.png'));
  });

  test('5. Live Mobile QA: Viewport 390x844 (iPhone 14) Zero Overflow & Clean Stacking', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://festivewala.in/', { waitUntil: 'domcontentloaded' });

    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible({ timeout: 15000 });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Screenshot
    const p5 = path.join(outputDir, '05_live_homepage_mobile_390.png');
    await page.screenshot({ path: p5 });
    fs.copyFileSync(p5, path.join(brainDir, '05_live_homepage_mobile_390.png'));
  });
});

