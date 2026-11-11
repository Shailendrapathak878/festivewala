import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Visual QA & Celebration Discovery System Verification', () => {
  const outputDir = path.resolve('artifacts/qa/festival-discovery');

  test.beforeAll(() => {
    fs.mkdirSync(outputDir, { recursive: true });
  });

  test('Verify UpcomingCelebrationsSection, HeroFestivalCarousel, Hubs & Mobile Evidence', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });

    // 1. Homepage Hero & Immediate Accessibility (Desktop 1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const heroH1 = page.locator('h1').first();
    await expect(heroH1).toBeVisible();
    await page.screenshot({
      path: path.join(outputDir, '01_homepage_hero_and_top.png'),
    });

    // 2. UpcomingCelebrationsSection & HeroFestivalCarousel (#upcoming-celebrations)
    const upcomingSection = page.locator('#upcoming-celebrations');
    await expect(upcomingSection).toBeVisible();
    await upcomingSection.scrollIntoViewIfNeeded();

    const sectionHeading = page.locator('#upcoming-celebrations-heading');
    await expect(sectionHeading).toContainText('Upcoming Festivals & Celebrations');

    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible();
    await expect(page.locator('[data-testid="carousel-active-slide-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toBeVisible();

    const indicators = page.locator('[data-testid="carousel-indicator-dot"]');
    await expect(indicators).toHaveCount(5);

    const statusBadge = carousel.locator(
      '[data-testid="carousel-slide-countdown"], [data-testid="carousel-slide-celebrating"], [data-testid="carousel-slide-status"]'
    );
    await expect(statusBadge.first()).toBeVisible();
    await expect(carousel.locator('[data-testid="carousel-btn-wishes"]')).toBeVisible();
    await expect(carousel.locator('[data-testid="carousel-btn-guide"]')).toBeVisible();

    // Advance slide to verify live carousel navigation
    await page.locator('[data-testid="carousel-next-btn"]').click();
    await expect(page.locator('[data-testid="carousel-active-slide-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-progress-text"]')).toContainText('2 / 5');
    await page.locator('[data-testid="carousel-prev-btn"]').click();
    await expect(page.locator('[data-testid="carousel-active-slide-1"]')).toBeVisible();

    await upcomingSection.screenshot({
      path: path.join(outputDir, '02_homepage_upcoming_celebrations_carousel.png'),
    });

    // 3. Greeting Studio View
    await page.goto('/greeting-cards/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('[data-testid="greeting-priority-1-section"]')).toBeVisible({ timeout: 10000 });
    await page.screenshot({
      path: path.join(outputDir, '03_greeting_studio_auto_priority_view.png'),
    });

    // 4. Wishes Showcase View
    await page.goto('/wishes/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('[data-testid="wishes-editorial-intro"]')).toBeVisible();
    await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('700');
    await page.screenshot({
      path: path.join(outputDir, '04_wishes_showcase_festival_priority.png'),
    });

    // 5. Mobile Viewport 390x844 (UpcomingCelebrationsSection & Carousel)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const mobileUpcoming = page.locator('#upcoming-celebrations');
    await expect(mobileUpcoming).toBeVisible();
    await mobileUpcoming.scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="hero-festival-carousel"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);

    await mobileUpcoming.screenshot({
      path: path.join(outputDir, '05_mobile_upcoming_celebrations_carousel.png'),
    });
  });
});
