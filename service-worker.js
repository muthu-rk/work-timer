
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("chess-clock").then((cache) =>
      cache.addAll(["/work-timer/",
        "/work-timer/index.html",
        "/work-timer/manifest.json",
        "/work-timer/tick.mp3",
        "/work-timer/bell.mp3"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
