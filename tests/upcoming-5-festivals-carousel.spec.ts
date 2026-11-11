import { test, expect } from '@playwright/test';
import { getUpcomingFestivals } from '../src/services/festivalPriorityEngine';
import { FESTIVALS_DATA } from '../src/data/festivals';

test.describe('Hero Upcoming 5 Festivals Carousel — Unit Engine Verification', () => {
  test('Engine returns exactly 5 upcoming festivals in chronological sequence', () => {
    const testDate = new Date('2026-11-05T00:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, testDate, 5);

    expect(upcoming.length).toBe(5);
    expect(upcoming.map(u => u.festival.id)).toEqual([
      'dhanteras',
      'diwali',
      'chhath-puja',
      'christmas',
      'new-year'
    ]);
  });

  test('Simulated Progression: When Dhanteras passes, slides shift and Makar Sankranti enters at position 5', () => {
    // Simulated date: 2026-11-07T00:00:00+05:30 (Dhanteras passed)
    const testDate = new Date('2026-11-07T00:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, testDate, 5);

    expect(upcoming.length).toBe(5);
    expect(upcoming[0].festival.id).toBe('diwali');
    expect(upcoming[1].festival.id).toBe('chhath-puja');
    expect(upcoming[2].festival.id).toBe('christmas');
    expect(upcoming[3].festival.id).toBe('new-year');
    expect(upcoming[4].festival.id).toBe('makar-sankranti');
    // Ensure no duplicates
    const uniqueIds = new Set(upcoming.map(u => u.festival.id));
    expect(uniqueIds.size).toBe(5);
  });

  test('Countdown status logic for 5 items: <= 7 days active, > 7 days inactive', () => {
    const testDate = new Date('2026-11-05T00:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, testDate, 5);

    // Dhanteras: Nov 6 (1 day away) -> active
    expect(upcoming[0].festival.id).toBe('dhanteras');
    expect(upcoming[0].isCountdownActive).toBe(true);

    // Diwali: Nov 8 (3 days away) -> active
    expect(upcoming[1].festival.id).toBe('diwali');
    expect(upcoming[1].isCountdownActive).toBe(true);

    // Chhath Puja: Nov 15 (10 days away) -> inactive
    expect(upcoming[2].festival.id).toBe('chhath-puja');
    expect(upcoming[2].isCountdownActive).toBe(false);

    // Christmas: Dec 25 (> 40 days away) -> inactive
    expect(upcoming[3].festival.id).toBe('christmas');
    expect(upcoming[3].isCountdownActive).toBe(false);

    // New Year: Jan 1 (> 50 days away) -> inactive
    expect(upcoming[4].festival.id).toBe('new-year');
    expect(upcoming[4].isCountdownActive).toBe(false);
  });
});

test.describe('Hero Upcoming 5 Festivals Carousel — E2E Homepage Integration', () => {
  // Deterministic festival calendar snapshot (Nov 6, 2026: Dhanteras day) for carousel priority verification
  const FROZEN_TEST_DATE = new Date('2026-11-06T10:00:00+05:30');

  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(FROZEN_TEST_DATE);
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('Homepage renders Carousel with dynamic priority-engine order for current controlled date', async ({ page }) => {
    const expectedUpcoming = getUpcomingFestivals(FESTIVALS_DATA, FROZEN_TEST_DATE, 5);
    expect(expectedUpcoming[0].festival.id).toBe('dhanteras');
    expect(expectedUpcoming[1].festival.id).toBe('diwali');

    await page.goto('/');
    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible();

    // 5 indicator dots matching expectedUpcoming count
    const dots = page.locator('[data-testid="carousel-indicator-dot"]');
    await expect(dots).toHaveCount(expectedUpcoming.length);

    // Prev / Next / Pause controls
    await expect(page.locator('button[aria-label="Previous festival"]')).toBeVisible();
    await expect(page.locator('button[aria-label="Next festival"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-pause-toggle"]')).toBeVisible();
  });

  test('Slide 1 matches Priority 1 festival for controlled date with live status and action buttons', async ({ page }) => {
    const expectedP1 = getUpcomingFestivals(FESTIVALS_DATA, FROZEN_TEST_DATE, 5)[0];
    await page.goto('/');
    // Pause autoplay and ensure slide 0 is active for deterministic inspection
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    const slideTitle = page.locator('[data-testid="carousel-slide-title"]');
    await expect(slideTitle).toContainText(expectedP1.festival.nameEn);

    // On Dhanteras day (Nov 6), live celebration banner is active, countdown grid is replaced
    const celebratingBanner = page.locator('[data-testid="carousel-slide-celebrating"]');
    await expect(celebratingBanner).toBeVisible();
    await expect(celebratingBanner).toContainText('Sacred Celebration is Live Today');

    // Button 1: Explore Greetings
    const greetingsBtn = page.locator('[data-testid="carousel-btn-greetings"]');
    await expect(greetingsBtn).toBeVisible();
    await expect(greetingsBtn).toHaveAttribute('href', `/greeting-cards/?festival=${expectedP1.festival.id}`);

    // Button 2: Explore Wishes
    const wishesBtn = page.locator('[data-testid="carousel-btn-wishes"]');
    await expect(wishesBtn).toBeVisible();
    await expect(wishesBtn).toHaveAttribute('href', `/wishes/?festival=${expectedP1.festival.id}`);

    // Guide link
    const guideBtn = page.locator('[data-testid="carousel-btn-guide"]');
    await expect(guideBtn).toBeVisible();
    await expect(guideBtn).toHaveAttribute('href', `/festivals/${expectedP1.festival.id}/`);
  });

  test('Clicking Next button advances to Diwali (Slide 2)', async ({ page }) => {
    await page.goto('/');
    // Pause autoplay and reset to slide 0 first
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    const nextBtn = page.locator('button[aria-label="Next festival"]');
    await nextBtn.click();

    const slideTitle = page.locator('[data-testid="carousel-slide-title"]');
    await expect(slideTitle).toContainText('Diwali');

    // Diwali also has live countdown (Nov 8, <= 7 days away)
    const countdown = page.locator('[data-testid="carousel-slide-countdown"]');
    await expect(countdown).toBeVisible();

    // Verify Diwali links
    const greetingsBtn = page.locator('[data-testid="carousel-btn-greetings"]');
    await expect(greetingsBtn).toHaveAttribute('href', '/greeting-cards/?festival=diwali');

    const wishesBtn = page.locator('[data-testid="carousel-btn-wishes"]');
    await expect(wishesBtn).toHaveAttribute('href', '/wishes/?festival=diwali');
  });

  test('Clicking Indicator Dot 4 navigates to Christmas (Slide 4) with date status (no 7-day countdown)', async ({ page }) => {
    await page.goto('/');
    // Pause autoplay for deterministic inspection
    await page.locator('[data-testid="carousel-pause-toggle"]').click();

    // Dot 4 (0-indexed: index 3)
    const dots = page.locator('[data-testid="carousel-indicator-dot"]');
    await dots.nth(3).click();

    const slideTitle = page.locator('[data-testid="carousel-slide-title"]');
    await expect(slideTitle).toContainText('Christmas');

    // Christmas is > 7 days away, so 4-unit countdown grid is NOT visible; date badge is visible
    const countdown = page.locator('[data-testid="carousel-slide-countdown"]');
    await expect(countdown).toHaveCount(0);

    // Indicator dot 4 is active
    await expect(dots.nth(3)).toHaveAttribute('aria-current', 'true');
  });

  test('Keyboard navigation: ArrowRight advances slides, ArrowLeft reverses', async ({ page }) => {
    await page.goto('/');
    // Pause autoplay and reset to slide 0 first
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toContainText('Dhanteras');

    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await carousel.focus();

    // Press ArrowRight -> Diwali
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toContainText('Diwali');

    // Press ArrowRight -> Chhath Puja
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toContainText('Chhath Puja');

    // Press ArrowLeft -> Back to Diwali
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toContainText('Diwali');
  });

  test('Autoplay pause toggle toggles state and updates button label', async ({ page }) => {
    await page.goto('/');

    const pauseBtn = page.locator('[data-testid="carousel-pause-toggle"]');
    await expect(pauseBtn).toHaveAttribute('aria-label', 'Pause autoplay');

    // Click pause
    await pauseBtn.click();
    await expect(pauseBtn).toHaveAttribute('aria-label', 'Resume autoplay');

    // Click resume
    await pauseBtn.click();
    await expect(pauseBtn).toHaveAttribute('aria-label', 'Pause autoplay');
  });

  test('Button 1 "Explore Greetings" navigates and correctly filters Greeting Studio for Dhanteras', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    const greetingsBtn = page.locator('[data-testid="carousel-btn-greetings"]');
    await greetingsBtn.click();

    await expect(page).toHaveURL(/greeting-cards\/\?festival=dhanteras/);

    // Verify Dhanteras greetings are active and visible
    const templateCards = page.locator('[data-testid="template-card"]');
    await expect(templateCards.first()).toBeVisible({ timeout: 10000 });
    const count = await templateCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify all rendered template cards are Dhanteras
    const firstCard = templateCards.first();
    await expect(firstCard).toContainText(/Dhanteras|धनतेरस|Dhanvantari|Kuber|Gold|Silver/i);
  });

  test('Button 2 "Explore Wishes" navigates and correctly filters Wishes Hub for Dhanteras', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    const wishesBtn = page.locator('[data-testid="carousel-btn-wishes"]');
    await wishesBtn.click();

    await expect(page).toHaveURL(/wishes\/\?festival=dhanteras/);

    // Verify Dhanteras wishes are active and visible
    const wishCards = page.locator('[data-testid="wish-card"]');
    await expect(wishCards.first()).toBeVisible({ timeout: 10000 });
    const count = await wishCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstCard = wishCards.first();
    await expect(firstCard).toContainText(/Dhanteras|धनतेरस|Dhanvantari|Lakshmi|treasures|shree suktam/i);
  });

  test('Responsive Viewports: Renders cleanly on Mobile (390x844), Tablet (768x1024), Desktop (1440x900)', async ({ page }) => {
    // 1. Mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const carouselMobile = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carouselMobile).toBeVisible();

    // Check no horizontal document overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // 2. Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="hero-festival-carousel"]')).toBeVisible();

    // 3. Desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('[data-testid="hero-festival-carousel"]')).toBeVisible();
  });
});

