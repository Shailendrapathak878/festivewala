import { test, expect } from '@playwright/test';

test.describe('SEO Step 3.4 Phase 3 - Wishes Section SEO Optimization', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  const occasionCategories = [
    {
      slug: 'birthday',
      expectedTitlePart: 'Birthday Wishes',
      expectedH1Part: 'Birthday Wishes',
      expectedCanonical: 'https://festivewala.in/wishes/?category=birthday',
      sampleLink: '/greeting-cards/',
    },
    {
      slug: 'anniversary',
      expectedTitlePart: 'Anniversary Wishes',
      expectedH1Part: 'Anniversary Wishes',
      expectedCanonical: 'https://festivewala.in/wishes/?category=anniversary',
      sampleLink: '/greeting-cards/',
    },
    {
      slug: 'love',
      expectedTitlePart: 'Love Messages',
      expectedH1Part: 'Love Messages',
      expectedCanonical: 'https://festivewala.in/wishes/?category=love',
      sampleLink: '/wishes/?category=anniversary',
    },
    {
      slug: 'friendship',
      expectedTitlePart: 'Friendship Messages',
      expectedH1Part: 'Friendship Messages',
      expectedCanonical: 'https://festivewala.in/wishes/?category=friendship',
      sampleLink: '/wishes/?category=birthday',
    },
    {
      slug: 'good-morning',
      expectedTitlePart: 'Good Morning Wishes',
      expectedH1Part: 'Good Morning Wishes',
      expectedCanonical: 'https://festivewala.in/wishes/?category=good-morning',
      sampleLink: '/#quote-of-the-day',
    },
    {
      slug: 'good-night',
      expectedTitlePart: 'Good Night Wishes',
      expectedH1Part: 'Good Night Wishes',
      expectedCanonical: 'https://festivewala.in/wishes/?category=good-night',
      sampleLink: '/wishes/?category=good-morning',
    },
  ];

  test('All 6 occasion categories load unique H1, Title, Description, and Canonical', async ({ page }) => {
    for (const cat of occasionCategories) {
      await page.goto(`/wishes?category=${cat.slug}`, { waitUntil: 'domcontentloaded' });

      // Title check
      await expect(page).toHaveTitle(new RegExp(cat.expectedTitlePart, 'i'));

      // H1 check
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      await expect(h1).toContainText(cat.expectedH1Part);

      // Meta description check
      const metaDesc = page.locator('meta[name="description"]');
      const descContent = await metaDesc.getAttribute('content');
      expect(descContent).toBeTruthy();
      expect(descContent!.length).toBeGreaterThan(40);

      // Canonical link check
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', cat.expectedCanonical);

      // Editorial Intro check
      const intro = page.locator('[data-testid="wishes-editorial-intro"]');
      await expect(intro).toBeVisible();
      const introText = await intro.innerText();
      expect(introText.length).toBeGreaterThan(30);

      // Contextual Internal Links check
      const linksContainer = page.locator('[data-testid="wishes-contextual-links"]');
      await expect(linksContainer).toBeVisible();
      const links = linksContainer.locator('a');
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(3);

      const hrefs = await links.evaluateAll((elements) => elements.map((el) => el.getAttribute('href')));
      expect(hrefs).toContain(cat.sampleLink);

      // Occasion category should NOT have FAQ schema or FAQ section
      const faqHeading = page.locator('h2:has-text("Frequently Asked Questions")');
      await expect(faqHeading).toHaveCount(0);

      const jsonLdElements = await page.locator('script[type="application/ld+json"]').allInnerTexts();
      const schemas = jsonLdElements.map((s) => {
        try {
          return JSON.parse(s);
        } catch {
          return null;
        }
      }).flat().filter(Boolean);

      const hasFaqSchema = schemas.some((s) => s['@type'] === 'FAQPage');
      expect(hasFaqSchema).toBe(false);

      const collectionPageSchema = schemas.find((s) => s['@type'] === 'CollectionPage');
      expect(collectionPageSchema).toBeDefined();
      expect(collectionPageSchema.url).toBe(cat.expectedCanonical);
    }
  });

  test('Default/Festival wishes route displays festival-specific metadata, FAQs, and FAQ schema', async ({ page }) => {
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });

    // Title check
    await expect(page).toHaveTitle(/Festival Wishes/i);

    // H1 check
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Festival Wishes');

    // Canonical link check
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://festivewala.in/wishes/');

    // Editorial Intro check
    const intro = page.locator('[data-testid="wishes-editorial-intro"]');
    await expect(intro).toBeVisible();

    // Contextual links
    const linksContainer = page.locator('[data-testid="wishes-contextual-links"]');
    await expect(linksContainer).toBeVisible();

    // FAQ section must exist on default festival route
    const faqHeading = page.locator('h2:has-text("Frequently Asked Questions")');
    await expect(faqHeading).toBeVisible();

    // FAQ schema must be present
    const jsonLdElements = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    const schemas = jsonLdElements.map((s) => {
      try {
        return JSON.parse(s);
      } catch {
        return null;
      }
    }).flat().filter(Boolean);

    const faqSchema = schemas.find((s) => s['@type'] === 'FAQPage');
    expect(faqSchema).toBeDefined();
    expect(faqSchema.mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  test('Festival sub-route /wishes/diwali loads Diwali-specific SEO metadata', async ({ page }) => {
    await page.goto('/wishes/diwali', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Diwali.*Wishes/i);
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Diwali Wishes');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://festivewala.in/wishes/diwali/');

    const intro = page.locator('[data-testid="wishes-editorial-intro"]');
    await expect(intro).toBeVisible();
    await expect(intro).toContainText(/Diwali|deep/i);
  });

  test('Hindi language toggle updates editorial introduction and guide text', async ({ page }) => {
    // Navigate with language pre-set to Hindi via init script
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'hi');
      localStorage.setItem('festivewala_language_selected', 'true');
    });

    await page.goto('/wishes?category=birthday', { waitUntil: 'domcontentloaded' });

    // Check Hindi editorial intro and H1
    const intro = page.locator('[data-testid="wishes-editorial-intro"]');
    await expect(intro).toBeVisible();
    await expect(intro).toContainText('जन्मदिन');

    const h1 = page.locator('h1');
    await expect(h1).toContainText('जन्मदिन');

    // Guide section
    const guideSection = page.locator('section:has-text("अपनों के लिए सही जन्मदिन शुभकामना कैसे चुनें?")');
    await expect(guideSection).toBeVisible();
  });

  test('Mobile viewport (390px) renders editorial intro and contextual links cleanly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/wishes?category=love', { waitUntil: 'domcontentloaded' });

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    const intro = page.locator('[data-testid="wishes-editorial-intro"]');
    await expect(intro).toBeVisible();

    const links = page.locator('[data-testid="wishes-contextual-links"]');
    await expect(links).toBeVisible();
  });
});
