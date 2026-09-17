/*
 * Service worker for the 3D Path Planner (hand-written, no build plugin).
 *
 * Strategy: versioned cache-first with network fallback.
 *   - install:  precache the app shell (index.html, manifest, icons) plus the
 *               hashed bundles that the built index.html references under
 *               ./assets/, so the app loads offline after the first visit.
 *   - activate: delete every cache from an older CACHE_VERSION, then take
 *               control of open pages.
 *   - fetch:    same-origin GET only. Cache hit → served; miss → network, and
 *               ./assets/* responses are stored for next time. Navigations
 *               fall back to the cached index.html when the network is down.
 *
 * Releasing a new build: bump CACHE_VERSION. The browser re-fetches sw.js on
 * every navigation, sees the byte change, installs the new worker (which
 * precaches the new shell) and drops the old cache on activate.
 */
const CACHE_VERSION = 'v1';
const CACHE_PREFIX = 'path-planner-';
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;

// Relative to the worker's own URL, so the app installs from any sub-path.
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
];

const isAsset = (url) => url.pathname.includes('/assets/');

/** Hashed bundle URLs referenced by the built index.html (src="./assets/…", href="./assets/…"). */
async function bundleUrls() {
  const response = await fetch('./index.html', { cache: 'no-cache' });
  if (!response.ok) return [];
  const html = await response.text();
  const urls = new Set();
  for (const match of html.matchAll(/(?:src|href)=["']([^"']*\/assets\/[^"']+)["']/g)) {
    urls.add(new URL(match[1], self.registration.scope).href);
  }
  return [...urls];
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(SHELL);
      // Bundles are added one by one: a single missing chunk must not fail the install.
      const bundles = await bundleUrls();
      await Promise.all(bundles.map((url) => cache.add(url).catch(() => undefined)));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

// Everything cached here is same-origin, so a `Vary: Origin` header (which
// servers add for CORS) must not split the cache between the worker's
// precache fetch (no Origin header) and the page's `crossorigin` bundle loads.
const MATCH = { ignoreVary: true };

async function cacheFirst(request, url) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ...MATCH, ignoreSearch: isAsset(url) });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && isAsset(url)) cache.put(request, response.clone());
  return response;
}

async function navigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    return await cacheFirst(request, new URL(request.url));
  } catch (err) {
    // Deep link or query string not precached and the network is down: serve the shell.
    const shell = (await cache.match('./index.html', MATCH)) ?? (await cache.match('./', MATCH));
    if (shell) return shell;
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(navigation(request));
    return;
  }
  event.respondWith(cacheFirst(request, url));
});
