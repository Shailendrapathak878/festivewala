import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const VALID_ROUTES = new Set([
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

function spaEdgeRoutingPlugin(): Plugin {
  return {
    name: 'spa-edge-routing',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlStr = req.url || '/';
        const [rawPath] = urlStr.split('?');
        const pathname = rawPath.replace(/\/$/, '') || '/';

        // 1. Authoritative 301 redirects for legacy aliases
        const redirects: Record<string, string> = {
          '/privacy': '/privacy-policy',
          '/terms': '/terms-of-service',
          '/greeting-studio': '/greeting-cards',
        };

        if (redirects[pathname]) {
          const queryString = urlStr.includes('?') ? urlStr.substring(urlStr.indexOf('?')) : '';
          res.writeHead(301, {
            Location: redirects[pathname] + queryString,
          });
          res.end();
          return;
        }

        // 2. Allow static files, assets, and scripts to pass through
        if (pathname.includes('.') || pathname.startsWith('/assets/')) {
          return next();
        }

        // 3. Strictly check known valid routes
        if (!isValidAppRoute(pathname)) {
          // Serve dist/404.html with genuine HTTP 404
          const notFoundPath = path.resolve(process.cwd(), 'dist', '404.html');
          if (fs.existsSync(notFoundPath)) {
            const html = fs.readFileSync(notFoundPath, 'utf8');
            res.writeHead(404, {
              'Content-Type': 'text/html; charset=utf-8',
              'X-Robots-Tag': 'noindex, nofollow',
            });
            res.end(html);
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaEdgeRoutingPlugin()],
  build: {
    rollupOptions: {
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
});
