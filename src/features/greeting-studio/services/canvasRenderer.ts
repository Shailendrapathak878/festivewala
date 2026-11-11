import type { GreetingTemplate, OutputFormat } from '../types/template';
import type { CardCustomization } from '../types/editor';
import { computeLayout } from './layoutEngine';
import { renderSingleLineText, renderMultilineText } from './textRenderer';
import { ensureFontsLoaded } from './imageLoader';
import { drawPhotoAperture } from './photoRenderer';
import {
  drawLotus,
  drawDiya,
  drawRangoli,
  drawMandala,
  drawMinimalSeal,
  drawFloralToran,
  drawGoldenPetals,
  drawJoyfulLanterns,
  drawDiwaliStorySpecial,
  drawCorporateCrest,
  drawBorder,
  drawOrnamentalDivider,
  drawStarlightParticles,
  drawPeacockMotif,
  drawKalashMotif,
  drawJharokhaArch,
  drawShubhLabhSeal,
  drawHangingDeepam,
  drawKolamHeritage,
  drawSparklerCelebration,
  drawFamilyHearth,
  drawCorporatePrism,
  drawModernDiya,
  drawMarigoldToranMotif,
  drawFestiveSweetsMotif,
  drawCelestialGalaxy,
  drawSuryaArghya,
  drawBambooSoop,
  drawRiverGhatSun,
  drawChhathThekuaThali,
} from './vectorDrawing';

function withAlpha(color: string, alphaHex: string): string {
  if (color && color.startsWith('#')) {
    const raw = color.slice(1, 7);
    return `#${raw}${alphaHex}`;
  }
  return color;
}

export interface RenderCardOptions {
  canvas: HTMLCanvasElement;
  template: GreetingTemplate;
  customization: CardCustomization;
  format: OutputFormat;
  scale?: number; // default 1.0, preview can use fractional or 1.0
}

export async function renderCardToCanvas(options: RenderCardOptions): Promise<void> {
  const { canvas, template, customization, format, scale = 1.0 } = options;

  await ensureFontsLoaded();

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const hasPhoto = Boolean(customization.photo?.dataUrl);
  const layout = computeLayout(format, hasPhoto, template.id, template.decorative.compositionStyle);

  canvas.width = Math.round(layout.width * scale);
  canvas.height = Math.round(layout.height * scale);

  ctx.save();
  ctx.scale(scale, scale);

  // 1. Paint Atmospheric Background with Deep Cultural Depth & Category Textures
  paintAtmosphericBackdrop(ctx, layout.width, layout.height, template, customization.bgVariant, layout.motif);

  // 2. Starlight Particles & Shimmer
  if (customization.showParticles && template.decorative.hasParticles) {
    drawStarlightParticles(ctx, layout.width, layout.height, template.palette.gold);
  }

  // 3. Borders & Frames
  if (customization.showBorder) {
    drawBorder(
      ctx,
      layout.width,
      layout.height,
      customization.borderStyle || template.decorative.borderStyle,
      customization.accentColor || template.palette.gold,
      template.decorative.hasCornerFlourish
    );
  }

  // 4. Special Top & Perimeter Decorative Motifs
  if (template.decorative.vectorStyle === 'floral-celebration') {
    drawFloralToran(ctx, layout.width, layout.height, template.palette.gold, template.palette.accent);
  } else if (template.decorative.vectorStyle === 'joyful-festive') {
    drawJoyfulLanterns(ctx, layout.width, layout.height, template.palette.gold);
  } else if (template.decorative.vectorStyle === 'diwali-story-special') {
    drawDiwaliStorySpecial(ctx, layout.width, layout.height, template.palette.gold);
  } else if (template.decorative.vectorStyle === 'golden-petals') {
    drawGoldenPetals(ctx, layout.width, layout.height, template.palette.gold);
  }

  // 5. Draw Photo OR Primary Vector Motif
  // Only dedicated photo templates from the Photo Studio (id starting with 'photo-' or category === 'photo-studio')
  // render photo apertures. Simple Greetings always render their handcrafted vector motifs!
  const isPhotoTemplate = template.category === 'photo-studio' || template.id.startsWith('photo-');

  if (isPhotoTemplate) {
    if (layout.photoFrame.slots && layout.photoFrame.slots.length > 0) {
      // Multi-slot collage
      for (const slot of layout.photoFrame.slots) {
        const slotPhoto = customization.photos?.[slot.id] || (slot.id === 'slot-0' ? customization.photo : undefined);
        await drawPhotoAperture(
          ctx,
          slotPhoto,
          slot,
          customization.accentColor || template.palette.gold,
          slot.id === 'slot-0' ? 'Photo 1' : slot.id === 'slot-1' ? 'Photo 2' : slot.id === 'slot-2' ? 'Photo 3' : 'Photo 4'
        );
      }
    } else {
      // Single photo aperture
      await drawPhotoAperture(
        ctx,
        customization.photo,
        {
          ...layout.photoFrame,
          shape: template.decorative.photoFrameShape || layout.photoFrame.shape || 'rounded-rect',
        },
        customization.accentColor || template.palette.gold,
        'Add Your Photo'
      );
    }
  } else if (customization.showOrnaments) {
    // Only draw central motif if not already drawn as full-canvas background
    if (template.decorative.vectorStyle !== 'golden-petals') {
      drawTemplateMotif(ctx, template, layout.motif, customization.accentColor, layout.width);
    }
  }

  // 6. Landscape Vertical Chamber Divider
  if (layout.isSplitHorizontal) {
    drawLandscapeVerticalDivider(ctx, 940, 120, layout.height - 240, customization.accentColor || template.palette.gold);
  }

  // 7. Render Professional Cultural Typography Hierarchy with Ornamental Dividers
  renderTypography(ctx, layout, template, customization);

  ctx.restore();
}

/**
 * Multi-layered atmospheric backdrop with radiant motif auras and category-specific luxury textures
 */
function paintAtmosphericBackdrop(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  template: GreetingTemplate,
  bgVariant: string,
  motif: { cx: number; cy: number; radius: number }
) {
  const { primary, secondary, gold, accent } = template.palette;
  const cat = template.category;

  // Base Gradient Painting
  if (bgVariant === 'minimal' || cat === 'modern-minimal' || template.decorative.vectorStyle === 'minimal-champagne') {
    // Modern Minimal Luxury Parchment / Linen Stationery
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, primary || '#FDFBF7');
    bgGrad.addColorStop(0.5, secondary || '#FAF7F0');
    bgGrad.addColorStop(1, '#EDE5D8');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle luxury paper texture tint
    ctx.fillStyle = 'rgba(212, 175, 55, 0.025)';
    ctx.fillRect(40, 40, width - 80, height - 80);

    // Subtle framing hairline guide
    ctx.strokeStyle = 'rgba(180, 150, 80, 0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, width - 120, height - 120);
    return;
  }

  // Corporate & Professional: Executive Guilloche Pinstripes & Dark Depth
  if (cat === 'corporate-professional') {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, primary);
    bgGrad.addColorStop(0.5, secondary);
    bgGrad.addColorStop(1, '#050912');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle executive architectural pinstripe
    ctx.save();
    ctx.strokeStyle = withAlpha(gold, '14');
    ctx.lineWidth = 1;
    for (let x = 60; x < width; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Radiant soft illumination behind motif
    const motifAura = ctx.createRadialGradient(motif.cx, motif.cy, 20, motif.cx, motif.cy, motif.radius * 2.2);
    motifAura.addColorStop(0, withAlpha(gold, '28'));
    motifAura.addColorStop(0.5, withAlpha(gold, '0A'));
    motifAura.addColorStop(1, 'transparent');
    ctx.fillStyle = motifAura;
    ctx.beginPath();
    ctx.arc(motif.cx, motif.cy, motif.radius * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  // Traditional Indian: Sacred Temple Crimson & Vermilion with Watermark Mandala
  if (cat === 'traditional-indian') {
    const cx = motif.cx;
    const cy = motif.cy;
    const bgGrad = ctx.createRadialGradient(cx, cy, 60, cx, cy, Math.max(width, height) * 0.9);
    bgGrad.addColorStop(0, secondary);
    bgGrad.addColorStop(0.65, primary);
    bgGrad.addColorStop(1, '#160205');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Faint 32-point sacred geometry watermark
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = withAlpha(gold, '10');
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 32; i++) {
      ctx.rotate((Math.PI * 2) / 32);
      ctx.beginPath();
      ctx.moveTo(0, motif.radius * 1.1);
      ctx.lineTo(0, motif.radius * 1.9);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, 0, motif.radius * 1.5, 0, Math.PI * 2);
    ctx.arc(0, 0, motif.radius * 1.85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Warm ember glow at bottom
    const emberGrad = ctx.createLinearGradient(0, height - 120, 0, height);
    emberGrad.addColorStop(0, 'transparent');
    emberGrad.addColorStop(1, withAlpha(gold, '18'));
    ctx.fillStyle = emberGrad;
    ctx.fillRect(0, height - 120, width, 120);
    return;
  }

  // Premium Purple & Gold: Imperial Velvet Depth with Concentric Stardust Aureole
  if (cat === 'premium-purple-gold') {
    const cx = motif.cx;
    const cy = motif.cy;
    const bgGrad = ctx.createRadialGradient(cx, cy, 70, cx, cy, Math.max(width, height) * 0.85);
    bgGrad.addColorStop(0, secondary);
    bgGrad.addColorStop(0.6, primary);
    bgGrad.addColorStop(1, '#080112');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Radiating Golden Aureole Halo
    ctx.save();
    const haloGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, motif.radius * 2.4);
    haloGrad.addColorStop(0, withAlpha(gold, '35'));
    haloGrad.addColorStop(0.4, withAlpha(gold, '12'));
    haloGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, motif.radius * 2.4, 0, Math.PI * 2);
    ctx.fill();

    // Concentric Stardust Rings
    ctx.strokeStyle = withAlpha(gold, '22');
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.arc(cx, cy, motif.radius * 1.45, 0, Math.PI * 2);
    ctx.arc(cx, cy, motif.radius * 1.85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    return;
  }

  // Floral & Rangoli: Rich Emerald / Vermilion with Soft Bokeh Light
  if (cat === 'floral-rangoli') {
    const cx = motif.cx;
    const cy = motif.cy;
    const bgGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, Math.max(width, height) * 0.85);
    bgGrad.addColorStop(0, secondary);
    bgGrad.addColorStop(0.6, primary);
    bgGrad.addColorStop(1, '#05120B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Warm floral aura
    ctx.save();
    const aura = ctx.createRadialGradient(cx, cy, 20, cx, cy, motif.radius * 2.1);
    aura.addColorStop(0, withAlpha(gold, '30'));
    aura.addColorStop(0.6, withAlpha(gold, '0D'));
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(cx, cy, motif.radius * 2.1, 0, Math.PI * 2);
    ctx.fill();

    // Soft bokeh light dots
    ctx.fillStyle = withAlpha(accent || gold, '18');
    const bokehCoords = [
      { x: width * 0.18, y: height * 0.22, r: 24 },
      { x: width * 0.82, y: height * 0.24, r: 28 },
      { x: width * 0.12, y: height * 0.78, r: 32 },
      { x: width * 0.88, y: height * 0.76, r: 26 },
    ];
    bokehCoords.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    return;
  }

  // Cute & Creative / Family & Friends / Story Special / Default
  const cx = motif.cx;
  const cy = motif.cy;
  const bgGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, Math.max(width, height) * 0.85);
  bgGrad.addColorStop(0, secondary);
  bgGrad.addColorStop(0.6, primary);
  bgGrad.addColorStop(1, '#0A0512');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Warm central aura behind motif
  ctx.save();
  const defAura = ctx.createRadialGradient(cx, cy, 20, cx, cy, motif.radius * 2.2);
  defAura.addColorStop(0, withAlpha(gold, '30'));
  defAura.addColorStop(0.5, withAlpha(gold, '0C'));
  defAura.addColorStop(1, 'transparent');
  ctx.fillStyle = defAura;
  ctx.beginPath();
  ctx.arc(cx, cy, motif.radius * 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Landscape Split-Chamber Vertical Divider
 */
function drawLandscapeVerticalDivider(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  color: string
) {
  ctx.save();

  // Vertical tapered gradient rule line
  const grad = ctx.createLinearGradient(0, y, 0, y + height);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.15, withAlpha(color, '99'));
  grad.addColorStop(0.5, color);
  grad.addColorStop(0.85, withAlpha(color, '99'));
  grad.addColorStop(1, 'transparent');

  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.stroke();

  // Top and bottom diamond rosettes
  [y + 30, y + height - 30, y + height / 2].forEach((dy, i) => {
    ctx.fillStyle = color;
    const sz = i === 2 ? 6 : 4;
    ctx.beginPath();
    ctx.moveTo(x, dy - sz);
    ctx.lineTo(x + sz, dy);
    ctx.lineTo(x, dy + sz);
    ctx.lineTo(x - sz, dy);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

function drawTemplateMotif(
  ctx: CanvasRenderingContext2D,
  template: GreetingTemplate,
  motif: { cx: number; cy: number; radius: number },
  accentOverride?: string,
  _canvasWidth: number = 1080
) {
  const gold = accentOverride || template.palette.gold;
  const style = template.decorative.vectorStyle;

  switch (style) {
    case 'sovereign-lotus':
      drawLotus(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'royal-diya':
      drawDiya(ctx, motif.cx, motif.cy, motif.radius * 1.15, template.palette.primary, gold, true);
      break;

    case 'traditional-rangoli':
      drawRangoli(ctx, motif.cx, motif.cy, motif.radius, {
        primary: template.palette.primary,
        secondary: template.palette.secondary,
        gold,
        accent: template.palette.accent,
      });
      break;

    case 'sacred-mandala':
      drawMandala(ctx, motif.cx, motif.cy, motif.radius, gold);
      break;

    case 'minimal-champagne':
      drawMinimalSeal(ctx, motif.cx, motif.cy, motif.radius, gold);
      break;

    case 'floral-celebration':
      drawDiya(ctx, motif.cx, motif.cy, motif.radius * 0.85, template.palette.primary, gold, true);
      break;

    case 'joyful-festive':
      drawDiya(ctx, motif.cx, motif.cy, motif.radius * 0.9, template.palette.primary, gold, true);
      break;

    case 'diwali-story-special':
      drawDiya(ctx, motif.cx, motif.cy, motif.radius * 1.05, template.palette.primary, gold, true);
      break;

    case 'elegant-corporate-diwali':
      drawCorporateCrest(ctx, motif.cx, motif.cy, motif.radius * 0.95, gold);
      break;

    case 'royal-peacock':
      drawPeacockMotif(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'sacred-kalash':
      drawKalashMotif(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'jharokha-arch':
      drawJharokhaArch(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'shubh-labh':
      drawShubhLabhSeal(ctx, motif.cx, motif.cy, motif.radius, gold);
      break;

    case 'hanging-deepam':
      drawHangingDeepam(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'kolam-heritage':
      drawKolamHeritage(ctx, motif.cx, motif.cy, motif.radius, gold);
      break;

    case 'sparkler-celebration':
      drawSparklerCelebration(ctx, motif.cx, motif.cy, motif.radius, gold, template.palette.accent);
      break;

    case 'family-hearth':
      drawFamilyHearth(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'corporate-prism':
      drawCorporatePrism(ctx, motif.cx, motif.cy, motif.radius, gold);
      break;

    case 'modern-diya':
      drawModernDiya(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'marigold-toran':
      drawMarigoldToranMotif(ctx, motif.cx, motif.cy, motif.radius, gold, template.palette.accent);
      break;

    case 'festive-sweets':
      drawFestiveSweetsMotif(ctx, motif.cx, motif.cy, motif.radius, gold, template.palette.accent);
      break;

    case 'celestial-galaxy':
      drawCelestialGalaxy(ctx, motif.cx, motif.cy, motif.radius, gold, template.palette.accent);
      break;

    case 'surya-arghya':
      drawSuryaArghya(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'bamboo-soop':
      drawBambooSoop(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'river-ghat-sun':
      drawRiverGhatSun(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;

    case 'chhath-thekua-thali':
      drawChhathThekuaThali(ctx, motif.cx, motif.cy, motif.radius, template.palette.primary, gold);
      break;
  }
}

function renderTypography(
  ctx: CanvasRenderingContext2D,
  layout: ReturnType<typeof computeLayout>,
  template: GreetingTemplate,
  customization: CardCustomization
) {
  const fontFam = customization.fontFamily || template.defaultText.fontFamily;
  const isMinimal = template.category === 'modern-minimal' || template.decorative.vectorStyle === 'minimal-champagne';
  const isCorporate = template.category === 'corporate-professional' || template.decorative.vectorStyle === 'elegant-corporate-diwali';

  // Detect Devanagari characters
  const isDevanagari = /[\u0900-\u097F]/.test(
    `${customization.title} ${customization.recipient} ${customization.message} ${customization.sender}`
  );

  // Professional Typography Stacks
  const titleFont = isDevanagari
    ? `'Rozha One', 'Noto Sans Devanagari', 'Yatra One', serif`
    : isMinimal
    ? `'Cormorant Garamond', 'Playfair Display', serif`
    : isCorporate
    ? `'Cinzel', 'Montserrat', serif`
    : `${fontFam}, 'Playfair Display', serif`;

  const bodyFont = isDevanagari
    ? `'Noto Sans Devanagari', sans-serif`
    : isMinimal
    ? `'Cormorant Garamond', 'Playfair Display', serif`
    : isCorporate
    ? `'Plus Jakarta Sans', 'Montserrat', sans-serif`
    : `'Plus Jakarta Sans', 'Playfair Display', sans-serif`;

  const subtitleFont = isDevanagari
    ? `'Noto Sans Devanagari', sans-serif`
    : isCorporate
    ? `'Montserrat', sans-serif`
    : isMinimal
    ? `'Cormorant Garamond', serif`
    : `'Plus Jakarta Sans', sans-serif`;

  const primaryTextColor = customization.textColor || template.palette.textPrimary;
  const secondaryTextColor = template.palette.textSecondary;
  const accentColor = customization.accentColor || template.palette.gold;

  // Text Shadow: High-contrast drop shadow for dark cards; NO shadow for minimal ivory stationery
  const shadowConfig = isMinimal
    ? undefined
    : customization.hasTextShadow
    ? {
        color: 'rgba(0, 0, 0, 0.75)',
        blur: 14,
        offsetX: 0,
        offsetY: 4,
      }
    : undefined;

  const align = layout.isSplitHorizontal ? 'center' : customization.textAlign;

  // Divider style selection
  const dividerStyle = isMinimal
    ? 'minimal-dash'
    : template.category === 'traditional-indian'
    ? 'mandala-crest'
    : template.category === 'floral-rangoli'
    ? 'lotus-bud'
    : template.category === 'cute-creative' || template.decorative.vectorStyle === 'royal-diya'
    ? 'diya-flourish'
    : 'diamond-rule';

  // 1. Recipient
  if (customization.recipient && customization.recipient.trim().length > 0) {
    renderSingleLineText(
      ctx,
      customization.recipient.trim(),
      layout.recipient.x,
      layout.recipient.y,
      layout.recipient.maxWidth,
      `500 ${layout.recipient.defaultFontSize}px ${subtitleFont}`,
      accentColor,
      align,
      shadowConfig
    );
  }

  // 2. Main Title (Grand & Legible)
  if (customization.title) {
    const titleSize = customization.titleFontSize || layout.title.defaultFontSize;
    renderSingleLineText(
      ctx,
      customization.title,
      layout.title.x,
      layout.title.y,
      layout.title.maxWidth,
      `700 ${titleSize}px ${titleFont}`,
      primaryTextColor,
      align,
      shadowConfig
    );
  }

  // 2b. Title Divider Flourish
  if (layout.titleDivider) {
    drawOrnamentalDivider(
      ctx,
      layout.titleDivider.x,
      layout.titleDivider.y,
      layout.titleDivider.width,
      dividerStyle,
      withAlpha(accentColor, 'AA')
    );
  }

  // 3. Subtitle
  if (customization.subtitle) {
    const subSize = layout.subtitle.defaultFontSize;
    const subPrefix = isCorporate ? '' : isMinimal ? 'italic ' : 'italic ';
    renderSingleLineText(
      ctx,
      customization.subtitle,
      layout.subtitle.x,
      layout.subtitle.y,
      layout.subtitle.maxWidth,
      `${subPrefix}400 ${subSize}px ${subtitleFont}`,
      accentColor,
      align,
      shadowConfig
    );
  }

  // 4. Main Body Message (Generous line height & comfortable reading size)
  if (customization.message) {
    const bodySize = customization.bodyFontSize || layout.message.defaultFontSize;
    renderMultilineText({
      ctx,
      text: customization.message,
      x: layout.message.x,
      y: layout.message.y,
      maxWidth: layout.message.maxWidth,
      lineHeight: layout.message.lineHeight,
      font: `400 ${bodySize}px ${bodyFont}`,
      color: secondaryTextColor,
      align,
      shadow: shadowConfig,
      maxLines: 5,
    });
  }

  // 4b. Message-to-Sender Ornamental Divider (Eliminates awkward vertical gap)
  if (layout.divider && customization.sender && customization.sender.trim().length > 0) {
    drawOrnamentalDivider(
      ctx,
      layout.divider.x,
      layout.divider.y,
      layout.divider.width,
      dividerStyle,
      accentColor
    );
  }

  // 5. Sender & Leadership Sign-off
  if (customization.sender && customization.sender.trim().length > 0) {
    renderSingleLineText(
      ctx,
      customization.sender.trim(),
      layout.sender.x,
      layout.sender.y,
      layout.sender.maxWidth,
      `600 ${layout.sender.defaultFontSize}px ${subtitleFont}`,
      accentColor,
      align,
      shadowConfig
    );
  }
}
