import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('SEO Phase 2: Structured Data & Schema Consolidation', () => {
  test('1. index.html contains single authoritative WebSite entity with @id', async () => {
    const htmlPath = path.resolve('index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    // Parse script tags
    const scriptMatches = [...htmlContent.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    expect(scriptMatches.length).toBeGreaterThanOrEqual(1);

    const siteSchema = JSON.parse(scriptMatches[0][1]);
    expect(siteSchema['@type']).toBe('WebSite');
    expect(siteSchema['@id']).toBe('https://festivewala.in/#website');
    expect(siteSchema.url).toBe('https://festivewala.in/');
    expect(siteSchema.name).toBe('FestiveWala');
    expect(siteSchema.inLanguage).toEqual(['en', 'hi', 'hi-Latn']);
  });

  test('2. Homepage emits WebPage schema linking to WebSite; no fake SearchAction', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const jsonLdContent = await page.locator('#seo-jsonld').textContent();
    expect(jsonLdContent).toBeTruthy();
    const pageSchema = JSON.parse(jsonLdContent!);

    // Should be WebPage, NOT a duplicate WebSite
    expect(pageSchema['@type']).toBe('WebPage');
    expect(pageSchema['@id']).toBe('https://festivewala.in/#webpage');
    expect(pageSchema.isPartOf).toEqual({
      '@type': 'WebSite',
      '@id': 'https://festivewala.in/#website',
      name: 'FestiveWala',
      url: 'https://festivewala.in/',
    });

    // Verify no fake potentialAction / SearchAction
    expect(pageSchema.potentialAction).toBeUndefined();

    // Verify there is only 1 WebSite in total across scripts in DOM
    const allScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const webSiteEntities = allScripts
      .map((s) => {
        try {
          return JSON.parse(s);
        } catch {
          return null;
        }
      })
      .filter((s) => s && s['@type'] === 'WebSite');

    expect(webSiteEntities.length).toBe(1);
    expect(webSiteEntities[0]['@id']).toBe('https://festivewala.in/#website');
  });

  test('3. Festival detail pages emit WebPage, Article, and BreadcrumbList; generic Event schema is omitted', async ({ page }) => {
    const festivalRoutes = [
      { route: '/festivals/diwali', id: 'diwali', nameMatch: /Diwali|दीपावली/ },
      { route: '/festivals/dhanteras', id: 'dhanteras', nameMatch: /Dhanteras|धनतेरस/ },
      { route: '/festivals/holi', id: 'holi', nameMatch: /Holi|होली/ },
      { route: '/festivals/christmas', id: 'christmas', nameMatch: /Christmas|क्रिसमस/ },
      { route: '/festivals/new-year', id: 'new-year', nameMatch: /New Year|नव वर्ष/ },
    ];

    for (const { route, id, nameMatch } of festivalRoutes) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      const jsonLdContent = await page.locator('#seo-jsonld').textContent();
      expect(jsonLdContent).toBeTruthy();
      const schemas = JSON.parse(jsonLdContent!);
      expect(Array.isArray(schemas)).toBe(true);

      // 1. Generic Event schema MUST NOT be forced onto informational festival guide pages
      const eventSchema = schemas.find((s: Record<string, unknown>) => s['@type'] === 'Event');
      expect(eventSchema).toBeUndefined();

      // 2. WebPage schema linking to WebSite Knowledge Graph
      const webPage = schemas.find((s: Record<string, unknown>) => s['@type'] === 'WebPage');
      expect(webPage).toBeTruthy();
      expect(webPage.url).toBe(`https://festivewala.in/festivals/${id}/`);
      expect(webPage.isPartOf['@id']).toBe('https://festivewala.in/#website');

      // 3. BreadcrumbList schema
      const breadcrumbs = schemas.find((s: Record<string, unknown>) => s['@type'] === 'BreadcrumbList');
      expect(breadcrumbs).toBeTruthy();
      expect(breadcrumbs.itemListElement.length).toBe(3);

      // 4. Article schema
      const article = schemas.find((s: Record<string, unknown>) => s['@type'] === 'Article');
      expect(article).toBeTruthy();
      expect(article.headline).toMatch(nameMatch);
      expect(article.author.name).toBe('Shailendra Pathak');
    }
  });

  test('4. Festival detail pages with FAQs emit matching FAQPage schema', async ({ page }) => {
    await page.goto('/festivals/diwali');
    await page.waitForLoadState('domcontentloaded');

    const jsonLdContent = await page.locator('#seo-jsonld').textContent();
    const schemas = JSON.parse(jsonLdContent!);

    const faqSchema = schemas.find((s: Record<string, unknown>) => s['@type'] === 'FAQPage');
    expect(faqSchema).toBeTruthy();
    expect(faqSchema.mainEntity.length).toBeGreaterThan(0);

    // Verify first 2 questions from schema are visibly rendered in TrilingualFAQSection
    for (let i = 0; i < Math.min(2, faqSchema.mainEntity.length); i++) {
      const qText = faqSchema.mainEntity[i].name;
      const qHeading = page.locator('button', { hasText: qText }).or(page.locator('h3', { hasText: qText })).or(page.locator('h4', { hasText: qText }));
      await expect(qHeading.first()).toBeVisible();
    }
  });

  test('5. FAQ visibility & JSON-LD matching: /wishes and /wishes?category=festival', async ({ page }) => {
    for (const route of ['/wishes', '/wishes?category=festival']) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      const jsonLdContent = await page.locator('#seo-jsonld').textContent();
      const schemas = JSON.parse(jsonLdContent!);
      const faqSchema = schemas.find((s: Record<string, unknown>) => s['@type'] === 'FAQPage');
      expect(faqSchema).toBeTruthy();
      expect(faqSchema.mainEntity.length).toBe(3);

      // Verify every Q&A in the schema is genuinely rendered in the DOM
      for (const entity of faqSchema.mainEntity) {
        const questionText = entity.name;
        const answerText = entity.acceptedAnswer.text;

        const qLocator = page.locator('h3', { hasText: questionText });
        await expect(qLocator).toBeVisible();

        const aLocator = page.locator('p', { hasText: answerText });
        await expect(aLocator).toBeVisible();
      }
    }
  });

  test('6. FAQ visibility & JSON-LD matching: /wishes/dhanteras and /wishes/diwali', async ({ page }) => {
    for (const route of ['/wishes/dhanteras', '/wishes/diwali']) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      const jsonLdContent = await page.locator('#seo-jsonld').textContent();
      const schemas = JSON.parse(jsonLdContent!);
      const faqSchema = schemas.find((s: Record<string, unknown>) => s['@type'] === 'FAQPage');
      expect(faqSchema).toBeTruthy();
      expect(faqSchema.mainEntity.length).toBe(3);

      // Verify each Q&A in schema is visible on page
      for (const entity of faqSchema.mainEntity) {
        const questionText = entity.name;
        const answerText = entity.acceptedAnswer.text;

        const qLocator = page.locator('h3', { hasText: questionText });
        await expect(qLocator).toBeVisible();

        const aLocator = page.locator('p', { hasText: answerText });
        await expect(aLocator).toBeVisible();
      }
    }
  });

  test('7. /wishes?category=birthday emits Birthday CollectionPage and OMITS FAQPage', async ({ page }) => {
    await page.goto('/wishes?category=birthday');
    await page.waitForLoadState('domcontentloaded');

    const jsonLdContent = await page.locator('#seo-jsonld').textContent();
    expect(jsonLdContent).toBeTruthy();
    const schemas = JSON.parse(jsonLdContent!);

    const collection = schemas.find((s: Record<string, unknown>) => s['@type'] === 'CollectionPage');
    expect(collection).toBeTruthy();
    expect(collection.name).toBe('Birthday Wishes and Greetings Collection');

    // FAQPage schema must be omitted for occasion categories
    const faqSchema = schemas.find((s: Record<string, unknown>) => s['@type'] === 'FAQPage');
    expect(faqSchema).toBeUndefined();
  });

  test('8. All six occasion categories have accurate CollectionPage and omit FAQPage', async ({ page }) => {
    const testCases = [
      { cat: 'anniversary', expectedName: 'Anniversary Wishes Collection' },
      { cat: 'love', expectedName: 'Love Messages and Romantic Quotes Collection' },
      { cat: 'friendship', expectedName: 'Friendship Messages and Quotes Collection' },
      { cat: 'good-morning', expectedName: 'Good Morning Wishes and Blessings Collection' },
      { cat: 'good-night', expectedName: 'Good Night Wishes and Blessings Collection' },
    ];

    for (const { cat, expectedName } of testCases) {
      await page.goto(`/wishes?category=${cat}`, { waitUntil: 'domcontentloaded' });
      await expect
        .poll(async () => (await page.locator('#seo-jsonld').textContent()) || '')
        .toContain(expectedName);

      const jsonLdContent = await page.locator('#seo-jsonld').textContent();
      const schemas = JSON.parse(jsonLdContent!);

      const collection = schemas.find((s: Record<string, unknown>) => s['@type'] === 'CollectionPage');
      expect(collection.name).toBe(expectedName);

      const faqSchema = schemas.find((s: Record<string, unknown>) => s['@type'] === 'FAQPage');
      expect(faqSchema).toBeUndefined();
    }
  });

  test('9. JSON-LD inLanguage accurately reflects active EN, HI, and Hinglish (hi-Latn) states', async ({ page }) => {
    const langStates = [
      { lang: 'en', expectedInLang: 'en' },
      { lang: 'hi', expectedInLang: 'hi' },
      { lang: 'hinglish', expectedInLang: 'hi-Latn' },
    ];

    for (const { lang, expectedInLang } of langStates) {
      await page.addInitScript((targetLang) => {
        localStorage.setItem('festivewala_language', targetLang);
        localStorage.setItem('festivewala_lang', targetLang);
        localStorage.setItem('festivewala_language_selected', 'true');
      }, lang);

      // 1. Homepage WebPage schema & <html lang>
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('lang', expectedInLang);
      await expect
        .poll(async () => (await page.locator('#seo-jsonld').textContent()) || '')
        .toContain(`"inLanguage":"${expectedInLang}"`);
      const homeSchema = JSON.parse((await page.locator('#seo-jsonld').textContent())!);
      expect(homeSchema.inLanguage).toBe(expectedInLang);

      // 2. FestivalDetailPage WebPage + Article schemas & <html lang>
      await page.goto('/festivals/diwali', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('lang', expectedInLang);
      await expect
        .poll(async () => (await page.locator('#seo-jsonld').textContent()) || '')
        .toContain(`"inLanguage":"${expectedInLang}"`);
      const festSchemas = JSON.parse((await page.locator('#seo-jsonld').textContent())!);
      const webPage = festSchemas.find((s: Record<string, unknown>) => s['@type'] === 'WebPage');
      const article = festSchemas.find((s: Record<string, unknown>) => s['@type'] === 'Article');
      expect(webPage.inLanguage).toBe(expectedInLang);
      expect(article.inLanguage).toBe(expectedInLang);
    }
  });
});
