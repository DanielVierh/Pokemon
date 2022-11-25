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
let iamExecuting = false;
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
        // const min = pokemonGenerationen.gen1_start;
        // const max = pokemonGenerationen.gen1_end;
        const min = 1;
        const max = 850;

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
// Quelle: https://www.pokewiki.de/Schaden
// Formel für Schadensberechnung
// Schaden=⌊((Level⋅25+2)⋅Basisschaden⋅(Sp.) Angr.50⋅(Sp.) Vert.⋅F1+2)⋅Volltreffer⋅F2⋅Z100⋅STAB⋅Typ1⋅Typ2⋅F3⌋
//!!!!!
// Schaden = ((angriffPokeLevel * 40% + 2) * baseDamage * (angriffstatAttack / 50 + VertPokestatDefense) * 1 + 2) * Volltreffer * F2 * (Z / 100) * 1.5 * Typverrechnung
// [((lv 25 * 40% + 2) * tackle=40 (Glurak Angr 84 / 50 + Magneton Vert 95) * 3) * 1,1 * (95 / 100) * 1,5] *  WertAusTypvergl=FeuerVsElektro=1
// ((12) * 40 * (0,58) * 3)) * 1,1 * (0,95) * 1,5 * 1 = 1.309
//!!!!!
// Level gibt das aktuelle Level des Angreifers an und kann dementsprechend zwischen 1 und 100 variieren.
// (Sp.-)Angr. gibt allgemein den Angriffs- bzw. Spezial-Angriffs-Wert des Angreifers an
// Volltreffer ist für gewöhnlich 1 (Berechnung aus Accuracy)
// Z ist ein Wert, der berechnet wird, indem von 100 eine zufällige Zahl zwischen 0 und 15 abgezogen wird
// F2 zwischen 1 und 1,3

// Die Bezeichnungen Typ1 und Typ2 stellen die Effektivität der genutzten Attacke auf das Ziel dar. Ist die Attacke nicht sehr effektiv gegenüber dem Typen des Ziels,
// ist der Faktor 0,5, ist er sehr effektiv, wird 2 eingesetzt und hat sie keinen Einfluss auf den Gegner, so wird 0 eingesetzt. In allen anderen Fällen wird 1 eingesetzt
//######################################################
function myPokemonAttack(whoIsExecuting) {
    // Initwerte sind so eingestellt, dass ein Angriff von meinem Pokemon aus geht
    let lv = myStaticPokemon.level;
    let defPokeLv = currentWildPokemon.level;
    const attbaseDamage = pokeMove.baseDamage;
    let attackVal = myStaticPokemon.statAttack;
    let defenceVal = currentWildPokemon.statDefense;
    const f2 = Math.random() * (1.3 - 1) + 1;
    const z = 100 - parseInt(Math.random() * 15 + 1);
    const attackType = pokeMove.type;
    let defPokeType =  currentWildPokemon.type;
    const typeCalc = 0.5; // Typ Attacke wird mit Typ verteidigendesPokemon verglichen 0x / 0.5x / 1x / 2x --TODO: Funktion für den Vergleich bauen
    let whoIsAffected = 'wildPokemon';

    // Wenn wildes Pokemon angreift
    if(whoIsExecuting === 'wildPokemon') {
        lv = currentWildPokemon.level;
        defPokeLv = myStaticPokemon.level;
        attackVal = currentWildPokemon.statAttack;
        defenceVal = myStaticPokemon.statDefense;
        defPokeType = myStaticPokemon.type;
        whoIsAffected = 'myPokemon';
    }else{

    }



    // Grundsätzliche Berechnung des Schadens
    const rawDamage = ((lv * 0.4) + 2) * attbaseDamage * (attackVal / (defenceVal + 50 + defPokeLv)) * 3 * f2 * (z / 100);
    const damage = parseInt((rawDamage * typeCalc) / 20);

    // Wenn wildes Pokemon am Zug ist
    if(whoIsExecuting === 'wildPokemon') {
        // console.log(`MyPokemon got attacked: ${myCurrentPokemonHP} - Damage: ${damage} = ${myCurrentPokemonHP - damage}`);
            myCurrentPokemonHP -= damage;
        // console.log(`WldPokeAttacke: ((Lv.${lv} * 0.4) + 2) * AttackName: ${pokeMove.name} attbaseDamage: ${attbaseDamage} * (attackVal: ${attackVal} / (defenceVal: ${defenceVal}
                    // + 50 + defPokeLv:${defPokeLv}=${defenceVal+50+defPokeLv})) * 3 * f2: ${f2} * (z: ${z} / 100)`);
        // console.log(`rawDamage= ${rawDamage}`);
        // console.log(`TypAtt: ${attackType} | TypDefPoke: ${defPokeType} =  typeCalc: ${typeCalc}`);
    }else{
        // console.log(`currentWildPokeHP: ${currentWildPokeHP} - Damage: ${damage} = ${currentWildPokeHP - damage}`);
            currentWildPokeHP -= damage;
        // console.log(`MyStaticPokemon: ${myStaticPokemon}`);
        // console.log(`((Lv.${lv} * 0.4) + 2) * AttackName: ${pokeMove.name} attbaseDamage: ${attbaseDamage} * (attackVal: ${attackVal} / (defenceVal: ${defenceVal}
                    // + 50 + defPokeLv:${defPokeLv}=${defenceVal+50+defPokeLv})) * 3 * f2: ${f2} * (z: ${z} / 100)`);
        // console.log(`rawDamage= ${rawDamage}`);
        // console.log(`TypAtt: ${attackType} | TypDefPoke: ${defPokeType} =  typeCalc: ${typeCalc}`);
    }

    console.log('MyPokemon', myStaticPokemon);
    animateProgressBar(damage, whoIsAffected);

}


//######################################################

//######################################################
function animateProgressBar(damage, whoIsAffected) {

    let fullHP = currentWildPokemon.hp;
    let currentHP = currentWildPokeHP;
    let hpInPercent = parseInt(currentHP * 100 / fullHP);
    let effectedImage = wildPokeImage;
    let effectedPokeName = wildPokeName;
    let effectedProgressbar = wildPokemonProgress;
    let atackerPokemon = myStaticPokemon;
    let defenderPokemon = currentWildPokemon;

    if(whoIsAffected === 'myPokemon') {
        fullHP = myStaticPokemon.hp;
        currentHP = myCurrentPokemonHP;
        hpInPercent = parseInt(currentHP * 100 / fullHP);
        effectedImage = myPokeImage;
        effectedPokeName = myPokeName;
        effectedProgressbar = myPokemonProgress;
        atackerPokemon = currentWildPokemon;
        defenderPokemon = myStaticPokemon;
    }
    console.log(`whoIsAffected: ${whoIsAffected} // fullHP ${fullHP} // currentHP ${currentHP}  hpInPercent: ${hpInPercent}`);

            // Balken anzeigen
    if(hpInPercent <= 0) {
        effectedProgressbar.style.width = '0%';
    }else{
        effectedProgressbar.style.width = `${hpInPercent}%`;
    }

    // Auswirkungsanzeige
    setTimeout(() => {
        // Textbox
        if(hpInPercent <= 0) {
            // Textbox
            showInfoBox(`${makeFirstLetterBig(defenderPokemon.name)} wurde besiegt`);
            // Besiegtes Pokemon verschwindet
            effectedImage.style.opacity = "0";
            effectedPokeName.innerHTML = "";
            // Neues Pokemon wird erstellt, dient nur zum testen
            // setTimeout(() => {
            //     createWildPokemon();
            // }, 5000);
            if(whoIsAffected !== 'myPokemon') {
                battleSound2.pause();
                victorySound.play();
            }
        }else{
            showInfoBox(`${makeFirstLetterBig(atackerPokemon.name)} führt "${pokeMove.name}" aus und richtet ${damage} Schaden an.`);
            effectedPokeName.innerHTML = `${makeFirstLetterBig(defenderPokemon.name)} | Lv. ${defenderPokemon.level} | KP.${currentHP}`
        }

    }, 1000);

    setTimeout(() => {
        checkWhoExecuteNext();
    }, 2000);

}

// Angreifer ist Objektname Verteidiger Inhalte
pokeType_Normal = [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1]
console.log(pokeType_Normal.length);
function checkPokeTypes() {

}

// Gameloop

function checkWhoExecuteNext() {
    if(iamExecuting === true) {
        enableMainButtons();
        iamExecuting = false;
    }else{
        disableMainButtons();
        ki_Move();
        iamExecuting = true;
    }
}

//######################################################

//######################################################

function ki_Move() {
    if(currentWildPokeHP > 0) {
        const randomMove = parseInt(Math.random() * currentWildPokemon.moves.length);
        const move = currentWildPokemon.moves[randomMove];
        fetchAttack(move);
        setTimeout(() => {
            myPokemonAttack('wildPokemon')
        }, 3000);
    }else{
        // Battle Szene hier beenden
        setTimeout(() => {
            console.log("Szene beendet");
            showInfoBox(`${myStaticPokemon.name} erhält 20xp`);
            window.Location = "pokedex.html";
        }, 5000);
    }
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


//######################################################
// Move Steuerung
//######################################################
function pokeFight() {
    showMoveButtons();
}

function attack1() {
    // debugger
    showMainButtons();
    const btnMoveName = document.getElementById("btnAttack1").innerText;
    init_Move(btnMoveName);
    wildPokeImage.classList.add("getAttacked");
    setTimeout(() => {
        wildPokeImage.classList.remove("getAttacked");
    }, 600);
}



function attack2() {
    playBattleSound();
}

function attack3() {
    playBattleSound();

}
