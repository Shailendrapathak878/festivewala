import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
  const outputDir = path.resolve('artifacts/qa/festival-discovery');
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Desktop 1440x900
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.addInitScript(() => {
    localStorage.setItem('festivewala_language', 'en');
    localStorage.setItem('festivewala_language_selected', 'true');
  });

  // Homepage Hero Carousel & Top 2 Festivals
  await desktopPage.goto('http://localhost:4173/');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.screenshot({
    path: path.join(outputDir, '01_homepage_hero_carousel_dhanteras.png'),
    fullPage: false,
  });

  // Countdown Section Top 2 Upcoming Festivals
  const countdownSection = desktopPage.locator('[data-testid="upcoming-festivals-countdown"]');
  await countdownSection.scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(500);
  await countdownSection.screenshot({
    path: path.join(outputDir, '02_homepage_countdown_two_festivals.png'),
  });

  // Greeting Studio Auto Mode (Priority 1 Dhanteras + Priority 2 Diwali)
  await desktopPage.goto('http://localhost:4173/greeting-cards');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: path.join(outputDir, '03_greeting_studio_auto_priority_view.png'),
    fullPage: false,
  });

  // Wishes Page with Quick Festival Bar and Priority Ordering
  await desktopPage.goto('http://localhost:4173/wishes');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: path.join(outputDir, '04_wishes_showcase_festival_priority.png'),
    fullPage: false,
  });

  // 2. Mobile 390x844 (iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.addInitScript(() => {
    localStorage.setItem('festivewala_language', 'en');
    localStorage.setItem('festivewala_language_selected', 'true');
  });

  await mobilePage.goto('http://localhost:4173/');
  await mobilePage.waitForLoadState('networkidle');
  const mobileCountdown = mobilePage.locator('[data-testid="upcoming-festivals-countdown"]');
  await mobileCountdown.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);
  await mobileCountdown.screenshot({
    path: path.join(outputDir, '05_mobile_countdown_two_festivals.png'),
  });

  await browser.close();
  console.log('Successfully captured 5 QA screenshots in ' + outputDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
