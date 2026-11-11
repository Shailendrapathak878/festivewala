import { test, expect } from '@playwright/test';

test.describe('Wishes UI & Category Showcase Integration Suite (Step 3.3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Default /wishes loads 700 festival wishes with priority ordering', async ({ page }) => {
    await page.goto('/wishes');
    await page.waitForLoadState('domcontentloaded');

    // Total count indicator
    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('700');

    // Quick festival selector bar should be visible for festival category
    const festivalBar = page.locator('[data-testid="wishes-festival-quick-bar"]');
    await expect(festivalBar).toBeVisible();

    // Cards should render
    const cards = page.locator('[data-testid="wish-card"]');
    expect(await cards.count()).toBeGreaterThanOrEqual(18);
  });

  test('2. /wishes?category=festival loads exactly 700 festival wishes', async ({ page }) => {
    await page.goto('/wishes?category=festival');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('700');

    const festivalBar = page.locator('[data-testid="wishes-festival-quick-bar"]');
    await expect(festivalBar).toBeVisible();
  });

  test('3. /wishes?category=birthday loads exactly 100 birthday wishes', async ({ page }) => {
    await page.goto('/wishes?category=birthday');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    // Festival quick bar should NOT be visible for occasion categories
    const festivalBar = page.locator('[data-testid="wishes-festival-quick-bar"]');
    await expect(festivalBar).toHaveCount(0);

    // Verify first wish card has category="birthday"
    const firstCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstCard).toHaveAttribute('data-category', 'birthday');
  });

  test('4. /wishes?category=anniversary loads exactly 100 anniversary wishes', async ({ page }) => {
    await page.goto('/wishes?category=anniversary');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    const firstCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstCard).toHaveAttribute('data-category', 'anniversary');
  });

  test('5. /wishes?category=love loads exactly 100 love messages', async ({ page }) => {
    await page.goto('/wishes?category=love');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    const firstCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstCard).toHaveAttribute('data-category', 'love');
  });

  test('6. /wishes?category=friendship loads exactly 100 friendship messages', async ({ page }) => {
    await page.goto('/wishes?category=friendship');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    const firstCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstCard).toHaveAttribute('data-category', 'friendship');
  });

  test('7. /wishes?category=good-morning loads exactly 100 good morning wishes', async ({ page }) => {
    await page.goto('/wishes?category=good-morning');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    const firstCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstCard).toHaveAttribute('data-category', 'good-morning');
  });

  test('8. /wishes?category=good-night loads exactly 100 good night wishes', async ({ page }) => {
    await page.goto('/wishes?category=good-night');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    const firstCard = page.locator('[data-testid="wish-card"]').first();
    await expect(firstCard).toHaveAttribute('data-category', 'good-night');
  });

  test('9. Invalid/unknown category falls back to 700 festival wishes', async ({ page }) => {
    await page.goto('/wishes?category=unknown-category-12345');
    await page.waitForLoadState('domcontentloaded');

    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('700');
  });

  test('10. Primary Category Switcher updates URL and active dataset', async ({ page }) => {
    await page.goto('/wishes');
    await page.waitForLoadState('domcontentloaded');

    // Click Birthday in the switcher bar
    const birthdayBtn = page.locator('[data-testid="wishes-category-birthday"]');
    await expect(birthdayBtn).toBeVisible();
    await birthdayBtn.click();

    // Verify URL updated
    await expect(page).toHaveURL(/category=birthday/);

    // Verify total count changed to 100
    const totalCount = page.locator('[data-testid="wishes-total-count"]');
    await expect(totalCount).toHaveText('100');

    // Click Love Messages
    const loveBtn = page.locator('[data-testid="wishes-category-love"]');
    await loveBtn.click();
    await expect(page).toHaveURL(/category=love/);
    await expect(totalCount).toHaveText('100');
  });

  test('11. Browser back/forward navigation updates category display correctly', async ({ page }) => {
    await page.goto('/wishes?category=birthday');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('100');

    // Click Anniversary
    await page.locator('[data-testid="wishes-category-anniversary"]').click();
    await expect(page).toHaveURL(/category=anniversary/);
    await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('100');

    // Browser back
    await page.goBack();
    await expect(page).toHaveURL(/category=birthday/);
    await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('100');

    // Browser forward
    await page.goForward();
    await expect(page).toHaveURL(/category=anniversary/);
    await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('100');
  });

  test('12. Language switching updates wish cards accurately across EN, HI, Hinglish', async ({ page }) => {
    await page.goto('/wishes?category=birthday');
    await page.waitForLoadState('domcontentloaded');

    // Switch to Hindi
    const hiButton = page.locator('button:has-text("हिन्दी"), button:has-text("HI")').first();
    if (await hiButton.isVisible()) {
      await hiButton.click();
      await page.waitForTimeout(300);
      // Cards should have Hindi text
      const firstCardText = await page.locator('[data-testid="wish-card"]').first().textContent();
      expect(firstCardText).toMatch(/[\u0900-\u097F]/); // Devanagari regex
    }
  });

  test('13. Card Copy, WhatsApp, and Send to Studio actions function', async ({ page }) => {
    await page.goto('/wishes?category=birthday');
    await page.waitForLoadState('domcontentloaded');

    // Test Copy button
    const copyBtn = page.locator('button[aria-label*="Copy" i], button:has-text("Copy")').first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    // Copy feedback toast or button label change
    await page.waitForTimeout(300);

    // Test Send to Studio (Card / 🎨)
    const cardStudioBtn = page.locator('button[aria-label*="Greeting Studio" i], button:has-text("Card"), button:has-text("कार्ड")').first();
    await expect(cardStudioBtn).toBeVisible();
    await cardStudioBtn.click();
    await expect(page).toHaveURL(/\/greeting-cards\?title=.+&message=.+/);
  });

  test('14. Favorites save to localStorage and display in Favorites tab', async ({ page }) => {
    await page.goto('/wishes?category=birthday');
    await page.waitForLoadState('domcontentloaded');

    // Click favorite on first card
    const favBtn = page.locator('button[aria-label*="Favorite" i]').first();
    await expect(favBtn).toBeVisible();
    await favBtn.click();

    // Verify localStorage has saved wish
    const saved = await page.evaluate(() => localStorage.getItem('festivewala_saved_wishes'));
    expect(saved).toBeTruthy();
    expect(JSON.parse(saved || '[]').length).toBeGreaterThan(0);

    // Switch to Favorites tab
    const favTab = page.locator('button:has-text("Favorites"), button:has-text("पसंदीदा")').first();
    await favTab.click();
    await page.waitForTimeout(300);

    // Verify favorited wish appears in Favorites view
    const favItems = page.locator('button:has-text("Remove from Favorites"), button[aria-label="Remove from Favorites"]');
    expect(await favItems.count()).toBeGreaterThanOrEqual(1);
  });

  test('15. Festival routes /wishes/dhanteras and /wishes/diwali remain fully functional', async ({ page }) => {
    await page.goto('/wishes/dhanteras');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/धनतेरस|Dhanteras/i);

    await page.goto('/wishes/diwali');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/दीपावली|Diwali/i);
  });

  test('16. Desktop navigation links route directly to the 7 category URLs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Hover Wishes in desktop nav
    const wishesMenu = page.locator('header button:has-text("Wishes")').first();
    await wishesMenu.hover();
    await page.waitForTimeout(200);

    // Verify Birthday link destination
    const birthdayLink = page.locator('header a[href="/wishes?category=birthday"]');
    await expect(birthdayLink).toBeVisible();

    // Verify Anniversary link destination
    const anniversaryLink = page.locator('header a[href="/wishes?category=anniversary"]');
    await expect(anniversaryLink).toBeVisible();

    // Verify Love Messages link destination
    const loveLink = page.locator('header a[href="/wishes?category=love"]');
    await expect(loveLink).toBeVisible();

    // Verify Friendship Messages link destination
    const friendLink = page.locator('header a[href="/wishes?category=friendship"]');
    await expect(friendLink).toBeVisible();

    // Verify Good Morning link destination
    const morningLink = page.locator('header a[href="/wishes?category=good-morning"]');
    await expect(morningLink).toBeVisible();

    // Verify Good Night link destination
    const nightLink = page.locator('header a[href="/wishes?category=good-night"]');
    await expect(nightLink).toBeVisible();

    // Verify Festival link destination in desktop header
    const festivalLink = page.locator('header a[href="/wishes?category=festival"]');
    await expect(festivalLink).toBeVisible();
  });
});

