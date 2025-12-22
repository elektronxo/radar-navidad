const CACHE_NAME = "radar-navidad-pwa";

const FILES_TO_CACHE = [
  "/radar-navidad/",
  "/radar-navidad/index.html",
  "/radar-navidad/manifest.json",
  "/radar-navidad/beep-slow.mp3",
  "/radar-navidad/beep-fast.mp3",
  "/radar-navidad/found.mp3"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
