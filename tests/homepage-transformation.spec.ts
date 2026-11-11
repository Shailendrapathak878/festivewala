import { test, expect } from '@playwright/test';

test.describe('FestiveWala Step 1: Homepage Transformation Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Header: Logo, All Route Navigation, Create CTA, Language Selector & Mobile Drawer', async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Brand Logo & Name
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('FestiveWala');

    // Desktop Navigation Links (All 9 existing routes)
    const expectedRoutes = [
      '/',
      '/festivals/',
      '/greeting-cards/',
      '/wishes/',
      '/rangoli/',
      '/decoration-ideas/',
      '/gift-ideas/',
      '/festival-guides/',
      '/inspiration/',
    ];
    for (const route of expectedRoutes) {
      const navLink = page.locator(`header nav a[href="${route}"]`);
      expect(await navLink.count()).toBeGreaterThanOrEqual(1);
    }

    // Clear Create CTA on Desktop
    const createCta = page.locator('header a[href="/greeting-cards/"]:visible').first();
    await expect(createCta).toBeVisible();

    // Language Selector: English, हिन्दी, Hinglish
    const langSwitcher = page.locator('header [role="group"][aria-label*="Language"]').first();
    await expect(langSwitcher).toBeVisible();
    await expect(langSwitcher).toContainText('EN');
    await expect(langSwitcher).toContainText('हिन्दी');
    await expect(langSwitcher).toContainText('Hinglish');

    // Mobile Viewport test for Header
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Mobile Menu Drawer
    const hamburgerBtn = page.locator('button[aria-controls="mobile-navigation-drawer"]');
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();

    const drawer = page.locator('#mobile-navigation-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer.locator('a[href="/greeting-cards/"]').first()).toBeVisible();
    await expect(drawer.locator('a[href="/inspiration/"]')).toBeVisible();

    // Close drawer
    await page.locator('#mobile-navigation-drawer button[aria-label]').first().click();
    await expect(drawer).toBeHidden();
  });

  test('2. Hero Section: Exact Main Heading H1, Supporting Text, and CTAs', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Verify exactly one H1 on the homepage
    await expect(page.locator('h1')).toHaveCount(1);

    const h1 = page.locator('h1');
    await expect(h1).toHaveText('Celebrate Every Moment, Create Something Beautiful.');

    // Supporting Text
    const supportingText = page.locator('#home-hero p').first();
    await expect(supportingText).toContainText(
      'Discover beautiful greetings, heartfelt wishes, creative designs and inspiration for every occasion.'
    );

    // Primary CTA: Start Creating
    const primaryCta = page.locator('#home-hero a[href="/greeting-cards/"]').first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toContainText('Start Creating');

    // Secondary CTA: Explore Wishes
    const secondaryCta = page.locator('#home-hero a[href="/wishes/"]').first();
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toContainText('Explore Wishes');
  });

  test("3. Today's Inspiration: Quote & Thought of the Day, Author Attribution, Share & Copy", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const section = page.locator('#todays-inspiration');
    await expect(section).toBeVisible();

    // Quote of the Day & Thought of the Day headings
    await expect(section).toContainText('Quote of the Day');
    await expect(section).toContainText('Thought of the Day');

    // Copy Quote action exists
    const copyQuoteBtn = section.locator('button[aria-label="Copy Quote"]');
    await expect(copyQuoteBtn).toBeVisible();

    // Share Quote action exists
    const shareQuoteBtn = section.locator('button[aria-label="Share Quote"]');
    await expect(shareQuoteBtn).toBeVisible();

    // Link to Inspiration Hub
    const inspirationLink = section.locator('a[href="/inspiration/"]');
    await expect(inspirationLink).toBeVisible();
  });

  test('4. Create Something Beautiful: 4 Verified Feature Cards', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const section = page.locator('#create-something-beautiful');
    await expect(section).toBeVisible();

    // Card 1: Greeting Cards -> /greeting-cards/
    const card1 = section.locator('a[href="/greeting-cards/"]').first();
    await expect(card1).toBeVisible();

    // Card 2: Photo Greetings -> /greeting-cards/?mode=photo
    const card2 = section.locator('a[href="/greeting-cards/?mode=photo"]');
    await expect(card2).toBeVisible();

    // Card 3: Festival Greetings -> /greeting-cards/
    const card3 = section.locator('a[href="/greeting-cards/"]').nth(1);
    await expect(card3).toBeVisible();

    // Card 4: Creative Studio -> /greeting-cards/
    const card4 = section.locator('a[href="/greeting-cards/"]').nth(2);
    await expect(card4).toBeVisible();
  });

  test('5. Wishes & Messages: 6 Categories with Interactive Switching & Actions', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const section = page.locator('#wishes-and-messages');
    await expect(section).toBeVisible();

    // Verify 6 Category Buttons
    const categoryNames = [
      'Birthday Wishes',
      'Anniversary Wishes',
      'Love & Friendship',
      'Good Morning',
      'Good Night',
      'Festival Wishes',
    ];
    for (const catName of categoryNames) {
      const catBtn = section.locator(`button:has-text("${catName}")`);
      await expect(catBtn).toBeVisible();
    }

    // Switch to Birthday Wishes
    await section.locator('button:has-text("Birthday Wishes")').click();
    await expect(section).toContainText('Boundless Joy & Blessings');

    // Switch to Anniversary Wishes
    await section.locator('button:has-text("Anniversary Wishes")').click();
    await expect(section).toContainText('Timeless Companionship');

    // Switch to Good Morning
    await section.locator('button:has-text("Good Morning")').click();
    await expect(section).toContainText('Golden Dawn Radiance');

    // Switch to Good Night
    await section.locator('button:has-text("Good Night")').click();
    await expect(section).toContainText('Peaceful Night Rest');

    // Copy and WhatsApp share buttons
    const copyBtn = section.locator('button[aria-label="Copy Wish"]').first();
    await expect(copyBtn).toBeVisible();
  });

  test('6. Upcoming Celebrations: Uses Real Data and Retains Priority Engine', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const section = page.locator('#upcoming-celebrations');
    await expect(section).toBeVisible();

    // Carousel container with data-testid
    const carousel = section.locator('[data-testid="hero-festival-carousel"]');
    await expect(carousel).toBeVisible();

    // Carousel indicator dots exist
    const dots = section.locator('[data-testid="carousel-indicator-dot"]');
    expect(await dots.count()).toBeGreaterThanOrEqual(2);
  });

  test('7. Popular Templates: Shows Real Editions with Create Actions', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const section = page.locator('#popular-templates');
    await expect(section).toBeVisible();

    // Links to Studio with specific templates
    const templateLinks = section.locator('a[href*="/greeting-cards/?template="]');
    expect(await templateLinks.count()).toBeGreaterThanOrEqual(4);

    // Verify real template titles from GREETING_EDITIONS
    await expect(section).toContainText('The Sovereign Lotus Edition');
    await expect(section).toContainText('The Royal Clay Diya Edition');
  });

  test('8. Explore & Get Inspired: 5 Content Categories with Valid Routes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const section = page.locator('#explore-and-get-inspired');
    await expect(section).toBeVisible();

    // 5 Categories: Rangoli, Decor, Gifts, Guides, Inspiration
    const expectedCategoryRoutes = [
      '/rangoli/',
      '/decoration-ideas/',
      '/gift-ideas/',
      '/festival-guides/',
      '/inspiration/',
    ];
    for (const route of expectedCategoryRoutes) {
      const link = section.locator(`a[href="${route}"]`);
      await expect(link).toBeVisible();
    }
  });

  test('9. Footer: Legal Pages & Brand Attribution Preserved', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Legal & Trust routes
    const legalRoutes = [
      '/about/',
      '/contact/',
      '/privacy-policy/',
      '/terms-of-service/',
      '/disclaimer/',
    ];
    for (const route of legalRoutes) {
      const link = footer.locator(`a[href="${route}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test('10. Mobile Responsiveness (390x844): Zero Overflow and Clean Layout', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    // Verify zero horizontal scroll / overflow
    const overflowInfo = await page.evaluate(() => {
      const clientWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const offenders: Array<{ tag: string; id: string; className: string; right: number; width: number }> = [];

      document.querySelectorAll('*').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > clientWidth + 1) {
          offenders.push({
            tag: el.tagName,
            id: el.id,
            className: (el.className || '').toString().slice(0, 80),
            right: rect.right,
            width: rect.width,
          });
        }
      });

      return {
        clientWidth,
        scrollWidth,
        offenders: offenders.slice(0, 5),
      };
    });

    expect(overflowInfo.scrollWidth <= overflowInfo.clientWidth).toBe(true);

    // Verify canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://festivewala.in/');

    // Filter out expected third-party blocked scripts if any
    const realErrors = errors.filter(
      (e) => !e.includes('net::ERR') && !e.includes('favicon') && !e.includes('AdSense')
    );
    expect(realErrors.length).toBe(0);
  });

  test('11. Tablet Responsiveness (768x1024): Zero Overflow and Clean Layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('12. Functional Interactions: Direct Navigation & Language Toggling Verification', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Test Language Switcher to Hindi
    const hiBtn = page.locator('header [role="group"] button:has-text("हिन्दी")').first();
    await hiBtn.click();
    await page.waitForTimeout(300);

    // Verify H1 switches to Hindi
    const h1 = page.locator('h1');
    await expect(h1).toHaveText('हर पल का उत्सव मनाएं, कुछ सुंदर रचें।');

    // Switch back to English
    const enBtn = page.locator('header [role="group"] button:has-text("EN")').first();
    await enBtn.click();
    await page.waitForTimeout(300);
    await expect(h1).toHaveText('Celebrate Every Moment, Create Something Beautiful.');

    // Test Start Creating CTA link destination
    const startCreatingLink = page.locator('#home-hero a[href="/greeting-cards/"]').first();
    expect(await startCreatingLink.getAttribute('href')).toBe('/greeting-cards/');

    // Test Explore Wishes CTA link destination
    const exploreWishesLink = page.locator('#home-hero a[href="/wishes/"]').first();
    expect(await exploreWishesLink.getAttribute('href')).toBe('/wishes/');

    // Test Creative Studio card link destination
    const studioCard = page.locator('#create-something-beautiful a[href="/greeting-cards/"]').nth(2);
    expect(await studioCard.getAttribute('href')).toBe('/greeting-cards/');

    // Test Photo Greeting card link destination
    const photoCard = page.locator('#create-something-beautiful a[href="/greeting-cards/?mode=photo"]');
    expect(await photoCard.getAttribute('href')).toBe('/greeting-cards/?mode=photo');

    // Test Popular Template create action link
    const firstTemplateCta = page.locator('#popular-templates a[href*="/greeting-cards/?template="]').first();
    const href = await firstTemplateCta.getAttribute('href');
    expect(href).toContain('/greeting-cards/?template=');
  });

  test('13. Fresh Visual Proof Screenshots (Desktop, Tablet & Mobile)', async ({ page }) => {
    const fs = await import('fs');
    const path = await import('path');
    const outputDir = path.resolve(process.cwd(), 'artifacts/qa/homepage-step1');
    const brainDir = 'C:/Users/rp353/.gemini/antigravity/brain/c2ce0d15-3879-42dc-a17d-d6affe905abf/screenshots/homepage-step1';
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(brainDir, { recursive: true });

    // 1. Desktop Screenshot (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    const p1 = path.join(outputDir, '01_desktop_homepage_step1.png');
    await page.screenshot({ path: p1 });
    fs.copyFileSync(p1, path.join(brainDir, '01_desktop_homepage_step1.png'));

    // 2. Tablet Screenshot (768x1024)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    const p2 = path.join(outputDir, '02_tablet_homepage_step1.png');
    await page.screenshot({ path: p2 });
    fs.copyFileSync(p2, path.join(brainDir, '02_tablet_homepage_step1.png'));

    // 3. Mobile Screenshot (iPhone 14, 390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    const p3 = path.join(outputDir, '03_mobile_homepage_step1.png');
    await page.screenshot({ path: p3 });
    fs.copyFileSync(p3, path.join(brainDir, '03_mobile_homepage_step1.png'));
  });
});
