const FILES_TO_CACHE = [
"./",
"./index.html", 
"./styles.css",
"./index.js",
"./db.js",
"./icons/icon-192x192.png",
"./icons/icon-512x512.png",
"./manifest.webmanifest",
"https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
"./favicon.ico"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
// const RUNTIME_CACHE = "runtime-cache";

// install event for service worker
self.addEventListener("install", function (evt) {
  //This line is saying that work is ongoing until the promise settles, and it shouldn't terminate the service worker if it wants that work to complete.
  evt.waitUntil(
    //go to caches object and open file that matches CACHE_NAME variable.  Wait for that promise to resolve.
    // when it does send console.log message and add all the files in Files_To_CAche variable to cache.
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      //Grab all the files in the Files_to_cache variable and add them to the cache object
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  //tells the newly installed service worker to skip the waiting state and move directly to activating state.
  //6 states service worker  can be in parsed, installing, installed (waiting), activating, activated, redundant  
  // self.skipWaiting();
});

// activate
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    //returns a promise that resolves into an array of cache keys
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          //goes through the array of cache keys and deletes them if they do not match the CACHE_name and DATA_Cache_NAME variables specified above
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  // use cache first for all other requests for performance
  evt.respondWith(
    caches.match(evt.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      // request is not in cache. make network request and cache the response
      return caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request).then(response => {
          return cache.put(evt.request, response.clone()).then(() => {
            return response;
          });
        });
      });
    })
  );
});
