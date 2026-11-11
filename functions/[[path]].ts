/**
 * Cloudflare Pages Function: Edge-level Routing & Genuine HTTP 404 Resolution
 * Domain: https://festivewala.in
 *
 * Runs on Cloudflare Pages (Free Plan compatible).
 * Uses config/routeManifest.json as the single authoritative route source of truth.
 * Ensures:
 * 1. Permanent 301 redirects for legacy aliases (/privacy, /terms, /greeting-studio).
 * 2. Indexed Wishes category query URLs (/wishes/?category=<slug>) serve matching prerendered HTML
 *    with aligned raw HTML <link rel="canonical"> metadata.
 * 3. Valid prerendered routes serve their exact static index.html with HTTP 200.
 * 4. Unsupported/unknown routes NEVER wrap 404.html with HTTP 200; they return genuine HTTP 404
 *    with X-Robots-Tag: noindex, nofollow.
 */

import routeManifest from '../config/routeManifest.json';

interface Env {
  ASSETS: {
    fetch: (request: Request | string | URL) => Promise<Response>;
  };
}

const REDIRECTS: Record<string, string> = routeManifest.redirects;
const VALID_STATIC_EXACT = new Set<string>(routeManifest.staticExact);
const VALID_FESTIVAL_DETAIL_IDS = new Set<string>(routeManifest.festivalDetailIds);
const VALID_FESTIVAL_HUB_SECTIONS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(routeManifest.festivalHubSections).map(([section, slugs]) => [
    section,
    new Set<string>(slugs),
  ])
);
const VALID_GUIDE_SLUGS = new Set<string>(routeManifest.guideSlugs);
const VALID_WISHES_CATEGORY_QUERIES = new Set<string>(routeManifest.wishesCategoryQueries);

function isValidAppRoute(pathname: string): boolean {
  if (VALID_STATIC_EXACT.has(pathname)) {
    return true;
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length !== 2) {
    return false;
  }

  const [section, slug] = segments;
  if (section === 'festivals') {
    return VALID_FESTIVAL_DETAIL_IDS.has(slug);
  }
  if (section === 'festival-guides') {
    return VALID_GUIDE_SLUGS.has(slug);
  }

  const allowedHubSlugs = VALID_FESTIVAL_HUB_SECTIONS[section];
  if (allowedHubSlugs) {
    return allowedHubSlugs.has(slug);
  }

  return false;
}

async function serveNotFound(context: Parameters<PagesFunction<Env>>[0]): Promise<Response> {
  const notFoundRes = await context.env.ASSETS.fetch(new URL('/404.html', context.request.url));
  const newHeaders = new Headers(notFoundRes.headers);
  newHeaders.set('X-Robots-Tag', 'noindex, nofollow');
  newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  return new Response(notFoundRes.body, {
    status: 404,
    statusText: 'Not Found',
    headers: newHeaders,
  });
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

  // 0. Block direct external requests to internal prerender storage
  if (pathname === '/_categories' || pathname.startsWith('/_categories/')) {
    return serveNotFound(context);
  }

  // 1. Handle permanent 301 redirects
  if (REDIRECTS[pathname]) {
    const targetUrl = new URL(REDIRECTS[pathname], context.request.url);
    targetUrl.search = url.search;
    return new Response(null, {
      status: 301,
      statusText: 'Moved Permanently',
      headers: {
        Location: targetUrl.toString(),
      },
    });
  }

  // 2. Serve category-specific prerendered HTML for indexed /wishes/?category=<slug> URLs
  //    before static /wishes/index.html lookup so raw HTML canonical and client canonical match.
  const categoryParam = url.searchParams.get('category')?.toLowerCase();
  if (pathname === '/wishes' && categoryParam && VALID_WISHES_CATEGORY_QUERIES.has(categoryParam)) {
    const categoryAssetRes = await context.env.ASSETS.fetch(
      new URL(`/_categories/wishes-${categoryParam}.html`, context.request.url)
    );
    if (categoryAssetRes.ok && categoryAssetRes.status === 200) {
      return new Response(categoryAssetRes.body, {
        status: 200,
        headers: categoryAssetRes.headers,
      });
    }
  }

  // 3. Fetch static asset from Cloudflare CDN
  const response = await context.next();
  if (response.status !== 404) {
    return response;
  }

  // 4. Check if pathname matches a strictly valid prerendered route
  if (isValidAppRoute(pathname)) {
    const targetAsset = pathname === '/' ? '/index.html' : `${pathname}/index.html`;
    const indexRes = await context.env.ASSETS.fetch(new URL(targetAsset, context.request.url));
    if (indexRes.ok && indexRes.status === 200) {
      return new Response(indexRes.body, {
        status: 200,
        headers: indexRes.headers,
      });
    }
  }

  // 5. Truly unknown or unsupported route: Serve 404.html with genuine HTTP 404 status
  return serveNotFound(context);
};
