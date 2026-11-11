import { test, expect } from '@playwright/test';

const TARGET_EMAIL = 'Pandit979212@gmail.com';
const TARGET_MAILTO = `mailto:${TARGET_EMAIL}`;

test.describe('Contact Us Page — Email Links, Honest Fallback & Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
    });
  });

  test('1. Displays clickable Pandit979212@gmail.com mailto links with zero old contact emails', async ({
    page,
  }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');

    const editorialLink = page.getByTestId('contact-email-editorial');
    const supportLink = page.getByTestId('contact-email-support');

    await expect(editorialLink).toBeVisible();
    await expect(editorialLink).toHaveText(TARGET_EMAIL);
    await expect(editorialLink).toHaveAttribute('href', TARGET_MAILTO);
    await expect(editorialLink).toHaveAttribute('aria-label', /Pandit979212@gmail\.com/);

    await expect(supportLink).toBeVisible();
    await expect(supportLink).toHaveText(TARGET_EMAIL);
    await expect(supportLink).toHaveAttribute('href', TARGET_MAILTO);
    await expect(supportLink).toHaveAttribute('aria-label', /Pandit979212@gmail\.com/);

    const pageText = await page.locator('main').textContent();
    expect(pageText).not.toContain('contact@festivewala.in');
    expect(pageText).not.toContain('support@festivewala.in');

    const timeline = page.getByTestId('contact-response-timeline');
    await expect(timeline).toBeVisible();
    await expect(timeline).toHaveText('We aim to respond as soon as possible.');
    expect(pageText).not.toContain('24 to 48 Hours');
  });

  test('2. Form submission provides honest mailto draft fallback instead of fake delivery confirmation', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#contact-name', 'Aarav Sharma');
    await page.fill('#contact-email', 'aarav@example.com');
    await page.selectOption('#contact-subject', 'editorial');
    await page.fill('#contact-message', 'Would love a guide on Dev Deepawali traditions.');

    await page.getByTestId('contact-submit-btn').click();

    const fallbackPanel = page.getByTestId('contact-fallback-panel');
    await expect(fallbackPanel).toBeVisible();
    await expect(page.getByTestId('contact-fallback-heading')).toContainText('Open Your Email App to Send');
    await expect(page.getByTestId('contact-fallback-notice')).toContainText(
      'has not been sent yet'
    );

    const fallbackMailto = page.getByTestId('contact-mailto-fallback');
    await expect(fallbackMailto).toBeVisible();
    const href = await fallbackMailto.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href!).toMatch(/^mailto:Pandit979212@gmail\.com\?/);

    const decodedHref = decodeURIComponent(href!);
    expect(decodedHref).toContain('Aarav Sharma');
    expect(decodedHref).toContain('aarav@example.com');
    expect(decodedHref).toContain('Cultural Content & Festival Lore');
    expect(decodedHref).toContain('Would love a guide on Dev Deepawali traditions.');

    // Editing returns to the form while preserving entered field values
    await page.getByTestId('contact-edit-draft').click();
    await expect(page.locator('#contact-name')).toHaveValue('Aarav Sharma');
    await expect(page.locator('#contact-message')).toHaveValue(
      'Would love a guide on Dev Deepawali traditions.'
    );

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('3. Mobile (390x844) and Desktop (1280x800) layouts render cleanly with zero horizontal overflow', async ({
    page,
  }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1280, height: 800 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/contact');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.getByTestId('contact-email-editorial')).toBeVisible();
      await expect(page.getByTestId('contact-email-support')).toBeVisible();
      await expect(page.getByTestId('contact-submit-btn')).toBeVisible();

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(hasHorizontalOverflow).toBe(false);
    }
  });
});

