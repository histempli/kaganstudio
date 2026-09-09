const CACHE_ADI = "kaganstudio-v1";
const DOSYALAR = ["/", "/index.html", "/style.css", "/app.js", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_ADI).then((cache) => cache.addAll(DOSYALAR))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((yanit) => yanit || fetch(e.request))
  );
});
