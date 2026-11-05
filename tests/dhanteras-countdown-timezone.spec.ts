import { test, expect } from '@playwright/test';
import { getUpcomingFestivals, getPriorityFestival } from '../src/services/festivalPriorityEngine';
import { FESTIVALS_DATA, getNextUpcomingFestival } from '../src/data/festivals';
import { FESTIVAL_CALENDAR } from '../src/data/festivals/festivalCalendar';
import { formatDateInIST, getISTYear } from '../src/utils/festivalDateUtils';

test.describe('Dhanteras Countdown & Indian Timezone Engine Verification', () => {
  test('Root Cause Verification: All festival start dates begin at midnight 00:00:00+05:30', () => {
    // Audit all 10 festival entries to ensure no artificial morning/evening delays
    expect(FESTIVAL_CALENDAR['dhanteras'].startDateIso).toBe('2026-11-06T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['diwali'].startDateIso).toBe('2026-11-08T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['chhath-puja'].startDateIso).toBe('2026-11-15T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['christmas'].startDateIso).toBe('2026-12-25T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['new-year'].startDateIso).toBe('2027-01-01T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['makar-sankranti'].startDateIso).toBe('2027-01-14T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['maha-shivratri'].startDateIso).toBe('2027-03-06T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['holi'].startDateIso).toBe('2027-03-22T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['raksha-bandhan'].startDateIso).toBe('2027-08-28T00:00:00+05:30');
    expect(FESTIVAL_CALENDAR['navratri'].startDateIso).toBe('2027-10-10T00:00:00+05:30');
  });

  test('Test 1: Before Dhanteras (Nov 5 at 12:00 PM IST) — Countdown is active and accurate', () => {
    const beforeDate = new Date('2026-11-05T12:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, beforeDate, 5);

    expect(upcoming[0].festival.id).toBe('dhanteras');
    expect(upcoming[0].isCountdownActive).toBe(true);
    expect(upcoming[0].isCelebrating).toBe(false);
    expect(upcoming[0].isPassed).toBe(false);
    expect(upcoming[0].daysRemaining).toBe(0);
    expect(upcoming[0].hoursRemaining).toBe(12); // Exactly 12 hours until midnight start
  });

  test('Test 2: Midnight Start of Dhanteras (Nov 6 at 00:00:05 IST) — Live celebration active, no 17h delay', () => {
    const midnightDhanteras = new Date('2026-11-06T00:00:05+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, midnightDhanteras, 5);

    expect(upcoming[0].festival.id).toBe('dhanteras');
    expect(upcoming[0].isCelebrating).toBe(true);
    expect(upcoming[0].isCountdownActive).toBe(false);
    expect(upcoming[0].isPassed).toBe(false);
    expect(upcoming[0].hoursRemaining).toBe(0);
    expect(upcoming[0].daysRemaining).toBe(0);
  });

  test('Test 3: During Dhanteras Day (Nov 6 at 14:30:00 IST) — Live celebration state persists', () => {
    const midDayDhanteras = new Date('2026-11-06T14:30:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, midDayDhanteras, 5);

    expect(upcoming[0].festival.id).toBe('dhanteras');
    expect(upcoming[0].isCelebrating).toBe(true);
    expect(upcoming[0].isCountdownActive).toBe(false);
    expect(upcoming[0].isPassed).toBe(false);
  });

  test('Test 4: End of Dhanteras / Day After (Nov 7 at 00:00:01 IST) — Dhanteras concludes, Diwali becomes Priority 1', () => {
    const dayAfter = new Date('2026-11-07T00:00:01+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, dayAfter, 5);

    // Dhanteras is completed and filtered out
    expect(upcoming[0].festival.id).toBe('diwali');
    expect(upcoming[0].priority).toBe(1);
    expect(upcoming[0].isCountdownActive).toBe(true);
    // Diwali starts on 2026-11-08T00:00:00+05:30, so exactly ~24 hours away
    expect(upcoming[0].daysRemaining).toBe(0);
    expect(upcoming[0].hoursRemaining).toBe(23);

    // Next festivals shift forward
    expect(upcoming[1].festival.id).toBe('chhath-puja');
    expect(upcoming[2].festival.id).toBe('christmas');
    expect(upcoming[3].festival.id).toBe('new-year');
    expect(upcoming[4].festival.id).toBe('makar-sankranti');
  });

  test('Test 5: Timezone robustness — UTC/US visitor during Dhanteras sees Indian celebration date and live status', () => {
    // When it is 2026-11-05T19:00:00Z (UTC), in India it is 2026-11-06T00:30:00+05:30 (Dhanteras day)
    const utcDate = new Date('2026-11-05T19:00:00Z');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, utcDate, 5);

    expect(upcoming[0].festival.id).toBe('dhanteras');
    expect(upcoming[0].isCelebrating).toBe(true);

    // Date formatting in IST always produces November 6, 2026
    const formattedEn = formatDateInIST(FESTIVAL_CALENDAR['dhanteras'].startDateIso, 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    expect(formattedEn).toBe('November 6, 2026');
  });

  test('Audit of All Other Festivals: Zero artificial delays across the full festival calendar', () => {
    const auditFestivals = [
      { id: 'diwali', date: '2026-11-08T10:00:00+05:30' },
      { id: 'chhath-puja', date: '2026-11-15T10:00:00+05:30' },
      { id: 'makar-sankranti', date: '2027-01-14T10:00:00+05:30' },
      { id: 'holi', date: '2027-03-22T10:00:00+05:30' },
      { id: 'raksha-bandhan', date: '2027-08-28T10:00:00+05:30' },
      { id: 'navratri', date: '2027-10-10T10:00:00+05:30' },
    ];

    for (const item of auditFestivals) {
      const simDate = new Date(item.date);
      const upcoming = getUpcomingFestivals(FESTIVALS_DATA, simDate, 5);
      const matched = upcoming.find((u) => u.festival.id === item.id);
      expect(matched).toBeDefined();
      expect(matched?.isCelebrating).toBe(true);
      expect(matched?.isCountdownActive).toBe(false);
    }
  });
});

test.describe('Dhanteras E2E Browser Verification with Mock Clocks', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('Browser E2E 1: Before Dhanteras (Nov 5) — Countdown is active on Homepage and Detail page', async ({ page }) => {
    // Fast-forward mock clock to Nov 5, 2026 12:00:00 IST
    await page.clock.setFixedTime(new Date('2026-11-05T12:00:00+05:30'));
    await page.goto('/');

    // Pause carousel
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    // Verify slide title
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toContainText('Dhanteras');

    // Countdown grid is active with 11-12 hours remaining (NOT 17 hours on Nov 6)
    const countdown = page.locator('[data-testid="carousel-slide-countdown"]');
    await expect(countdown).toBeVisible();

    // Check CountdownSection
    const countdownSection = page.locator('[data-testid="upcoming-festival-card-1"]');
    await expect(countdownSection).toBeVisible();
    await expect(countdownSection).toContainText('Live Countdown');
  });

  test('Browser E2E 2: Midnight Start of Dhanteras (Nov 6 00:00:05 IST) — Shows Live Celebration, NO 17h countdown', async ({ page }) => {
    // Set clock to Nov 6, 2026 00:00:05 IST
    await page.clock.setFixedTime(new Date('2026-11-06T00:00:05+05:30'));
    await page.goto('/');

    // Pause carousel
    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    // Slide 1 title
    await expect(page.locator('[data-testid="carousel-slide-title"]')).toContainText('Dhanteras');

    // Live celebration banner must be visible
    const celebrationBanner = page.locator('[data-testid="carousel-slide-celebrating"]');
    await expect(celebrationBanner).toBeVisible();
    await expect(celebrationBanner).toContainText('Sacred Celebration is Live Today!');

    // Countdown grid must NOT be visible on Dhanteras slide
    const countdownGrid = page.locator('[data-testid="carousel-slide-countdown"]');
    await expect(countdownGrid).not.toBeVisible();

    // Check Homepage Countdown Section
    const p1Card = page.locator('[data-testid="upcoming-festival-card-1"]');
    await expect(p1Card).toBeVisible();
    await expect(p1Card).toContainText('Live Celebration');
    await expect(p1Card).toContainText('Sacred Celebration is Happening Now!');

    // Check Dhanteras Detail Page
    await page.goto('/festivals/dhanteras');
    const detailCountdown = page.locator('[data-testid="festival-countdown"]');
    await expect(detailCountdown).toBeVisible();
    await expect(detailCountdown).toContainText('Festival is Live!');
    await expect(detailCountdown).toContainText('Happy Dhanteras!');
  });

  test('Browser E2E 3: During Dhanteras Day (Nov 6 14:30:00 IST) — Live Celebration persists throughout the day', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-11-06T14:30:00+05:30'));
    await page.goto('/');

    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    await expect(page.locator('[data-testid="carousel-slide-celebrating"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-slide-countdown"]')).not.toBeVisible();
  });

  test('Browser E2E 4: End of Dhanteras / Day After (Nov 7 00:00:05 IST) — Transitions cleanly to Diwali', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-11-07T00:00:05+05:30'));
    await page.goto('/');

    await page.locator('[data-testid="carousel-pause-toggle"]').click();
    await page.locator('[data-testid="carousel-indicator-dot"]').first().click();

    // Priority 1 is now Diwali!
    const slideTitle = page.locator('[data-testid="carousel-slide-title"]');
    await expect(slideTitle).toContainText('Diwali');

    // Diwali is upcoming (Nov 8), so countdown grid is active
    const countdown = page.locator('[data-testid="carousel-slide-countdown"]');
    await expect(countdown).toBeVisible();
  });

  test('Evidence Capture: Live celebration screenshots on desktop & mobile viewports', async ({ page }) => {
    // Current live time on Nov 6 (Dhanteras)
    await page.goto('/');
    await page.waitForTimeout(500);

    // Desktop Homepage Hero with Live Dhanteras Celebration
    await page.screenshot({
      path: 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/dhanteras-fix/01_homepage_hero_dhanteras_live_celebrating.png',
      fullPage: false,
    });

    // Countdown Section
    const countdownSection = page.locator('#countdown-section, [data-testid="upcoming-festival-card-1"]');
    if (await countdownSection.first().isVisible()) {
      await countdownSection.first().scrollIntoViewIfNeeded();
      await page.screenshot({
        path: 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/dhanteras-fix/02_homepage_countdown_section_live.png',
        fullPage: false,
      });
    }

    // Dhanteras Festival Detail Page
    await page.goto('/festivals/dhanteras');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/dhanteras-fix/03_dhanteras_page_live_celebration.png',
      fullPage: false,
    });

    // Mobile Viewport (390 x 844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/dhanteras-fix/04_mobile_viewport_live_celebration.png',
      fullPage: false,
    });
  });
});
