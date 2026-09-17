// Electron Dose Lab service worker.
//
// Hand-written (no Workbox / vite-plugin-pwa) so the caching behaviour is
// fully auditable in one file. CACHE_VERSION and PRECACHE_URLS below are
// placeholders substituted by scripts/build-sw.mjs, which runs after
// `vite build` and fills them in with a content-derived cache version and
// the real list of built asset paths (including the hashed JS/CSS
// filenames Vite generates, which are not known until build time).
//
// Strategy:
//  - Precache the app shell (index.html, built JS/CSS, manifest, icons) on
//    install, under a versioned cache name.
//  - Same-origin static assets: cache-first, populating the cache on first
//    network fetch for anything not already precached.
//  - Navigation requests: network-first, falling back to the cached
//    index.html when offline (so the SPA still loads offline).
//  - On activate, delete any cache from a previous version.
const CACHE_VERSION = '357cff8a7803';
const CACHE_NAME = `electron-dose-lab-${CACHE_VERSION}`;
const PRECACHE_URLS = ["./","assets/index-BMA9qMuC.css","assets/index-D7B2Z15R.js","assets/three-zc1kIM9l.js","favicon.svg","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512-maskable.png","icons/icon-512.png","icons/icon-maskable.svg","icons/icon.svg","index.html","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(
        () => caches.match(request).then((cached) => cached || caches.match('./index.html')),
      ),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return response;
      });
    }),
  );
});
