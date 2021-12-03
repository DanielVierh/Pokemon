const canvas = document.getElementById("battleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1050;
canvas.height = 540;
const background = new Image();
background.src = "assets/backgr.jpg";

const myPokemon = new Image();
myPokemon.src = "assets/11B.png";
const myPokeSpriteSize = 300;
let myEmptyProgressBar = {name:"progress", x:30, y:480, width:200, height: 25};
let myProgressBar = {name:"progress", x:30, y:480, width:100, height: 25};
let myEmptyExperienceBar = {name:"progress", x:30, y:515, width:200, height: 20};
let myExperienceBar = {name:"progress", x:30, y:515, width:120, height: 20};
let myPokemonName = "Safcorn";

let enemyPokemon = new Image();
console.log(`Bildstep: 1`);

let emptyEnemyProgressBar = {name:"progress", x:600, y:90, width:200, height: 20};
let enemyProgressBar = {name:"progress", x:600, y:90, width:180, height: 20};
const enemyPokeSpriteSize = 200;
let enemyPokeName = "";
let currentWildPokemon;

class Pokemon {
    constructor(id, name, type, level, moves, spriteFront, spriteBack, statAttack, statDefense, xp) {
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
    }
}

// Load
window.onload = function() {
    createWildPokemon(); 
};

function drawInitScene() {

    

    // Draw Background
    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw My Pokemon
    ctx.drawImage(myPokemon, 170, 250, myPokeSpriteSize, myPokeSpriteSize);
    // Draw Enemy Pokemon
    ctx.drawImage(enemyPokemon, 600, 140, enemyPokeSpriteSize, enemyPokeSpriteSize);
    console.log(`Bildstep: 3 ${enemyPokemon.src}`);
    // Draw Progress Bar
    //Empty
    ctx.fillStyle = "rgba(20,20,20, 0.8)";
    ctx.fillRect (emptyEnemyProgressBar.x, emptyEnemyProgressBar.y, emptyEnemyProgressBar.width, emptyEnemyProgressBar.height);
    ctx.fillRect (myEmptyProgressBar.x, myEmptyProgressBar.y, myEmptyProgressBar.width, myEmptyProgressBar.height);
    ctx.fillRect (myEmptyExperienceBar.x, myEmptyExperienceBar.y, myEmptyExperienceBar.width, myEmptyExperienceBar.height);
    // Live
    ctx.fillStyle = "rgba(0,255,0, 0.8)";
    ctx.fillRect (myProgressBar.x, myProgressBar.y, myProgressBar.width, myProgressBar.height);
    ctx.fillRect (enemyProgressBar.x, enemyProgressBar.y, enemyProgressBar.width, enemyProgressBar.height);
    // XP
    ctx.fillStyle = "rgba(10,70,255, 0.9)";
    ctx.fillRect (myExperienceBar.x, myExperienceBar.y, myExperienceBar.width, myExperienceBar.height);
    // Text
    ctx.fillStyle = "rgba(255,255,255, 1)";
    ctx.fillText("XP", 10, 530);
    ctx.fillText("Leben", 0, 490);
    ctx.font = "30px Arial";
    ctx.fillText(enemyPokeName, 600, 80);
    ctx.fillText(myPokemonName, 10, 470);
}


function createWildPokemon() {
    const rndPokeID = parseInt(Math.random() * 151 + 1);
    fetchPokemon(rndPokeID);
}



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
                                     0)
        console.log(currentWildPokemon)
        enemyPokemon.src = currentWildPokemon.spriteFront
        enemyPokeName = `${currentWildPokemon.name} | Level: ${currentWildPokemon.level}`
        console.log(`Bildstep: 2`);
        drawInitScene()
    });
}