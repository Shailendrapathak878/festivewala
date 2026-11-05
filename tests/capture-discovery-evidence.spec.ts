import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Visual QA Capture for Festival Discovery System', () => {
  const outputDir = path.resolve('artifacts/qa/festival-discovery');

  test.beforeAll(() => {
    fs.mkdirSync(outputDir, { recursive: true });
  });

  test('Capture Desktop & Mobile Evidence', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });

    // 1. Homepage Hero Carousel (Dhanteras as Slide 1)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: path.join(outputDir, '01_homepage_hero_carousel_dhanteras.png'),
    });

    // 2. Countdown Section (Top 2 Festivals: Dhanteras Priority 1 + Diwali Priority 2)
    const countdownSection = page.locator('[data-testid="upcoming-festivals-countdown"]');
    await countdownSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await countdownSection.screenshot({
      path: path.join(outputDir, '02_homepage_countdown_two_festivals.png'),
    });

    // 3. Greeting Studio Auto Priority View (Section 1 Dhanteras + Section 2 Diwali)
    await page.goto('/greeting-cards');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outputDir, '03_greeting_studio_auto_priority_view.png'),
    });

    // 4. Wishes Showcase with Festival Quick Bar & Priority Ordering
    await page.goto('/wishes');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outputDir, '04_wishes_showcase_festival_priority.png'),
    });

    // 5. Mobile Viewport 390x844 (Countdown Section)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const mobileCountdown = page.locator('[data-testid="upcoming-festivals-countdown"]');
    await mobileCountdown.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await mobileCountdown.screenshot({
      path: path.join(outputDir, '05_mobile_countdown_two_festivals.png'),
    });
  });
});

