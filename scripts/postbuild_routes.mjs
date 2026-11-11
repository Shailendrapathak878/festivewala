/**
 * FestiveWala Post-Build Route Prerender & 404 Generator
 * Domain: https://festivewala.in
 *
 * 1. Builds a temporary Vite SSR bundle of src/entry-server.tsx and prerenders all
 *    valid canonical routes using React 19 prerenderToNodeStream.
 * 2. Writes route-specific HTML (distinct <title>, <meta>, <link rel="canonical">,
 *    JSON-LD structured data, and full rendered body inside #root) so crawlers,
 *    No-JS clients, and Cloudflare Pages edge CDN serve HTTP 200 content directly.
 * 3. Preserves inline GA4 script hashes verbatim for public/_headers CSP compliance.
 * 4. Generates dist/404.html containing pre-rendered Custom404 UI and noindex directive.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { build as viteBuild } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrTempDir = path.join(rootDir, '.ssr-tmp');

const routeManifest = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'config', 'routeManifest.json'), 'utf8')
);

const VALID_STATIC_ROUTES = [
  ...routeManifest.staticExact
    .filter((route) => route !== '/')
    .map((route) => route.replace(/^\//, '')),
  ...routeManifest.festivalDetailIds.map((id) => `festivals/${id}`),
  ...Object.entries(routeManifest.festivalHubSections).flatMap(([section, slugs]) =>
    slugs.map((slug) => `${section}/${slug}`)
  ),
  ...routeManifest.guideSlugs.map((slug) => `festival-guides/${slug}`),
];

const WISHES_CATEGORY_QUERIES = routeManifest.wishesCategoryQueries;

function escapeHtmlAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertMetaTag(html, attrName, attrValue, content) {
  const safeContent = escapeHtmlAttr(content);
  const pattern = new RegExp(`<meta\\s+[^>]*${attrName}="${attrValue}"[^>]*\\/?>`, 'i');
  const tag = `<meta ${attrName}="${attrValue}" content="${safeContent}" />`;
  if (pattern.test(html)) {
    return html.replace(pattern, () => tag);
  }
  return html.replace('</head>', () => `    ${tag}\n  </head>`);
}

function injectPrerenderedPage(baseHtml, routePath, renderResult) {
  const { html: bodyHtml, seo } = renderResult;
  let pageHtml = baseHtml;

  // Remove fallback <noscript> block in prerendered HTML because #root already holds full content
  pageHtml = pageHtml.replace(/<noscript>[\s\S]*?<\/noscript>\s*/i, () => '');

  if (seo) {
    if (seo.title) {
      pageHtml = pageHtml.replace(
        /<title>[\s\S]*?<\/title>/i,
        () => `<title>${escapeHtmlText(seo.title)}</title>`
      );
      pageHtml = upsertMetaTag(pageHtml, 'name', 'title', seo.title);
      pageHtml = upsertMetaTag(pageHtml, 'property', 'og:title', seo.title);
      pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:title', seo.title);
    }

    if (seo.description) {
      pageHtml = upsertMetaTag(pageHtml, 'name', 'description', seo.description);
      pageHtml = upsertMetaTag(pageHtml, 'property', 'og:description', seo.description);
      pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:description', seo.description);
    }

    if (seo.keywords) {
      pageHtml = upsertMetaTag(pageHtml, 'name', 'keywords', seo.keywords);
    }

    pageHtml = upsertMetaTag(pageHtml, 'name', 'author', 'Shailendra Pathak — FestiveWala');

    const fallbackCanonical =
      routePath === '/' ? 'https://festivewala.in/' : `https://festivewala.in${routePath}`;
    const canonical = seo.canonicalUrl || fallbackCanonical;

    if (seo.noindex) {
      pageHtml = upsertMetaTag(pageHtml, 'name', 'robots', 'noindex, nofollow');
      pageHtml = pageHtml.replace(/<link\s+rel="canonical"[^>]*\/?>\s*/gi, () => '');
    } else {
      pageHtml = upsertMetaTag(pageHtml, 'name', 'robots', 'index, follow');
      // Guarantee a single authoritative canonical tag
      pageHtml = pageHtml.replace(/<link\s+rel="canonical"[^>]*\/?>\s*/gi, () => '');
      pageHtml = pageHtml.replace(
        '</head>',
        () => `    <link rel="canonical" href="${escapeHtmlAttr(canonical)}" />\n  </head>`
      );
      pageHtml = upsertMetaTag(pageHtml, 'property', 'og:url', canonical);
    }

    if (seo.ogType) {
      pageHtml = upsertMetaTag(pageHtml, 'property', 'og:type', seo.ogType);
    }
    if (seo.ogImage) {
      pageHtml = upsertMetaTag(pageHtml, 'property', 'og:image', seo.ogImage);
      pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:image', seo.ogImage);
    }

    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:locale', seo.lang === 'hi' ? 'hi_IN' : 'en_IN');

    // Remove any previously injected dynamic #seo-jsonld block cleanly before adding current route's JSON-LD
    pageHtml = pageHtml.replace(/<script\s+id="seo-jsonld"[^>]*>[\s\S]*?<\/script>\s*/gi, () => '');
    if (seo.jsonLd && !seo.noindex) {
      const safeJsonLd = JSON.stringify(seo.jsonLd).replace(/<\/script/gi, '<\\/script');
      pageHtml = pageHtml.replace(
        '</head>',
        () => `    <script id="seo-jsonld" type="application/ld+json">${safeJsonLd}</script>\n  </head>`
      );
    }
  }

  pageHtml = pageHtml.replace(
    '<div id="root"></div>',
    () => `<div id="root">${bodyHtml}</div>`
  );

  return pageHtml;
}

export async function runPostBuild() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('[PostBuild Error] dist/index.html not found. Run vite build first.');
  }

  const baseIndexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. Build temporary Vite SSR module bundle
  console.log('[PostBuild] Building temporary SSR renderer...');
  await viteBuild({
    root: rootDir,
    logLevel: 'warn',
    build: {
      ssr: path.join(rootDir, 'src', 'entry-server.tsx'),
      outDir: ssrTempDir,
      emptyOutDir: true,
      write: true,
    },
  });

  let generatedCount = 0;
  try {
    const ssrEntryFile = fs
      .readdirSync(ssrTempDir)
      .find((file) => /^entry-server\.(m?js|cjs)$/.test(file));
    if (!ssrEntryFile) {
      throw new Error('[PostBuild Error] entry-server bundle not found in .ssr-tmp');
    }

    const ssrModule = await import(pathToFileURL(path.join(ssrTempDir, ssrEntryFile)).href);
    const renderRoute = ssrModule.renderRoute;

    // 2. Prerender root '/', every static sub-route, and indexed Wishes category query pages into dist/
    const allTargets = [
      { routePath: '/', outputFile: indexHtmlPath },
      ...VALID_STATIC_ROUTES.map((route) => ({
        routePath: `/${route}/`,
        outputFile: path.join(distDir, route, 'index.html'),
      })),
      ...WISHES_CATEGORY_QUERIES.map((category) => ({
        routePath: `/wishes/?category=${category}`,
        outputFile: path.join(distDir, '_categories', `wishes-${category}.html`),
      })),
    ];

    for (const target of allTargets) {
      const rendered = await renderRoute(target.routePath);
      if (!rendered?.html || rendered.html.trim().length < 200) {
        throw new Error(`[PostBuild Error] Prerendered HTML too small for ${target.routePath}`);
      }
      const outDir = path.dirname(target.outputFile);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      const finalHtml = injectPrerenderedPage(baseIndexHtml, target.routePath, rendered);
      fs.writeFileSync(target.outputFile, finalHtml, 'utf8');
      generatedCount++;
    }
  } finally {
    fs.rmSync(ssrTempDir, { recursive: true, force: true });
  }

  console.log(
    `[PostBuild] Prerendered ${generatedCount} static HTML pages in dist/ (46 path routes + ${WISHES_CATEGORY_QUERIES.length} indexed query routes)`
  );

  // 3. Generate dist/404.html with pre-rendered Custom404 UI and noindex
  let notFoundHtml = baseIndexHtml.replace(/<noscript>[\s\S]*?<\/noscript>\s*/i, () => '');

  notFoundHtml = notFoundHtml.replace(
    /<title>.*?<\/title>/i,
    () => '<title>Page Not Found (404) | FestiveWala</title>'
  );

  if (notFoundHtml.includes('name="robots"')) {
    notFoundHtml = notFoundHtml.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      () => '<meta name="robots" content="noindex, nofollow" />'
    );
  } else {
    notFoundHtml = notFoundHtml.replace(
      '</head>',
      () => '    <meta name="robots" content="noindex, nofollow" />\n  </head>'
    );
  }

  notFoundHtml = notFoundHtml.replace(/<link\s+rel="canonical"[^>]*\/?>\s*/gi, () => '');

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
    () => `<div id="root">${custom404Markup}</div>`
  );

  const dist404Path = path.join(distDir, '404.html');
  fs.writeFileSync(dist404Path, notFoundHtml, 'utf8');

  console.log('[PostBuild] Successfully created dist/404.html with genuine 404 pre-rendering.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPostBuild().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
