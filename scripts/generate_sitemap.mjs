/**
 * FestiveWala XML Sitemap Generator
 * Automatically generates public/sitemap.xml for production indexing.
 * Domain: https://festivewala.in
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://festivewala.in';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const SITEMAP_ENTRIES = [
  // Core Landing Pages
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${BASE_URL}/festivals/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/greeting-cards/`, priority: '0.9', changefreq: 'weekly' },

  // Dedicated Festival Hubs
  { loc: `${BASE_URL}/festivals/dhanteras/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/diwali/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/chhath-puja/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/holi/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/raksha-bandhan/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/christmas/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/new-year/`, priority: '0.9', changefreq: 'weekly' },

  // Festival Greetings, Wishes & Photo Hubs
  { loc: `${BASE_URL}/greetings/dhanteras/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/greetings/diwali/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/greetings/chhath-puja/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/dhanteras/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/diwali/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/chhath-puja/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/photo-greetings/dhanteras/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/photo-greetings/diwali/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/photo-greetings/chhath-puja/`, priority: '0.9', changefreq: 'weekly' },

  // Wishes Category Hubs (SEO Step 3.4)
  { loc: `${BASE_URL}/wishes/?category=birthday`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/?category=anniversary`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/?category=love`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/?category=friendship`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/?category=good-morning`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/?category=good-night`, priority: '0.8', changefreq: 'weekly' },

  // Cultural Inspiration & Experiences
  { loc: `${BASE_URL}/inspiration/`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/rangoli/`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/decoration-ideas/`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/gift-ideas/`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festival-guides/`, priority: '0.8', changefreq: 'weekly' },

  // Festival Guide Deep-Links
  { loc: `${BASE_URL}/festival-guides/diwali-five-days-significance/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/eco-friendly-festival-guide/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/holi-herbal-colors-safety/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/festival-home-cleaning-declutter/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/chhath-puja-four-day-rituals-guide/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/chhath-nahay-khay-kharna-meaning-rules/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/sandhya-usha-arghya-significance-chhath/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/chhath-puja-samagri-soop-daura-checklist/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/authentic-chhath-prasad-thekua-rasiyaw-recipes/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/surya-dev-chhathi-maiya-history-mythology/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/eco-friendly-chhath-terrace-kund-guide/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/regional-chhath-puja-traditions-india-nepal/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/chhath-puja-folk-songs-cultural-meaning/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/chhath-36-hour-nirjala-vrat-rules-health-care/`, priority: '0.7', changefreq: 'monthly' },

  // Trust & Legal Routes
  { loc: `${BASE_URL}/about/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${BASE_URL}/contact/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${BASE_URL}/privacy-policy/`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${BASE_URL}/terms-of-service/`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${BASE_URL}/disclaimer/`, priority: '0.3', changefreq: 'yearly' },
];

function generateSitemapXML(entries) {
  const urlNodes = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod || CURRENT_DATE}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>
`;
}

const routeManifest = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'config', 'routeManifest.json'), 'utf8')
);

function assertSitemapAlignedWithManifest(entries, manifest) {
  const allowedPaths = new Set([
    ...manifest.staticExact.map((r) => (r === '/' ? '/' : `${r}/`)),
    ...manifest.festivalDetailIds.map((id) => `/festivals/${id}/`),
    ...Object.entries(manifest.festivalHubSections).flatMap(([section, slugs]) =>
      slugs.map((slug) => `/${section}/${slug}/`)
    ),
    ...manifest.guideSlugs.map((slug) => `/festival-guides/${slug}/`),
    ...manifest.wishesCategoryQueries.map((cat) => `/wishes/?category=${cat}`),
  ]);

  for (const entry of entries) {
    const parsed = new URL(entry.loc);
    const key = parsed.pathname + parsed.search;
    if (!allowedPaths.has(key)) {
      throw new Error(
        `[FestiveWala SEO Error] Sitemap URL "${entry.loc}" is missing from config/routeManifest.json`
      );
    }
  }
}

assertSitemapAlignedWithManifest(SITEMAP_ENTRIES, routeManifest);

const sitemapContent = generateSitemapXML(SITEMAP_ENTRIES);
const targetPath = path.join(rootDir, 'public', 'sitemap.xml');

fs.writeFileSync(targetPath, sitemapContent, 'utf8');
console.log(`[FestiveWala SEO] Successfully generated public/sitemap.xml with ${SITEMAP_ENTRIES.length} canonical URLs.`);
