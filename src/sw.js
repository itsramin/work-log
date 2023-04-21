// service-worker.js
const cacheName = "your-app-name";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/static/css/main.fe07c309.css",
  "main.fe07c309.css.map",
  "/static/js/main.e8d0ed49.js",
  "/static/js/main.e8d0ed49.js.map",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
