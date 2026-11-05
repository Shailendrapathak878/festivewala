import { test, expect } from '@playwright/test';
import {
  getGreetingsByFestival,
  getPhotoTemplatesByFestival,
  getWishesByFestival,
  getGiftIdeasByFestival,
  getFestivalCalendarConfig,
  getFestivalContent,
} from '../src/data/festivals/festivalRepository';
import { DHANTERAS_GREETING_TEMPLATES } from '../src/data/greetings/dhanterasGreetings';
import { DHANTERAS_PHOTO_TEMPLATES } from '../src/data/greetings/dhanterasPhotoTemplates';
import { DHANTERAS_WISHES_DATA } from '../src/data/wishes/dhanterasWishes';
import { DHANTERAS_GIFT_IDEAS } from '../src/data/gifts/dhanterasGifts';

test.describe('Dhanteras Festival Data Integrity & Strict Isolation', () => {
  test('Exact counts for Dhanteras templates, wishes, and gifts', () => {
    // 1. Exactly 25 Dhanteras Greeting Templates
    expect(DHANTERAS_GREETING_TEMPLATES.length).toBe(25);
    DHANTERAS_GREETING_TEMPLATES.forEach((tpl) => {
      expect(tpl.festivalId).toBe('dhanteras');
      expect(tpl.id).toMatch(/^dhanteras-/);
      expect(tpl.name).toBeTruthy();
      expect(tpl.nameHi).toBeTruthy();
    });

    // 2. Exactly 10 Dhanteras Photo Templates
    expect(DHANTERAS_PHOTO_TEMPLATES.length).toBe(10);
    DHANTERAS_PHOTO_TEMPLATES.forEach((tpl) => {
      expect(tpl.festivalId).toBe('dhanteras');
      expect(tpl.id).toMatch(/^photo-dhanteras-/);
      expect(tpl.category).toBe('photo-studio');
    });

    // 3. Exactly 100 Dhanteras Wishes
    expect(DHANTERAS_WISHES_DATA.length).toBe(100);

    // Verify all 9 required categories
    const categoryCounts: Record<string, number> = {};
    DHANTERAS_WISHES_DATA.forEach((w) => {
      expect(w.festivalId).toBe('dhanteras');
      expect(w.textEn).toBeTruthy();
      expect(w.textHi).toBeTruthy();
      expect(w.textHinglish).toBeTruthy();
      categoryCounts[w.category] = (categoryCounts[w.category] || 0) + 1;
    });

    expect(categoryCounts['family']).toBe(15);
    expect(categoryCounts['friends']).toBe(15);
    expect(categoryCounts['health-happiness']).toBe(10);
    expect(categoryCounts['wealth-prosperity']).toBe(15);
    expect(categoryCounts['traditional']).toBe(15);
    expect(categoryCounts['professional']).toBe(10);
    expect(categoryCounts['short']).toBe(10);
    expect(categoryCounts['emotional']).toBe(5);
    expect(categoryCounts['captions']).toBe(5);

    // 4. Exactly 15 Dhanteras Gift Ideas
    expect(DHANTERAS_GIFT_IDEAS.length).toBe(15);
    DHANTERAS_GIFT_IDEAS.forEach((gift) => {
      expect(gift.festivalId).toBe('dhanteras');
      expect(gift.nameEn).toBeTruthy();
      expect(gift.nameHi).toBeTruthy();
      expect(gift.whyGoodGiftEn).toBeTruthy();
    });
  });

  test('Strict Festival Isolation: Zero cross-contamination', () => {
    // Greetings isolation
    const dhanterasGreetings = getGreetingsByFestival('dhanteras');
    const diwaliGreetings = getGreetingsByFestival('diwali');
    expect(dhanterasGreetings.length).toBe(25);
    expect(diwaliGreetings.length).toBe(100);
    expect(dhanterasGreetings.some((t) => t.festivalId === 'diwali')).toBe(false);
    expect(diwaliGreetings.some((t) => t.festivalId === 'dhanteras')).toBe(false);

    // Photo templates isolation
    const dhanterasPhotos = getPhotoTemplatesByFestival('dhanteras');
    const diwaliPhotos = getPhotoTemplatesByFestival('diwali');
    expect(dhanterasPhotos.length).toBe(10);
    expect(diwaliPhotos.length).toBe(14);
    expect(dhanterasPhotos.some((t) => t.festivalId === 'diwali')).toBe(false);
    expect(diwaliPhotos.some((t) => t.festivalId === 'dhanteras')).toBe(false);

    // Wishes isolation
    const dhanterasWishes = getWishesByFestival('dhanteras');
    const diwaliWishes = getWishesByFestival('diwali');
    expect(dhanterasWishes.length).toBe(100);
    expect(diwaliWishes.length).toBe(500);
    expect(dhanterasWishes.some((w) => w.festivalId === 'diwali')).toBe(false);
    expect(diwaliWishes.some((w) => w.festivalId === 'dhanteras')).toBe(false);

    // Gifts isolation
    const dhanterasGifts = getGiftIdeasByFestival('dhanteras');
    const diwaliGifts = getGiftIdeasByFestival('diwali');
    expect(dhanterasGifts.length).toBe(15);
    expect(diwaliGifts.length).toBe(10);
    expect(dhanterasGifts.some((g) => g.festivalId === 'diwali')).toBe(false);
    expect(diwaliGifts.some((g) => g.festivalId === 'dhanteras')).toBe(false);

    // Non-existent festivals return empty arrays, never falling back to Diwali
    expect(getGreetingsByFestival('unsupported-fest')).toEqual([]);
    expect(getPhotoTemplatesByFestival('unsupported-fest')).toEqual([]);
    expect(getWishesByFestival('unsupported-fest')).toEqual([]);
    expect(getGiftIdeasByFestival('unsupported-fest')).toEqual([]);
  });

  test('Calendar config and countdown date integrity', () => {
    const dhanterasCal = getFestivalCalendarConfig('dhanteras');
    expect(dhanterasCal).toBeDefined();
    expect(dhanterasCal?.festivalId).toBe('dhanteras');
    expect(dhanterasCal?.startDateIso).toBe('2026-11-06T00:00:00+05:30');
    expect(dhanterasCal?.tithiEn).toContain('Trayodashi');

    const content = getFestivalContent('dhanteras');
    expect(content).toBeDefined();
    expect(content?.faqs?.length).toBe(8);
  });
});

test.describe('Dhanteras End-to-End Browser Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('Dhanteras Festival Page loads, displays countdown, and 19-section guide', async ({ page }) => {
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    
    // Heading
    await expect(page.locator('h1').first()).toBeVisible();

    // Dynamic Countdown Section
    const countdown = page.locator('[data-testid="festival-countdown"]').first();
    await expect(countdown).toBeVisible();

    // Guide section 1
    const sec1 = page.locator('#sec-what-is-dhanteras').first();
    await expect(sec1).toBeVisible();

    // FAQs Accordion section 19
    const faqs = page.locator('#sec-dhanteras-faqs').first();
    await expect(faqs).toBeVisible();
  });

  test('Dhanteras Greetings Gallery loads 25 templates', async ({ page }) => {
    await page.goto('/greetings/dhanteras', { waitUntil: 'domcontentloaded' });
    
    // Verify template collection count indicator
    await expect(page.locator('text=25 / 25 Ready').first()).toBeVisible();
    
    // Verify greeting mode toggle
    await expect(page.locator('text=Simple Greetings').first()).toBeVisible();
  });

  test('Dhanteras Photo Studio loads 10 templates', async ({ page }) => {
    await page.goto('/photo-greetings/dhanteras', { waitUntil: 'domcontentloaded' });
    
    // Verify photo collection count indicator
    await expect(page.locator('text=10 / 10 Ready').first()).toBeVisible();
  });

  test('Dhanteras Wishes Page loads exactly 100 wishes', async ({ page }) => {
    await page.goto('/wishes/dhanteras', { waitUntil: 'domcontentloaded' });
    
    // Look for Dhanteras wishes title or 100 count badge
    const badge = page.locator('text=100').first();
    await expect(badge).toBeVisible();
  });
});
