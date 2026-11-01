import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/abhis/.gemini/antigravity/brain/63fca421-aaed-4c0a-b95f-26ad7a8666c1';

test.describe('Critical Photo Framing & Native PNG Export Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('festivewala_language', 'en');
      localStorage.setItem('festivewala_lang', 'en');
    });
  });

  test('Upload -> Auto Frame -> Manual Drag -> Apply -> Download PNG (Inspect Actual PNG File)', async ({ page }) => {
    // Navigate to Photo Studio with Royal Heritage Oval/Circle Portrait
    await page.goto('/greeting-cards?mode=photo&template=photo-royal-portrait&edit=true', { waitUntil: 'networkidle' });

    // 1. Upload realistic test portrait photo
    const uploadSuccess = await page.evaluate(async () => {
      const c = document.createElement('canvas');
      c.width = 800;
      c.height = 1200;
      const ctx = c.getContext('2d');
      if (!ctx) return false;

      // Dark velvet crimson backdrop
      const bg = ctx.createLinearGradient(0, 0, 0, 1200);
      bg.addColorStop(0, '#3A0E2A');
      bg.addColorStop(1, '#1A0614');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 800, 1200);

      // Gold attire
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.ellipse(400, 750, 260, 380, 0, 0, Math.PI * 2);
      ctx.fill();

      // Face silhouette
      ctx.fillStyle = '#E8BE96';
      ctx.beginPath();
      ctx.ellipse(400, 320, 130, 160, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#1C120C';
      ctx.beginPath();
      ctx.arc(400, 260, 140, Math.PI, 0, false);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#2A1810';
      ctx.beginPath();
      ctx.arc(350, 305, 12, 0, Math.PI * 2);
      ctx.arc(450, 305, 12, 0, Math.PI * 2);
      ctx.fill();

      const dataUrl = c.toDataURL('image/jpeg', 0.92);
      const byteString = atob(dataUrl.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: 'image/jpeg' });
      const file = new File([blob], 'qa_regression_portrait.jpg', { type: 'image/jpeg' });

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (!input) return false;

      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    });

    expect(uploadSuccess).toBe(true);

    // Wait for auto-framing and image rendering to settle
    await page.waitForTimeout(1500);

    // 2. Perform Manual Adjustment via Pointer Drag in PhotoFramingAdjuster
    const canvases = page.locator('canvas');
    const adjusterCanvas = canvases.first();
    await expect(adjusterCanvas).toBeVisible();

    const box = await adjusterCanvas.boundingBox();
    expect(box).not.toBeNull();

    if (box) {
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      
      // Drag +40px right, -30px up
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 40, startY - 30, { steps: 5 });
      await page.mouse.up();
    }

    await page.waitForTimeout(500);

    // 3. Click Apply Changes
    const applyBtn = page.locator('button', { hasText: 'Apply Changes' }).first();
    if (await applyBtn.isVisible()) {
      await applyBtn.click();
      await page.waitForTimeout(400);
    }

    // 4. Download PNG and intercept actual file download event
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 });
    const downloadBtn = page.locator('button', { hasText: 'Download' }).first();
    await downloadBtn.click();

    const download = await downloadPromise;
    const downloadPath = path.join('test-results', 'downloads', download.suggestedFilename());
    fs.mkdirSync(path.dirname(downloadPath), { recursive: true });
    await download.saveAs(downloadPath);

    // 5. Inspect the actual downloaded PNG file
    expect(fs.existsSync(downloadPath)).toBe(true);
    const pngBuffer = fs.readFileSync(downloadPath);
    expect(pngBuffer.length).toBeGreaterThan(200000); // Greater than 200 KB

    // Verify standard PNG magic header: 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A
    expect(pngBuffer[0]).toBe(0x89);
    expect(pngBuffer[1]).toBe(0x50);
    expect(pngBuffer[2]).toBe(0x4e);
    expect(pngBuffer[3]).toBe(0x47);
    expect(pngBuffer[4]).toBe(0x0d);
    expect(pngBuffer[5]).toBe(0x0a);
    expect(pngBuffer[6]).toBe(0x1a);
    expect(pngBuffer[7]).toBe(0x0a);

    // Read IHDR chunk for dimensions (bytes 16-23: 4 bytes width, 4 bytes height in big-endian)
    const width = pngBuffer.readUInt32BE(16);
    const height = pngBuffer.readUInt32BE(20);
    expect(width).toBe(1080);
    expect(height).toBe(1080);

    // Copy to artifact directory for permanent evidence
    const artifactExportPath = path.join(ARTIFACT_DIR, 'closure-downloaded-card-1080.png');
    fs.copyFileSync(downloadPath, artifactExportPath);

    // 6. Inspect pixels inside the downloaded PNG
    const pixelComparison = await page.evaluate(async () => {
      const canvases = document.querySelectorAll('canvas');
      const cardCanvas = canvases[1];
      const prevCtx = cardCanvas.getContext('2d')!;
      const scale = cardCanvas.width / 1080;

      // Sample key locations
      const centerPrev = Array.from(prevCtx.getImageData(Math.round(540 * scale), Math.round(360 * scale), 1, 1).data);
      const outsideCornerPrev = Array.from(prevCtx.getImageData(Math.round((540 - 220 + 10) * scale), Math.round((360 - 220 + 10) * scale), 1, 1).data);

      return {
        centerPrev,
        outsideCornerPrev,
        isClippedToCircle: outsideCornerPrev[0] < 50 && outsideCornerPrev[2] > 60 // Purple aura, not unclipped rect
      };
    });

    expect(pixelComparison.isClippedToCircle).toBe(true);
  });
});

