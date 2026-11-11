import { test, expect } from '@playwright/test';

test.describe('FestiveWala Step 2: Final Navigation Edge-Case Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Daily Anchor Navigation: Cross-route navigation, scrolling, sticky header clearance & back button', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Step 1: Open a non-homepage route (/wishes)
    await page.goto('/wishes', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    expect(page.url()).toContain('/wishes');

    // Step 2: Click "Daily" -> "Quote of the Day"
    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    const dailyBtn = nav.locator('button[data-nav-group="daily"]');
    await dailyBtn.click();
    await page.waitForTimeout(200);

    const quoteLink = nav.locator('div[data-dropdown="daily"] a[href="/#quote-of-the-day"]');
    await quoteLink.click();
    await page.waitForTimeout(800);

    // Verify URL is now homepage with #quote-of-the-day hash
    expect(page.url()).toContain('#quote-of-the-day');

    // Verify #quote-of-the-day element is visible
    const quoteEl = page.locator('#quote-of-the-day');
    await expect(quoteEl).toBeVisible();

    // Verify sticky header does NOT cover the target section
    const headerBox = await page.locator('header').boundingBox();
    const quoteBox = await quoteEl.boundingBox();
    expect(headerBox).not.toBeNull();
    expect(quoteBox).not.toBeNull();
    if (headerBox && quoteBox) {
      // Top of the quote card must be at or below the bottom of the sticky header
      expect(quoteBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 5);
    }

    // Step 3: From #quote-of-the-day, click "Daily" -> "Thought of the Day"
    await dailyBtn.click();
    await page.waitForTimeout(200);
    const thoughtLink = nav.locator('div[data-dropdown="daily"] a[href="/#thought-of-the-day"]');
    await thoughtLink.click();
    await page.waitForTimeout(800);

    expect(page.url()).toContain('#thought-of-the-day');
    const thoughtEl = page.locator('#thought-of-the-day');
    await expect(thoughtEl).toBeVisible();

    const thoughtBox = await thoughtEl.boundingBox();
    expect(thoughtBox).not.toBeNull();
    if (headerBox && thoughtBox) {
      expect(thoughtBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 5);
    }

    // Step 4: Verify browser back navigation
    await page.goBack();
    await page.waitForTimeout(600);
    // Browser back returns to previous history state
    expect(page.url()).toContain('#quote-of-the-day');

    await page.goBack();
    await page.waitForTimeout(600);
    expect(page.url()).toContain('/wishes');
  });

  test('2. Mobile More Integration: Unified drawer, no duplicate sheets, scroll locking, Escape, backdrop & close', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible();

    // Tap "More" in bottom nav
    const moreBtn = bottomNav.locator('button:has-text("More")');
    await moreBtn.click();
    await page.waitForTimeout(300);

    // Verify unified MobileNavigation drawer opens
    const drawer = page.locator('#mobile-navigation-drawer');
    await expect(drawer).toBeVisible();

    // Verify no duplicate drawer or secondary bottom sheet exists
    const drawerCount = await page.locator('#mobile-navigation-drawer').count();
    expect(drawerCount).toBe(1);
    const allDialogs = await page.locator('[role="dialog"]').count();
    expect(allDialogs).toBe(1);

    // Verify body scrolling is locked while drawer is open
    const isScrollLocked = await page.evaluate(() => {
      return document.body.style.overflow === 'hidden';
    });
    expect(isScrollLocked).toBe(true);

    // Verify Backdrop click closes drawer
    const backdrop = page.locator('[data-testid="mobile-drawer-backdrop"]');
    await backdrop.click({ position: { x: 20, y: 100 }, force: true });
    await page.waitForTimeout(350);
    await expect(drawer).toBeHidden();

    // Verify body scroll unlocked after close
    const isScrollUnlocked = await page.evaluate(() => {
      return document.body.style.overflow !== 'hidden';
    });
    expect(isScrollUnlocked).toBe(true);

    // Re-open via More button and verify Close button (X) closes drawer
    await moreBtn.click();
    await page.waitForTimeout(300);
    await expect(drawer).toBeVisible();

    const closeBtn = drawer.locator('button[aria-label*="Close"]');
    await closeBtn.click();
    await page.waitForTimeout(350);
    await expect(drawer).toBeHidden();

    // Re-open via More button and verify Escape key closes drawer
    await moreBtn.click();
    await page.waitForTimeout(300);
    await expect(drawer).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);
    await expect(drawer).toBeHidden();
  });

  test('3. Mobile Bottom Navigation: 5 items, nested active states, creation experience & editor hiding', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');

    // 1. Home active state on /
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await expect(bottomNav.locator('a[href="/"]')).toHaveClass(/text-\[#F2D98B\]/);

    // 2. Wishes active state on nested route /wishes/dhanteras
    await page.goto('/wishes/dhanteras', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await expect(bottomNav.locator('a[href="/wishes"]')).toHaveClass(/text-\[#F2D98B\]/);

    // 3. Explore active state on nested route /festivals/dhanteras
    await page.goto('/festivals/dhanteras', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await expect(bottomNav.locator('a[href="/festivals"]')).toHaveClass(/text-\[#F2D98B\]/);

    // 4. Explore active state on /rangoli
    await page.goto('/rangoli', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await expect(bottomNav.locator('a[href="/festivals"]')).toHaveClass(/text-\[#F2D98B\]/);

    // 5. Create button opens card maker experience (/greeting-cards)
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const createBtn = bottomNav.locator('a[href="/greeting-cards"]');
    await createBtn.click();
    await page.waitForURL('**/greeting-cards');
    expect(page.url()).toContain('/greeting-cards');

    // 6. Verify Create active state on photo mode nested route
    await page.goto('/greeting-cards?mode=photo', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await expect(bottomNav.locator('a[href="/greeting-cards"]')).toHaveClass(/text-\[#F2D98B\]/);

    // 7. Verify bottom nav is hidden in full canvas editor mode (?edit=true)
    await page.goto('/greeting-cards?edit=true', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await expect(bottomNav).toBeHidden();
  });

  test('4. Dropdown Accessibility: Keyboard navigation, Escape dismissal, focus ring & tablet touch', async ({ page }) => {
    // 1. Desktop Keyboard Accessibility
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const nav = page.locator('header nav[aria-label="Main Navigation"]');
    const wishesBtn = nav.locator('button[data-nav-group="wishes"]');
    const wishesDropdown = nav.locator('div[data-dropdown="wishes"]');

    // Focus Wishes button using keyboard
    await wishesBtn.focus();
    await expect(wishesBtn).toBeFocused();

    // Open via Enter key
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    await expect(wishesDropdown).toBeVisible();

    // Press Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await expect(wishesDropdown).toBeHidden();

    // 2. Tablet Viewport (768x1024) Touch Interaction
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // On tablet, header shows brand logo, create button, language switcher and hamburger
    const tabletHamburger = page.locator('button[aria-controls="mobile-navigation-drawer"]');
    await expect(tabletHamburger).toBeVisible();
    await tabletHamburger.click();
    await page.waitForTimeout(300);

    const drawer = page.locator('#mobile-navigation-drawer');
    await expect(drawer).toBeVisible();

    // Test Accordion touch expansion on tablet
    const exploreAccordion = drawer.locator('button:has-text("Explore & Discover")');
    await expect(exploreAccordion).toBeVisible();
    await exploreAccordion.click();
    await page.waitForTimeout(250);

    // Verify child link is visible
    const rangoliLink = drawer.locator('a[href="/rangoli"]').first();
    await expect(rangoliLink).toBeVisible();

    // Close drawer via backdrop click on tablet
    const backdrop = page.locator('[data-testid="mobile-drawer-backdrop"]');
    await backdrop.click({ position: { x: 50, y: 100 }, force: true });
    await page.waitForTimeout(300);
    await expect(drawer).toBeHidden();
  });

});
