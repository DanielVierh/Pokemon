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
const pokemonGenerationen = {
    gen1_start: 1,
    gen1_end: 150
}
const pokeball = document.getElementById("pokeball");

let save_Object = {
    today_Date: '',
    myPokemonTeam: [],
    myCatchedPokemons: [],
    allFacedPokemons: [],
    allPokemonMoves: [],
    today_Pokemons: [],
    items: {
        pokeballs: 20,
        money: 100,
    }
}


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
    load_SaveObj();
    generate_today_Pokemons();
    myPokemonProgress.value = 100;
    wildPokemonProgress.value = 100;
    createMyPokemon();
}

function load_SaveObj() {
    if(localStorage.getItem('stored_save_Object') != null) {
        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
        facedPokemons = save_Object.allFacedPokemons;
        allMoves = save_Object.allPokemonMoves;
    }
}

function save_SaveObj() {
    localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));
    console.log('SaveObj', save_Object);
}


// Funktion erstellt zufällig 20 Pokemon. Diese sollen für einen Tag abgespeichert
// werden und die möglichen Pokemon bildem, denen man begegnen kann

function generate_today_Pokemons() {
    if(today_equal_savedDay() === true) {
      todayPokemons = save_Object.today_Pokemons;
      createWildPokemon();
    }else {
        const min = pokemonGenerationen.gen1_start;
        const max = pokemonGenerationen.gen1_end;

        for(let i = 1; i <= 20; i++) {
             const randomPokemon = Math.floor(Math.random() * (max - min) ) + min;
             todayPokemons.push(randomPokemon);
        }
        save_Object.today_Pokemons = todayPokemons;
        save_Object.today_Date = createDateFromToday();
        save_SaveObj();
        createWildPokemon();
        console.log('Today Pokemons', todayPokemons);
    }
}

function today_equal_savedDay() {
    const checkDay = save_Object.today_Date;
    const today = createDateFromToday();

    if(checkDay === today) {
        return true
    }else {
        return false
    }
}



function createDateFromToday() {
    const date  = new Date();
    const day = addZero(date.getDate());
    const month = addZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const today = `${day}.${month}.${year}`
    return today;
}


function addZero(val) {
    if(val < 10) {
        val = `0${val}`;
    }
    return val;
}


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
// Erstellt Zufallszahl und checkt, ob ID bereits im Array FacedPokemons gespeichert ist,
// wenn nein, Fetch Request an Poke API
//######################################################
function createWildPokemon() {
    const randomPokemon = parseInt(Math.random() * todayPokemons.length + 1);
    let foundIdInFacedPokemonArray = false;
    // ? Checke FacedPokemon Array
    console.log('facedPokemons',facedPokemons);
    for(let i = 0; i < facedPokemons.length; i++) {
        if(randomPokemon === facedPokemons[i].id) {
            currentWildPokemon = new Pokemon(facedPokemons[i].id,
                                            facedPokemons[i].name,
                                            facedPokemons[i].type,
                                            parseInt(Math.random() * 20) + 3,
                                            facedPokemons[i].moves,
                                            facedPokemons[i].spriteFront,
                                            facedPokemons[i].spriteBack,
                                            facedPokemons[i].statAttack,
                                            facedPokemons[i].statDefense,
                                            facedPokemons[i].xp,
                                            facedPokemons[i].hp);

            wildPokeImage.src = currentWildPokemon.spriteFront;
            // wildPokeImage.style.opacity = "1";
            wildPokeName.innerHTML = `${makeFirstLetterBig(currentWildPokemon.name)} | Lv. ${currentWildPokemon.level} -- KP.${currentWildPokemon.hp}`;
            currentWildPokeHP = currentWildPokemon.hp;
            console.log("Found Pokemon in FacedPokemons");
            foundIdInFacedPokemonArray = true;
            break;
        }

    }

        // Pokemon nicht im Array facedPokemons enthalten, also Fetch Req
        if(foundIdInFacedPokemonArray === false) {
            console.log('Nicht gefunden also fetchPokemon mit ID ', randomPokemon);
            fetchPokemon(randomPokemon);
        }
}




 //######################################################
// Fetch Request an Poke API. Kann mittels ID oder Name übergeben werden
//######################################################

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then(data => {
        console.log('data', data)
        let four_moves = [];
        for(let i = 0; i <= 4; i++) {
           const randomMove =  Math.floor(Math.random() * (data.moves.length - 1) ) + 1;
           four_moves.push(data.moves[randomMove].move.name);
        }
        currentWildPokemon = new Pokemon(data.id,
                                     data.name,
                                     data.types[0].type.name,
                                     parseInt(Math.random() * 20) + 3,
                                     four_moves,
                                     data.sprites.front_default,
                                     data.sprites.back_default,
                                     data.stats[1].base_stat,
                                     data.stats[2].base_stat,
                                     data.base_experience,
                                     data.stats[0].base_stat)
        console.log('currentWildPokemon', currentWildPokemon)
        // Wildes Pokemon rendern
        wildPokeImage.src = currentWildPokemon.spriteFront
        wildPokeImage.style.opacity = "1";
        wildPokeName.innerHTML = `${makeFirstLetterBig(currentWildPokemon.name)} | Lv. ${currentWildPokemon.level} -- KP.${currentWildPokemon.hp}`
        currentWildPokeHP = currentWildPokemon.hp
        showInfoBox(`Ein wildes ${makeFirstLetterBig(currentWildPokemon.name)} erscheint`)
        // Pokemon auf dem Gerät abspeichern, um beim nächsten mal keinen erneuten Fetch Request auszulösen
        save_Object.allFacedPokemons.push(currentWildPokemon);
        save_SaveObj();
    });
}

//######################################################
// Wichtige Informationen einer Attacke fetchen und ganze Attacke abspeichern
//######################################################
function fetchAttack(nameId) {
    fetch(`https://pokeapi.co/api/v2/move/${nameId}/`)
    .then((res) => res.json())
    .then(data => {
        console.log('Move', data)
        pokeMove = new PokeMove(data.name,
                                data.names[4].name,
                                data.flavor_text_entries[22].flavor_text,
                                data.accuracy, data.power,
                                data.meta.minHits,
                                data.meta.maxHits,
                                data.pp,
                                data.type.name)
        console.log('Gesp.Move:', allMoves);
        // In alle Attacken abspeichern
        save_Object.allPokemonMoves.push(pokeMove);
        allMoves.push(pokeMove);
        save_SaveObj();
    });
}


//######################################################

//######################################################
function init_Move(moveName) {
    // const moveName = 'fire-punch';
    // const germanMoveName = 'Feuerschlag';
    let foundMoveInAllMoves = false;
    // Checke Attacke im Attacken Array
    for(let i = 0; i < allMoves.length; i++) {
        // console.log(`${allMoves[i].name}`)
        if(moveName === allMoves[i].name) {
            currentAttack = new PokeMove(
                allMoves[i].name,
                allMoves[i].germanName,
                allMoves[i].descr,
                allMoves[i].accuracy,
                allMoves[i].baseDamage,
                allMoves[i].minHits,
                allMoves[i].maxHits,
                allMoves[i].pp,
                allMoves[i].type)
                console.log('GeladenMove:', allMoves);
                foundMoveInAllMoves = true;
                pokeMove = currentAttack;
        }
    }

    if(foundMoveInAllMoves === false) {
        // console.log("Move nicht gefunden");
        fetchAttack(moveName);
    }

    setTimeout(() => {
        myPokemonAttack('myPokemon')
    }, 1000);
}



//######################################################
// Wildes Pokemon fangen
//######################################################

function catchPokemon() {

    // Abfragen, ob man noch Pokebälle hat
if( myPokeballAmount > 0) {
    myPokeballAmount--;
    pokeball.classList.add("active");
    setTimeout(() => {
        pokeball.classList.remove("active");
        const fullHP = currentWildPokemon.hp;
        const hpInPercent = parseInt(currentWildPokeHP * 100 / fullHP);
        const catchquote = 25 + (parseInt(Math.random() * hpInPercent  / 2)) - (parseInt(Math.random() * (hpInPercent + 5)));
        console.log(`Catchquote: ${catchquote} // Pokebälle: ${myPokeballAmount}`);
        if(catchquote >= 25) {
            // Unsichtbar machen
            wildPokeImage.style.opacity = "0";
            wildPokeName.innerHTML = "";
            showInfoBox(`${makeFirstLetterBig(currentWildPokemon.name)} wurde gefangen`);
            myCatchedPokemons.push(currentWildPokemon);
            console.log("--- !!!  !!! ---> CATCHED", myCatchedPokemons);
        }else {
            showInfoBox(`${makeFirstLetterBig(currentWildPokemon.name)} lässt sich nicht fangen`);
        }
    }, 1500);
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
