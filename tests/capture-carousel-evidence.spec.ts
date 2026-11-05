import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Upcoming 5 Festivals Carousel Visual Evidence Capture', () => {
  const outputDir = path.resolve(process.cwd(), 'artifacts/qa/upcoming-5-carousel');
  const brainDir = 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/carousel';

  test.beforeAll(async () => {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(brainDir, { recursive: true });
  });

  test('Capture all 5 carousel slides and mobile responsive viewport', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });

    // 1. Desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Pause autoplay for clean, still captures
    await page.locator('[data-testid="carousel-pause-toggle"]').click();

    const dots = page.locator('[data-testid="carousel-indicator-dot"]');
    const carousel = page.locator('[data-testid="hero-festival-carousel"]');

    const slides = [
      { idx: 0, name: '01_slide_dhanteras_desktop' },
      { idx: 1, name: '02_slide_diwali_desktop' },
      { idx: 2, name: '03_slide_chhath_puja_desktop' },
      { idx: 3, name: '04_slide_christmas_desktop' },
      { idx: 4, name: '05_slide_new_year_desktop' },
    ];

    for (const slide of slides) {
      await dots.nth(slide.idx).click();
      await page.waitForTimeout(600); // allow framer-motion transition to settle
      const localPath = path.join(outputDir, `${slide.name}.png`);
      const bPath = path.join(brainDir, `${slide.name}.png`);

      await carousel.screenshot({ path: localPath });
      fs.copyFileSync(localPath, bPath);
    }

    // 2. Mobile 390x844 (iPhone 14 standard)
    await page.setViewportSize({ width: 390, height: 844 });
    await dots.nth(0).click(); // reset to Dhanteras
    await page.waitForTimeout(600);

    const mobilePath = path.join(outputDir, '06_slide_dhanteras_mobile_390.png');
    const bMobilePath = path.join(brainDir, '06_slide_dhanteras_mobile_390.png');
    await carousel.screenshot({ path: mobilePath });
    fs.copyFileSync(mobilePath, bMobilePath);

    // Full Mobile Viewport showing Carousel + Navigation context
    const fullMobilePath = path.join(outputDir, '07_homepage_hero_mobile_viewport.png');
    const bFullMobilePath = path.join(brainDir, '07_homepage_hero_mobile_viewport.png');
    await page.screenshot({ path: fullMobilePath });
    fs.copyFileSync(fullMobilePath, bFullMobilePath);
  });
});

