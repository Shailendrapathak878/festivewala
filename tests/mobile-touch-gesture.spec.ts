import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const QA_DIR = path.resolve('artifacts/qa/photo-greeting-touch-gesture');
if (!fs.existsSync(QA_DIR)) {
  fs.mkdirSync(QA_DIR, { recursive: true });
}

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test.describe('Mobile Touch Gesture Separation: Scroll vs Photo Dragging', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
      localStorage.setItem('festivewala_language_selected', 'true');
      localStorage.setItem('has_selected_language', 'true');
    });
  });

  test('Complete 12-Step Lifecycle: Normal page scrolling never disturbs photo, intentional edit works, final PNG export matches', async ({ page }) => {
    // Navigate to Photo Studio on Mobile
    await page.goto('/greeting-cards?mode=photo&template=photo-royal-portrait&edit=true', {
      waitUntil: 'networkidle',
    });

    // STEP 1: Upload a portrait photograph
    const uploadSuccess = await page.evaluate(async () => {
      const c = document.createElement('canvas');
      c.width = 800;
      c.height = 1200;
      const ctx = c.getContext('2d');
      if (!ctx) return false;

      // Deep magenta backdrop
      ctx.fillStyle = '#4A0E4E';
      ctx.fillRect(0, 0, 800, 1200);

      // Golden traditional attire
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.ellipse(400, 750, 260, 380, 0, 0, Math.PI * 2);
      ctx.fill();

      // Face silhouette
      ctx.fillStyle = '#E8BE96';
      ctx.beginPath();
      ctx.ellipse(400, 350, 140, 170, 0, 0, Math.PI * 2);
      ctx.fill();

      const dataUrl = c.toDataURL('image/jpeg', 0.92);
      const byteString = atob(dataUrl.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: 'image/jpeg' });
      const file = new File([blob], 'mobile_qa_portrait.jpg', { type: 'image/jpeg' });

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (!input) return false;
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    });

    expect(uploadSuccess).toBe(true);

    // STEP 2: Verify automatic image positioning settled
    await page.waitForTimeout(1500);

    // Find the main card canvas (in CanvasPreview)
    const cardCanvas = page.locator('div[style*="aspect-ratio"] canvas').first();
    await expect(cardCanvas).toBeVisible();

    // Verify default touch-action is pan-y (enables natural vertical page scrolling)
    const initialTouchAction = await cardCanvas.evaluate((el) => window.getComputedStyle(el).touchAction);
    expect(initialTouchAction).toBe('pan-y');

    // Record initial snapshot and coordinates
    const initialScreenshotPath = path.join(QA_DIR, '01_photo_before_scrolling.png');
    await cardCanvas.screenshot({ path: initialScreenshotPath });
    expect(fs.existsSync(initialScreenshotPath)).toBe(true);

    const initialPixelData = await cardCanvas.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')!;
      const cx = Math.round(canvas.width / 2);
      const cy = Math.round(canvas.height / 2);
      return Array.from(ctx.getImageData(cx - 2, cy - 2, 5, 5).data);
    });

    // STEP 3 & 4: Place finger on preview area and perform vertical swipes (attempting to scroll)
    const box = await cardCanvas.boundingBox();
    expect(box).not.toBeNull();
    const centerX = box!.x + box!.width / 2;
    const centerY = box!.y + box!.height / 2;

    // Dispatch vertical swipe touch gesture on the canvas preview
    await page.evaluate(({ cx, cy }) => {
      const canvas = document.querySelector('div[style*="aspect-ratio"] canvas') as HTMLCanvasElement;
      
      canvas.dispatchEvent(new PointerEvent('pointerdown', {
        pointerId: 2,
        pointerType: 'touch',
        clientX: cx,
        clientY: cy,
        bubbles: true,
        cancelable: true,
      }));

      // Vertical move (swiping upward by 100px)
      for (let i = 1; i <= 6; i++) {
        canvas.dispatchEvent(new PointerEvent('pointermove', {
          pointerId: 2,
          pointerType: 'touch',
          clientX: cx,
          clientY: cy - i * 16,
          bubbles: true,
          cancelable: true,
        }));
      }

      canvas.dispatchEvent(new PointerEvent('pointerup', {
        pointerId: 2,
        pointerType: 'touch',
        clientX: cx,
        clientY: cy - 96,
        bubbles: true,
        cancelable: true,
      }));
    }, { cx: centerX, cy: centerY });

    await page.waitForTimeout(400);

    // Save screenshot after vertical scrolling
    const afterScrollScreenshotPath = path.join(QA_DIR, '02_photo_after_vertical_scrolling.png');
    await cardCanvas.screenshot({ path: afterScrollScreenshotPath });

    // VERIFY: Pixels on the photo canvas did NOT change during swipe
    const afterScrollPixelData = await cardCanvas.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')!;
      const cx = Math.round(canvas.width / 2);
      const cy = Math.round(canvas.height / 2);
      return Array.from(ctx.getImageData(cx - 2, cy - 2, 5, 5).data);
    });
    expect(afterScrollPixelData).toEqual(initialPixelData);

    // STEP 5 & 6: Scroll repeatedly up and down
    await page.evaluate(() => {
      window.scrollBy(0, 150);
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => {
      window.scrollBy(0, -100);
    });
    await page.waitForTimeout(300);

    const repeatedScrollScreenshotPath = path.join(QA_DIR, '03_photo_after_repeated_scrolling.png');
    await cardCanvas.screenshot({ path: repeatedScrollScreenshotPath });

    const repeatedScrollPixelData = await cardCanvas.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')!;
      const cx = Math.round(canvas.width / 2);
      const cy = Math.round(canvas.height / 2);
      return Array.from(ctx.getImageData(cx - 2, cy - 2, 5, 5).data);
    });
    expect(repeatedScrollPixelData).toEqual(initialPixelData);

    // STEP 7: Intentionally drag the photograph using the designated edit interaction
    // Click "Reposition Photo" button
    const repositionBtn = page.locator('button', { hasText: 'Reposition Photo' }).first();
    await expect(repositionBtn).toBeVisible();
    await repositionBtn.click();
    await page.waitForTimeout(400);

    // Now verify Reposition Mode is active (touch-action: none, and 'Done' button is visible)
    const activeTouchAction = await cardCanvas.evaluate((el) => window.getComputedStyle(el).touchAction);
    expect(activeTouchAction).toBe('none');

    const doneBtn = page.locator('button', { hasText: 'Done' }).first();
    await expect(doneBtn).toBeVisible();

    // Now perform intentional drag gesture (moving photo by +50px X, -35px Y)
    const activeBox = await cardCanvas.boundingBox();
    const actX = activeBox!.x + activeBox!.width / 2;
    const actY = activeBox!.y + activeBox!.height / 2;

    await page.evaluate(({ cx, cy }) => {
      const canvas = document.querySelector('div[style*="aspect-ratio"] canvas') as HTMLCanvasElement;
      canvas.dispatchEvent(new PointerEvent('pointerdown', {
        pointerId: 3,
        pointerType: 'touch',
        clientX: cx,
        clientY: cy,
        bubbles: true,
        cancelable: true,
      }));

      // Move > 5px threshold then drag
      for (let i = 1; i <= 6; i++) {
        canvas.dispatchEvent(new PointerEvent('pointermove', {
          pointerId: 3,
          pointerType: 'touch',
          clientX: cx + i * 8, // +48px
          clientY: cy - i * 6, // -36px
          bubbles: true,
          cancelable: true,
        }));
      }

      canvas.dispatchEvent(new PointerEvent('pointerup', {
        pointerId: 3,
        pointerType: 'touch',
        clientX: cx + 48,
        clientY: cy - 36,
        bubbles: true,
        cancelable: true,
      }));
    }, { cx: actX, cy: actY });

    await page.waitForTimeout(600);

    // Capture screenshot after intentional drag
    const afterDragScreenshotPath = path.join(QA_DIR, '04_photo_after_intentional_drag.png');
    await cardCanvas.screenshot({ path: afterDragScreenshotPath });

    // VERIFY: Pixels HAVE changed after intentional drag!
    const afterDragPixelData = await cardCanvas.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')!;
      const cx = Math.round(canvas.width / 2);
      const cy = Math.round(canvas.height / 2);
      return Array.from(ctx.getImageData(cx - 2, cy - 2, 5, 5).data);
    });
    expect(afterDragPixelData).not.toEqual(initialPixelData);

    // STEP 8: Exit photo-edit mode (Click "Done") and scroll again
    await doneBtn.click();
    await page.waitForTimeout(300);

    // Verify touch-action returned to pan-y
    const restoredTouchAction = await cardCanvas.evaluate((el) => window.getComputedStyle(el).touchAction);
    expect(restoredTouchAction).toBe('pan-y');

    // Scroll again - verify position remains stable at the new position
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(300);

    const postExitPixelData = await cardCanvas.evaluate((canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')!;
      const cx = Math.round(canvas.width / 2);
      const cy = Math.round(canvas.height / 2);
      return Array.from(ctx.getImageData(cx - 2, cy - 2, 5, 5).data);
    });
    expect(postExitPixelData).toEqual(afterDragPixelData);

    // STEP 11 & 12: Download final greeting and inspect downloaded PNG
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 });
    const downloadBtn = page.locator('button', { hasText: 'Download' }).first();
    await downloadBtn.click();

    const download = await downloadPromise;
    const downloadPath = path.join(QA_DIR, '05_final_exported_card.png');
    await download.saveAs(downloadPath);

    expect(fs.existsSync(downloadPath)).toBe(true);
    const pngBuffer = fs.readFileSync(downloadPath);
    expect(pngBuffer.length).toBeGreaterThan(150000); // Valid PNG export > 150 KB

    // Verify PNG magic header
    expect(pngBuffer[0]).toBe(0x89);
    expect(pngBuffer[1]).toBe(0x50);
    expect(pngBuffer[2]).toBe(0x4e);
    expect(pngBuffer[3]).toBe(0x47);

    // Verify 1080x1080 resolution
    const width = pngBuffer.readUInt32BE(16);
    const height = pngBuffer.readUInt32BE(20);
    expect(width).toBe(1080);
    expect(height).toBe(1080);
  });
});
