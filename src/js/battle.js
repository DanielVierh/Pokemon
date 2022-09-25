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



window.onload = init();

function init() {
    myPokemonProgress.value = 100;
    wildPokemonProgress.value = 100;

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
// Statisches Pokemon
//######################################################
// Statisches Pokemon -- Glurak
let myStaticPokemon = new Pokemon(6,"Charizard","fire", 25, "mega-punch",
 "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
 "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
 84,78,0, 78);
