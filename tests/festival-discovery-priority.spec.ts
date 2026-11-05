import { test, expect } from '@playwright/test';
import { getUpcomingFestivals } from '../src/services/festivalPriorityEngine';
import { FESTIVALS_DATA } from '../src/data/festivals';

test.describe('Festival Priority Engine — Unit & Logical Verification', () => {
  test('Correct priority ordering for November 2026 calendar', () => {
    // Reference date: 2026-11-05T00:00:00+05:30 (Day before Dhanteras)
    const testDate = new Date('2026-11-05T00:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, testDate, 2);

    expect(upcoming.length).toBe(2);
    expect(upcoming[0].festival.id).toBe('dhanteras');
    expect(upcoming[0].priority).toBe(1);
    expect(upcoming[0].isCountdownActive).toBe(true);

    expect(upcoming[1].festival.id).toBe('diwali');
    expect(upcoming[1].priority).toBe(2);
    expect(upcoming[1].isCountdownActive).toBe(true);
  });

  test('Simulated date progression: After Dhanteras, Diwali becomes Priority 1', () => {
    // Simulated date: 2026-11-07T12:00:00+05:30 (Dhanteras has concluded, Diwali is tomorrow)
    const testDate = new Date('2026-11-07T12:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, testDate, 2);

    expect(upcoming.length).toBe(2);
    expect(upcoming[0].festival.id).toBe('diwali');
    expect(upcoming[0].priority).toBe(1);
    expect(upcoming[0].isCountdownActive).toBe(true);

    expect(upcoming[1].festival.id).toBe('chhath-puja');
    expect(upcoming[1].priority).toBe(2);
  });

  test('Simulated date progression: After Diwali, Chhath Puja becomes Priority 1', () => {
    // Simulated date: 2026-11-09T12:00:00+05:30 (Diwali has concluded)
    const testDate = new Date('2026-11-09T12:00:00+05:30');
    const upcoming = getUpcomingFestivals(FESTIVALS_DATA, testDate, 2);

    expect(upcoming.length).toBe(2);
    expect(upcoming[0].festival.id).toBe('chhath-puja');
    expect(upcoming[0].priority).toBe(1);

    expect(upcoming[1].festival.id).toBe('christmas');
    expect(upcoming[1].priority).toBe(2);
  });

  test('7-Day Countdown Rule logic verification', () => {
    // 1. Date 6 days before Christmas (Dec 19, 2026) -> <= 7 days -> isCountdownActive = true
    const sixDaysBefore = new Date('2026-12-19T00:00:00+05:30');
    const christmasUpcoming = getUpcomingFestivals(FESTIVALS_DATA, sixDaysBefore, 10).find(
      (u) => u.festival.id === 'christmas'
    );
    expect(christmasUpcoming).toBeDefined();
    expect(christmasUpcoming!.isCountdownActive).toBe(true);

    // 2. Date 15 days before Christmas (Dec 10, 2026) -> > 7 days -> isCountdownActive = false
    const fifteenDaysBefore = new Date('2026-12-10T00:00:00+05:30');
    const christmasFar = getUpcomingFestivals(FESTIVALS_DATA, fifteenDaysBefore, 10).find(
      (u) => u.festival.id === 'christmas'
    );
    expect(christmasFar).toBeDefined();
    expect(christmasFar!.isCountdownActive).toBe(false);
  });
});

test.describe('Homepage & Navigation — Discovery Integration UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('Homepage displays top 2 upcoming festivals in Countdown Section with feature links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Countdown section container exists
    const countdownSection = page.locator('[data-testid="upcoming-festivals-countdown"]');
    await expect(countdownSection).toBeVisible();

    // Priority 1 card (Dhanteras)
    const card1 = page.locator('[data-testid="upcoming-festival-card-1"]');
    await expect(card1).toBeVisible();
    await expect(card1).toContainText('Dhanteras');
    await expect(card1).toContainText('Priority 1');

    // Priority 2 card (Diwali)
    const card2 = page.locator('[data-testid="upcoming-festival-card-2"]');
    await expect(card2).toBeVisible();
    await expect(card2).toContainText('Diwali');
    await expect(card2).toContainText('Priority 2');

    // Verify feature links on card 1 (Dhanteras)
    const card1GreetingsLink = card1.locator('a[href*="/greetings/dhanteras"]');
    await expect(card1GreetingsLink).toBeVisible();

    const card1WishesLink = card1.locator('a[href*="/wishes/dhanteras"]');
    await expect(card1WishesLink).toBeVisible();

    const card1GuideLink = card1.locator('a[href*="/festivals/dhanteras"]');
    await expect(card1GuideLink).toBeVisible();

    // Verify feature links on card 2 (Diwali)
    const card2GreetingsLink = card2.getByRole('link', { name: 'Greetings' });
    await expect(card2GreetingsLink).toBeVisible();

    const card2WishesLink = card2.getByRole('link', { name: 'Wishes' });
    await expect(card2WishesLink).toBeVisible();
  });

  test('Greeting Studio default priority & strict Dhanteras/Diwali isolation', async ({ page }) => {
    // Open Greeting Studio directly without festival query parameter
    await page.goto('/greeting-cards');
    await page.waitForLoadState('networkidle');

    // In Auto mode: Priority 1 (Dhanteras) section is displayed first
    const p1Section = page.locator('[data-testid="greeting-priority-1-section"]');
    await expect(p1Section).toBeVisible();
    await expect(p1Section).toContainText('Dhanteras 2026');

    // Priority 2 (Diwali) section is displayed below it
    const p2Section = page.locator('[data-testid="greeting-priority-2-section"]');
    await expect(p2Section).toBeVisible();
    await expect(p2Section).toContainText('Diwali 2026');

    // Click Dhanteras filter pill
    const dhanterasBtn = page.getByRole('button', { name: /Dhanteras 2026/i });
    await dhanterasBtn.click();
    await page.waitForTimeout(300);

    // In Dhanteras view, only Dhanteras header is active
    await expect(page.locator('text=Dhanteras 2026 Simple Greetings Collection')).toBeVisible();
    // Diwali section must not be present in specific festival mode
    await expect(page.locator('[data-testid="greeting-priority-2-section"]')).not.toBeVisible();

    // Click "Upcoming First (Auto)" pill to restore priority view
    const autoBtn = page.getByRole('button', { name: /Upcoming First \(Auto\)/i });
    await autoBtn.click();
    await page.waitForTimeout(300);

    // Auto priority restored: both sections present and distinct
    await expect(page.locator('[data-testid="greeting-priority-1-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="greeting-priority-2-section"]')).toBeVisible();
  });

  test('Wishes section strict festival isolation and upcoming priority ordering', async ({ page }) => {
    await page.goto('/wishes');
    await page.waitForLoadState('networkidle');

    // Quick festival selector bar exists
    const quickBar = page.locator('[data-testid="wishes-festival-quick-bar"]');
    await expect(quickBar).toBeVisible();

    // 1. In default Auto mode, nearest festival (Dhanteras) wishes appear first
    const firstWishCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstWishCard).toBeVisible();
    // The first card is a Dhanteras wish (e.g. Shree Suktam, Dhanvantari, Wealth, Lakshmi)
    const firstCardText = await firstWishCard.innerText();
    expect(firstCardText.toLowerCase()).toMatch(/dhanteras|dhanvantari|wealth|prosperity|lakshmi|dhantrayodashi|treasures|shree suktam/);

    // 2. Click Dhanteras button
    const dhanterasBtn = page.locator('[data-testid="wishes-fest-btn-dhanteras"]');
    await dhanterasBtn.click();
    await page.waitForTimeout(300);

    // Verify exactly 100 Dhanteras wishes count displayed
    await expect(page.locator('text=All 100 Dhanteras Wishes')).toBeVisible();

    // 3. Click Diwali button
    const diwaliBtn = page.locator('[data-testid="wishes-fest-btn-diwali"]');
    await diwaliBtn.click();
    await page.waitForTimeout(300);

    // Verify 500 Diwali wishes count displayed
    await expect(page.locator('text=All 500 Wishes')).toBeVisible();
  });
});
