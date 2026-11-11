import { test, expect } from '@playwright/test';

test.describe('FestiveWala AdSense Accessibility, Trust & SSR Remediation Suite', () => {
  test('A. Cold First Visit (Desktop & Mobile): Homepage H1, Hero CTAs & Nav Immediately Accessible Without Modal Blocking', async ({ page }) => {
    for (const vp of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(vp);
      await page.context().clearCookies();
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => localStorage.clear());
      await page.reload({ waitUntil: 'domcontentloaded' });

      // Compact inline banner should be present without any fullscreen modal dialog blocking interaction
      const banner = page.getByTestId('first-visit-language-banner');
      await expect(banner).toBeVisible();
      await expect(banner).toHaveAttribute('role', 'region');
      await expect(page.locator('[role="dialog"][aria-modal="true"]')).toHaveCount(0);

      const bannerBox = await banner.boundingBox();
      expect(bannerBox).toBeTruthy();
      expect(bannerBox!.height).toBeLessThan(180);

      // H1 & Hero CTAs must be visible immediately without dismissing the banner
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toContainText('Celebrate Every Moment');

      const startCta = page.locator('#home-hero a[href="/greeting-cards/"]').first();
      await expect(startCta).toBeVisible();
      const wishesCta = page.locator('#home-hero a[href="/wishes/"]').first();
      await expect(wishesCta).toBeVisible();

      if (vp.width <= 480) {
        const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
        await expect(bottomNav).toBeVisible();
      } else {
        const headerCreate = page.locator('header a[href="/greeting-cards/"]:visible').first();
        await expect(headerCreate).toBeVisible();
      }

      // Keyboard-dismissible banner
      const dismissBtn = page.getByTestId('language-banner-dismiss');
      await dismissBtn.focus();
      await page.keyboard.press('Enter');
      await expect(banner).toBeHidden();
    }
  });

  test('B. Language Switching via Banner & Header Persists Across Reload', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'domcontentloaded' });

    const banner = page.getByTestId('first-visit-language-banner');
    await expect(banner).toBeVisible();

    // Switch to Hindi using the inline banner
    await page.getByTestId('language-banner-option-hi').click();
    await expect(banner).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('h1')).toContainText('हर पल का उत्सव मनाएं');

    // Reload and verify Hindi persists and banner stays dismissed
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(banner).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');

    // Switch to Hinglish via header LanguageSwitcher
    await page.locator('header [role="group"] button:has-text("Hinglish")').first().click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi-Latn');

    // Switch back to English via header LanguageSwitcher
    await page.locator('header [role="group"] button:has-text("EN")').first().click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('C. Founder Attribution, Direct Contact & Transparent Editorial Verification (No Inflated Claims)', async ({ page }) => {
    // 1. About Page
    await page.goto('/about/', { waitUntil: 'domcontentloaded' });
    const aboutText = await page.locator('main').innerText();
    expect(aboutText).toContain('Shailendra Pathak');
    expect(aboutText).toContain('Drik Panchang');
    expect(aboutText).not.toMatch(/Editorial Board|Upanishads|astronomical|privacy@festivewala\.in|contact@festivewala\.in/i);

    const aboutMail = page.locator('main a[href="mailto:Pandit979212@gmail.com"]').first();
    await expect(aboutMail).toBeVisible();

    const aboutJsonLd = JSON.parse((await page.locator('#seo-jsonld').textContent()) || '{}');
    const schemas = Array.isArray(aboutJsonLd) ? aboutJsonLd : [aboutJsonLd];
    const hasFounder = schemas.some(
      (s: Record<string, unknown>) =>
        s['@type'] === 'AboutPage' &&
        JSON.stringify(s).includes('Shailendra Pathak')
    );
    expect(hasFounder).toBe(true);

    // 2. Privacy Policy Page
    await page.goto('/privacy-policy/', { waitUntil: 'domcontentloaded' });
    const privacyText = await page.locator('main').innerText();
    expect(privacyText).toContain('Shailendra Pathak');
    expect(privacyText).not.toMatch(/Editorial Board|privacy@festivewala\.in|contact@festivewala\.in/i);
    await expect(page.locator('main a[href="mailto:Pandit979212@gmail.com"]').first()).toBeVisible();

    // 3. Contact Page
    await page.goto('/contact/', { waitUntil: 'domcontentloaded' });
    const contactText = await page.locator('main').innerText();
    expect(contactText).not.toMatch(/Editorial Board|24–48 hour|privacy@festivewala\.in|contact@festivewala\.in/i);
    await expect(page.locator('main a[href="mailto:Pandit979212@gmail.com"]').first()).toBeVisible();
  });

  test('D. Synchronized Real Inventory Counts Across Homepage & Category Hubs', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const heroSection = await page.locator('#home-hero').innerText();
    expect(heroSection).toContain('1,300');

    const createSection = await page.locator('#create-something-beautiful').innerText();
    expect(createSection).toContain('184');

    const exploreSection = await page.locator('#explore-and-get-inspired').innerText();
    expect(exploreSection).toContain('8');
    expect(exploreSection).toContain('25');
    expect(exploreSection).toContain('14');

    await page.goto('/wishes/', { waitUntil: 'domcontentloaded' });
    expect(await page.locator('main').innerText()).toContain('700');

    await page.goto('/greeting-cards/', { waitUntil: 'domcontentloaded' });
    expect(await page.locator('main').innerText()).toContain('184');
  });

  test('E. Browser No-JS Rendering: Meaningful Visible Content, Distinct Metadata & Trailing-Slash Links', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    const routes = [
      { path: '/', canonical: 'https://festivewala.in/', h1Match: /Celebrate Every Moment/i },
      { path: '/about/', canonical: 'https://festivewala.in/about/', h1Match: /About FestiveWala/i },
      { path: '/wishes/', canonical: 'https://festivewala.in/wishes/', h1Match: /Wishes/i },
      { path: '/festivals/diwali/', canonical: 'https://festivewala.in/festivals/diwali/', h1Match: /Diwali/i },
    ];

    const seenTitles = new Set<string>();
    for (const r of routes) {
      const res = await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      expect(res?.status()).toBe(200);

      const title = await page.title();
      expect(title.length).toBeGreaterThan(15);
      seenTitles.add(title);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', r.canonical);
      await expect(page.locator('h1').first()).toContainText(r.h1Match);

      const mainInfo = await page.locator('main').evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          opacity: style.opacity,
          textLength: (el.textContent || '').trim().length,
        };
      });
      expect(mainInfo.opacity).not.toBe('0');
      expect(mainInfo.textLength).toBeGreaterThan(200);
    }
    expect(seenTitles.size).toBe(routes.length);
    await context.close();
  });

  test('F. Raw HTTP Verification: 200 Routes, 301 Trailing-Slash Aliases & Genuine 404 Responses', async ({ request }) => {
    const validRoutes = [
      { path: '/', canonical: 'https://festivewala.in/' },
      { path: '/about/', canonical: 'https://festivewala.in/about/' },
      { path: '/wishes/', canonical: 'https://festivewala.in/wishes/' },
      { path: '/festivals/diwali/', canonical: 'https://festivewala.in/festivals/diwali/' },
      { path: '/festivals/chhath-puja/', canonical: 'https://festivewala.in/festivals/chhath-puja/' },
      { path: '/greeting-cards/', canonical: 'https://festivewala.in/greeting-cards/' },
    ];

    for (const r of validRoutes) {
      const res = await request.get(r.path);
      expect(res.status()).toBe(200);
      const html = await res.text();
      expect(html).toContain(`<link rel="canonical" href="${r.canonical}"`);
      expect(html).not.toContain('<meta name="robots" content="noindex');
      expect(html).not.toMatch(/<main[^>]*style="[^"]*opacity:\s*0/i);
    }

    // 301 Aliases
    const aliases = [
      { from: '/privacy', to: '/privacy-policy/' },
      { from: '/terms', to: '/terms-of-service/' },
      { from: '/greeting-studio', to: '/greeting-cards/' },
    ];
    for (const a of aliases) {
      const res = await request.get(a.from, { maxRedirects: 0 });
      expect(res.status()).toBe(301);
      expect(res.headers()['location']).toContain(a.to);
    }

    // Genuine 404s (unknown paths & unbuilt festival guides)
    for (const invalidPath of [
      '/unknown-test-route-404',
      '/festivals/unknown-xyz',
      '/festivals/makar-sankranti',
      '/festivals/maha-shivratri',
      '/festivals/navratri',
    ]) {
      const res = await request.get(invalidPath);
      expect(res.status()).toBe(404);
    }
  });
});
