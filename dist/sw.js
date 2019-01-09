var cacheName = 'my-app';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/?homescreen=1'
      ]);
    })
  );
 });

 self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});