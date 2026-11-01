// Professional Greeting Card Vector & Decorative Art Routines for HTML5 Canvas
// Phase 3.5: Premium Indian Festival Greeting Card Art Direction

/**
 * Sovereign Lotus: Luxurious royal invitation-style multi-tiered lotus mandala.
 * Features Padmasana pedestal, 3D layered petals with gradient foil shading,
 * radiant golden halo with micro-pearls, and central stamen filaments.
 */
export function drawLotus(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Soft Ambient Backlight Aura
  const ambientAura = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius * 1.4);
  ambientAura.addColorStop(0, `${goldColor}44`);
  ambientAura.addColorStop(0.5, `${goldColor}18`);
  ambientAura.addColorStop(1, 'transparent');
  ctx.fillStyle = ambientAura;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.4, 0, Math.PI * 2);
  ctx.fill();

  // 2. Dual Ornamental Halo Rings with Micro-Pearls
  ctx.save();
  ctx.strokeStyle = `${goldColor}77`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `${goldColor}44`;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // 16 Halo Star Pearls
  const pearlCount = 16;
  for (let i = 0; i < pearlCount; i++) {
    const angle = (i * Math.PI * 2) / pearlCount;
    const px = Math.cos(angle) * (radius * 1.15);
    const py = Math.sin(angle) * (radius * 1.15);
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = goldColor;
    ctx.fill();
  }
  ctx.restore();

  // 3. Tier 1: Outer Royal Gilded Petals (12 petals)
  const outerCount = 12;
  for (let i = 0; i < outerCount; i++) {
    const angle = (i * Math.PI * 2) / outerCount;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(radius * 0.38, -radius * 0.42, radius * 0.35, -radius * 0.85, 0, -radius);
    ctx.bezierCurveTo(-radius * 0.35, -radius * 0.85, -radius * 0.38, -radius * 0.42, 0, 0);
    ctx.closePath();

    const petalGrad = ctx.createLinearGradient(0, 0, 0, -radius);
    petalGrad.addColorStop(0, primaryColor);
    petalGrad.addColorStop(0.6, `${primaryColor}EE`);
    petalGrad.addColorStop(1, goldColor);
    ctx.fillStyle = petalGrad;
    ctx.fill();

    ctx.strokeStyle = `${goldColor}CC`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Subtle spine vein
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.15);
    ctx.lineTo(0, -radius * 0.85);
    ctx.strokeStyle = `${goldColor}88`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  // 4. Tier 2: Mid Layer Illuminated Petals (8 petals)
  const midRadius = radius * 0.76;
  const midCount = 8;
  for (let i = 0; i < midCount; i++) {
    const angle = (i * Math.PI * 2) / midCount + Math.PI / midCount;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(midRadius * 0.42, -midRadius * 0.45, midRadius * 0.3, -midRadius * 0.9, 0, -midRadius);
    ctx.bezierCurveTo(-midRadius * 0.3, -midRadius * 0.9, -midRadius * 0.42, -midRadius * 0.45, 0, 0);
    ctx.closePath();

    const midGrad = ctx.createLinearGradient(0, 0, 0, -midRadius);
    midGrad.addColorStop(0, `${primaryColor}DD`);
    midGrad.addColorStop(0.5, goldColor);
    midGrad.addColorStop(1, '#FFFBEB');
    ctx.fillStyle = midGrad;
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // 5. Tier 3: Inner Golden Bud Petals (6 petals)
  const innerRadius = radius * 0.5;
  const innerCount = 6;
  for (let i = 0; i < innerCount; i++) {
    const angle = (i * Math.PI * 2) / innerCount;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(innerRadius * 0.35, -innerRadius * 0.4, innerRadius * 0.25, -innerRadius * 0.85, 0, -innerRadius);
    ctx.bezierCurveTo(-innerRadius * 0.25, -innerRadius * 0.85, -innerRadius * 0.35, -innerRadius * 0.4, 0, 0);
    ctx.closePath();

    ctx.fillStyle = goldColor;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  // 6. Central Stamen & Sun Core
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.22);
  coreGrad.addColorStop(0, '#FFFFFF');
  coreGrad.addColorStop(0.4, goldColor);
  coreGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Stamen dots and rays
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12;
    const dx = Math.cos(angle) * (radius * 0.14);
    const dy = Math.sin(angle) * (radius * 0.14);
    ctx.beginPath();
    ctx.arc(dx, dy, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Royal Diya: Visually dominant traditional handcrafted brass lamp.
 * Features stepped fluted brass bowl, sculpted rim, oil pool,
 * triple-layered realistic flame, volumetric light casting, and embers.
 */
export function drawDiya(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  _primaryColor: string,
  goldColor: string,
  withAura: boolean = true
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = scale * 0.72;

  // 1. Volumetric Downward & Ambient Illumination
  if (withAura) {
    // Grand warm aura cast onto background
    const aura = ctx.createRadialGradient(0, -s * 0.4, s * 0.1, 0, -s * 0.4, s * 1.8);
    aura.addColorStop(0, 'rgba(255, 236, 179, 0.65)');
    aura.addColorStop(0.25, 'rgba(255, 179, 0, 0.35)');
    aura.addColorStop(0.6, 'rgba(230, 81, 0, 0.14)');
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, -s * 0.4, s * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Floating warm light sparks / embers rising from flame
    const embers = [
      { x: -s * 0.2, y: -s * 1.5, r: 2.5, a: 0.8 },
      { x: s * 0.25, y: -s * 1.8, r: 3, a: 0.7 },
      { x: -s * 0.08, y: -s * 2.1, r: 2, a: 0.5 },
      { x: s * 0.15, y: -s * 2.4, r: 2, a: 0.4 },
      { x: -s * 0.35, y: -s * 1.2, r: 1.5, a: 0.6 },
    ];
    embers.forEach((em) => {
      ctx.beginPath();
      ctx.arc(em.x, em.y, em.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 245, 157, ${em.a})`;
      ctx.fill();
    });
  }

  // 2. Brass Lamp Pedestal Base
  ctx.beginPath();
  ctx.ellipse(0, s * 0.65, s * 0.55, s * 0.16, 0, 0, Math.PI * 2);
  const baseGrad = ctx.createLinearGradient(0, s * 0.5, 0, s * 0.8);
  baseGrad.addColorStop(0, goldColor);
  baseGrad.addColorStop(0.5, '#B45309');
  baseGrad.addColorStop(1, '#451A03');
  ctx.fillStyle = baseGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFE082';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. Main Sculpted Brass Bowl
  ctx.beginPath();
  ctx.moveTo(-s * 0.95, 0);
  ctx.bezierCurveTo(-s * 1.0, s * 0.65, s * 1.0, s * 0.65, s * 0.95, 0);
  ctx.bezierCurveTo(s * 0.5, -s * 0.12, -s * 0.5, -s * 0.12, -s * 0.95, 0);
  ctx.closePath();

  const bowlGrad = ctx.createLinearGradient(0, -s * 0.12, 0, s * 0.65);
  bowlGrad.addColorStop(0, '#FFF9C4');
  bowlGrad.addColorStop(0.2, goldColor);
  bowlGrad.addColorStop(0.6, '#D97706');
  bowlGrad.addColorStop(0.9, '#78350F');
  bowlGrad.addColorStop(1, '#451A03');
  ctx.fillStyle = bowlGrad;
  ctx.fill();

  ctx.strokeStyle = '#FFF9C4';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 4. Intricate Brass Rim Engravings
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 1.5;
  for (let i = -5; i <= 5; i++) {
    const rx = (i / 5.5) * (s * 0.78);
    const ry = Math.sin((i / 5.5) * Math.PI) * (s * 0.08);
    ctx.beginPath();
    ctx.arc(rx, ry + s * 0.06, 3.5, 0, Math.PI);
    ctx.stroke();
  }
  ctx.restore();

  // 5. Oil Pool & Wick Bed
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.7, s * 0.12, 0, 0, Math.PI * 2);
  const oilGrad = ctx.createLinearGradient(-s * 0.7, 0, s * 0.7, 0);
  oilGrad.addColorStop(0, '#78350F');
  oilGrad.addColorStop(0.5, '#F59E0B');
  oilGrad.addColorStop(1, '#78350F');
  ctx.fillStyle = oilGrad;
  ctx.fill();

  // Cotton Wick
  ctx.beginPath();
  ctx.moveTo(0, s * 0.05);
  ctx.lineTo(0, -s * 0.22);
  ctx.strokeStyle = '#1F2937';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();

  // 6. Layered Realistic Flame
  const flameHeight = s * 1.35;
  const flameY = -s * 0.18;

  // Outer Flame (Radiant Amber-Orange)
  ctx.beginPath();
  ctx.moveTo(0, flameY);
  ctx.bezierCurveTo(s * 0.45, flameY - flameHeight * 0.35, s * 0.35, flameY - flameHeight * 0.8, 0, flameY - flameHeight);
  ctx.bezierCurveTo(-s * 0.35, flameY - flameHeight * 0.8, -s * 0.45, flameY - flameHeight * 0.35, 0, flameY);
  ctx.closePath();

  const outerFlameGrad = ctx.createLinearGradient(0, flameY, 0, flameY - flameHeight);
  outerFlameGrad.addColorStop(0, '#B91C1C');
  outerFlameGrad.addColorStop(0.3, '#F97316');
  outerFlameGrad.addColorStop(0.7, '#FBBF24');
  outerFlameGrad.addColorStop(1, '#FEF08A');
  ctx.fillStyle = outerFlameGrad;
  ctx.fill();

  // Mid Flame (Golden Saffron Core)
  const midH = flameHeight * 0.75;
  ctx.beginPath();
  ctx.moveTo(0, flameY);
  ctx.bezierCurveTo(s * 0.25, flameY - midH * 0.35, s * 0.2, flameY - midH * 0.8, 0, flameY - midH);
  ctx.bezierCurveTo(-s * 0.2, flameY - midH * 0.8, -s * 0.25, flameY - midH * 0.35, 0, flameY);
  ctx.closePath();

  const midFlameGrad = ctx.createLinearGradient(0, flameY, 0, flameY - midH);
  midFlameGrad.addColorStop(0, '#EA580C');
  midFlameGrad.addColorStop(0.5, '#FDE047');
  midFlameGrad.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = midFlameGrad;
  ctx.fill();

  // Inner Teardrop (Brilliant White Core)
  const innerH = flameHeight * 0.45;
  ctx.beginPath();
  ctx.moveTo(0, flameY);
  ctx.bezierCurveTo(s * 0.12, flameY - innerH * 0.35, s * 0.08, flameY - innerH * 0.8, 0, flameY - innerH);
  ctx.bezierCurveTo(-s * 0.08, flameY - innerH * 0.8, -s * 0.12, flameY - innerH * 0.35, 0, flameY);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = '#FFFFFF';
  ctx.shadowBlur = 16;
  ctx.fill();

  ctx.restore();
}

/**
 * Traditional Rangoli: Authentic multi-layered Indian festival rangoli.
 * Rich concentric rings with rice powder texture dots, sindoor, turmeric,
 * teal, and gold petal stars with 8-fold symmetrical majesty.
 */
export function drawRangoli(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  palette: { primary: string; secondary: string; gold: string; accent: string }
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Soft Ambient Circular Glow
  const ambient = ctx.createRadialGradient(0, 0, radius * 0.2, 0, 0, radius * 1.3);
  ambient.addColorStop(0, `${palette.gold}33`);
  ambient.addColorStop(1, 'transparent');
  ctx.fillStyle = ambient;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
  ctx.fill();

  // 2. Outer Traditional Rice Powder Dot Border (48 dots)
  const outerRing = radius * 1.15;
  const outerDots = 48;
  for (let i = 0; i < outerDots; i++) {
    const angle = (i * Math.PI * 2) / outerDots;
    const dx = Math.cos(angle) * outerRing;
    const dy = Math.sin(angle) * outerRing;
    ctx.beginPath();
    ctx.arc(dx, dy, i % 2 === 0 ? 3.5 : 2, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : palette.gold;
    ctx.fill();
  }

  // 3. 8-Axis Gilded Paisley / Teardrop Petals (Outer Ring)
  const axes = 8;
  for (let i = 0; i < axes; i++) {
    const angle = (i * Math.PI * 2) / axes;
    ctx.save();
    ctx.rotate(angle);

    // Deep Sindoor / Vermilion Petal
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(radius * 0.32, -radius * 0.35, radius * 0.32, -radius * 0.75, 0, -radius);
    ctx.bezierCurveTo(-radius * 0.32, -radius * 0.75, -radius * 0.32, -radius * 0.35, 0, 0);
    ctx.closePath();

    const petalGrad = ctx.createLinearGradient(0, 0, 0, -radius);
    petalGrad.addColorStop(0, '#991B1B');
    petalGrad.addColorStop(0.6, palette.accent);
    petalGrad.addColorStop(1, '#FEF08A');
    ctx.fillStyle = petalGrad;
    ctx.fill();

    ctx.strokeStyle = palette.gold;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Turmeric Gold Inner Inset
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.2);
    ctx.bezierCurveTo(radius * 0.15, -radius * 0.45, radius * 0.15, -radius * 0.7, 0, -radius * 0.9);
    ctx.bezierCurveTo(-radius * 0.15, -radius * 0.7, -radius * 0.15, -radius * 0.45, 0, -radius * 0.2);
    ctx.closePath();
    ctx.fillStyle = palette.gold;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Petal tip star pearl
    ctx.beginPath();
    ctx.arc(0, -radius * 1.05, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  // 4. Mid Interlocking Geometric Teal / Emerald Diamond Points
  for (let i = 0; i < axes; i++) {
    const angle = (i * Math.PI * 2) / axes + Math.PI / axes;
    ctx.save();
    ctx.rotate(angle);

    const midR = radius * 0.68;
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.25);
    ctx.lineTo(radius * 0.18, -midR * 0.65);
    ctx.lineTo(0, -midR);
    ctx.lineTo(-radius * 0.18, -midR * 0.65);
    ctx.closePath();

    const tealGrad = ctx.createLinearGradient(0, -radius * 0.25, 0, -midR);
    tealGrad.addColorStop(0, '#047857');
    tealGrad.addColorStop(0.5, '#0D9488');
    tealGrad.addColorStop(1, '#5EEAD4');
    ctx.fillStyle = tealGrad;
    ctx.fill();

    ctx.strokeStyle = palette.gold;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // 5. Central Concentric Rosette & Diya Emblem
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.28);
  coreGrad.addColorStop(0, '#FFFFFF');
  coreGrad.addColorStop(0.5, palette.gold);
  coreGrad.addColorStop(1, '#991B1B');
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Center Golden Star
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const r = i % 2 === 0 ? radius * 0.16 : radius * 0.08;
    const dx = Math.cos(angle) * r;
    const dy = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(dx, dy);
    else ctx.lineTo(dx, dy);
  }
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

/**
 * Sacred Mandala: Intricate Vedic sacred geometry.
 * Multiple concentric rings, 16 sacred spokes with diamond points,
 * interlocking geometric triangles, and golden rays.
 */
export function drawMandala(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Ambient Background Radiance
  const radAura = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius * 1.35);
  radAura.addColorStop(0, `${goldColor}33`);
  radAura.addColorStop(0.6, `${goldColor}11`);
  radAura.addColorStop(1, 'transparent');
  ctx.fillStyle = radAura;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // 2. Concentric Gilded Rings
  const rings = [
    { r: radius * 0.28, w: 2, dashed: false },
    { r: radius * 0.52, w: 1.5, dashed: false },
    { r: radius * 0.78, w: 2, dashed: true },
    { r: radius * 1.05, w: 2.5, dashed: false },
    { r: radius * 1.18, w: 1, dashed: false },
  ];

  rings.forEach((ring) => {
    ctx.beginPath();
    ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
    ctx.strokeStyle = ring.dashed ? `${goldColor}88` : goldColor;
    ctx.lineWidth = ring.w;
    if (ring.dashed) ctx.setLineDash([4, 6]);
    else ctx.setLineDash([]);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // 3. 16 Sacred Spokes with Diamond Petals
  const spokes = 16;
  for (let i = 0; i < spokes; i++) {
    const angle = (i * Math.PI * 2) / spokes;
    ctx.save();
    ctx.rotate(angle);

    // Radial ray line
    ctx.beginPath();
    ctx.moveTo(0, radius * 0.28);
    ctx.lineTo(0, radius * 1.05);
    ctx.strokeStyle = `${goldColor}55`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Geometric Diamond Tip
    ctx.beginPath();
    ctx.moveTo(0, -radius * 1.05);
    ctx.lineTo(7, -radius * 1.05 - 12);
    ctx.lineTo(0, -radius * 1.05 - 24);
    ctx.lineTo(-7, -radius * 1.05 - 12);
    ctx.closePath();
    ctx.fillStyle = goldColor;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Micro Pearl at tip
    ctx.beginPath();
    ctx.arc(0, -radius * 1.05 - 28, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  // 4. Interlocking Lotus Arc Garland (Between radius 0.52 and 0.78)
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.arc(0, -radius * 0.65, radius * 0.16, 0, Math.PI * 2);
    ctx.strokeStyle = `${goldColor}66`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // 5. Inner Sacred Yantra (Interlocking Triangles & Bindu)
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const r = i % 2 === 0 ? radius * 0.26 : radius * 0.12;
    const dx = Math.cos(angle) * r;
    const dy = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(dx, dy);
    else ctx.lineTo(dx, dy);
  }
  ctx.closePath();
  ctx.fillStyle = `${goldColor}33`;
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Central Bindu
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.06, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

/**
 * Minimal Champagne: Refined hot-foil stamped luxury stationery seal.
 * Warm embossed bevel rim, delicate cardinal micro-stars, stylized flame crest.
 */
export function drawMinimalSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Subtle Embossed Drop Shadow behind seal
  ctx.beginPath();
  ctx.arc(0, 2, radius * 1.02, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fill();

  // 2. Outer Fine Hairline Circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. Inner Polished Bevel Rim
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.88, 0, Math.PI * 2);
  const sealGrad = ctx.createLinearGradient(-radius * 0.88, -radius * 0.88, radius * 0.88, radius * 0.88);
  sealGrad.addColorStop(0, '#FFFFFF');
  sealGrad.addColorStop(0.3, goldColor);
  sealGrad.addColorStop(0.8, '#926117');
  sealGrad.addColorStop(1, goldColor);
  ctx.strokeStyle = sealGrad;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 4. Four Cardinal Star Points on Rim
  const cardinalPts = [
    { x: 0, y: -radius * 0.88 },
    { x: radius * 0.88, y: 0 },
    { x: 0, y: radius * 0.88 },
    { x: -radius * 0.88, y: 0 },
  ];
  cardinalPts.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = goldColor;
    ctx.fill();
  });

  // 5. Stylized Luxury Diya Monogram Emblem
  const s = radius * 0.55;
  // Diya Bowl
  ctx.beginPath();
  ctx.moveTo(-s * 0.75, s * 0.15);
  ctx.bezierCurveTo(-s * 0.8, s * 0.6, s * 0.8, s * 0.6, s * 0.75, s * 0.15);
  ctx.bezierCurveTo(s * 0.3, 0, -s * 0.3, 0, -s * 0.75, s * 0.15);
  ctx.closePath();
  ctx.fillStyle = goldColor;
  ctx.fill();

  // Stylized Delicate Flame
  ctx.beginPath();
  ctx.moveTo(0, s * 0.05);
  ctx.bezierCurveTo(s * 0.3, -s * 0.35, s * 0.2, -s * 0.75, 0, -s * 0.95);
  ctx.bezierCurveTo(-s * 0.2, -s * 0.75, -s * 0.3, -s * 0.35, 0, s * 0.05);
  ctx.closePath();
  ctx.fillStyle = goldColor;
  ctx.fill();

  ctx.restore();
}

/**
 * Floral Celebration: Grand Indian festive entrance toran across top.
 * Features lush emerald mango leaves (Amra Pallav) with detailed leaf veins,
 * fluffy ruffled marigold blossoms in saffron & gold, and hanging bell pendants.
 */
export function drawFloralToran(
  ctx: CanvasRenderingContext2D,
  width: number,
  _height: number,
  goldColor: string,
  orangeColor: string
) {
  ctx.save();
  const count = 13;
  const step = width / (count - 1);

  // 1. Dual Swag Garland Coordinates
  const getGarlandY = (i: number) => {
    const norm = (i / (count - 1)) * Math.PI;
    return 65 + Math.sin(norm) * 55;
  };

  // 2. Thick Golden Chain Swag
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    const x = i * step;
    const y = getGarlandY(i);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // 3. Hanging Mango Leaves & Marigold Blossoms
  for (let i = 0; i < count; i++) {
    const x = i * step;
    const y = getGarlandY(i);

    // Mango Leaf (Amra Pallav) - emerald leaf with veins
    ctx.save();
    ctx.translate(x, y + 8);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(14, 28, 0, 58);
    ctx.quadraticCurveTo(-14, 28, 0, 0);
    ctx.closePath();

    const leafGrad = ctx.createLinearGradient(0, 0, 0, 58);
    leafGrad.addColorStop(0, '#047857');
    leafGrad.addColorStop(0.7, '#065F46');
    leafGrad.addColorStop(1, '#022C22');
    ctx.fillStyle = leafGrad;
    ctx.fill();

    ctx.strokeStyle = '#34D399';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Leaf spine vein
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, 50);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();

    // Layered Marigold Blossom (Genda Phool)
    const blossomRadius = 22;
    ctx.beginPath();
    ctx.arc(x, y, blossomRadius, 0, Math.PI * 2);
    const blossomGrad = ctx.createRadialGradient(x, y, 3, x, y, blossomRadius);
    blossomGrad.addColorStop(0, '#FFF59D');
    blossomGrad.addColorStop(0.4, '#FBBF24');
    blossomGrad.addColorStop(0.8, orangeColor);
    blossomGrad.addColorStop(1, '#B45309');
    ctx.fillStyle = blossomGrad;
    ctx.fill();
    ctx.strokeStyle = '#FEF08A';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 8 Ruffled Petal Petals around edge
    for (let p = 0; p < 8; p++) {
      const pa = (p * Math.PI * 2) / 8;
      const px = x + Math.cos(pa) * (blossomRadius * 0.65);
      const py = y + Math.sin(pa) * (blossomRadius * 0.65);
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();
    }

    // Hanging Brass Bell Pendant on every 3rd flower
    if (i % 3 === 0 && i !== 0 && i !== count - 1) {
      ctx.save();
      ctx.translate(x, y + 68);
      ctx.beginPath();
      ctx.moveTo(-10, 16);
      ctx.bezierCurveTo(-12, 0, 12, 0, 10, 16);
      ctx.closePath();
      ctx.fillStyle = goldColor;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bell clapper
      ctx.beginPath();
      ctx.arc(0, 19, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.restore();
}

/**
 * Golden Petals: Dedicated layered floral petal crest.
 * Organic natural petals radiating outwards with soft ambient lighting
 * and fine gold-leaf veins on deep velvet wine.
 */
export function drawGoldenPetals(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  goldColor: string
) {
  ctx.save();
  const cx = width / 2;
  const cy = height * 0.28;
  const radius = 135;

  ctx.translate(cx, cy);

  // 1. Ambient Golden Halo
  const halo = ctx.createRadialGradient(0, 0, 20, 0, 0, radius * 1.35);
  halo.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
  halo.addColorStop(0.5, 'rgba(245, 158, 11, 0.18)');
  halo.addColorStop(1, 'transparent');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // 2. Layer 1: 12 Outer Organic Golden Petals
  const count1 = 12;
  for (let i = 0; i < count1; i++) {
    const angle = (i * Math.PI * 2) / count1;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(radius * 0.35, -radius * 0.4, radius * 0.25, -radius * 0.85, 0, -radius);
    ctx.bezierCurveTo(-radius * 0.25, -radius * 0.85, -radius * 0.35, -radius * 0.4, 0, 0);
    ctx.closePath();

    const petalGrad = ctx.createLinearGradient(0, 0, 0, -radius);
    petalGrad.addColorStop(0, 'rgba(180, 83, 9, 0.6)');
    petalGrad.addColorStop(0.5, goldColor);
    petalGrad.addColorStop(1, '#FFFBEB');
    ctx.fillStyle = petalGrad;
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Petal Vein
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.1);
    ctx.lineTo(0, -radius * 0.85);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  // 3. Layer 2: 8 Inner Swirling Petals
  const count2 = 8;
  const r2 = radius * 0.68;
  for (let i = 0; i < count2; i++) {
    const angle = (i * Math.PI * 2) / count2 + Math.PI / count2;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r2 * 0.4, -r2 * 0.45, r2 * 0.3, -r2 * 0.88, 0, -r2);
    ctx.bezierCurveTo(-r2 * 0.3, -r2 * 0.88, -r2 * 0.4, -r2 * 0.45, 0, 0);
    ctx.closePath();

    ctx.fillStyle = goldColor;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // 4. Center Gold Rosette Core
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.22);
  coreGrad.addColorStop(0, '#FFFFFF');
  coreGrad.addColorStop(0.4, goldColor);
  coreGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

/**
 * Joyful Festive: Authentic Indian Akash Kandil paper lantern artwork.
 * Hanging cords, faceted star lantern body with glowing warm panels,
 * flowing streamer ribbons, and corner earthen diyas.
 */
export function drawJoyfulLanterns(
  ctx: CanvasRenderingContext2D,
  width: number,
  _height: number,
  goldColor: string
) {
  ctx.save();
  const lanterns = [
    { x: width * 0.16, cord: 110, size: 60, color1: '#E11D48', color2: '#F59E0B' },
    { x: width * 0.84, cord: 130, size: 68, color1: '#D97706', color2: '#FBBF24' },
    { x: width * 0.5, cord: 65, size: 48, color1: '#7C3AED', color2: '#F59E0B' },
  ];

  // Top Hanging Ribbons / Bunting Line
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.quadraticCurveTo(width * 0.5, 60, width, 30);
  ctx.strokeStyle = `${goldColor}AA`;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  lanterns.forEach((l) => {
    // Hanging Cord with Gold Beads
    ctx.beginPath();
    ctx.moveTo(l.x, 35);
    ctx.lineTo(l.x, l.cord);
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    for (let b = 45; b < l.cord; b += 22) {
      ctx.beginPath();
      ctx.arc(l.x, b, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    }

    ctx.save();
    ctx.translate(l.x, l.cord);

    // Faceted Star Lantern (Akash Kandil) Body
    const r = l.size * 0.5;

    // Glowing Inner Light
    const glow = ctx.createRadialGradient(0, r, 5, 0, r, r * 1.6);
    glow.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, r, r * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // Main Diamond Facet
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r, r);
    ctx.lineTo(0, r * 2);
    ctx.lineTo(-r, r);
    ctx.closePath();

    const facetGrad = ctx.createLinearGradient(0, 0, 0, r * 2);
    facetGrad.addColorStop(0, l.color1);
    facetGrad.addColorStop(0.5, goldColor);
    facetGrad.addColorStop(1, l.color2);
    ctx.fillStyle = facetGrad;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center Radiating Star Aperture
    ctx.beginPath();
    ctx.arc(0, r, r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFBEB';
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Flowing Streamer Ribbon Tassels
    const tasselCount = 5;
    for (let t = 0; t < tasselCount; t++) {
      const tx = ((t - (tasselCount - 1) / 2) * (r * 1.2)) / tasselCount;
      ctx.beginPath();
      ctx.moveTo(tx, r * 2);
      ctx.bezierCurveTo(tx + 12, r * 2.4, tx - 12, r * 2.9, tx + 6, r * 3.4);
      ctx.strokeStyle = t % 2 === 0 ? goldColor : '#FFFBEB';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Little bell dot at end
      ctx.beginPath();
      ctx.arc(tx + 6, r * 3.4, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = goldColor;
      ctx.fill();
    }

    ctx.restore();
  });

  ctx.restore();
}

/**
 * Diwali Story Special: Designed specifically for 9:16 vertical storytelling.
 * Celestial star canopy, drifting sky lanterns, and illuminated base skyline.
 */
export function drawDiwaliStorySpecial(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  goldColor: string
) {
  ctx.save();

  // Celestial golden stars in the night sky
  for (let s = 0; s < 25; s++) {
    const sx = ((s * 137) % width);
    const sy = ((s * 79) % (height * 0.45));
    ctx.beginPath();
    ctx.arc(sx, sy, s % 3 === 0 ? 2 : 1, 0, Math.PI * 2);
    ctx.fillStyle = goldColor;
    ctx.fill();
  }

  // 1. Drifting Sky Lanterns in Celestial Sky
  const lanterns = [
    { x: width * 0.18, y: 160, size: 28 },
    { x: width * 0.78, y: 220, size: 34 },
    { x: width * 0.32, y: 310, size: 22 },
    { x: width * 0.86, y: 380, size: 26 },
  ];

  lanterns.forEach((l) => {
    ctx.save();
    ctx.translate(l.x, l.y);

    const aura = ctx.createRadialGradient(0, 0, 2, 0, 0, l.size * 1.5);
    aura.addColorStop(0, 'rgba(255, 236, 179, 0.7)');
    aura.addColorStop(0.5, 'rgba(255, 152, 0, 0.25)');
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, l.size * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Lantern Envelope
    ctx.beginPath();
    ctx.ellipse(0, 0, l.size * 0.65, l.size * 0.85, 0, 0, Math.PI * 2);
    const lg = ctx.createLinearGradient(0, -l.size * 0.85, 0, l.size * 0.85);
    lg.addColorStop(0, '#FFE082');
    lg.addColorStop(0.6, '#FF9800');
    lg.addColorStop(1, '#E65100');
    ctx.fillStyle = lg;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  });

  // 2. Base Temple & Festive Skyline Silhouette
  const baseH = height * 0.12;
  const baseY = height - baseH;
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, baseY + 40);

  // Silhouetted Temple Towers (Shikhara) & Pavilions
  ctx.lineTo(width * 0.15, baseY + 40);
  ctx.lineTo(width * 0.22, baseY + 10);
  ctx.lineTo(width * 0.25, baseY);
  ctx.lineTo(width * 0.28, baseY + 10);
  ctx.lineTo(width * 0.35, baseY + 45);

  ctx.lineTo(width * 0.65, baseY + 45);
  ctx.lineTo(width * 0.72, baseY + 15);
  ctx.lineTo(width * 0.75, baseY);
  ctx.lineTo(width * 0.78, baseY + 15);
  ctx.lineTo(width * 0.85, baseY + 40);
  ctx.lineTo(width, baseY + 40);
  ctx.lineTo(width, height);
  ctx.closePath();

  ctx.fillStyle = '#06040F';
  ctx.fill();

  // Rooftop Diya Lights along skyline
  const rooftopDiyas = [
    { x: width * 0.25, y: baseY - 4 },
    { x: width * 0.75, y: baseY - 4 },
    { x: width * 0.1, y: baseY + 36 },
    { x: width * 0.5, y: baseY + 42 },
    { x: width * 0.9, y: baseY + 36 },
  ];
  rooftopDiyas.forEach((d) => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE082';
    ctx.shadowColor = '#FF9800';
    ctx.shadowBlur = 8;
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Elegant Corporate Crest: Prestigious executive letterhead emblem.
 * Features an interlocking octagonal brass seal with double rim,
 * stylized eternal flame in center, and architectural balance rule.
 */
export function drawCorporateCrest(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = scale * 0.65;

  // 1. Subtle Brass Seal Drop Shadow
  ctx.beginPath();
  ctx.arc(0, 3, s * 0.82, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fill();

  // 2. Interlocking Octagonal Brass Outer Rim
  ctx.beginPath();
  const sides = 8;
  for (let i = 0; i < sides; i++) {
    const angle = (i * Math.PI * 2) / sides;
    const px = Math.cos(angle) * (s * 0.85);
    const py = Math.sin(angle) * (s * 0.85);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  const octGrad = ctx.createLinearGradient(-s * 0.85, -s * 0.85, s * 0.85, s * 0.85);
  octGrad.addColorStop(0, '#FFFFFF');
  octGrad.addColorStop(0.35, goldColor);
  octGrad.addColorStop(0.7, '#854D0E');
  octGrad.addColorStop(1, goldColor);
  ctx.strokeStyle = octGrad;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 3. Inner Polished Concentric Circle
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.68, 0, Math.PI * 2);
  ctx.strokeStyle = `${goldColor}AA`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 4. Stylized Modern Eternal Flame / Diya Icon
  // Diya Base
  ctx.beginPath();
  ctx.moveTo(-s * 0.42, s * 0.12);
  ctx.bezierCurveTo(-s * 0.45, s * 0.45, s * 0.45, s * 0.45, s * 0.42, s * 0.12);
  ctx.closePath();
  ctx.fillStyle = goldColor;
  ctx.fill();

  // Eternal Flame
  ctx.beginPath();
  ctx.moveTo(0, s * 0.05);
  ctx.bezierCurveTo(s * 0.22, -s * 0.22, s * 0.15, -s * 0.55, 0, -s * 0.72);
  ctx.bezierCurveTo(-s * 0.15, -s * 0.55, -s * 0.22, -s * 0.22, 0, s * 0.05);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // 5. Twin Architectural Balance Rules
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 1.5;

  // Left Bar
  ctx.beginPath();
  ctx.moveTo(-s * 1.15, 0);
  ctx.lineTo(-s * 1.9, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-s * 1.9, 0, 3, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  // Right Bar
  ctx.beginPath();
  ctx.moveTo(s * 1.15, 0);
  ctx.lineTo(s * 1.9, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(s * 1.9, 0, 3, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  ctx.restore();
}

export function withAlpha(color: string, alphaHex: string): string {
  if (color && color.startsWith('#')) {
    const raw = color.slice(1, 7);
    return `#${raw}${alphaHex}`;
  }
  return color;
}

/**
 * Professional Luxury Border Styles with Intricate Cultural Filigree
 */
export function drawBorder(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: 'double-gold' | 'rangoli-dots' | 'royal-filigree' | 'minimal-hairline' | 'festive-toran' | 'brushed-brass',
  color: string,
  hasCornerFlourish: boolean
) {
  ctx.save();
  const pad = 36;
  const innerPad = pad + 14;

  switch (style) {
    case 'festive-toran': {
      // Outer subtle framing rule
      ctx.strokeStyle = withAlpha(color, '66');
      ctx.lineWidth = 1.5;
      ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

      // Top Draped Festive Toran (Mango Leaves & Marigolds)
      const toranY = pad + 18;
      const numFestoons = Math.max(6, Math.floor((width - pad * 2) / 80));
      const festoonW = (width - pad * 2) / numFestoons;

      for (let i = 0; i < numFestoons; i++) {
        const x1 = pad + i * festoonW;
        const x2 = x1 + festoonW;
        const midX = (x1 + x2) / 2;
        const dropY = toranY + 28;

        // Draped garland curve
        ctx.beginPath();
        ctx.moveTo(x1, toranY);
        ctx.quadraticCurveTo(midX, dropY, x2, toranY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Marigold blossom pom-pom at each node
        const mGrad = ctx.createRadialGradient(x1, toranY, 2, x1, toranY, 8);
        mGrad.addColorStop(0, '#FFE082');
        mGrad.addColorStop(0.6, '#FFA000');
        mGrad.addColorStop(1, '#E65100');
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.arc(x1, toranY, 7, 0, Math.PI * 2);
        ctx.fill();

        // Dropping Mango Leaf in center of each festoon
        ctx.fillStyle = '#2E7D32';
        ctx.beginPath();
        ctx.moveTo(midX, dropY - 2);
        ctx.quadraticCurveTo(midX - 7, dropY + 12, midX, dropY + 24);
        ctx.quadraticCurveTo(midX + 7, dropY + 12, midX, dropY - 2);
        ctx.fill();
        ctx.strokeStyle = withAlpha(color, 'AA');
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Corner Hanging Bells
      [pad, width - pad].forEach((bx) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx, pad);
        ctx.lineTo(bx, pad + 55);
        ctx.stroke();

        // Bell bowl
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(bx - 9, pad + 70);
        ctx.quadraticCurveTo(bx, pad + 55, bx + 9, pad + 70);
        ctx.closePath();
        ctx.fill();

        // Clapper
        ctx.fillStyle = '#FFF8E1';
        ctx.beginPath();
        ctx.arc(bx, pad + 74, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'double-gold': {
      // Outer primary metallic foil border
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

      // Inner secondary fine border
      ctx.strokeStyle = withAlpha(color, '88');
      ctx.lineWidth = 1.2;
      ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);

      if (hasCornerFlourish) {
        // Ornate 4-Corner Filigree Florets with Radiating Petals
        const corners = [
          { x: pad, y: pad, sx: 1, sy: 1 },
          { x: width - pad, y: pad, sx: -1, sy: 1 },
          { x: pad, y: height - pad, sx: 1, sy: -1 },
          { x: width - pad, y: height - pad, sx: -1, sy: -1 },
        ];
        corners.forEach((c) => {
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.scale(c.sx, c.sy);

          // Diagonal corner bracket
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 32);
          ctx.lineTo(12, 12);
          ctx.lineTo(32, 0);
          ctx.stroke();

          // Central faceted diamond
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(14, 4);
          ctx.lineTo(24, 14);
          ctx.lineTo(14, 24);
          ctx.lineTo(4, 14);
          ctx.closePath();
          ctx.fill();

          // Inner gleaming core
          ctx.fillStyle = '#FFF9C4';
          ctx.beginPath();
          ctx.arc(14, 14, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }
      break;
    }

    case 'rangoli-dots': {
      // Dotted outer border
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 8]);
      ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);
      ctx.setLineDash([]);

      // Solid inner frame
      ctx.strokeStyle = withAlpha(color, 'AA');
      ctx.lineWidth = 1.5;
      ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);

      // Corner Kolam Rosettes
      const corners = [
        { x: pad, y: pad },
        { x: width - pad, y: pad },
        { x: pad, y: height - pad },
        { x: width - pad, y: height - pad },
      ];
      corners.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.fillStyle = color;
        for (let a = 0; a < 8; a++) {
          const ang = (a * Math.PI) / 4;
          ctx.beginPath();
          ctx.arc(Math.cos(ang) * 10, Math.sin(ang) * 10, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF8E1';
        ctx.fill();
        ctx.restore();
      });
      break;
    }

    case 'minimal-hairline': {
      // Ultra-fine luxury hairline with subtle corner cross-brackets
      const inset = pad + 16;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);

      // Corner minimalist cross-brackets
      const corners = [
        { x: inset, y: inset },
        { x: width - inset, y: inset },
        { x: inset, y: height - inset },
        { x: width - inset, y: height - inset },
      ];
      corners.forEach((c) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c.x - 12, c.y);
        ctx.lineTo(c.x + 12, c.y);
        ctx.moveTo(c.x, c.y - 12);
        ctx.lineTo(c.x, c.y + 12);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      break;
    }

    case 'brushed-brass': {
      // Executive double line with chamfered / clipped 45-degree corners
      const chamfer = 28;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(pad + chamfer, pad);
      ctx.lineTo(width - pad - chamfer, pad);
      ctx.lineTo(width - pad, pad + chamfer);
      ctx.lineTo(width - pad, height - pad - chamfer);
      ctx.lineTo(width - pad - chamfer, height - pad);
      ctx.lineTo(pad + chamfer, height - pad);
      ctx.lineTo(pad, height - pad - chamfer);
      ctx.lineTo(pad, pad + chamfer);
      ctx.closePath();
      ctx.stroke();

      // Inner hairline
      const innerChamfer = chamfer - 6;
      ctx.strokeStyle = withAlpha(color, '77');
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(innerPad + innerChamfer, innerPad);
      ctx.lineTo(width - innerPad - innerChamfer, innerPad);
      ctx.lineTo(width - innerPad, innerPad + innerChamfer);
      ctx.lineTo(width - innerPad, height - innerPad - innerChamfer);
      ctx.lineTo(width - innerPad - innerChamfer, height - innerPad);
      ctx.lineTo(innerPad + innerChamfer, height - innerPad);
      ctx.lineTo(innerPad, height - innerPad - innerChamfer);
      ctx.lineTo(innerPad, innerPad + innerChamfer);
      ctx.closePath();
      ctx.stroke();

      // Brass Corner Rivet Studs
      const rivets = [
        { x: pad + chamfer, y: pad + 10 },
        { x: width - pad - chamfer, y: pad + 10 },
        { x: width - pad - 10, y: pad + chamfer },
        { x: width - pad - 10, y: height - pad - chamfer },
        { x: width - pad - chamfer, y: height - pad - 10 },
        { x: pad + chamfer, y: height - pad - 10 },
        { x: pad + 10, y: height - pad - chamfer },
        { x: pad + 10, y: pad + chamfer },
      ];
      rivets.forEach((r) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'royal-filigree':
    default: {
      // Primary outer border
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.8;
      ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

      // Secondary inner border
      ctx.strokeStyle = withAlpha(color, '66');
      ctx.lineWidth = 1.2;
      ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);

      if (hasCornerFlourish) {
        // Luxury Imperial Filigree Lace Brackets
        const corners = [
          { x: pad + 10, y: pad + 10, sx: 1, sy: 1 },
          { x: width - pad - 10, y: pad + 10, sx: -1, sy: 1 },
          { x: pad + 10, y: height - pad - 10, sx: 1, sy: -1 },
          { x: width - pad - 10, y: height - pad - 10, sx: -1, sy: -1 },
        ];
        corners.forEach((c) => {
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.scale(c.sx, c.sy);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;

          // Double curved scroll bracket
          ctx.beginPath();
          ctx.moveTo(0, 48);
          ctx.quadraticCurveTo(0, 14, 14, 0);
          ctx.lineTo(48, 0);
          ctx.stroke();

          // Inner spiral scroll
          ctx.beginPath();
          ctx.arc(16, 16, 8, 0, Math.PI * 1.5, false);
          ctx.stroke();

          // Filigree teardrop finial
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(16, 16, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(36, 6, 2.5, 0, Math.PI * 2);
          ctx.arc(6, 36, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });
      }
      break;
    }
  }

  ctx.restore();
}

/**
 * Professional Ornamental Typographic Dividers
 */
export function drawOrnamentalDivider(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  style: 'diamond-rule' | 'diya-flourish' | 'lotus-bud' | 'mandala-crest' | 'minimal-dash',
  color: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  const halfW = Math.min(width * 0.42, 240);

  // Gradient for tapered horizontal rule lines
  const gradL = ctx.createLinearGradient(0, 0, -halfW, 0);
  gradL.addColorStop(0, color);
  gradL.addColorStop(0.7, withAlpha(color, '88'));
  gradL.addColorStop(1, 'transparent');

  const gradR = ctx.createLinearGradient(0, 0, halfW, 0);
  gradR.addColorStop(0, color);
  gradR.addColorStop(0.7, withAlpha(color, '88'));
  gradR.addColorStop(1, 'transparent');

  ctx.lineWidth = 1.5;

  switch (style) {
    case 'diya-flourish': {
      // Left and right rules
      ctx.strokeStyle = gradL;
      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.lineTo(-halfW, 0);
      ctx.stroke();

      ctx.strokeStyle = gradR;
      ctx.beginPath();
      ctx.moveTo(28, 0);
      ctx.lineTo(halfW, 0);
      ctx.stroke();

      // Miniature Diya Centerpiece
      // Base bowl
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 4, 14, 6, 0, 0, Math.PI);
      ctx.fill();

      // Golden Flame
      ctx.fillStyle = '#FFE082';
      ctx.shadowColor = '#FF9800';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-5, -2, -4, -14, 0, -20);
      ctx.bezierCurveTo(4, -14, 5, -2, 0, 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Miniature leaf scrolls on sides
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(-16, -2, 6, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(16, -2, 6, 0, Math.PI);
      ctx.stroke();
      break;
    }

    case 'lotus-bud': {
      // Left and right rules with ornamental dots
      ctx.strokeStyle = gradL;
      ctx.beginPath();
      ctx.moveTo(-24, 0);
      ctx.lineTo(-halfW, 0);
      ctx.stroke();

      ctx.strokeStyle = gradR;
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(halfW, 0);
      ctx.stroke();

      // Center Lotus bud
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.quadraticCurveTo(-10, -2, 0, -18);
      ctx.quadraticCurveTo(10, -2, 0, 6);
      ctx.fill();

      // Petal side curves
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.quadraticCurveTo(-14, 0, -8, -10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.quadraticCurveTo(14, 0, 8, -10);
      ctx.stroke();
      break;
    }

    case 'minimal-dash': {
      // Ultra-clean 3 micro-diamonds
      ctx.strokeStyle = gradL;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(-halfW * 0.75, 0);
      ctx.stroke();

      ctx.strokeStyle = gradR;
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(halfW * 0.75, 0);
      ctx.stroke();

      ctx.fillStyle = color;
      [-12, 0, 12].forEach((dx, i) => {
        const size = i === 1 ? 5.5 : 3.5;
        ctx.beginPath();
        ctx.moveTo(dx, -size);
        ctx.lineTo(dx + size, 0);
        ctx.lineTo(dx, size);
        ctx.lineTo(dx - size, 0);
        ctx.closePath();
        ctx.fill();
      });
      break;
    }

    case 'mandala-crest': {
      ctx.strokeStyle = gradL;
      ctx.beginPath();
      ctx.moveTo(-26, 0);
      ctx.lineTo(-halfW, 0);
      ctx.stroke();

      ctx.strokeStyle = gradR;
      ctx.beginPath();
      ctx.moveTo(26, 0);
      ctx.lineTo(halfW, 0);
      ctx.stroke();

      // Miniature 8-pointed starburst mandala
      ctx.fillStyle = color;
      for (let s = 0; s < 8; s++) {
        const rad = (s * Math.PI) / 4;
        ctx.beginPath();
        ctx.arc(Math.cos(rad) * 9, Math.sin(rad) * 9, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8E1';
      ctx.fill();
      break;
    }

    case 'diamond-rule':
    default: {
      // Standard Luxury Diamond Rule with side pearls
      ctx.strokeStyle = gradL;
      ctx.beginPath();
      ctx.moveTo(-24, 0);
      ctx.lineTo(-halfW, 0);
      ctx.stroke();

      ctx.strokeStyle = gradR;
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(halfW, 0);
      ctx.stroke();

      // Center faceted diamond
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(9, 0);
      ctx.lineTo(0, 9);
      ctx.lineTo(-9, 0);
      ctx.closePath();
      ctx.fill();

      // Inner diamond
      ctx.fillStyle = '#FFF8E1';
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(4, 0);
      ctx.lineTo(0, 4);
      ctx.lineTo(-4, 0);
      ctx.closePath();
      ctx.fill();

      // Flanking micro-pearls
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(-15, 0, 2.5, 0, Math.PI * 2);
      ctx.arc(15, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

/**
 * Ambient Starlight Particles and Bokeh
 */
export function drawStarlightParticles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) {
  ctx.save();
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const seedX = (Math.sin(i * 997) * 10000) % 1;
    const seedY = (Math.cos(i * 389) * 10000) % 1;
    const x = Math.abs(seedX) * (width - 140) + 70;
    const y = Math.abs(seedY) * (height - 140) + 70;
    const size = i % 3 === 0 ? 3 : 1.5;
    const alpha = i % 2 === 0 ? '77' : '33';

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = withAlpha(color, alpha);
    ctx.fill();

    // 4-point star shimmer on larger particles
    if (i % 6 === 0) {
      ctx.strokeStyle = withAlpha(color, '99');
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - 7, y);
      ctx.lineTo(x + 7, y);
      ctx.moveTo(x, y - 7);
      ctx.lineTo(x, y + 7);
      ctx.stroke();
    }
  }
  ctx.restore();
}

/**
 * 11. Royal Peacock Motif (Mayura)
 * Majestic Indian peacock with crested crown and iridescent fan of feathers.
 */
export function drawPeacockMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer radiant fan of peacock tail feathers
  const featherCount = 12;
  for (let i = 0; i < featherCount; i++) {
    const angle = (Math.PI * 2 * i) / featherCount - Math.PI / 2;
    const fx = Math.cos(angle) * radius * 0.85;
    const fy = Math.sin(angle) * radius * 0.85;

    ctx.save();
    ctx.translate(fx, fy);
    ctx.rotate(angle + Math.PI / 2);

    // Feather eye - outer gold ring
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.18, radius * 0.28, 0, 0, Math.PI * 2);
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Feather eye - emerald/sapphire core
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.12, radius * 0.19, 0, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor;
    ctx.fill();

    // Center radiant turquoise/gold pupil
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = goldColor;
    ctx.fill();

    ctx.restore();

    // Feather quills radiating from center
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(fx, fy);
    ctx.strokeStyle = `${goldColor}66`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // Central majestic peacock body
  ctx.beginPath();
  ctx.ellipse(0, radius * 0.05, radius * 0.28, radius * 0.38, 0, 0, Math.PI * 2);
  const bodyGrad = ctx.createLinearGradient(0, -radius * 0.3, 0, radius * 0.4);
  bodyGrad.addColorStop(0, goldColor);
  bodyGrad.addColorStop(1, primaryColor);
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Graceful arched neck and head
  ctx.beginPath();
  ctx.arc(0, -radius * 0.28, radius * 0.14, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  // Crest plumes (Kalangi)
  for (let c = -1; c <= 1; c++) {
    const plumeX = c * radius * 0.08;
    const plumeY = -radius * 0.48;
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.32);
    ctx.lineTo(plumeX, plumeY);
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(plumeX, plumeY, radius * 0.035, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF8E7';
    ctx.fill();
  }

  ctx.restore();
}

/**
 * 12. Sacred Mangal Kalash Motif
 * Auspicious brass pot with coconut, mango leaves, and swastika inscription.
 */
export function drawKalashMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Decorative halo backdrop
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `${goldColor}44`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 5 Mango Leaves (Amra Pallav)
  const leafAngles = [-0.65, -0.32, 0, 0.32, 0.65];
  leafAngles.forEach((ang) => {
    ctx.save();
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.25);
    ctx.quadraticCurveTo(-radius * 0.12, -radius * 0.65, 0, -radius * 0.88);
    ctx.quadraticCurveTo(radius * 0.12, -radius * 0.65, 0, -radius * 0.25);
    ctx.fillStyle = primaryColor;
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Central leaf spine
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.25);
    ctx.lineTo(0, -radius * 0.84);
    ctx.strokeStyle = `${goldColor}AA`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  });

  // Sacred Sriphala (Coconut) on top
  ctx.beginPath();
  ctx.arc(0, -radius * 0.38, radius * 0.26, 0, Math.PI * 2);
  const cocoGrad = ctx.createRadialGradient(0, -radius * 0.42, 2, 0, -radius * 0.38, radius * 0.26);
  cocoGrad.addColorStop(0, goldColor);
  cocoGrad.addColorStop(0.7, '#8B5A2B');
  cocoGrad.addColorStop(1, '#5C3317');
  ctx.fillStyle = cocoGrad;
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Coconut tuft tip
  ctx.beginPath();
  ctx.moveTo(-radius * 0.06, -radius * 0.62);
  ctx.lineTo(0, -radius * 0.74);
  ctx.lineTo(radius * 0.06, -radius * 0.62);
  ctx.closePath();
  ctx.fillStyle = goldColor;
  ctx.fill();

  // Pot Neck / Rim (Kanth)
  ctx.beginPath();
  ctx.ellipse(0, -radius * 0.12, radius * 0.32, radius * 0.08, 0, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Main Kalash Pot Body (Kumbha)
  ctx.beginPath();
  ctx.moveTo(-radius * 0.28, -radius * 0.1);
  ctx.bezierCurveTo(-radius * 0.65, radius * 0.25, -radius * 0.45, radius * 0.7, 0, radius * 0.72);
  ctx.bezierCurveTo(radius * 0.45, radius * 0.7, radius * 0.65, radius * 0.25, radius * 0.28, -radius * 0.1);
  ctx.closePath();

  const potGrad = ctx.createLinearGradient(-radius * 0.5, 0, radius * 0.5, 0);
  potGrad.addColorStop(0, goldColor);
  potGrad.addColorStop(0.5, '#FFF8DC');
  potGrad.addColorStop(1, '#C68E17');
  ctx.fillStyle = potGrad;
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Base Pedestal
  ctx.beginPath();
  ctx.ellipse(0, radius * 0.72, radius * 0.28, radius * 0.07, 0, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  // Sacred Swastika on pot
  ctx.save();
  ctx.translate(0, radius * 0.32);
  const swSize = radius * 0.18;
  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -swSize);
  ctx.lineTo(0, swSize);
  ctx.moveTo(-swSize, 0);
  ctx.lineTo(swSize, 0);
  ctx.moveTo(0, -swSize);
  ctx.lineTo(swSize, -swSize);
  ctx.moveTo(swSize, 0);
  ctx.lineTo(swSize, swSize);
  ctx.moveTo(0, swSize);
  ctx.lineTo(-swSize, swSize);
  ctx.moveTo(-swSize, 0);
  ctx.lineTo(-swSize, -swSize);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

/**
 * 13. Royal Rajasthani Jharokha Arch
 * Cusped palace window arch with central ceremonial diya.
 */
export function drawJharokhaArch(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer cusped royal arch frame
  ctx.beginPath();
  const w = radius * 0.95;
  const h = radius * 1.1;

  // Base pillars
  ctx.rect(-w, -h * 0.1, w * 2, h * 0.9);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Upper cusped arch curves
  ctx.beginPath();
  ctx.moveTo(-w, -h * 0.1);
  ctx.bezierCurveTo(-w * 0.8, -h * 0.5, -w * 0.4, -h * 0.7, 0, -h * 0.95);
  ctx.bezierCurveTo(w * 0.4, -h * 0.7, w * 0.8, -h * 0.5, w, -h * 0.1);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Inner lattice / Jali pattern
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, -h * 0.3, radius * 0.45, 0, Math.PI * 2);
  ctx.strokeStyle = `${goldColor}44`;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // Central glowing brass diya inside arch
  drawDiya(ctx, 0, radius * 0.28, radius * 0.48, primaryColor, goldColor, true);

  ctx.restore();
}

/**
 * 14. Auspicious Shubh-Labh Royal Seal
 * Calligraphic ceremonial seal with lotus petals and auspicious inscriptions.
 */
export function drawShubhLabhSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 16 Lotus Petals Sunburst
  const petals = 16;
  for (let i = 0; i < petals; i++) {
    const angle = (Math.PI * 2 * i) / petals;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, radius * 0.65);
    ctx.quadraticCurveTo(-radius * 0.1, radius * 0.85, 0, radius);
    ctx.quadraticCurveTo(radius * 0.1, radius * 0.85, 0, radius * 0.65);
    ctx.fillStyle = `${goldColor}33`;
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
  }

  // Double circular gold frames
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.68, 0, Math.PI * 2);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.58, 0, Math.PI * 2);
  ctx.strokeStyle = `${goldColor}99`;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Central sacred Devanagari calligraphy "शुभ लाभ"
  ctx.font = `bold ${Math.round(radius * 0.32)}px "Cinzel", "Rozha One", serif`;
  ctx.fillStyle = goldColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('शुभ • लाभ', 0, 0);

  ctx.restore();
}

/**
 * 15. South Indian Hanging Deepam (Thoongu Vilakku)
 * Brass temple hanging bell diya with multi-tiered flame and brass chains.
 */
export function drawHangingDeepam(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Hanging Brass Chain
  ctx.beginPath();
  ctx.moveTo(0, -radius * 1.1);
  ctx.lineTo(0, -radius * 0.3);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Brass Bell Canopy
  ctx.beginPath();
  ctx.moveTo(-radius * 0.28, -radius * 0.3);
  ctx.quadraticCurveTo(0, -radius * 0.55, radius * 0.28, -radius * 0.3);
  ctx.lineTo(radius * 0.24, -radius * 0.2);
  ctx.lineTo(-radius * 0.24, -radius * 0.2);
  ctx.closePath();
  ctx.fillStyle = goldColor;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Tiered Hanging Diya Bowl
  drawDiya(ctx, 0, radius * 0.2, radius * 0.7, primaryColor, goldColor, true);

  // Lower hanging brass droplet / bell
  ctx.beginPath();
  ctx.moveTo(0, radius * 0.65);
  ctx.lineTo(0, radius * 0.88);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, radius * 0.94, radius * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  ctx.restore();
}

/**
 * 16. South Indian Geometric Kolam Heritage
 * Interlaced infinite loops and geometric rice-powder grid art.
 */
export function drawKolamHeritage(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  const steps = 8;
  for (let s = 1; s <= 3; s++) {
    const r = (radius * s) / 3.2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = `${goldColor}55`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // Intertwined endless ribbon petals
  for (let i = 0; i < steps; i++) {
    const angle = (Math.PI * 2 * i) / steps;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, radius * 0.2);
    ctx.bezierCurveTo(-radius * 0.35, radius * 0.5, radius * 0.35, radius * 0.8, 0, radius);
    ctx.bezierCurveTo(-radius * 0.35, radius * 0.8, radius * 0.35, radius * 0.5, 0, radius * 0.2);
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  // Center golden medallion
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  ctx.restore();
}

/**
 * 17. Sparkling Phuljhadi Celebration
 * Radiant festive sparkler burst with cascading starburst sparks.
 */
export function drawSparklerCelebration(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string,
  accentColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 36 Starburst rays of varying lengths
  const rays = 32;
  for (let i = 0; i < rays; i++) {
    const angle = (Math.PI * 2 * i) / rays;
    const len = (i % 2 === 0 ? radius * 0.95 : radius * 0.65) * (0.8 + ((i * 7) % 5) * 0.05);

    const x = Math.cos(angle) * len;
    const y = Math.sin(angle) * len;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.strokeStyle = i % 3 === 0 ? accentColor : goldColor;
    ctx.lineWidth = i % 4 === 0 ? 2 : 1;
    ctx.stroke();

    // Glittering spark terminal dot
    ctx.beginPath();
    ctx.arc(x, y, (i % 3 === 0 ? 3 : 1.8), 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }

  // Glowing white-gold core
  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, radius * 0.3);
  coreGrad.addColorStop(0, '#FFFFFF');
  coreGrad.addColorStop(0.4, goldColor);
  coreGrad.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = coreGrad;
  ctx.fill();

  ctx.restore();
}

/**
 * 18. Auspicious Family Hearth
 * Concentric warm trio of brass diyas with protective lotus petals.
 */
export function drawFamilyHearth(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Lotus base bed
  drawLotus(ctx, 0, radius * 0.25, radius * 0.85, primaryColor, goldColor);

  // Center primary diya (parents / elders)
  drawDiya(ctx, 0, radius * 0.05, radius * 0.65, primaryColor, goldColor, true);

  // Left companion diya (children)
  drawDiya(ctx, -radius * 0.42, radius * 0.2, radius * 0.42, primaryColor, goldColor, false);

  // Right companion diya (extended family)
  drawDiya(ctx, radius * 0.42, radius * 0.2, radius * 0.42, primaryColor, goldColor, false);

  ctx.restore();
}

/**
 * 19. Executive Corporate Prism Medallion
 * Sharp geometric diamond faceted crest with architectural gold rays.
 */
export function drawCorporatePrism(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer diamond rhombus
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(radius * 0.85, 0);
  ctx.lineTo(0, radius);
  ctx.lineTo(-radius * 0.85, 0);
  ctx.closePath();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner faceted concentric rhombus
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.7);
  ctx.lineTo(radius * 0.6, 0);
  ctx.lineTo(0, radius * 0.7);
  ctx.lineTo(-radius * 0.6, 0);
  ctx.closePath();
  ctx.strokeStyle = `${goldColor}88`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Internal geometric facets
  ctx.beginPath();
  ctx.moveTo(-radius * 0.85, 0);
  ctx.lineTo(radius * 0.85, 0);
  ctx.moveTo(0, -radius);
  ctx.lineTo(0, radius);
  ctx.strokeStyle = `${goldColor}55`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Central flame of leadership
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.45);
  ctx.bezierCurveTo(radius * 0.18, -radius * 0.2, radius * 0.15, radius * 0.2, 0, radius * 0.35);
  ctx.bezierCurveTo(-radius * 0.15, radius * 0.2, -radius * 0.18, -radius * 0.2, 0, -radius * 0.45);
  ctx.fillStyle = goldColor;
  ctx.fill();

  ctx.restore();
}

/**
 * 20. Modern Line Art Diya
 * Continuous swooping line art with minimalist modern flame and crescent cradle.
 */
export function drawModernDiya(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  _primaryColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Minimalist crescent bowl
  ctx.beginPath();
  ctx.arc(0, radius * 0.1, radius * 0.6, 0.15 * Math.PI, 0.85 * Math.PI, false);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Upper rim line
  ctx.beginPath();
  ctx.moveTo(-radius * 0.55, radius * 0.35);
  ctx.quadraticCurveTo(0, radius * 0.25, radius * 0.55, radius * 0.35);
  ctx.strokeStyle = `${goldColor}88`;
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Stylized continuous line flame
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.65);
  ctx.bezierCurveTo(radius * 0.3, -radius * 0.35, radius * 0.2, radius * 0.1, 0, radius * 0.2);
  ctx.bezierCurveTo(-radius * 0.2, radius * 0.1, -radius * 0.3, -radius * 0.35, 0, -radius * 0.65);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Glowing center dot
  ctx.beginPath();
  ctx.arc(0, -radius * 0.15, radius * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = goldColor;
  ctx.fill();

  ctx.restore();
}

/**
 * 21. Marigold Toran Garland Motif
 * Festive arch of fresh marigold blooms with sacred mango leaves.
 */
export function drawMarigoldToranMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string,
  accentColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Swag string curve
  ctx.beginPath();
  ctx.moveTo(-radius * 0.9, -radius * 0.3);
  ctx.quadraticCurveTo(0, radius * 0.45, radius * 0.9, -radius * 0.3);
  ctx.strokeStyle = `${goldColor}88`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 7 Marigold blossoms along the curve
  const flowerCount = 7;
  for (let i = 0; i < flowerCount; i++) {
    const t = i / (flowerCount - 1);
    const fx = -radius * 0.9 + t * radius * 1.8;
    const fy = -radius * 0.3 + Math.sin(t * Math.PI) * radius * 0.75;

    // Ruffled marigold blossom
    ctx.beginPath();
    ctx.arc(fx, fy, radius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#F59E0B' : accentColor;
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Flower center core
    ctx.beginPath();
    ctx.arc(fx, fy, radius * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = '#78350F';
    ctx.fill();
  }

  ctx.restore();
}

/**
 * 22. Festive Sweets Thali Motif (Kaju Katli & Modak)
 * Royal brass thali presenting festival treats with silver foil.
 */
export function drawFestiveSweetsMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string,
  accentColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer brass platter (Thali)
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.85, 0, Math.PI * 2);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.78, 0, Math.PI * 2);
  ctx.strokeStyle = `${goldColor}66`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // 4 Silver Diamond Kaju Katli slices
  const sweetCount = 4;
  for (let i = 0; i < sweetCount; i++) {
    const angle = (Math.PI * 2 * i) / sweetCount + Math.PI / 4;
    const sx = Math.cos(angle) * radius * 0.38;
    const sy = Math.sin(angle) * radius * 0.38;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.16);
    ctx.lineTo(radius * 0.12, 0);
    ctx.lineTo(0, radius * 0.16);
    ctx.lineTo(-radius * 0.12, 0);
    ctx.closePath();
    ctx.fillStyle = '#F8FAFC'; // Silver-sheen sweet
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  // Center golden Modak / Diya
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.16, 0, Math.PI * 2);
  ctx.fillStyle = accentColor;
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.restore();
}

/**
 * 23. Swirling Celestial Galaxy Deepam
 * Cosmic spiral of golden stars, crescent moon, and floating celestial flame.
 */
export function drawCelestialGalaxy(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string,
  _accentColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Swirling galaxy orbital rings
  for (let i = 0; i < 3; i++) {
    const rot = (i * Math.PI) / 3;
    ctx.save();
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.9, radius * 0.35, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `${goldColor}33`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  // Crescent Moon
  ctx.save();
  ctx.beginPath();
  ctx.arc(-radius * 0.1, -radius * 0.1, radius * 0.45, 0.2 * Math.PI, 1.8 * Math.PI, false);
  ctx.arc(-radius * 0.25, -radius * 0.1, radius * 0.4, 1.7 * Math.PI, 0.3 * Math.PI, true);
  ctx.fillStyle = `${goldColor}55`;
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Central celestial diya
  drawDiya(ctx, 0, radius * 0.12, radius * 0.55, '#1A0B2E', goldColor, true);

  ctx.restore();
}
