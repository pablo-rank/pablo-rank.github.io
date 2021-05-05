import {cacheNames} from 'workbox-core';

self.addEventListener('install', (event) => {
  console.log('2- V1 installing…');
  const urls = [/* ... */];
  const cacheName = cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

// self.addEventListener('install', event => {
//   console.log('V1 installing…');

//   // cache a horse SVG
//   event.waitUntil(
//     caches.open('static-v1').then(cache => cache.add('/horse.svg'))
//   );
// });

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the horse SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/horse.svg'));
  }
});