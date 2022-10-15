//######################################################
// Variablen
//######################################################
let currentWildPokemon;
let myCurrentPokemon;
let wildPokeImage = document.getElementById("imgPoke");
let wildPokeName = document.getElementById("wildPokeName");
let myPokeImage = document.getElementById("imgMyPoke");
let myPokeName = document.getElementById("myPokeName");
let wildPokemonProgress = document.getElementById("wildPokemonProgress");
let myPokemonProgress = document.getElementById("myPokemonProgress");
let infoBox = document.getElementById("infoBox");
let moveButtons = document.getElementById("moveButtonCont");
let mainButtons = document.getElementById("mainButtonCont");
let myCatchedPokemons = [];
let myTeam = [];
let allMoves = [];
let facedPokemons = [];
let pokeMove;
let currentAttack;
let currentWildPokeHP;
let myCurrentPokemonHP;
let iamExecuting = true;
const battleSound2 = new Audio('assets/sound/battle2.mp3');
const victorySound = new Audio('assets/sound/victory.mp3');
let musikIsPlaying = true; // Wenn auf false, wird sie nach erster Aktion abgespielt
let myPokeballAmount = 35;
let todayPokemons = []; // 20 Pokemon werden random mäßig erstellt 
const maxPokemon = 898;



//######################################################
// Klassen
//######################################################
class Pokemon {
    constructor(id, name, type, level, moves, spriteFront, spriteBack, statAttack, statDefense, xp, hp, unique_ID) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.level = level;
        this.moves = moves;
        this.spriteFront = spriteFront;
        this.spriteBack = spriteBack;
        this.statAttack = statAttack;
        this.statDefense = statDefense;
        this.xp = xp;
        this.hp = hp;
        this.unique_ID = uniqueID_Generator();
    }
}

class PokeMove {
    constructor(name, germanName, descr, accuracy, baseDamage, minHits, maxHits, pp, type) {
        this.name = name,
        this.germanName = germanName,
        this.descr = descr,
        this.accuracy = accuracy,
        this.baseDamage = baseDamage,
        this.minHits = minHits,
        this.maxHits = maxHits,
        this.pp = pp,
        this.type = type
    }
}


//######################################################
// Statisches Pokemon
//######################################################
// Statisches Pokemon -- Glurak
let myStaticPokemon = new Pokemon(6,"Charizard","fire", 25, "mega-punch",
 "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
 "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
 84,78,0, 78);



window.onload = init();

function init() {
    generate_today_Pokemons();
    currentRandomPokemon();
    myPokemonProgress.value = 100;
    wildPokemonProgress.value = 100;
    createMyPokemon();
}


// Funktion erstellt zufällig 30 Pokemon. Diese sollen für einen Tag abgespeichert
// werden und die möglichen Pokemon bildem, denen man begegnen kann
function generate_today_Pokemons() {
    for(let i = 1; i <= 20; i++) {
        const randomPokemon = parseInt(Math.random() * maxPokemon + 1)
        todayPokemons.push(randomPokemon);
        console.log(todayPokemons);
    }
}

// Random Pokemon aus heutiger Liste
//!TOdo Liste noch abspeichern und Tag checken
function currentRandomPokemon() {
    const randomPokemon = parseInt(Math.random() * todayPokemons.length);
    fetchPokemon(todayPokemons[randomPokemon]);
}




function uniqueID_Generator() {
    const rndStuff = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','$','!','1','2','3','4','8','7','6','5','9','0','#'];
    let key = '';
    for(let i = 1; i <= 36; i++) {
        key += rndStuff[parseInt(Math.random() * rndStuff.length)];
    }
    console.log(key);
    return key;
}






//######################################################
// Mein Pokemon rendern
//######################################################
function createMyPokemon() {
    myPokeImage.src = myStaticPokemon.spriteBack;
    myCurrentPokemonHP = myStaticPokemon.hp;
    myPokeName.innerHTML = `${makeFirstLetterBig(myStaticPokemon.name)} | Lv.${myStaticPokemon.level} -- KP.${myStaticPokemon.hp}`;
}


 //######################################################
// Fetch Request an Poke API. Kann mittels ID oder Name übergeben werden
//######################################################

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then(data => {
        console.log(data)
        currentWildPokemon = new Pokemon(data.id,
                                     data.name,
                                     data.types[0].type.name,
                                     parseInt(Math.random() * 20) + 3,
                                     data.moves[0].move.name,
                                     data.sprites.front_default,
                                     data.sprites.back_default,
                                     data.stats[1].base_stat,
                                     data.stats[2].base_stat,
                                     data.base_experience,
                                     data.stats[0].base_stat)
        console.log(currentWildPokemon)
        // Wildes Pokemon rendern
        wildPokeImage.src = currentWildPokemon.spriteFront
        wildPokeImage.style.opacity = "1";
        wildPokeName.innerHTML = `${makeFirstLetterBig(currentWildPokemon.name)} | Lv. ${currentWildPokemon.level} -- KP.${currentWildPokemon.hp}`
        currentWildPokeHP = currentWildPokemon.hp
        showInfoBox(`Ein wildes ${makeFirstLetterBig(currentWildPokemon.name)} erscheint`)
        // Pokemon auf dem Gerät abspeichern, um beim nächsten mal keinen erneuten Fetch Request auszulösen
        facedPokemons.push(currentWildPokemon)
        localStorage.setItem('storedFacedPokemons', JSON.stringify(facedPokemons))
    });
}




//######################################################
// Wildes Pokemon fangen
//######################################################

function catchPokemon() {

    // Abfragen, ob man noch Pokebälle hat
if( myPokeballAmount > 0) {
    myPokeballAmount--;
    const fullHP = currentWildPokemon.hp;
    const hpInPercent = parseInt(currentWildPokeHP * 100 / fullHP);
    const catchquote = 25 + (parseInt(Math.random() * hpInPercent  / 2)) - (parseInt(Math.random() * (hpInPercent + 5)));
    console.log(`Catchquote: ${catchquote} // Pokebälle: ${myPokeballAmount}`);
    if(catchquote >= 25) {
        // Checken, ob Pokemon bereits im Array
        let foundInCatchedPokemonArray = false;
        for(let i = 0; i < myCatchedPokemons.length; i++) {
            if(myCatchedPokemons[i].name === currentWildPokemon.name) {
                foundInCatchedPokemonArray = true;
            }
        }
        if(foundInCatchedPokemonArray === true) {
            showInfoBox("Pokemon bereits vorhanden");
        }else{

        }


        // Unsichtbar machen
        wildPokeImage.style.opacity = "0";
        wildPokeName.innerHTML = "";
        // Musik
        battleSound2.pause();
        victorySound.play();

        showInfoBox(`${currentWildPokemon.name} wurde gefangen`);
        myCatchedPokemons.push(currentWildPokemon);
        console.log("--- !!!  !!! ---> CATCHED", myCatchedPokemons);
    }
}else{
    showInfoBox(`Nicht genug Pokebälle`);
}
}

//######################################################
// Macht den Anfangsbuchstaben groß
//######################################################
function makeFirstLetterBig(pokeName) {
    const firstLetter = pokeName[0];
    let exportPokeName = firstLetter.toUpperCase();
    for(let i = 1; i < pokeName.length; i++) {
        exportPokeName += pokeName[i];
    }
    return exportPokeName;
}

//######################################################
// UI Elemente
//######################################################
function showInfoBox(text) {
    infoBox.hidden = false;
    infoBox.innerHTML = text;
    setTimeout(() => {
        infoBox.hidden = true;
    }, 4000);
}

function showMainButtons() {
    moveButtons.hidden = true;
    mainButtons.hidden = false;
    disableMainButtons();
}

function showMoveButtons() {
    moveButtons.hidden = false;
    mainButtons.hidden = true;
}

function disableMainButtons() {
    mainButtons.style.backgroundColor = 'red';
    document.getElementById("mainButton1").disabled = true;
    document.getElementById("mainButton2").disabled = true;
    document.getElementById("mainButton3").disabled = true;
}

function enableMainButtons() {
    mainButtons.style.backgroundColor = 'rgba(0, 0, 10, 0.384)';
    document.getElementById("mainButton1").disabled = false;
    document.getElementById("mainButton2").disabled = false;
    document.getElementById("mainButton3").disabled = false;
}


