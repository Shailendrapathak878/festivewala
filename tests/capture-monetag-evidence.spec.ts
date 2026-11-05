import { test, expect } from '@playwright/test';
import * as path from 'path';

const ARTIFACTS_DIR = 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/zero-ad';

test.describe('Zero-Ad Visual Evidence Captures', () => {

  test('Capture Desktop Evidence: Clean Homepage, Wishes, Gallery, Article, Protected Studio', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Homepage content clean
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hero = page.locator('#hero, [data-testid="hero-festival-carousel"]').first();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_homepage_clean_no_ads.png') });

    // 2. Wishes showcase clean
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });
    const wishCard = page.locator('[data-testid="wish-card"]').first();
    await wishCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_wishes_showcase_no_ads.png') });

    // 3. Greeting Gallery clean
    await page.goto('/greeting-cards', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_greeting_gallery_no_ads.png') });

    // 4. Dhanteras Article clean
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_dhanteras_article_no_ads.png') });

    // 5. Greeting Studio Protected Area
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_studio_protected_area.png') });
  });

  test('Capture Mobile Evidence: 390x844 responsive clean view', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_mobile_viewport_no_ads.png') });
  });

});

