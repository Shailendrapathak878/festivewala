import { test, expect } from '@playwright/test';

test.describe('Navigation and Language Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('Homepage loads and key routes navigate successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FestiveWala/i);

    // Verify Brand Logo / Hero
    const brand = page.locator('text=FestiveWala').first();
    await expect(brand).toBeVisible();

    // Verify Main Nav Links
    const cardsLink = page.locator('a[href="/greeting-cards"]').first();
    await expect(cardsLink).toBeVisible();
    await cardsLink.click();
    await expect(page).toHaveURL(/\/greeting-cards/);

    // Navigate to Wishes
    await page.goto('/wishes');
    await expect(page).toHaveURL(/\/wishes/);
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Navigate to Rangoli
    await page.goto('/rangoli');
    await expect(page).toHaveURL(/\/rangoli/);
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Navigate to Festivals
    await page.goto('/festivals');
    await expect(page).toHaveURL(/\/festivals/);
  });

  test('Trilingual switcher dynamically updates interface text (EN, HI, Hinglish)', async ({ page }) => {
    await page.goto('/greeting-cards');
    
    // Default is English
    const enButton = page.locator('button', { hasText: 'EN' }).first();
    const hiButton = page.locator('button', { hasText: 'हिन्दी' }).first();
    const hinglishButton = page.locator('button', { hasText: 'Hinglish' }).first();

    await expect(enButton).toBeVisible();
    await expect(hiButton).toBeVisible();
    await expect(hinglishButton).toBeVisible();

    // Switch to Hindi
    await hiButton.click();
    await page.waitForTimeout(300);

    // Check for Hindi heading or labels
    const hindiContent = await page.evaluate(() => {
      const text = document.body.innerText;
      return /दीपावली|शुभकामनाएं|तस्वीर|संदेश|संग्रह/.test(text);
    });
    expect(hindiContent).toBe(true);

    // Switch to Hinglish
    await hinglishButton.click();
    await page.waitForTimeout(300);

    const hinglishContent = await page.evaluate(() => {
      const text = document.body.innerText;
      return /Diwali|Wishes|Shubh|Photo|Cards/i.test(text);
    });
    expect(hinglishContent).toBe(true);

    // Switch back to English
    await enButton.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Personalize Festive Greeting Cards').first()).toBeVisible();
  });
});

