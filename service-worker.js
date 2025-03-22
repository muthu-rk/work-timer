const CACHE_VERSION = "v3"; // 🔄 Increment this on each deploy
const CACHE_NAME = `chess-clock-${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  "/work-timer/",
  "/work-timer/index.html",
  "/work-timer/manifest.json",
  "/work-timer/tick.mp3",
  "/work-timer/bell.mp3"
];

self.addEventListener("install", (e) => {
  console.log("[SW] Installing new service worker and caching files...");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (e) => {
  console.log("[SW] Activating service worker and cleaning up old caches...");
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("chess-clock-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
