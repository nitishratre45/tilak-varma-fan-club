// ==========================================
// TILAK VARMA FAN CLUB - SERVICE WORKER
// ==========================================

const CACHE_NAME = "tilak-varma-fc-v1";

const STATIC_FILES = [
    "/",
    "/index.html",
    "/stats.html",
    "/news.html",
    "/gallery.html",
    "/career.html",
    "/records.html",
    "/matches.html",
    "/contact.html",

    "/css/style.css",
    "/css/home.css",
    "/css/news.css",
    "/css/gallery.css",
    "/css/stats.css",
    "/css/career.css",
    "/css/records.css",
    "/css/matches.css",
    "/css/responsive.css",
    "/css/search.css",

    "/js/script.js",
    "/js/firebase.js",

    "/image/tilaklogo.png"
];


// ==========================================
// INSTALL
// ==========================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(STATIC_FILES);

            })

    );

    self.skipWaiting();

});


// ==========================================
// ACTIVATE
// ==========================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))

            );

        })

    );

    self.clients.claim();

});


// ==========================================
// FETCH
// ==========================================

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }


                return fetch(event.request)
                    .then(networkResponse => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type === "opaque"
                        ) {

                            return networkResponse;

                        }


                        const responseClone =
                            networkResponse.clone();


                        caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseClone
                                );

                            });


                        return networkResponse;

                    })
                    .catch(() => {

                        return caches.match(
                            "/index.html"
                        );

                    });

            })

    );

});