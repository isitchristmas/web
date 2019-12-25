'use strict';

// Adapted from:
// https://gist.github.com/adactio/3717b7da007a9363ddf21f584aae34af
// https://frontendian.co/service-workers

const cacheName = 'files';

self.addEventListener('fetch',  fetchEvent => {
  const request = fetchEvent.request;

  fetchEvent.respondWith(async function() {
    // Try to fetch over the network
    let responsePromise = fetch(request);

    // always cache a newer version, even if one already exists, so that
    // the cache stays fresh
    fetchEvent.waitUntil(async function() {
      // If that works, cache it and return it
      var actualResponse = await responsePromise;
      const responseCopy = actualResponse.clone();
      const myCache = await caches.open(cacheName);
      await myCache.put(request, responseCopy);
    }());

    // if the cached version exists, serve it
    const cachedResponse = await caches.match(request);
    return cachedResponse || (await responsePromise);

  }());
});
