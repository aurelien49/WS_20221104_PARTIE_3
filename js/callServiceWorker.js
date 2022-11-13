if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js")
        .then((reg) => {
            console.log(`Enregistrement du service worker réussi`);

        }).catch((error) => {
            console.log(`Erreur : `); +
            error
        });
}