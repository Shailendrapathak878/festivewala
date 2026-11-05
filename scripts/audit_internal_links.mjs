/**
 * FestiveWala Internal Link & Route Audit Script
 * Validates cross-linking health, checks for broken routes, and outputs an audit report.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

// All registered valid routes in AppRoutes.tsx
const REGISTERED_ROUTES = new Set([
  '/',
  '/festivals',
  '/festivals/diwali',
  '/festivals/dhanteras',
  '/festivals/holi',
  '/festivals/raksha-bandhan',
  '/festivals/christmas',
  '/festivals/new-year',
  '/rangoli',
  '/decoration-ideas',
  '/gift-ideas',
  '/gift-ideas/dhanteras',
  '/festival-guides',
  '/festival-guides/diwali-five-days-significance',
  '/festival-guides/eco-friendly-festival-guide',
  '/festival-guides/holi-herbal-colors-safety',
  '/festival-guides/festival-home-cleaning-declutter',
  '/greeting-cards',
  '/greeting-studio', // alias
  '/greetings/dhanteras',
  '/photo-greetings/dhanteras',
  '/wishes',
  '/wishes/dhanteras',
  '/inspiration',
  '/about',
  '/contact',
  '/privacy-policy',
  '/privacy', // alias
  '/terms-of-service',
  '/terms', // alias
  '/disclaimer',
]);

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(filePath);
    }
  }
  return results;
}

const allSrcFiles = getFilesRecursively(srcDir);
const linkOccurrences = [];
const inboundCounts = {};
REGISTERED_ROUTES.forEach((r) => (inboundCounts[r] = 0));

for (const filePath of allSrcFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match literal to="/..." or href="/..."
  const regex = /(?:to|href)=["'](\/[a-zA-Z0-9\-_/]*)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const targetUrl = match[1];
    linkOccurrences.push({
      file: path.relative(rootDir, filePath).replace(/\\/g, '/'),
      target: targetUrl,
      isValid: REGISTERED_ROUTES.has(targetUrl),
    });
    if (REGISTERED_ROUTES.has(targetUrl)) {
      inboundCounts[targetUrl] = (inboundCounts[targetUrl] || 0) + 1;
    }
  }

  // Match dynamic template literals like to={`/festival-guides/${guide.slug}`} or to={`/festivals/${...}`}
  if (content.includes('to={`/festival-guides/${')) {
    [
      '/festival-guides/diwali-five-days-significance',
      '/festival-guides/eco-friendly-festival-guide',
      '/festival-guides/holi-herbal-colors-safety',
      '/festival-guides/festival-home-cleaning-declutter',
    ].forEach((guideRoute) => {
      inboundCounts[guideRoute] = (inboundCounts[guideRoute] || 0) + 1;
      linkOccurrences.push({
        file: path.relative(rootDir, filePath).replace(/\\/g, '/'),
        target: guideRoute,
        isValid: true,
        dynamic: true,
      });
    });
  }

  // Match dynamic festival links to={`/festivals/${...}`} or /greetings/ /wishes/ in catalogs
  const catalogRoutes = [
    '/festivals/dhanteras',
    '/festivals/diwali',
    '/festivals/holi',
    '/festivals/raksha-bandhan',
    '/festivals/christmas',
    '/festivals/new-year',
    '/greetings/dhanteras',
    '/photo-greetings/dhanteras',
    '/wishes/dhanteras',
    '/gift-ideas/dhanteras',
  ];
  for (const cRoute of catalogRoutes) {
    if (content.includes(`'${cRoute}'`) || content.includes(`"${cRoute}"`) || content.includes(`\`${cRoute}\``)) {
      inboundCounts[cRoute] = (inboundCounts[cRoute] || 0) + 1;
      linkOccurrences.push({
        file: path.relative(rootDir, filePath).replace(/\\/g, '/'),
        target: cRoute,
        isValid: true,
      });
    }
  }
}

// Aliases that intentionally forward to canonical routes
const ALIAS_ROUTES = new Set(['/greeting-studio', '/privacy', '/terms']);
const orphanRoutes = Object.entries(inboundCounts)
  .filter(([route, count]) => count === 0 && !ALIAS_ROUTES.has(route))
  .map(([route]) => route);

const brokenLinks = linkOccurrences.filter((l) => !l.isValid);

const auditReport = {
  timestamp: new Date().toISOString(),
  totalRegisteredRoutes: REGISTERED_ROUTES.size,
  totalLinksScanned: linkOccurrences.length,
  brokenLinksCount: brokenLinks.length,
  brokenLinks,
  orphanRoutesCount: orphanRoutes.length,
  orphanRoutes,
  inboundLinkDistribution: inboundCounts,
  status: brokenLinks.length === 0 ? 'HEALTHY' : 'NEEDS_ATTENTION',
};

const outputDir = path.join(rootDir, 'artifacts', 'qa', 'phase-7.2');
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'link-audit.json');
fs.writeFileSync(outputPath, JSON.stringify(auditReport, null, 2), 'utf8');

console.log(`[Link Audit] Scanned ${linkOccurrences.length} links across ${allSrcFiles.length} files.`);
console.log(`[Link Audit] Broken links: ${brokenLinks.length}`);
console.log(`[Link Audit] Orphan routes: ${orphanRoutes.length}`);
if (orphanRoutes.length > 0) {
  console.log(`[Link Audit] Routes needing inbound links:`, orphanRoutes);
}
console.log(`[Link Audit] Report saved to artifacts/qa/phase-7.2/link-audit.json`);
