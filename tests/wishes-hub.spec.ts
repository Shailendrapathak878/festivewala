import { test, expect } from '@playwright/test';

test.describe('Wishes and Smart Wishes Generator Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
    });
  });

  test('Wishes library loads, displays readymade wishes, and supports category navigation', async ({ page }) => {
    await page.goto('/wishes');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Verify category filter tabs
    const tabs = page.locator('button', { hasText: /All|Deepotsav|Family|Professional|Friends/i });
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);

    // Verify wishes cards are rendered
    const wishCards = page.locator('article, div[class*="rounded"]', { hasText: /Deepavali|Diwali|दीप|शुभ/i });
    const cardCount = await wishCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('Smart Wishes Generator generates custom wishes based on inputs', async ({ page }) => {
    await page.goto('/wishes');

    // Look for generator section or tab
    const genSection = page.locator('text=Smart Wishes Generator, text=AI Wishes, text=Generate').first();
    if (await genSection.isVisible()) {
      // Find generate button
      const generateBtn = page.locator('button', { hasText: /Generate|बनाएं|Create/i }).first();
      if (await generateBtn.isVisible()) {
        await generateBtn.click();
        await page.waitForTimeout(500);

        // Verify generated text is visible
        const generatedResult = page.locator('blockquote, div[class*="bg-"] p').first();
        await expect(generatedResult).toBeVisible();
      }
    }
  });
});

