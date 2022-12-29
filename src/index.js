import "../serviceWorker.js"
import "./js/store.js"
import "./js/game-map1.js"
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
        navigator.serviceWorker.register("/Pokemon/serviceWorker.js", { scope: "/Pokemon/"})
        .then(()=>  console.log('ServiceWorker geladen'))
        .catch((error) => console.warn(error))
    }
}
