

export default function init() {

  if ('serviceWorker' in navigator) {

    var CACHE_NAME = 'my-app';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/scripts/main.js',
      '/styles/main.min.css',
      '/scripts/main.min.js'
    ];

    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        //console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        //console.log('ServiceWorker registration failed: ', err);
      });
    });

    self.addEventListener('install', function(event) {

      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            //console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );

    })
 
  }else {
    console.log('no sw')
  }

}