/**
 * FestiveWala Post-Build Route Entrypoint & 404 Generator
 * Domain: https://festivewala.in
 *
 * 1. Generates static entrypoint directory index.html files for all valid routes so
 *    Cloudflare Pages and static CDNs serve them with HTTP 200 without SPA catch-all overhead.
 * 2. Generates dist/404.html containing pre-rendered Custom404 UI,
 *    noindex robots directive, and removed canonical tag so unknown routes return genuine HTTP 404.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const VALID_STATIC_ROUTES = [
  // Core routes
  'festivals',
  'wishes',
  'greeting-cards',
  'inspiration',
  'rangoli',
  'decoration-ideas',
  'gift-ideas',
  'festival-guides',

  // Festivals (Strictly the 7 festival detail routes present in FESTIVAL_DETAILS)
  'festivals/dhanteras',
  'festivals/diwali',
  'festivals/chhath-puja',
  'festivals/holi',
  'festivals/raksha-bandhan',
  'festivals/christmas',
  'festivals/new-year',

  // Greetings & Wishes festival hubs
  'greetings/dhanteras',
  'greetings/diwali',
  'greetings/chhath-puja',
  'photo-greetings/dhanteras',
  'photo-greetings/diwali',
  'photo-greetings/chhath-puja',
  'wishes/dhanteras',
  'wishes/diwali',
  'wishes/chhath-puja',
  'gift-ideas/dhanteras',
  'gift-ideas/diwali',

  // Festival Guides
  'festival-guides/diwali-five-days-significance',
  'festival-guides/eco-friendly-festival-guide',
  'festival-guides/holi-herbal-colors-safety',
  'festival-guides/festival-home-cleaning-declutter',
  'festival-guides/chhath-puja-four-day-rituals-guide',
  'festival-guides/chhath-nahay-khay-kharna-meaning-rules',
  'festival-guides/sandhya-usha-arghya-significance-chhath',
  'festival-guides/chhath-puja-samagri-soop-daura-checklist',
  'festival-guides/authentic-chhath-prasad-thekua-rasiyaw-recipes',
  'festival-guides/surya-dev-chhathi-maiya-history-mythology',
  'festival-guides/eco-friendly-chhath-terrace-kund-guide',
  'festival-guides/regional-chhath-puja-traditions-india-nepal',
  'festival-guides/chhath-puja-folk-songs-cultural-meaning',
  'festival-guides/chhath-36-hour-nirjala-vrat-rules-health-care',

  // Trust & Legal Pages
  'about',
  'contact',
  'privacy-policy',
  'terms-of-service',
  'disclaimer',
];

export function runPostBuild() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('[PostBuild Error] dist/index.html not found. Run vite build first.');
    return;
  }

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. Generate static entrypoints for each valid route
  let generatedCount = 0;
  for (const route of VALID_STATIC_ROUTES) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const targetHtmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(targetHtmlPath, indexHtml, 'utf8');
    generatedCount++;
  }
  console.log(`[PostBuild] Generated ${generatedCount} static entrypoints in dist/`);

  // 2. Generate dist/404.html with pre-rendered Custom404 UI and noindex
  let notFoundHtml = indexHtml;

  // Replace Title
  notFoundHtml = notFoundHtml.replace(
    /<title>.*?<\/title>/i,
    '<title>Page Not Found (404) | FestiveWala</title>'
  );

  // Inject or replace robots meta with noindex, nofollow
  if (notFoundHtml.includes('name="robots"')) {
    notFoundHtml = notFoundHtml.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      '<meta name="robots" content="noindex, nofollow" />'
    );
  } else {
    notFoundHtml = notFoundHtml.replace(
      '</head>',
      '    <meta name="robots" content="noindex, nofollow" />\n  </head>'
    );
  }

  // Remove any canonical URL tag
  notFoundHtml = notFoundHtml.replace(/<link\s+rel="canonical"[^>]*\/?>\s*/gi, '');

  // Pre-rendered Custom404 HTML inside #root for instantaneous zero-JS and crawler rendering
  const custom404Markup = `<div class="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div class="max-w-md mx-auto space-y-6">
        <div class="relative w-24 h-24 mx-auto flex items-center justify-center">
          <svg viewBox="0 0 100 100" fill="none" class="w-full h-full text-brand-gold">
            <circle cx="50" cy="50" r="46" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" />
            <path d="M25 65C25 40 36 24 50 16C64 24 75 40 75 65" stroke="#D4AF37" stroke-width="1.5" />
            <circle cx="50" cy="50" r="8" fill="#F2D98B" opacity="0.8" />
          </svg>
        </div>
        <div class="space-y-2">
          <span class="text-xs uppercase tracking-widest-luxury font-bold text-brand-gold">404</span>
          <h1 class="font-display text-3xl sm:text-4xl font-bold text-brand-deep">Path Not Found</h1>
          <p class="font-sans text-sm sm:text-base text-brand-muted leading-relaxed">Sorry, the celebration or page you are looking for does not exist or has been moved.</p>
        </div>
        <div class="pt-2">
          <a href="/" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-md bg-brand-deep text-brand-cream hover:bg-brand-deep/90">
            Return to Celebrations
          </a>
        </div>
      </div>
    </div>`;

  notFoundHtml = notFoundHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${custom404Markup}</div>`
  );

  const dist404Path = path.join(distDir, '404.html');
  fs.writeFileSync(dist404Path, notFoundHtml, 'utf8');

  console.log('[PostBuild] Successfully created dist/404.html with genuine 404 pre-rendering.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPostBuild();
}
