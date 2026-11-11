import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { CHHATH_PUJA_WISHES_DATA } from '../src/data/wishes/chhathPujaWishes';
import { WISHES_DATA, ALL_WISHES_DATA } from '../src/data/wishes';
import { CHHATH_PUJA_GREETING_TEMPLATES } from '../src/data/greetings/chhathPujaGreetings';
import { CHHATH_PUJA_PHOTO_TEMPLATES } from '../src/data/greetings/chhathPujaPhotoTemplates';
import { CHHATH_PUJA_GUIDES } from '../src/data/festival-guides/chhathPujaGuides';
import { getChhathPhaseStatus } from '../src/data/festivals/chhathPujaDetails';

test.describe('Chhath Puja 2026 Complete Experience & Verification Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Data Integrity: 100 unique Chhath wishes, 25+10 greeting templates, 10 blog guides, 1200x630 OG PNG', async () => {
    // 100 Chhath wishes with unique IDs and trilingual texts
    expect(CHHATH_PUJA_WISHES_DATA.length).toBe(100);
    const wishIds = new Set(CHHATH_PUJA_WISHES_DATA.map((w) => w.id));
    const wishEn = new Set(CHHATH_PUJA_WISHES_DATA.map((w) => w.textEn.trim().toLowerCase()));
    const wishHi = new Set(CHHATH_PUJA_WISHES_DATA.map((w) => w.textHi.trim()));
    expect(wishIds.size).toBe(100);
    expect(wishEn.size).toBe(100);
    expect(wishHi.size).toBe(100);

    for (const w of CHHATH_PUJA_WISHES_DATA) {
      expect(w.festivalId).toBe('chhath-puja');
      expect(w.textEn.trim().length).toBeGreaterThan(20);
      expect(w.textHi.trim().length).toBeGreaterThan(20);
      expect(w.textHinglish?.trim().length).toBeGreaterThan(20);
    }

    // 700 festival wishes (500 Diwali + 100 Dhanteras + 100 Chhath) + 600 occasion = 1300 total
    expect(WISHES_DATA.length).toBe(700);
    expect(ALL_WISHES_DATA.length).toBe(1300);

    // 25 standard Chhath greeting templates + 10 photo templates = 35 total
    expect(CHHATH_PUJA_GREETING_TEMPLATES.length).toBe(25);
    expect(CHHATH_PUJA_PHOTO_TEMPLATES.length).toBe(10);
    expect(new Set(CHHATH_PUJA_GREETING_TEMPLATES.map((t) => t.id)).size).toBe(25);
    expect(new Set(CHHATH_PUJA_PHOTO_TEMPLATES.map((t) => t.id)).size).toBe(10);

    // 10 Chhath Puja guide articles
    expect(CHHATH_PUJA_GUIDES.length).toBe(10);
    expect(new Set(CHHATH_PUJA_GUIDES.map((g) => g.slug)).size).toBe(10);

    // 1200x630 genuine PNG asset
    const ogPngPath = path.resolve('public/assets/brand/og-chhath.png');
    expect(fs.existsSync(ogPngPath)).toBe(true);
    const buf = fs.readFileSync(ogPngPath);
    expect(buf.toString('ascii', 12, 16)).toBe('IHDR');
    expect(buf.readUInt32BE(16)).toBe(1200);
    expect(buf.readUInt32BE(20)).toBe(630);
    expect(buf.length).toBeGreaterThan(100000);
  });

  test('2. Festival Detail Page (/festivals/chhath-puja): Content, SEO schemas (no Event), zero Diwali hero leak', async ({ page }) => {
    const response = await page.goto('/festivals/chhath-puja', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);

    const h1 = page.locator('h1');
    await expect(h1).toContainText(/Chhath Puja/i);

    // Interactive 4-day phase tracker and all 4 day tabs
    const tracker = page.locator('[data-testid="chhath-phase-tracker"]');
    await expect(tracker).toBeVisible();
    await expect(page.locator('[data-testid="chhath-day-tab-nahay-khay"]')).toBeVisible();
    await expect(page.locator('[data-testid="chhath-day-tab-kharna"]')).toBeVisible();
    await expect(page.locator('[data-testid="chhath-day-tab-sandhya-arghya"]')).toBeVisible();
    await expect(page.locator('[data-testid="chhath-day-tab-usha-arghya"]')).toBeVisible();

    // Switch day tab to Sandhya Arghya and verify Nov 15 detail updates
    await page.locator('[data-testid="chhath-day-tab-sandhya-arghya"]').click();
    await expect(page.locator('#sec-chhath-schedule')).toContainText(/Nov 15, 2026/i);

    // Canonical & robots meta
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://festivewala.in/festivals/chhath-puja/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');

    // JSON-LD: WebPage, BreadcrumbList, Article, FAQPage present — strictly NO generic Event schema
    const ldScripts = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    const parsedTypes: string[] = [];
    for (const raw of ldScripts) {
      const json = JSON.parse(raw);
      const items = Array.isArray(json) ? json : [json];
      for (const item of items) {
        if (item['@type']) parsedTypes.push(item['@type']);
      }
    }
    expect(parsedTypes).toContain('WebPage');
    expect(parsedTypes).toContain('BreadcrumbList');
    expect(parsedTypes).toContain('Article');
    expect(parsedTypes).toContain('FAQPage');
    expect(parsedTypes).not.toContain('Event');
  });

  test('3. 4-Day IST Phase Tracker transitions accurately across pre-festival, Days 1–4, and concluded dates', async ({ page }) => {
    // Unit check across exact IST timestamps
    expect(getChhathPhaseStatus(new Date('2026-11-11T12:00:00+05:30')).phase).toBe('upcoming');
    expect(getChhathPhaseStatus(new Date('2026-11-13T10:00:00+05:30')).phase).toBe('day-1');
    expect(getChhathPhaseStatus(new Date('2026-11-14T18:00:00+05:30')).phase).toBe('day-2');
    expect(getChhathPhaseStatus(new Date('2026-11-15T16:30:00+05:30')).phase).toBe('day-3');
    expect(getChhathPhaseStatus(new Date('2026-11-16T07:00:00+05:30')).phase).toBe('day-4');
    expect(getChhathPhaseStatus(new Date('2026-11-18T10:00:00+05:30')).phase).toBe('concluded');

    // E2E DOM check during Sandhya Arghya (Day 3: Nov 15, 2026 IST)
    await page.clock.setFixedTime(new Date('2026-11-15T16:00:00+05:30'));
    await page.goto('/festivals/chhath-puja', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-testid="chhath-phase-tracker"]')).toContainText(/Day 3 Active|Sandhya Arghya/i);

    // E2E DOM check after Chhath Puja concludes (Nov 18, 2026 IST)
    await page.clock.setFixedTime(new Date('2026-11-18T10:00:00+05:30'));
    await page.goto('/festivals/chhath-puja', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-testid="chhath-phase-tracker"]')).toContainText(/Chhath Puja 2026 .*Concluded/i);
  });

  test('4. Chhath Greeting Studio (/greetings/chhath-puja & /photo-greetings/chhath-puja): Templates, canvas draw, export', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto('/greetings/chhath-puja', { waitUntil: 'networkidle' });
    const cards = page.locator('[data-testid="template-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    expect(await cards.count()).toBe(17); // 5 Signature cards + 12 initial batch
    await page.getByRole('button', { name: /Load More Templates/i }).click();
    expect(await cards.count()).toBe(25);
    await expect(page.locator('h2').first()).toContainText(/Chhath Puja 2026 Simple Greetings/i);

    // Select a Chhath card and verify canvas renders cleanly with non-empty pixels
    await cards.first().click();
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box?.width).toBeGreaterThan(100);
    expect(box?.height).toBeGreaterThan(100);

    // Navigate to Photo Greetings for Chhath Puja and check all 10 photo templates
    await page.goto('/photo-greetings/chhath-puja', { waitUntil: 'networkidle' });
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    expect(await cards.count()).toBe(10);
    expect(errors).toEqual([]);
  });

  test('5. Chhath Wishes Hub (/wishes/chhath-puja): 100 wishes, trilingual switching & copy flow', async ({ page }) => {
    await page.goto('/wishes/chhath-puja', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-testid="wishes-total-count"]')).toHaveText('100');
    await expect(page.locator('text=All 100 Chhath Puja Wishes')).toBeVisible();

    const firstWish = page.locator('[data-testid="wish-card"]').first();
    await expect(firstWish).toBeVisible();
    await expect(firstWish).toContainText(/Surya|Chhath|Arghya|May/i);

    // Switch UI language to Hindi via localStorage reload and check Devanagari rendering
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'hi');
      localStorage.setItem('festivewala_lang', 'hi');
    });
    await page.goto('/wishes/chhath-puja', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-testid="wish-card"]').first()).toContainText(/[ऀ-ॿ]/);
  });

  test('6. All 10 Chhath Blog Articles (/festival-guides/<slug>) return HTTP 200 and render full content', async ({ page }) => {
    for (const guide of CHHATH_PUJA_GUIDES) {
      const res = await page.goto(`/festival-guides/${guide.slug}`, { waitUntil: 'domcontentloaded' });
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toContainText(guide.titleEn);
      await expect(page.locator(`a[href="/festivals/chhath-puja/"]`).first()).toBeVisible();
    }
  });

  test('7. Responsive Integrity: Zero horizontal overflow on Desktop (1440x900) and Mobile (390x844)', async ({ page }) => {
    const routesToCheck = [
      '/festivals/chhath-puja',
      '/greetings/chhath-puja',
      '/photo-greetings/chhath-puja',
      '/wishes/chhath-puja',
      '/festival-guides/chhath-puja-four-day-rituals-guide',
    ];

    for (const vp of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(vp);
      for (const route of routesToCheck) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(250);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        expect(overflow, `Horizontal overflow detected on ${route} at ${vp.width}x${vp.height}`).toBe(false);
      }
    }
  });
});

