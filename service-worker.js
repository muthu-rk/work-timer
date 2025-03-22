
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("chess-clock").then((cache) =>
      cache.addAll(["/", "/index.html", "/manifest.json", "/tick.mp3", "/bell.mp3"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
