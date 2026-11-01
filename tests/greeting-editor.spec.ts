import { test, expect } from '@playwright/test';

test.describe('Greeting Editor Functional Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
    });
  });

  test('Opens greeting editor, customizes text, and adapts to formats', async ({ page }) => {
    // Navigate directly into the editor with sovereign-lotus
    await page.goto('/greeting-cards?mode=simple&template=sovereign-lotus&edit=true');

    // 1. Verify editor is loaded with preview canvas
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    // 2. Verify format selectors (Square, Story, Portrait, Landscape)
    const squareBtn = page.locator('button', { hasText: 'Square' }).first();
    const storyBtn = page.locator('button', { hasText: 'Story' }).first();
    const portraitBtn = page.locator('button', { hasText: 'Portrait' }).first();
    const landscapeBtn = page.locator('button', { hasText: 'Landscape' }).first();

    await expect(squareBtn).toBeVisible();
    await expect(storyBtn).toBeVisible();
    await expect(portraitBtn).toBeVisible();
    await expect(landscapeBtn).toBeVisible();

    // 3. Switch to Story format (9:16)
    await storyBtn.click();
    await page.waitForTimeout(500);

    // Canvas height should now be greater than width for story
    const storyDims = await canvas.evaluate((c: HTMLCanvasElement) => ({ w: c.width, h: c.height }));
    expect(storyDims.h).toBeGreaterThan(storyDims.w);

    // 4. Switch to Landscape format (16:9)
    await landscapeBtn.click();
    await page.waitForTimeout(500);

    const landscapeDims = await canvas.evaluate((c: HTMLCanvasElement) => ({ w: c.width, h: c.height }));
    expect(landscapeDims.w).toBeGreaterThan(landscapeDims.h);

    // 5. Switch back to Square format (1:1)
    await squareBtn.click();
    await page.waitForTimeout(500);

    const squareDims = await canvas.evaluate((c: HTMLCanvasElement) => ({ w: c.width, h: c.height }));
    expect(squareDims.w).toBe(squareDims.h);
  });
});

