// ---------------------------------------------------
// workboxバージョン
// ---------------------------------------------------
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  console.log(`Workbox is loaded`);
} else {
  console.log(`Workbox didn't load`);
}

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.navigationPreload.enable();

// manifest
workbox.routing.registerRoute(
  new RegExp('/'),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/detail/'),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://www.googleapis.com/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'api',
    maxEntries: 50,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24,
        purgeOnQuotaError: true
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://books.google.com/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'apibook',
    maxEntries: 20,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24,
        purgeOnQuotaError: true
      }),
    ],
  })
);


// chrome ------------
// The service worker navigation preload request failed with network error: net::ERR_INTERNET_DISCONNECTED.

// firefox ------------
// Could not reach Cloud Firestore backend. Connection failed 1 times. Most recent error: FirebaseError: [code=unavailable]: The operation could not be completed
// This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.




// workbox.routing.registerRoute(
//   new RegExp('https://www.gstatic.com/'),
//   new workbox.strategies.CacheFirst({
//     cacheName: 'api2',
//     maxEntries: 10,
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 60 * 60 * 24, // 1day
//         purgeOnQuotaError: true
//       }),
//     ],
//   })
// );

// // ---------------------------------------
// // SWのキャッシュを削除する
// // ---------------------------------------
// ncaches.keys().then(function(names) {
//     for (let name of names)
//         caches.delete(name);
// });



// ---------------------------------------------------
// 1から作成版
// ---------------------------------------------------
// var CACHE_NAME = 'sample-v10';
// var urlsToCache = ['/index.html', '/common/css/common.css', '/common/img/offline.png', '/common/img/online.png', '/common/img/1200x300.png'];

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(async function(cache) {
//       skipWaiting();
//       console.log(urlsToCache);
//       console.log('をキャッシュします');
//       cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     (function() {
//       caches.keys().then(function(oldCacheKeys) {
//         console.log(oldCacheKeys);
//         oldCacheKeys
//           .filter(function(key) {
//             return key !== CACHE_NAME;
//           })
//           .map(function(key) {
//             console.log(key + 'を削除しました');
//             return caches.delete(key);
//           });
//       });
//       clients.claim();
//     })()
//   );
// });

// self.addEventListener('fetch', function(event) {
//   if (!navigator.onLine) {
// 	  event.respondWith(
// 	    caches.match(event.request).then(function(response) {

// 	      if ( event.request.url === '/common/img/online.png' ) {
// 	      	return caches.match('/common/img/offline.png')
// 	      }

// 	      if (response) {
// 	        console.log(event.request.url + 'はキャッシュがあるので使う');
// 	        return response;
// 	      }
// 	      console.log(event.request.url + 'はキャッシュが無いのでリクエストする');

// 	      var fetchRequest = event.request.clone();
// 	      return fetch(fetchRequest).then(function(response) {
// 	        if (!response || response.status !== 200 || response.type !== 'basic') {
// 	          return response;
// 	        }

// 	        var responseToCache = response.clone();
// 	        console.log(event.request.url + 'は新しくキャッシュに保管する');
// 	        caches.open(CACHE_NAME).then(function(cache) {
// 	          cache.put(event.request, responseToCache);
// 	        });
// 	        return response;
// 	      });
// 	    })
// 	  );

//   } else {
//   }
// });


