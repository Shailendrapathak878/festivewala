/**
 * FestiveWala Production Service Worker
 * Designed for Cloudflare Pages Free Plan
 * Strategy:
 * - App Shell & Core: Network-first with cache fallback for navigation (fresh deployments)
 * - Static Hashed Assets (/assets/*): Cache-first with network fallback (immutable)
 * - External Fonts/WASM: Cache-first/Stale-while-revalidate
 * - Zero user data / photo caching (strict privacy & quota compliance)
 */

const CACHE_VERSION = 'festivewala-v1.0.0';
const STATIC_CACHE = `fw-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `fw-runtime-${CACHE_VERSION}`;

// Core Application Shell
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/brand/favicon.svg',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[FestiveWala SW] Precache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          // Strictly purge only obsolete FestiveWala-owned caches with 'fw-' prefix.
          // Never delete unrelated caches created by browser extensions or third parties.
          if (key.startsWith('fw-') && key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
            console.log('[FestiveWala SW] Purging obsolete FestiveWala cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass non-GET requests and data/blob schemes
  if (request.method !== 'GET' || url.protocol === 'data:' || url.protocol === 'blob:') {
    return;
  }

  // 1. Navigation requests (HTML documents) - Network First, fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallbackShell = await caches.match('/index.html');
          if (fallbackShell) return fallbackShell;
          return new Response('Offline - FestiveWala', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // 2. Hashed static Vite assets (/assets/*) - Cache First, immutable
  if (url.origin === self.location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. External CDN assets (Google Fonts, MediaPipe CDN) - Stale-while-revalidate
  if (url.origin.includes('fonts.googleapis.com') || 
      url.origin.includes('fonts.gstatic.com') || 
      url.origin.includes('cdn.jsdelivr.net') ||
      url.origin.includes('storage.googleapis.com')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

