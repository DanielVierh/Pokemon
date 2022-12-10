import "../serviceWorker.js"
import "./js/store.js"
import "./js/pokedex.js"
import "./js/catchedPokemon.js"
import "./js/script.js"
import "./js/battle.js"
import "./scss/style.scss"


function init() {
    checkServiceWorker();
}

function checkServiceWorker() {
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/pokemon/serviceWorker.js", { scope: "/pokemon/"})
        .then(()=>  console.log('ServiceWorker geladen'))
        .catch((error) => console.warn(error))
    }
}
