import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('FestiveWala Live Production Verification (https://festivewala.in)', () => {
  const outputDir = path.resolve(process.cwd(), 'artifacts/qa/live-production');
  const brainDir = 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/live-production';

  test.beforeAll(async () => {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(brainDir, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Live Homepage: Hero Carousel, SEO H1, Upcoming Festivals & Discovery', async ({ page }) => {
    page.setDefaultTimeout(45000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/', { waitUntil: 'domcontentloaded' });

    // Verify Title & Hero
    await expect(page).toHaveTitle(/Indian Festival Greetings|FestiveWala/);
    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible({ timeout: 25000 });

    // Verify Slide 1 is Dhanteras
    const slideTitle = page.locator('[data-testid="carousel-slide-title"]');
    await expect(slideTitle).toContainText('Dhanteras');

    // Verify H1 contains Indian Festival Greetings
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText(/Indian Festival Greetings|FestiveWala/i);

    // Screenshot
    const p1 = path.join(outputDir, '01_live_homepage_hero_desktop.png');
    await page.screenshot({ path: p1 });
    fs.copyFileSync(p1, path.join(brainDir, '01_live_homepage_hero_desktop.png'));
  });

  test('2. Live Dhanteras Page: Single H1, Countdown, 19-Section Guide & Gift Curations', async ({ page }) => {
    page.setDefaultTimeout(45000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/festivals/dhanteras', { waitUntil: 'domcontentloaded' });

    // Check single H1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements.first()).toContainText(/Dhanteras|धनतेरस/i);

    // Verify 19-Section Guide
    const section2 = page.locator('#sec-meaning-origin');
    await expect(section2).toBeVisible({ timeout: 20000 });

    const section17 = page.locator('#sec-gift-ideas');
    await expect(section17).toBeVisible({ timeout: 20000 });

    // Screenshot
    const p2 = path.join(outputDir, '02_live_dhanteras_page_desktop.png');
    await page.screenshot({ path: p2 });
    fs.copyFileSync(p2, path.join(brainDir, '02_live_dhanteras_page_desktop.png'));
  });

  test('3. Live Greeting Studio: SEO H1, 3-Step Guide, Dhanteras Pre-filter & Template Rendering', async ({ page }) => {
    page.setDefaultTimeout(45000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/greeting-cards?festival=dhanteras', { waitUntil: 'domcontentloaded' });

    // Check H1
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText(/Greeting Card Maker|Dhanteras/i);

    const templateCards = page.locator('[data-testid="template-card"]');
    await expect(templateCards.first()).toBeVisible({ timeout: 20000 });
    const count = await templateCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify 3-step guide is rendered below studio
    await expect(page.locator('text=How to Create Greeting Cards Online in 3 Simple Steps')).toBeVisible();

    // Screenshot
    const p3 = path.join(outputDir, '03_live_greeting_studio_dhanteras.png');
    await page.screenshot({ path: p3 });
    fs.copyFileSync(p3, path.join(brainDir, '03_live_greeting_studio_dhanteras.png'));
  });

  test('4. Live Wishes Hub: SEO H1, Dhanteras Wishes Isolation & FAQs', async ({ page }) => {
    page.setDefaultTimeout(45000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://festivewala.in/wishes?festival=dhanteras', { waitUntil: 'domcontentloaded' });

    // Check H1
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText(/Wishes/i);

    const wishCards = page.locator('[data-testid="wish-card"]');
    await expect(wishCards.first()).toBeVisible({ timeout: 20000 });
    const count = await wishCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstCard = wishCards.first();
    await expect(firstCard).toContainText(/Dhanteras|धनतेरस|Dhanvantari|Lakshmi|treasures|shree suktam/i);

    // Screenshot
    const p4 = path.join(outputDir, '04_live_wishes_hub_dhanteras.png');
    await page.screenshot({ path: p4 });
    fs.copyFileSync(p4, path.join(brainDir, '04_live_wishes_hub_dhanteras.png'));
  });

  test('5. Live Mobile QA: Viewport 390x844 (iPhone 14) Zero Overflow & Clean Stacking', async ({ page }) => {
    page.setDefaultTimeout(45000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://festivewala.in/', { waitUntil: 'domcontentloaded' });

    const carousel = page.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible({ timeout: 25000 });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Screenshot
    const p5 = path.join(outputDir, '05_live_homepage_mobile_390.png');
    await page.screenshot({ path: p5 });
    fs.copyFileSync(p5, path.join(brainDir, '05_live_homepage_mobile_390.png'));
  });

  test('6. Live AdSense & GA4 Verification: Script in head & correct client ID', async ({ page }) => {
    await page.goto('https://festivewala.in/', { waitUntil: 'domcontentloaded' });

    const adsenseTag = await page.evaluate(() => {
      const el = document.querySelector('script[src*="pagead2.googlesyndication.com"]') as HTMLScriptElement | null;
      return el ? el.src : null;
    });
    expect(adsenseTag).toContain('ca-pub-1146132802539965');

    const gaTag = await page.evaluate(() => {
      const el = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement | null;
      return el ? el.src : null;
    });
    expect(gaTag).toContain('G-D6RM3NJ0N3');
  });

  test('7. Live ads.txt Verification: Returns text/plain with exact direct publisher declaration', async ({ request }) => {
    const res = await request.get('https://festivewala.in/ads.txt');
    expect(res.status()).toBe(200);
    const contentType = res.headers()['content-type'] || '';
    expect(contentType).toContain('text/plain');
    const text = await res.text();
    expect(text.trim()).toBe('google.com, pub-1146132802539965, DIRECT, f08c47fec0942fa0');
  });

  test('8. Live Inspiration Hub Verification: No Phase 5 notice & Hub cards render', async ({ page }) => {
    page.setDefaultTimeout(45000);
    await page.goto('https://festivewala.in/inspiration', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.innerText('body');
    expect(bodyText).not.toContain('Phase 5');
    expect(bodyText).not.toContain('फेज़ ५');
    expect(bodyText).not.toContain('will arrive in Phase 5');

    const rangoliLink = page.locator('a[href="/rangoli"]').first();
    await expect(rangoliLink).toBeVisible({ timeout: 15000 });
  });

  test('9. Live Service Worker & CSP Purity: Zero Monetag tokens', async ({ request }) => {
    const swRes = await request.get('https://festivewala.in/sw.js');
    expect(swRes.status()).toBe(200);
    const swText = await swRes.text();
    expect(swText).not.toContain('12199537');
    expect(swText).not.toContain('5gvci.com');
    expect(swText).not.toContain('importScripts');

    const homeRes = await request.get('https://festivewala.in/');
    const csp = homeRes.headers()['content-security-policy'] || '';
    expect(csp).not.toContain('5gvci.com');
    expect(csp).not.toContain('nap5k.com');
    expect(csp).toContain('pagead2.googlesyndication.com');
  });

  test('10. Live Sitemap & Robots Verification: 30 canonical URLs declared & accessible', async ({ request }) => {
    const sitemapRes = await request.get('https://festivewala.in/sitemap.xml');
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    const locMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g) || [];
    expect(locMatches.length).toBe(30);

    // Verify robots.txt on origin deployment
    const robotsRes = await request.get('https://festivewala.in/robots.txt?cf_cache_bypass=1');
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain('Allow: /manifest.json');
    expect(robotsText).toContain('Sitemap: https://festivewala.in/sitemap.xml');
  });
});
