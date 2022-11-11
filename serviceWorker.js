const staticCacheName = "cache-v1";
const assetsToSave = [
    "/",
    "/index.html",
    "/index_2.html",
    "/index_3.html",
    "/css/style.css",
    "/js/app.js",
    "/js/callServiceWorker.js",
    "/images/favicon/Bluetooth.ico",
    "/images/personnalites/actors/bruce_lee.jpg",
    "/images/personnalites/actors/guillaume_canet.jpg",
    "/images/personnalites/actors/jean_reno.jpg",
    "/images/personnalites/actors/leonardo_dicaprio.jpg",
    "/images/personnalites/politics/charle_michel.jpg",
    "/images/personnalites/politics/jean_luc_melanchon.jpg",
    "/images/personnalites/politics/rodrigo_durete.jpg",
    "/images/personnalites/politics/segolene_royal.jpg",
    "/images/personnalites/scientifics/albert_einstein.jpg",
    "/images/personnalites/scientifics/galilee.jpg",
    "/images/personnalites/scientifics/marie_curie.jpg",
    "/images/personnalites/scientifics/nicolas_tesla.jpg",
    "images/burger-39x32.png",
    "images/home_picture.png",
    "images/left-arrow-22x23.png",
    "images/quiz-128x128.png",
    "images/quiz-192x192.png",
    "images/quiz-512x512.png",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css",
]

// "install" est déclenché à la première ouverture de page
self.addEventListener("install", installEvent => {
    // .skipWaiting : dit au worker de s'installer avec sa nouvelle version immédiatement
    // pas d'attente d'install = on n'attend pas que le client réouvre la page pour utiliser la 
    // nouvelle version du worker
    self.skipWaiting();


    installEvent.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assetsToSave)
        })
    )
});

// activate n'est pas redéclenché au rechargement
self.addEventListener('activate', (event) => {
    // .claims : dit au worker de controler la page immédiatement grâce au mode ACTIVATE
    clients.claim();

    // On supprime les caches inutiles
    event.waitUntil(
        (async() => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map(key => {
                    if (!key.includes(PREFIX)) {
                        return caches.delete(key);
                    }
                })
            );
        })()

    );
    console.log(`+++++++++++++++ Nom du cache utilisé par "active" : ${staticCacheName}`);
});

// Fetch est déclenché au rechargement de la page
self.addEventListener("fetch", fetchEvent => {
    console.log(`+++++++++++++++ ${staticCacheName} Fetching : ${fetchEvent.request.url}, Mode : ${fetchEvent.request.mode}`);

    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});