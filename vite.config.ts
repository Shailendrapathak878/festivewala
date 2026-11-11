import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

interface RouteManifest {
  redirects: Record<string, string>;
  staticExact: string[];
  festivalDetailIds: string[];
  festivalHubSections: Record<string, string[]>;
  guideSlugs: string[];
  wishesCategoryQueries: string[];
}

const routeManifest: RouteManifest = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'config', 'routeManifest.json'), 'utf8')
);

const VALID_ROUTES = new Set<string>(routeManifest.staticExact);
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
  if (VALID_ROUTES.has(pathname)) {
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

function sendNotFound(res: { writeHead: (status: number, headers: Record<string, string>) => void; end: (body?: string) => void }): boolean {
  const notFoundPath = path.resolve(process.cwd(), 'dist', '404.html');
  if (!fs.existsSync(notFoundPath)) {
    return false;
  }
  const html = fs.readFileSync(notFoundPath, 'utf8');
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Robots-Tag': 'noindex, nofollow',
  });
  res.end(html);
  return true;
}

function spaEdgeRoutingPlugin(): Plugin {
  return {
    name: 'spa-edge-routing',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlStr = req.url || '/';
        const parsedUrl = new URL(urlStr, 'http://localhost');
        const pathname = parsedUrl.pathname.replace(/\/$/, '') || '/';

        // 0. Block direct external requests to internal prerender storage
        if (pathname === '/_categories' || pathname.startsWith('/_categories/')) {
          if (sendNotFound(res)) return;
        }

        // 1. Authoritative 301 redirects for legacy aliases
        const redirects = routeManifest.redirects;
        if (redirects[pathname]) {
          res.writeHead(301, {
            Location: redirects[pathname] + parsedUrl.search,
          });
          res.end();
          return;
        }

        // 2. Allow static files, assets, and scripts to pass through
        if (pathname.includes('.') || pathname.startsWith('/assets/')) {
          return next();
        }

        // 3. Serve category-specific prerendered HTML for indexed /wishes/?category=<slug> URLs
        const categoryParam = parsedUrl.searchParams.get('category')?.toLowerCase();
        if (pathname === '/wishes' && categoryParam && VALID_WISHES_CATEGORY_QUERIES.has(categoryParam)) {
          const categoryHtmlPath = path.resolve(
            process.cwd(),
            'dist',
            '_categories',
            `wishes-${categoryParam}.html`
          );
          if (fs.existsSync(categoryHtmlPath)) {
            const html = fs.readFileSync(categoryHtmlPath, 'utf8');
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
            });
            res.end(html);
            return;
          }
        }

        // 4. Strictly check known valid routes
        if (!isValidAppRoute(pathname)) {
          if (sendNotFound(res)) return;
        } else {
          // Serve route-specific prerendered HTML with 200 OK cleanly
          const routeHtmlPath =
            pathname === '/'
              ? path.resolve(process.cwd(), 'dist', 'index.html')
              : path.resolve(process.cwd(), 'dist', pathname.replace(/^\//, ''), 'index.html');
          if (fs.existsSync(routeHtmlPath)) {
            const html = fs.readFileSync(routeHtmlPath, 'utf8');
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
            });
            res.end(html);
            return;
          }
          // Fail closed with 404 rather than serving a soft-404 index fallback
          if (sendNotFound(res)) return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), spaEdgeRoutingPlugin()],
  build: {
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks(id) {
              if (id.includes('@mediapipe/tasks-vision')) {
                return 'vendor-mediapipe';
              }
              if (id.includes('node_modules/framer-motion')) {
                return 'vendor-motion';
              }
              if (id.includes('node_modules/lucide-react')) {
                return 'vendor-lucide';
              }
              if (
                id.includes('node_modules/react') ||
                id.includes('node_modules/react-dom') ||
                id.includes('node_modules/react-router-dom')
              ) {
                return 'vendor-react';
              }
            },
          },
        },
    chunkSizeWarningLimit: 1200,
  },
}));
