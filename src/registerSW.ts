/**
 * Production Service Worker Registration for FestiveWala
 * Registers sw.js only in production or when explicitly supported.
 */

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // In development, avoid aggressive caching to enable rapid HMR debugging
      if (import.meta.env.DEV) {
        console.log('[FestiveWala SW] Running in dev mode; Service Worker active for local PWA testing.');
      }

      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[FestiveWala SW] ServiceWorker registered with scope:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[FestiveWala SW] New content available; please refresh to update.');
                } else {
                  console.log('[FestiveWala SW] Content cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('[FestiveWala SW] ServiceWorker registration failed:', error);
        });
    });
  }
}

