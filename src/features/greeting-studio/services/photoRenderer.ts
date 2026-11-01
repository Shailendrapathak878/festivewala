import type { UserPhoto } from '../types/editor';
import { withAlpha } from './vectorDrawing';

// In-memory image cache to avoid re-decoding images during rapid re-renders
const imageCache = new Map<string, HTMLImageElement>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return Promise.resolve(cached);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export interface PhotoFrameSlotConfig {
  id: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  radius: number;
  shape: string;
}

/**
 * Draws a single photo aperture with clipping, rotation, zoom, pan, and ornate gold frame.
 */
export async function drawPhotoAperture(
  ctx: CanvasRenderingContext2D,
  photo: UserPhoto | undefined,
  frame: { cx: number; cy: number; width: number; height: number; radius: number; shape?: string },
  accentColor: string = '#F2D98B',
  placeholderLabel?: string
): Promise<void> {
  const shape = frame.shape || 'rounded-rect';
  const { cx, cy, width: w, height: h, radius: r } = frame;

  ctx.save();

  // 1. If photo is present, render it with transform
  if (photo?.dataUrl) {
    try {
      const img = await loadImage(photo.dataUrl);

      // Dropshadow for frame depth
      if (shape !== 'full-bleed' && shape !== 'split-half') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
        ctx.shadowBlur = 32;
        ctx.shadowOffsetY = 12;
      }

      // Draw base clipping path
      ctx.beginPath();
      traceAperturePath(ctx, shape, cx, cy, w, h, r);

      ctx.fillStyle = '#120724';
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      traceAperturePath(ctx, shape, cx, cy, w, h, r);
      ctx.clip();

      // Clear shadow for image contents
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Calculate scale based on fitMode (cover vs contain)
      const fitMode = photo.fitMode || 'cover';
      const scaleCover = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const scaleContain = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const baseScale = fitMode === 'contain' ? scaleContain : scaleCover;
      const zoom = photo.zoom || 1.0;
      const finalScale = baseScale * zoom;

      const drawW = img.naturalWidth * finalScale;
      const drawH = img.naturalHeight * finalScale;

      // Canonical pan offset: Prefer normalized coordinates for 100% preview-export match
      const panX = photo.normalizedPanX !== undefined ? photo.normalizedPanX * w : photo.panX || 0;
      const panY = photo.normalizedPanY !== undefined ? photo.normalizedPanY * h : photo.panY || 0;
      const rotationDeg = photo.rotation || 0;

      // Position, rotate, and draw image
      ctx.translate(cx + panX, cy + panY);
      if (rotationDeg !== 0) {
        ctx.rotate((rotationDeg * Math.PI) / 180);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

      ctx.restore(); // Exit clip

      // If full-bleed, paint luxury dark gradient scrim over lower 55%
      if (shape === 'full-bleed') {
        paintGradientScrim(ctx, cx, cy, w, h);
      }

      // If split-half, draw vertical dividing rule
      if (shape === 'split-half') {
        paintSplitDivider(ctx, cx + w / 2, cy - h / 2, h, accentColor);
      }

      // Draw decorative framing borders and embellishments
      if (shape !== 'full-bleed' && shape !== 'split-half') {
        drawFrameOrnaments(ctx, shape, cx, cy, w, h, r, accentColor);
      }

      ctx.restore();
      return;
    } catch (err) {
      console.warn('Could not draw photo, drawing elegant placeholder:', err);
    }
  }

  // 2. Elegant Placeholder when no photo is uploaded yet
  drawPhotoPlaceholder(ctx, shape, cx, cy, w, h, r, accentColor, placeholderLabel);
  ctx.restore();
}

/**
 * Traces the geometric aperture path based on frame shape.
 */
function traceAperturePath(
  ctx: CanvasRenderingContext2D,
  shape: string,
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number
) {
  const left = cx - w / 2;
  const top = cy - h / 2;
  const circleRadius = r > 0 ? r : Math.min(w, h) / 2;

  switch (shape) {
    case 'circle':
      ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
      break;

    case 'oval': {
      const rx = w > 0 ? w / 2 : circleRadius;
      const ry = h > 0 ? h / 2 : circleRadius;
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      break;
    }

    case 'arch': {
      // Traditional temple arch with rounded top dome
      const archRadius = w / 2;
      ctx.moveTo(left, cy + h / 2);
      ctx.lineTo(left, top + archRadius);
      ctx.arc(cx, top + archRadius, archRadius, Math.PI, 0, false);
      ctx.lineTo(left + w, cy + h / 2);
      ctx.closePath();
      break;
    }

    case 'jharokha': {
      // Rajasthani multi-foil cusped arch window
      const baseTop = top + h * 0.25;
      ctx.moveTo(left, cy + h / 2);
      ctx.lineTo(left, baseTop);
      // Left cusp arc
      ctx.quadraticCurveTo(left, top + h * 0.1, cx - w * 0.18, top + h * 0.08);
      // Center pointed arch peak
      ctx.quadraticCurveTo(cx - w * 0.08, top, cx, top);
      ctx.quadraticCurveTo(cx + w * 0.08, top, cx + w * 0.18, top + h * 0.08);
      // Right cusp arc
      ctx.quadraticCurveTo(left + w, top + h * 0.1, left + w, baseTop);
      ctx.lineTo(left + w, cy + h / 2);
      ctx.closePath();
      break;
    }

    case 'polaroid':
    case 'panoramic':
    case 'rounded-rect':
    default:
      if (shape === 'full-bleed' || shape === 'split-half') {
        ctx.rect(left, top, w, h);
      } else {
        ctx.roundRect(left, top, w, h, Math.min(28, r));
      }
      break;
  }
}

/**
 * Draws ornamental metallic framing, gold filigree, and corner accents around the photo.
 */
function drawFrameOrnaments(
  ctx: CanvasRenderingContext2D,
  shape: string,
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number,
  accentColor: string
) {
  ctx.save();
  const left = cx - w / 2;
  const top = cy - h / 2;

  // Primary gold border
  ctx.beginPath();
  traceAperturePath(ctx, shape, cx, cy, w, h, r);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 6;
  ctx.stroke();

  // Inset delicate hairline rule
  ctx.beginPath();
  traceAperturePath(ctx, shape, cx, cy, w - 16, h - 16, Math.max(10, r - 8));
  ctx.strokeStyle = withAlpha(accentColor, '88');
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Special decorative details based on shape
  if (shape === 'polaroid') {
    // Polaroid white/ivory backing card
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#FAF7F0';
    ctx.lineWidth = 12;
    ctx.strokeRect(left - 6, top - 6, w + 12, h + 12);
    // Golden tape / clip at top center
    ctx.fillStyle = withAlpha(accentColor, 'CC');
    ctx.fillRect(cx - 36, top - 18, 72, 22);
    ctx.restore();
  } else if (shape === 'jharokha') {
    // Top floral finial
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(cx, top - 12, 10, 0, Math.PI * 2);
    ctx.fill();
    // Hanging bell drops
    drawHangingBell(ctx, left + 20, top + h * 0.35, accentColor);
    drawHangingBell(ctx, left + w - 20, top + h * 0.35, accentColor);
  } else if (shape === 'panoramic' || shape === 'rounded-rect') {
    // Four corner brass rivets
    drawBrassRivet(ctx, left + 14, top + 14, accentColor);
    drawBrassRivet(ctx, left + w - 14, top + 14, accentColor);
    drawBrassRivet(ctx, left + 14, top + h - 14, accentColor);
    drawBrassRivet(ctx, left + w - 14, top + h - 14, accentColor);
  }

  ctx.restore();
}

function drawBrassRivet(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#120724';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function drawHangingBell(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = withAlpha(color, '88');
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, y - 24);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y + 4, 6, Math.PI, 0, false);
  ctx.lineTo(x + 7, y + 10);
  ctx.lineTo(x - 7, y + 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Gradient scrim protecting typography over full-bleed photo backgrounds.
 */
function paintGradientScrim(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number
) {
  ctx.save();
  // Bottom 60% luxury dark vignette
  const scrimTop = cy - h * 0.1;
  const grad = ctx.createLinearGradient(0, scrimTop, 0, cy + h / 2);
  grad.addColorStop(0, 'rgba(11, 4, 24, 0.0)');
  grad.addColorStop(0.35, 'rgba(11, 4, 24, 0.65)');
  grad.addColorStop(0.7, 'rgba(11, 4, 24, 0.88)');
  grad.addColorStop(1, 'rgba(11, 4, 24, 0.96)');

  ctx.fillStyle = grad;
  ctx.fillRect(cx - w / 2, scrimTop, w, (cy + h / 2) - scrimTop);

  // Subtle top vignette for header readability
  const topGrad = ctx.createLinearGradient(0, cy - h / 2, 0, cy - h * 0.3);
  topGrad.addColorStop(0, 'rgba(11, 4, 24, 0.6)');
  topGrad.addColorStop(1, 'rgba(11, 4, 24, 0.0)');
  ctx.fillStyle = topGrad;
  ctx.fillRect(cx - w / 2, cy - h / 2, w, h * 0.2);

  ctx.restore();
}

/**
 * Vertical dividing gold rule for modern split layouts.
 */
function paintSplitDivider(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  color: string
) {
  ctx.save();
  const grad = ctx.createLinearGradient(0, y, 0, y + height);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.2, withAlpha(color, '88'));
  grad.addColorStop(0.5, color);
  grad.addColorStop(0.8, withAlpha(color, '88'));
  grad.addColorStop(1, 'transparent');

  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.stroke();
  ctx.restore();
}

/**
 * Elegant placeholder displayed when no photo is uploaded yet.
 */
function drawPhotoPlaceholder(
  ctx: CanvasRenderingContext2D,
  shape: string,
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number,
  accentColor: string,
  placeholderLabel?: string
) {
  ctx.save();

  // Background aperture
  ctx.beginPath();
  traceAperturePath(ctx, shape, cx, cy, w, h, r);
  ctx.fillStyle = '#180B2D';
  ctx.fill();

  // Dashed festive border
  ctx.strokeStyle = withAlpha(accentColor, '88');
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Camera Icon in center
  ctx.fillStyle = accentColor;
  ctx.shadowColor = withAlpha(accentColor, '66');
  ctx.shadowBlur = 12;

  const iconY = cy - 14;
  // Camera body
  ctx.beginPath();
  ctx.roundRect(cx - 28, iconY - 18, 56, 38, 8);
  ctx.fill();
  // Camera lens ring
  ctx.fillStyle = '#180B2D';
  ctx.beginPath();
  ctx.arc(cx, iconY + 1, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(cx, iconY + 1, 6, 0, Math.PI * 2);
  ctx.fill();
  // Top flash bump
  ctx.fillRect(cx - 10, iconY - 24, 20, 6);

  // Label text
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#FAF7F0';
  ctx.font = '600 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(placeholderLabel || 'Add Your Photo', cx, cy + 42);

  ctx.fillStyle = withAlpha(accentColor, 'AA');
  ctx.font = '14px sans-serif';
  ctx.fillText('Tap to upload · 100% private', cx, cy + 64);

  ctx.restore();
}

