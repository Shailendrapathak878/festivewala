/**
 * Cloudflare Pages Function: Edge-level Routing & Genuine HTTP 404 Resolution
 * Domain: https://festivewala.in
 *
 * Runs on Cloudflare Pages (Free Plan compatible).
 * Ensures:
 * 1. Valid routes serve /index.html with HTTP 200.
 * 2. Permanent 301 redirects for legacy aliases (/privacy, /terms, /greeting-studio).
 * 3. Invalid / unknown routes (including unknown sub-routes like /festivals/unknown)
 *    serve /404.html with genuine HTTP 404 and X-Robots-Tag: noindex, nofollow.
 */

interface Env {
  ASSETS: {
    fetch: (request: Request | string | URL) => Promise<Response>;
  };
}

const REDIRECTS: Record<string, string> = {
  '/privacy': '/privacy-policy',
  '/terms': '/terms-of-service',
  '/greeting-studio': '/greeting-cards',
};

const VALID_STATIC_EXACT = new Set([
  '/',
  '/festivals',
  '/wishes',
  '/greeting-cards',
  '/inspiration',
  '/rangoli',
  '/decoration-ideas',
  '/gift-ideas',
  '/festival-guides',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
]);

const VALID_FESTIVAL_DETAIL_IDS = new Set([
  'dhanteras',
  'diwali',
  'chhath-puja',
  'holi',
  'raksha-bandhan',
  'christmas',
  'new-year',
]);

const VALID_FESTIVAL_HUB_IDS = new Set([
  'dhanteras',
  'diwali',
  'chhath-puja',
  'christmas',
  'new-year',
  'makar-sankranti',
  'maha-shivratri',
  'holi',
  'raksha-bandhan',
  'navratri',
]);

const VALID_GUIDE_SLUGS = new Set([
  'diwali-five-days-significance',
  'eco-friendly-festival-guide',
  'holi-herbal-colors-safety',
  'festival-home-cleaning-declutter',
  'chhath-puja-four-day-rituals-guide',
  'chhath-nahay-khay-kharna-meaning-rules',
  'sandhya-usha-arghya-significance-chhath',
  'chhath-puja-samagri-soop-daura-checklist',
  'authentic-chhath-prasad-thekua-rasiyaw-recipes',
  'surya-dev-chhathi-maiya-history-mythology',
  'eco-friendly-chhath-terrace-kund-guide',
  'regional-chhath-puja-traditions-india-nepal',
  'chhath-puja-folk-songs-cultural-meaning',
  'chhath-36-hour-nirjala-vrat-rules-health-care',
]);

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
  if (
    section === 'wishes' ||
    section === 'greetings' ||
    section === 'photo-greetings' ||
    section === 'gift-ideas'
  ) {
    return VALID_FESTIVAL_HUB_IDS.has(slug);
  }

  return false;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

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

  // 2. Fetch static asset from Cloudflare CDN
  const response = await context.next();
  if (response.status !== 404) {
    return response;
  }

  // 3. Check if pathname matches a strictly valid SPA route
  if (isValidAppRoute(pathname)) {
    // Serve index.html with 200 OK so client-side React Router mounts
    const indexRes = await context.env.ASSETS.fetch(new URL('/index.html', context.request.url));
    return new Response(indexRes.body, {
      status: 200,
      headers: indexRes.headers,
    });
  }

  // 4. Truly unknown route: Serve 404.html with genuine HTTP 404 status
  const notFoundRes = await context.env.ASSETS.fetch(new URL('/404.html', context.request.url));
  const newHeaders = new Headers(notFoundRes.headers);
  newHeaders.set('X-Robots-Tag', 'noindex, nofollow');
  newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  return new Response(notFoundRes.body, {
    status: 404,
    statusText: 'Not Found',
    headers: newHeaders,
  });
};
