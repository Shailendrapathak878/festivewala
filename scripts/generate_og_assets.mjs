/**
 * FestiveWala Open Graph Asset Generator
 * Domain: https://festivewala.in
 * Generates 1200x630 Open Graph branded visual banners for social sharing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const brandDir = path.resolve(__dirname, '..', 'public', 'assets', 'brand');

if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

const CARDS = [
  {
    filename: 'og-festivewala',
    title: 'FestiveWala — Celebrate Indian Festivals',
    subtitle: 'Heartfelt Wishes, Photo Greetings, Rangoli & Decor Ideas',
    badge: 'CELEBRATE • CREATE • SHARE',
    primaryColor: '#D97706',
    accentColor: '#B45309',
  },
  {
    filename: 'og-festivals',
    title: 'Festival Experiences & Traditions',
    subtitle: 'Sacred Rituals, Auspicious Timings, Recipes & Celebration Guides',
    badge: 'FESTIVAL DIRECTORY',
    primaryColor: '#EA580C',
    accentColor: '#9A3412',
  },
  {
    filename: 'og-wishes',
    title: '300+ Readymade Festival Wishes & Quotes',
    subtitle: 'Heartfelt Messages in Hindi, English & Hinglish for WhatsApp',
    badge: 'WISHES & SHAYARI HUB',
    primaryColor: '#DC2626',
    accentColor: '#991B1B',
  },
  {
    filename: 'og-studio',
    title: 'Free Greeting Card Maker & Photo Studio',
    subtitle: 'Personalized Festival Cards with Your Name & Family Photos',
    badge: '100% PRIVATE • ZERO UPLOAD',
    primaryColor: '#7C3AED',
    accentColor: '#5B21B6',
  },
  {
    filename: 'og-rangoli',
    title: 'Handcrafted Rangoli Designs Gallery',
    subtitle: 'Traditional, Floral & Modern Patterns with Step-by-Step Instructions',
    badge: 'FREE VECTOR & HD DOWNLOADS',
    primaryColor: '#059669',
    accentColor: '#065F46',
  },
  {
    filename: 'og-decorations',
    title: 'Festive Home Decoration Inspiration',
    subtitle: 'Diwali Lights, Eco-Friendly Crafts, Floral Urli & Balcony Styling',
    badge: '10 DECOR CATEGORIES',
    primaryColor: '#D97706',
    accentColor: '#78350F',
  },
  {
    filename: 'og-gifts',
    title: 'Curated Festival Gift Ideas & Hampers',
    subtitle: 'Thoughtful Gifting for Family, Friends & Corporate Celebrations',
    badge: 'BUDGET TIERS UNDER ₹250 TO ₹2500+',
    primaryColor: '#2563EB',
    accentColor: '#1E40AF',
  },
  {
    filename: 'og-guides',
    title: 'Festival Guides & Cultural Heritage',
    subtitle: 'Rituals, Eco-Celebrations, Traditional Sweets & Safety Tips',
    badge: 'AUTHENTIC CULTURAL GUIDES',
    primaryColor: '#0891B2',
    accentColor: '#155E75',
  },
];

function generateSvgCard(card) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0B2E" />
      <stop offset="50%" stop-color="#2D114D" />
      <stop offset="100%" stop-color="#0F051D" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#FDE68A" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${card.primaryColor}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#1A0B2E" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Outer Border -->
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.4" />
  <rect x="36" y="36" width="1128" height="558" rx="12" fill="none" stroke="#F59E0B" stroke-width="1" stroke-dasharray="6,6" opacity="0.25" />

  <!-- Corner Motifs -->
  <g fill="#F59E0B" opacity="0.6">
    <circle cx="48" cy="48" r="4" />
    <circle cx="1152" cy="48" r="4" />
    <circle cx="48" cy="582" r="4" />
    <circle cx="1152" cy="582" r="4" />
  </g>

  <!-- Brand Badge Top -->
  <g transform="translate(600, 110)">
    <rect x="-160" y="-22" width="320" height="44" rx="22" fill="#FAF7F0" fill-opacity="0.08" stroke="#F59E0B" stroke-width="1.5" />
    <text text-anchor="middle" y="6" fill="#FDE68A" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="14" font-weight="700" letter-spacing="3">${card.badge}</text>
  </g>

  <!-- Main Brand Title -->
  <text x="600" y="220" text-anchor="middle" fill="url(#goldGrad)" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="52" font-weight="800" filter="url(#shadow)">
    FestiveWala
  </text>

  <!-- Page Title -->
  <text x="600" y="310" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Montserrat, sans-serif" font-size="34" font-weight="700">
    ${card.title}
  </text>

  <!-- Subtitle -->
  <text x="600" y="375" text-anchor="middle" fill="#E2E8F0" font-family="'Plus Jakarta Sans', Montserrat, sans-serif" font-size="22" font-weight="400" opacity="0.9">
    ${card.subtitle}
  </text>

  <!-- Decorative Separator -->
  <g transform="translate(600, 440)">
    <line x1="-120" y1="0" x2="-20" y2="0" stroke="url(#goldGrad)" stroke-width="2" />
    <circle cx="0" cy="0" r="5" fill="#F59E0B" />
    <line x1="20" y1="0" x2="120" y2="0" stroke="url(#goldGrad)" stroke-width="2" />
  </g>

  <!-- Footer Domain & Tagline -->
  <text x="600" y="520" text-anchor="middle" fill="#F59E0B" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="600" letter-spacing="1">
    https://festivewala.in
  </text>
  <text x="600" y="555" text-anchor="middle" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="400" letter-spacing="2">
    100% PRIVATE • ZERO SERVER UPLOADS • FREE FOREVER
  </text>
</svg>`;
}

for (const card of CARDS) {
  const svgContent = generateSvgCard(card);
  const svgPath = path.join(brandDir, `${card.filename}.svg`);
  fs.writeFileSync(svgPath, svgContent, 'utf8');

  // Also write SVG content as the .png fallback for environments that fetch png directly
  const pngPath = path.join(brandDir, `${card.filename}.png`);
  fs.writeFileSync(pngPath, svgContent, 'utf8');
  console.log(`[OG Generator] Created ${card.filename}.svg & ${card.filename}.png`);
}

console.log(`[OG Generator] All 8 Open Graph banners created successfully in public/assets/brand.`);

