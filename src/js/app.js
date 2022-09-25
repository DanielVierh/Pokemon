const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 960;

// Tastatur
const keys = [];
let direction = "";

// Collision Detection Zones  560, 670, 50, 70
let grassZone1 = {name:"grassZone", x:60, y:40, width: 200, height: 120};
let grassZone2 = {name:"grassZone", x:460, y:20, width: 200, height: 120};
let grassZone3 = {name:"grassZone", x:760, y:20, width: 200, height: 120};
let entrySupermarket = {name:"entrySupermarket", x:560, y:670, width: 50, height: 20};
let entryPokecenter = {name:"entryPokecenter", x:50, y:475, width: 50, height: 20};
let entryArena = {name:"entryArena", x:295, y:575, width: 50, height: 20};

// Baum Arena
let nogoArea = {name:"nogoArea", x:150, y:580, width: 40, height: 100};
// Market
let nogoArea2 = {name:"nogoArea", x:540, y:620, width: 110, height: 30};
// Höhle Seite
let nogoArea3 = {name:"nogoArea", x:790, y:330, width:50, height: 250};
// Baum unten Rechts
let nogoArea4 = {name:"nogoArea", x:895, y:745, width:50, height: 50};
// Höhle Decke
let nogoArea5 = {name:"nogoArea", x:790, y:330, width:200, height: 50};
// Baum über Arena
let nogoArea6 = {name:"nogoArea", x:207, y:430, width:50, height: 50};
// Dach Arena
let nogoArea7 = {name:"nogoArea", x:140, y:510, width:250, height: 59};
// Dach Pokecenter
let nogoArea8 = {name:"nogoArea", x:60, y:309, width:50, height: 250};

let trainerLocation = {name:"trainer", x:207, y:230, width: 55, height: 65};

let currentPokemon;


// Player
// 800 x 712
const player = {
    // Position
    x: 462,
    y: 525,
    // Breite durch Anzahl an Columns teilen.
    width: 67,
    // Hähe des Spritesheets durch Anzahl an Rows teilen.
    height: 89,
    // Für Animation
    frameX: 0,
    frameY: 0,
    moving: false,
    speed: 7,
    stopping: false
};

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

const playerSprite = new Image();
playerSprite.src = "assets/player.png";
const background = new Image();
background.src = "assets/background.png";


function drawSprite(img, sX, sY, sW, sH, dx, dy, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dx, dy, dW, dH);
}


//============================================================================
// Tastatur Detektor
/*
 Leertaste = 32
 F = 70
 H = 72
 K = 75
 B = 66
 */

// KeyDown
window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
    //console.log(keys);
    player.moving = true;
});

// KeyUp
window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
    player.moving = false;
});

// Gehen
function movePlayer() {
    
    // Key ArrUp
    if((keys[38] || keys[87]) && player.y > 0) {    
        if(player.stopping == true) {
            player.y += player.speed + 10;
            player.y += player.speed + 5;
            player.stopping = false;
        }else{
            player.y -= player.speed;
        }
        player.frameY = 3;
        player.moving = true;
    }

    // Key ArrLeft
    if((keys[37] || keys[65]) && player.x > 0) {
        if(player.stopping == true) {
            player.x += player.speed + 10;
            player.x += player.speed + 5;
            player.stopping = false;
        }else{
            player.x -= player.speed;
        }
        player.frameY = 1;
        player.moving = true;
    }

    // Key ArrDown
    if((keys[40] || keys[83]) && player.y < canvas.height - 180) {
        if(player.stopping == true) {
            player.y -= player.speed + 10;
            player.y -= player.speed + 5;
            player.stopping = false;
        }else{
            player.y += player.speed;
        }
        player.frameY = 0;
        player.moving = true;
    }

    // Key ArrRight
    if((keys[39] || keys[68]) && player.x < canvas.width - player.width) {
        if(player.stopping == true) {
            player.x -= player.speed + 10;
            player.x -= player.speed + 5;
            player.stopping = false;
        }else{
            player.x += player.speed;
        }
        player.frameY = 2;
        player.moving = true;
    }

    // Schneller laufen
    if(keys[32]) {    
        player.speed = 20;
    }else{
        player.speed = 7;
    }

        // Position ermitteln
        if(keys[70]) {    
            console.log("P.x:", player.x + " | P.y", player.y)
        }

    if(keys[66]) {
        fetchPokemon(25);
    }
    
}
function handlePlayerFrame(){
    if(player.frameX < 2 && player.moving == true) {
        player.frameX ++;
    }else{
        player.frameX = 0;
    }
}


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimate(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

// Mainloop
function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        //Draw
        // Draw Background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw Player
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();
    otherTrainer();
    handlePlayerFrame();
    collisionDetection();
    requestAnimationFrame(animate);
    // getMousePos();
    // Zeichne als Hilfestellung die Kontaktzonen
    draw_Areas();

    }
}

startAnimate(10);



//============================================================================
// Collision Detection
function collisionDetection() {
    let arrCollisionObjects = [entrySupermarket, grassZone1, grassZone2,
                               grassZone3, entryPokecenter,entryArena, nogoArea, trainerLocation, 
                               nogoArea2, nogoArea3, nogoArea4, nogoArea5, nogoArea6, nogoArea7, nogoArea8];    

        for(let i = 0; i < arrCollisionObjects.length; i++) {
            if(detect(arrCollisionObjects[i]) == true) {
                //console.log("Area: ", arrCollisionObjects[i].name);
                if(arrCollisionObjects[i].name == "entryPokecenter") {
                    window.location = "pokecenter.html";
                }
                
                if(arrCollisionObjects[i].name == "nogoArea") {
                    player.stopping = true;
                   //console.log("Reached nogoArea");
                }else{
                    player.stopping = false;
                }

                if(arrCollisionObjects[i].name == "trainer") {
                    window.location = "trainerBattle.html";
                }

                if(arrCollisionObjects[i].name == "grassZone") {
                    window.location = "battle.html";
                }
            };
        }
}

/*
Original. Unten meine Methode mit verkleinerter Hitbox
        player.x + player.width < obj.x ||
        player.y > obj.y + obj.height ||
        player.y + player.height < obj.y){
*/

function detect(obj) {
    if(player.x + 15 > obj.x + obj.width || 
        player.x + 15 + player.width - 35 < obj.x ||
        player.y + 30 > obj.y + obj.height ||
        player.y + 30 + player.height - 30 < obj.y) {
            // No Collision

        }else{
            //Collision
            console.log("Collision");
            return true;
        }
    
}


function draw_Areas(){
        //Zeichne Supermarkt
        ctx.fillStyle = "rgba(0,250,0, 0.5)";
        ctx.fillRect (entrySupermarket.x, entrySupermarket.y, entrySupermarket.width, entrySupermarket.height);
        //Zeichne Grassland
        ctx.fillRect (grassZone1.x, grassZone1.y, grassZone1.width, grassZone1.height);
        //Zeichne Grassland2
        ctx.fillRect (grassZone2.x, grassZone2.y, grassZone2.width, grassZone2.height);  
        //Zeichne Grassland3
        ctx.fillRect (grassZone3.x, grassZone3.y, grassZone3.width, grassZone3.height); 
        //Zeichne Eingang Pokecenter
        ctx.fillRect (entryPokecenter.x, entryPokecenter.y, entryPokecenter.width, entryPokecenter.height);
        //Zeichne Eingang Arena
        ctx.fillRect (entryArena.x, entryArena.y, entryArena.width, entryArena.height);
        
        // //Zeichne Player Halo
         ctx.fillStyle = "rgba(200,200,0, 0.5)";
         ctx.fillRect (player.x + 15, player.y + 30, player.width - 35, player.height - 30);
        //Zeichne anderen Trainer
        ctx.fillRect (trainerLocation.x, trainerLocation.y, trainerLocation.width, trainerLocation.height);


        //Zeichne Nogo Arena
        ctx.fillStyle = "rgba(255,0,0, 0.5)";
        let nogoAreas = [nogoArea, nogoArea2, nogoArea3, nogoArea4, nogoArea5, nogoArea6, nogoArea7, nogoArea8];
        for(let j = 0; j < nogoAreas.length; j++) {ctx.fillRect (nogoAreas[j].x, nogoAreas[j].y, nogoAreas[j].width, nogoAreas[j].height);}

}


//============================================================================
// Create other Trainer
let lookingDirection = 0;
function otherTrainer() {
    if(lookingDirection == 2) {
        lookingDirection = 0;
    }else{
        lookingDirection ++;
    }
    drawSprite(playerSprite, player.width * 1, player.height * 0 + (player.height * 4), player.width, player.height, 200, 200, player.width, player.height);
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    console.log(`MouseX ${evt.clientX - rect.left}`);
    console.log(`MouseY ${evt.clientY - rect.top}`);
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then(data => {
        console.log(data)
        currentPokemon = new Pokemon(data.id,
                                     data.name,
                                     data.types[0].type.name,
                                     parseInt(Math.random() * 20) + 3,
                                     data.moves[0].move.name,
                                     data.sprites.front_default,
                                     data.sprites.back_default,
                                     data.stats[1].base_stat,
                                     data.stats[2].base_stat,
                                     0)
        console.log(currentPokemon)
    });
}





