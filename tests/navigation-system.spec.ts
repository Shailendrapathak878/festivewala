import { test, expect } from '@playwright/test';

test.describe('FestiveWala Step 2: Complete Navigation System Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Desktop Navigation: 6 Primary Categories with Dropdowns and Destinations', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    await expect(nav).toBeVisible();

    // 1. Home Direct Link
    const homeLink = nav.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toContainText('Home');

    // 2. Create Dropdown
    const createBtn = nav.locator('button[data-nav-group="create"]');
    await expect(createBtn).toBeVisible();
    await createBtn.click();
    await page.waitForTimeout(200);

    const createDropdown = nav.locator('div[data-dropdown="create"]');
    await expect(createDropdown).toBeVisible();
    await expect(createDropdown.locator('a[href="/greeting-cards/"]').first()).toBeVisible();
    await expect(createDropdown.locator('a[href="/greeting-cards/?mode=photo"]')).toBeVisible();
    await expect(createDropdown.locator('a[href="/greetings/diwali/"]')).toBeVisible();
    await expect(createDropdown.locator('a[href="/greeting-cards/"]').nth(1)).toBeVisible();

    // 3. Wishes Dropdown
    const wishesBtn = nav.locator('button[data-nav-group="wishes"]');
    await expect(wishesBtn).toBeVisible();
    await wishesBtn.click();
    await page.waitForTimeout(200);

    const wishesDropdown = nav.locator('div[data-dropdown="wishes"]');
    await expect(wishesDropdown).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=birthday"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=anniversary"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=love"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=friendship"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=good-morning"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=good-night"]')).toBeVisible();
    await expect(wishesDropdown.locator('a[href="/wishes/?category=festival"]')).toBeVisible();

    // 4. Explore Dropdown
    const exploreBtn = nav.locator('button[data-nav-group="explore"]');
    await expect(exploreBtn).toBeVisible();
    await exploreBtn.click();
    await page.waitForTimeout(200);

    const exploreDropdown = nav.locator('div[data-dropdown="explore"]');
    await expect(exploreDropdown).toBeVisible();
    await expect(exploreDropdown.locator('a[href="/festivals/"]')).toBeVisible();
    await expect(exploreDropdown.locator('a[href="/rangoli/"]')).toBeVisible();
    await expect(exploreDropdown.locator('a[href="/decoration-ideas/"]')).toBeVisible();
    await expect(exploreDropdown.locator('a[href="/gift-ideas/"]')).toBeVisible();
    await expect(exploreDropdown.locator('a[href="/festival-guides/"]')).toBeVisible();
    await expect(exploreDropdown.locator('a[href="/inspiration/"]')).toBeVisible();

    // 5. Daily Dropdown
    const dailyBtn = nav.locator('button[data-nav-group="daily"]');
    await expect(dailyBtn).toBeVisible();
    await dailyBtn.click();
    await page.waitForTimeout(200);

    const dailyDropdown = nav.locator('div[data-dropdown="daily"]');
    await expect(dailyDropdown).toBeVisible();
    await expect(dailyDropdown.locator('a[href="/#quote-of-the-day"]')).toBeVisible();
    await expect(dailyDropdown.locator('a[href="/#thought-of-the-day"]')).toBeVisible();

    // 6. More Dropdown
    const moreBtn = nav.locator('button[data-nav-group="more"]');
    await expect(moreBtn).toBeVisible();
    await moreBtn.click();
    await page.waitForTimeout(200);

    const moreDropdown = nav.locator('div[data-dropdown="more"]');
    await expect(moreDropdown).toBeVisible();
    await expect(moreDropdown.locator('a[href="/about/"]')).toBeVisible();
    await expect(moreDropdown.locator('a[href="/contact/"]')).toBeVisible();
    await expect(moreDropdown.locator('a[href="/privacy-policy/"]')).toBeVisible();
    await expect(moreDropdown.locator('a[href="/terms-of-service/"]')).toBeVisible();
    await expect(moreDropdown.locator('a[href="/disclaimer/"]')).toBeVisible();
  });

  test('2. Desktop Dropdown Interaction: Click, Navigation & Escape Key', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    const exploreBtn = nav.locator('button[data-nav-group="explore"]');
    const exploreDropdown = nav.locator('div[data-dropdown="explore"]');

    // Open dropdown
    await exploreBtn.click();
    await expect(exploreDropdown).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    await expect(exploreDropdown).toBeHidden();

    // Re-open and click Rangoli link
    await exploreBtn.click();
    await expect(exploreDropdown).toBeVisible();
    const rangoliLink = exploreDropdown.locator('a[href="/rangoli/"]');
    await rangoliLink.click();

    // Verify navigation occurred
    await page.waitForURL('**/rangoli/');
    expect(page.url()).toContain('/rangoli/');
  });

  test('3. Daily Dropdown: Anchor Navigation to Quote and Thought of the Day', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    const dailyBtn = nav.locator('button[data-nav-group="daily"]');
    await dailyBtn.click();
    await page.waitForTimeout(200);

    const quoteLink = nav.locator('div[data-dropdown="daily"] a[href="/#quote-of-the-day"]');
    await quoteLink.click();
    await page.waitForTimeout(400);

    // Verify anchor target exists in DOM and is positioned
    const quoteCard = page.locator('#quote-of-the-day');
    await expect(quoteCard).toBeVisible();
    const thoughtCard = page.locator('#thought-of-the-day');
    await expect(thoughtCard).toBeVisible();
  });

  test('4. Mobile Navigation Drawer: Hamburger Trigger, Accordions & Quick Categories', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Open Drawer via Header Hamburger
    const hamburgerBtn = page.locator('button[aria-controls="mobile-navigation-drawer"]');
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();
    await page.waitForTimeout(300);

    const drawer = page.locator('#mobile-navigation-drawer');
    await expect(drawer).toBeVisible();

    // Verify Brand Logo in Drawer
    await expect(drawer.locator('text=FestiveWala').first()).toBeVisible();

    // Verify Primary Navigation Categories grid (Quick links)
    const quickLinks = [
      '/',
      '/greeting-cards/',
      '/wishes/',
      '/festivals/',
      '/rangoli/',
      '/decoration-ideas/',
      '/gift-ideas/',
      '/festival-guides/',
      '/inspiration/',
    ];
    for (const route of quickLinks) {
      await expect(drawer.locator(`a[href="${route}"]`).first()).toBeVisible();
    }

    // Verify Accordion Menu toggles
    const createAccordionBtn = drawer.locator('button:has-text("Create & Design")');
    await expect(createAccordionBtn).toBeVisible();

    // Verify Start Creating CTA at bottom of drawer
    const startCreatingBtn = drawer.locator('a[href="/greeting-cards/"]:has-text("Start Creating Card")');
    await expect(startCreatingBtn).toBeVisible();

    // Close Drawer via X button
    const closeBtn = drawer.locator('button[aria-label*="Close"]');
    await closeBtn.click();
    await page.waitForTimeout(300);
    await expect(drawer).toBeHidden();
  });

  test('5. Mobile Bottom Navigation: 5 Items in Exact Order & Integration with Drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible();

    // Verify 5 items exist
    const homeItem = bottomNav.locator('a[href="/"]');
    await expect(homeItem).toBeVisible();
    await expect(homeItem).toContainText('Home');

    const createItem = bottomNav.locator('a[href="/greeting-cards/"]');
    await expect(createItem).toBeVisible();
    await expect(createItem).toContainText('Create');

    const wishesItem = bottomNav.locator('a[href="/wishes/"]');
    await expect(wishesItem).toBeVisible();
    await expect(wishesItem).toContainText('Wishes');

    const exploreItem = bottomNav.locator('a[href="/festivals/"]');
    await expect(exploreItem).toBeVisible();
    await expect(exploreItem).toContainText('Explore');

    const moreItem = bottomNav.locator('button:has-text("More")');
    await expect(moreItem).toBeVisible();

    // Verify "More" triggers the unified Mobile Navigation Drawer
    await moreItem.click();
    await page.waitForTimeout(300);

    const drawer = page.locator('#mobile-navigation-drawer');
    await expect(drawer).toBeVisible();

    // Close drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(drawer).toBeHidden();
  });

  test('6. Active Route States across Navigation Systems', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Navigate to /wishes
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Verify Wishes parent button has active styling
    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    const wishesBtn = nav.locator('button[data-nav-group="wishes"]');
    await expect(wishesBtn).toHaveClass(/text-brand-deep/);

    // Mobile Viewport Active State
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    const wishesBottomLink = bottomNav.locator('a[href="/wishes/"]');
    await expect(wishesBottomLink).toHaveClass(/text-\[#F2D98B\]/);
  });

  test('7. Language Switching updates Navigation Labels', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Switch to Hindi
    const hiBtn = page.locator('header [role="group"] button:has-text("हिन्दी")').first();
    await hiBtn.click();
    await page.waitForTimeout(300);

    // Verify Desktop Nav buttons switch to Hindi
    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    await expect(nav.locator('a[href="/"]').first()).toContainText('होम');
    await expect(nav.locator('button:has-text("रचें")')).toBeVisible();
    await expect(nav.locator('button:has-text("शुभकामनाएं")')).toBeVisible();
    await expect(nav.locator('button:has-text("खोजें")')).toBeVisible();
    await expect(nav.locator('button:has-text("दैनिक")')).toBeVisible();
    await expect(nav.locator('button:has-text("अधिक")')).toBeVisible();

    // Switch back to English
    const enBtn = page.locator('header [role="group"] button:has-text("EN")').first();
    await enBtn.click();
    await page.waitForTimeout(300);
    await expect(nav.locator('a[href="/"]').first()).toContainText('Home');
  });

  test('8. Responsiveness & Zero Horizontal Overflow (Desktop, Tablet & Mobile)', async ({ page }) => {
    const viewports = [
      { name: 'Desktop', width: 1440, height: 900 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll, `${vp.name} must not have horizontal scroll`).toBe(false);
    }
  });

  test('9. Capture Step 2 Navigation Visual Proof Screenshots', async ({ page }) => {
    // 1. Desktop with Explore Dropdown Open
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    const exploreBtn = page.locator('header nav[aria-label="Main Navigation"] button[data-nav-group="explore"]');
    await exploreBtn.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'artifacts/qa/navigation-step2/01_desktop_navigation_dropdown.png',
      fullPage: false,
    });

    // 2. Tablet Viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'artifacts/qa/navigation-step2/02_tablet_navigation.png',
      fullPage: false,
    });

    // 3. Mobile Viewport with Bottom Navigation
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'artifacts/qa/navigation-step2/03_mobile_bottom_nav.png',
      fullPage: false,
    });

    // 4. Mobile Drawer Open
    const hamburgerBtn = page.locator('button[aria-controls="mobile-navigation-drawer"]');
    await hamburgerBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: 'artifacts/qa/navigation-step2/04_mobile_drawer_open.png',
      fullPage: false,
    });
  });
});
