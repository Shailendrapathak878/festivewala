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
  { loc: `${BASE_URL}/festivals`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/greeting-cards`, priority: '0.9', changefreq: 'weekly' },
  
  // Dedicated Festival Hubs
  { loc: `${BASE_URL}/festivals/dhanteras`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/diwali`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/holi`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/raksha-bandhan`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/christmas`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festivals/new-year`, priority: '0.9', changefreq: 'weekly' },

  // Festival-Specific Hubs
  { loc: `${BASE_URL}/greetings/dhanteras`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/greetings/diwali`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/dhanteras`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/wishes/diwali`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/photo-greetings/dhanteras`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/photo-greetings/diwali`, priority: '0.9', changefreq: 'weekly' },

  // Inspiration & Creative Galleries
  { loc: `${BASE_URL}/rangoli`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/decoration-ideas`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/gift-ideas`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE_URL}/festival-guides`, priority: '0.8', changefreq: 'weekly' },

  // In-Depth Cultural & How-To Guides
  { loc: `${BASE_URL}/festival-guides/diwali-five-days-significance`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/eco-friendly-festival-guide`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/holi-herbal-colors-safety`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE_URL}/festival-guides/festival-home-cleaning-declutter`, priority: '0.7', changefreq: 'monthly' },

  // Trust, E-E-A-T & Legal Pages
  { loc: `${BASE_URL}/about`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${BASE_URL}/contact`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${BASE_URL}/privacy-policy`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${BASE_URL}/terms-of-service`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${BASE_URL}/disclaimer`, priority: '0.3', changefreq: 'yearly' },
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

const sitemapContent = generateSitemapXML(SITEMAP_ENTRIES);
const targetPath = path.join(rootDir, 'public', 'sitemap.xml');

fs.writeFileSync(targetPath, sitemapContent, 'utf8');
console.log(`[FestiveWala SEO] Successfully generated public/sitemap.xml with ${SITEMAP_ENTRIES.length} canonical URLs.`);

