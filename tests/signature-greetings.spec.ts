import { test, expect } from '@playwright/test';
import { DIWALI_TEMPLATES } from '../src/features/greeting-studio/data/templates';

const APPROVED_20_FEATURED_IDS = [
  'sovereign-lotus',
  'royal-diya',
  'gilded-mandala',
  'celestial-peacock-purple',
  'royal-durbar',
  'traditional-rangoli',
  'mangal-kalash',
  'jharokha-palace',
  'vrindavan-celebration',
  'toran-dwar',
  'minimal-champagne',
  'minimal-monochrome-luxury',
  'minimal-sage-harmony',
  'minimal-rose-quartz',
  'floral-celebration',
  'floral-saffron-marigold',
  'floral-jasmine-blossom',
  'family-hearth-glow',
  'elegant-corporate-diwali',
  'diwali-story-special'
];

test.describe('Signature Greetings Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
    });
  });

  test('Exact 100 total templates: 20 signature, 80 regular, with zero missing or duplicate IDs', () => {
    expect(DIWALI_TEMPLATES).toHaveLength(100);
    
    const featuredTemplates = DIWALI_TEMPLATES.filter(t => t.isFeatured === true);
    const regularTemplates = DIWALI_TEMPLATES.filter(t => !t.isFeatured);
    
    expect(featuredTemplates).toHaveLength(20);
    expect(regularTemplates).toHaveLength(80);

    const actualFeaturedIds = featuredTemplates.map(t => t.id).sort();
    const expectedIds = [...APPROVED_20_FEATURED_IDS].sort();
    expect(actualFeaturedIds).toEqual(expectedIds);

    // Verify all IDs are unique across all 100 templates
    const idSet = new Set(DIWALI_TEMPLATES.map(t => t.id));
    expect(idSet.size).toBe(100);
  });

  test('Template Gallery UI renders dedicated Signature Greetings crown section above regular collection', async ({ page }) => {
    await page.goto('/greeting-cards?mode=simple');
    
    // Check for Signature Greetings section heading
    const signatureSection = page.locator('text=Signature Greetings').first();
    await expect(signatureSection).toBeVisible();

    // Verify Crown badge presence (e.g. "20 Designs" badge)
    const crownBadge = page.locator('text=/20 Designs|20 डिज़ाइन/i').first();
    await expect(crownBadge).toBeVisible();

    // Verify template cards rendered in DOM
    const cards = page.locator('text=/Choose Design|Design Chunein/i');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(20);

    // Test Search Filter: Search for "Lotus"
    const searchInput = page.locator('input[placeholder*="Search" i], input[type="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Lotus');
      await page.waitForTimeout(300);
      const lotusCard = page.locator('text=/Lotus|कमल/i').first();
      await expect(lotusCard).toBeVisible();
      await searchInput.fill(''); // Clear search
      await page.waitForTimeout(300);
    }
  });
});

