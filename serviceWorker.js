const nomDuCacheASauvegarder = "cache-v26";
const assetsToSave = [
    "/",
    "/index.html",
    "/index_2.html",
    "/index_3.html",
    "/css/style.css",
    "/js/app.js",
    /*"/js/callServiceWorker.js",*/
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

/*  “install” : levé lorsque le navigateur installe le Service Worker 
    L’événement d’installation se déclenche uniquement s’il y a eu un changement sur le fichier du service worker ou 
    alors à chaque nouveau lancement de l’application.
    Cet événement va s’occuper de toutes les actions qui sont nécessaires de faire au chargement de l’application, tel 
    que mettre certains fichiers en cache.  
*/
self.addEventListener("install", installEvent => {
    console.log(`/////////////////////// 0 Install : `);

    // .skipWaiting : dit au worker de s'installer avec sa nouvelle version immédiatement
    // si elle existe (exemple: passage d'une v2 à v3)
    // pas d'attente d'install = on n'attend pas que le client réouvre la page pour utiliser la 
    // nouvelle version du worker
    self.skipWaiting();

    installEvent.waitUntil(
            caches.open(nomDuCacheASauvegarder).then(cache => {
                console.log(`/////////////////////// Ajout des fichier à mettre dans le cache : ${nomDuCacheASauvegarder}`);
                cache.addAll(assetsToSave)
            })
        )
        /*
           (async() => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map(key => {
                    console.log(`/////////////////////// Suppression du cache : ${key}`);
                    return caches.delete(key);
                })
            );
        })();
        */
});

/*  “activate”: levé lorsque le navigateur active la nouvelle version 
    L’événement d’activation se déclenche une fois que l’événement d’installation est terminé.  
    Cet  évènement  est  surtout  utile  pour  supprimer  tous  les  fichiers  qui  ne  sont  plus  nécessaires  ou  pour  nettoyer 
    l’application. 
*/
self.addEventListener('activate', (event) => {

    console.log(`----------------------- .claims : dit au worker de controler la page immédiatement grâce au mode ACTIVATE`);
    clients.claim();
    console.log(`----------------------- Nom du cache utilisé par "active" : ${nomDuCacheASauvegarder}`);

    // On supprime les caches inutiles
    event.waitUntil(
        (async() => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map(key => {
                    if (!key.includes(nomDuCacheASauvegarder)) {
                        console.log(`----------------------- Suppression d'un cache non utilisés : ${key}`);
                        return caches.delete(key);
                    }
                })
            );
        })()
    );
});

/*  “fetch”: à chaque requête effectuée par le navigateur 
    Un évènement fetch est également possible, il est déclenché lorsqu’une requête HTTP est émise par l’application.
    permet d'intercepter des requêtes et d'y répondre de façon personnalisée. 
*/
self.addEventListener("fetch", fetchEvent => {
    console.log(`+++++++++++++++ ${nomDuCacheASauvegarder} Fetching : ${fetchEvent.request.url}, Mode : ${fetchEvent.request.mode}`);

    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});

// “push”: lors de la réception de notifications push 
self.addEventListener("push", pushEvent => {
    console.log(`************** pushEvent : ${pushEvent}`);
});