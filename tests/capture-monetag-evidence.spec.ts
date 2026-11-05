import { test } from '@playwright/test';
import * as path from 'path';

const ARTIFACTS_DIR = 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/monetag';

test.describe('Monetag QA Visual Evidence Captures', () => {

  test('Capture Desktop Evidence: Homepage, Wishes, Gallery, Article, Protected Studio', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Homepage content ad placement
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hpAd = page.locator('[data-testid="monetag-ad-slot"]').first();
    await hpAd.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_monetag_homepage_content_ad.png') });

    // 2. Wishes showcase with controlled in-grid ad slot
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });
    const wishesAd = page.locator('[data-testid="monetag-ad-slot"]').first();
    await wishesAd.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_monetag_wishes_showcase_ad.png') });

    // 3. Greeting Gallery with in-grid ad after 6 cards
    await page.goto('/greeting-cards', { waitUntil: 'domcontentloaded' });
    const galleryAd = page.locator('[data-testid="monetag-ad-slot"]').first();
    await galleryAd.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_monetag_greeting_gallery_ad.png') });

    // 4. Dhanteras Article in-content ad
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    const articleAd = page.locator('[data-testid="monetag-ad-slot"]').first();
    await articleAd.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_monetag_article_in_content_ad.png') });

    // 5. Greeting Studio Protected Area (Canvas / Personalization)
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_monetag_studio_protected_area.png') });
  });

  test('Capture Mobile Evidence: 390x844 responsive view', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    const articleAd = page.locator('[data-testid="monetag-ad-slot"]').first();
    await articleAd.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_monetag_mobile_viewport.png') });
  });

});

