//######################################################
// Variablen
//######################################################
let currentWildPokemon;
let myCurrentPokemon;
let wildPokeImage = document.getElementById('imgPoke');
let wildPokeName = document.getElementById('wildPokeName');
let myPokeImage = document.getElementById('imgMyPoke');
let myPokeName = document.getElementById('myPokeName');
let wildPokemonProgress = document.getElementById('wildPokemonProgress');
let myPokemonProgress = document.getElementById('myPokemonProgress');
let myPokemonXPProgress = document.getElementById('myPokemonXPProgress');
let infoBox = document.getElementById('infoBox');
let moveButtons = document.getElementById('moveButtonCont');
let mainButtons = document.getElementById('mainButtonCont');
let myCatchedPokemons = [];
let myTeam = [];
let allMoves = [];
let facedPokemons = [];
let pokeMove;
let currentAttack;
let currentWildPokeHP;
let myCurrentPokemonHP;
let myCurrentPokemonStaticHP;
let iamExecuting = false;
const battleSound2 = new Audio('assets/sound/battle2.mp3');
const victorySound = new Audio('assets/sound/victory.mp3');
let musikIsPlaying = true; // Wenn auf false, wird sie nach erster Aktion abgespielt
let myPokeballAmount = 35;
let todayPokemons = []; // 20 Pokemon werden random mäßig erstellt
const maxPokemon = 898;
const pokemonGenerationen = {
    gen1_start: 1,
    gen1_end: 150,
};
let myCurrentPokemonIndex = 0;




const pokeball = document.getElementById('pokeball');
const mainButton1 = document.getElementById('mainButton1');
const btnAttack0 = document.getElementById('btnAttack0');
const btnAttack1 = document.getElementById('btnAttack1');
const btnAttack2 = document.getElementById('btnAttack2');
const btnAttack3 = document.getElementById('btnAttack3');
const throwPokeball = document.getElementById('mainButton2');
const btn_closeActionwindow = document.getElementById("btn_closeActionwindow");

const pokemon1 = document.getElementById('teamPoke_0');
const pokemon2 = document.getElementById('teamPoke_1');
const pokemon3 = document.getElementById('teamPoke_2');
const pokemon4 = document.getElementById('teamPoke_3');
const outpPokeball = document.getElementById('outpPokeball');

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
    },
};

if (mainButton1) {
    mainButton1.addEventListener('click', () => {
        pokeFight();
    });
}

if (btnAttack0) {
    btnAttack0.addEventListener('click', () => {
        const btnMoveName = btnAttack0.innerText;
        console.log(btnMoveName);
        attackAction(btnMoveName);
    });
}

if (btnAttack1) {
    btnAttack1.addEventListener('click', () => {
        const btnMoveName = btnAttack1.innerText;
        attackAction(btnMoveName);
    });
}

if (btnAttack2) {
    btnAttack2.addEventListener('click', () => {
        const btnMoveName = btnAttack2.innerText;
        attackAction(btnMoveName);
    });
}

if (btnAttack3) {
    btnAttack3.addEventListener('click', () => {
        const btnMoveName = btnAttack3.innerText;
        attackAction(btnMoveName);
    });
}

// Werfe Pokeball
if (throwPokeball) {
    throwPokeball.addEventListener('click', () => {
        catchPokemon();
    });
}

if(btn_closeActionwindow) {
    btn_closeActionwindow.addEventListener("click", ()=> {
        moveButtons.hidden = true;
        mainButtons.hidden = false;
    })
}

//######################################################
// Klassen
//######################################################
class Pokemon {
    constructor(
        id,
        name,
        type,
        level,
        moves,
        spriteFront,
        spriteBack,
        statAttack,
        statDefense,
        xp,
        hp,
        unique_ID,
    ) {
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
    constructor(
        name,
        germanName,
        descr,
        accuracy,
        baseDamage,
        minHits,
        maxHits,
        pp,
        type,
    ) {
        (this.name = name),
            (this.germanName = germanName),
            (this.descr = descr),
            (this.accuracy = accuracy),
            (this.baseDamage = baseDamage),
            (this.minHits = minHits),
            (this.maxHits = maxHits),
            (this.pp = pp),
            (this.type = type);
    }
}

let myStaticPokemon = new Pokemon(
    6,
    'Charizard',
    'fire',
    8,
    'mega-punch',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
    84,
    78,
    0,
    78,
    );


window.onload = init();



function init() {
    // Check first if battle window is open
    if (document.getElementById('battleTag')) {
        load_SaveObj();
        generate_today_Pokemons();
        myPokemonProgress.value = 100;
        wildPokemonProgress.value = 100;
        createMyFirstPokemon()
    }
}

function load_SaveObj() {
    if (localStorage.getItem('stored_save_Object') != null) {
        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
        facedPokemons = save_Object.allFacedPokemons;
        allMoves = save_Object.allPokemonMoves;
        myTeam = save_Object.myPokemonTeam;
        try {
            if(save_Object.allFacedPokemons.length === 0) {
                createMyStarterPokemon()
                createMyFirstPokemon()
            }
            loadMyTeam();
            myPokeballAmount = save_Object.items.pokeballs;
            outpPokeball.innerHTML = myPokeballAmount;
        } catch (error) {
            console.warn('Team konnte nicht angezeigt werden: ', error);
        }
    }else {
        createMyStarterPokemon()
        createMyFirstPokemon()
    }
}



//######################################################
// Statisches Pokemon
//######################################################
function createMyStarterPokemon() {
    // Statisches Pokemon -- Arcanine
    myStaticPokemon = new Pokemon(
        59,
        'Arcanine',
        'fire',
        3,
        ['will-o-wisp', 'hidden-power', 'thief', 'giga-impact', 'teleport'],
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/59.png',
        110,
        80,
        0,
        90,
        'rabdomVal123'
    );
        save_Object.myPokemonTeam.push(myStaticPokemon)
        save_Object.myCatchedPokemons.push(myStaticPokemon)
        save_SaveObj()
        createMyPokemon()
    }

function createMyFirstPokemon() {
    try {
        console.log('myTeam', myTeam);
        const choosenPokemon = myTeam[0];
        if(choosenPokemon.hp > 0) {
            myCurrentPokemonIndex = 0;
            chooseNewPokemon(choosenPokemon);
            showInfoBox(`Los ${makeFirstLetterBig(choosenPokemon.name)}. Du schaffst das`);
        }else {alert('Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden')}
    } catch (error) {
        console.log(error);
    }

}

function save_SaveObj() {
    localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));
    console.log('SaveObj', save_Object);
}

//myPokemonTeam
function loadMyTeam() {
    for (let i = 0; i < myTeam.length; i++) {
        document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront;
    }
}

// Funktion erstellt zufällig 20 Pokemon. Diese sollen für einen Tag abgespeichert
// werden und die möglichen Pokemon bildem, denen man begegnen kann

function generate_today_Pokemons() {
    if (today_equal_savedDay() === true) {
        todayPokemons = save_Object.today_Pokemons;
        createWildPokemon();
    } else {
        // const min = pokemonGenerationen.gen1_start;
        // const max = pokemonGenerationen.gen1_end;
        const min = 1;
        const max = 850;

        for (let i = 1; i <= 20; i++) {
            const randomPokemon = Math.floor(Math.random() * (max - min)) + min;
            todayPokemons.push(randomPokemon);
        }
        save_Object.today_Pokemons = todayPokemons;
        save_Object.today_Date = createDateFromToday();
        save_SaveObj();
        createWildPokemon();
    }
}

function today_equal_savedDay() {
    const checkDay = save_Object.today_Date;
    const today = createDateFromToday();

    if (checkDay === today) {
        return true;
    } else {
        return false;
    }
}

function createDateFromToday() {
    const date = new Date();
    const day = addZero(date.getDate());
    const month = addZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const today = `${day}.${month}.${year}`;
    return today;
}

function addZero(val) {
    if (val < 10) {
        val = `0${val}`;
    }
    return val;
}

function currentRandomPokemon() {
    const randomPokemon = parseInt(Math.random() * todayPokemons.length);
    fetchPokemon(todayPokemons[randomPokemon]);
}

function uniqueID_Generator() {
    const rndStuff = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '$',
        '!',
        '1',
        '2',
        '3',
        '4',
        '8',
        '7',
        '6',
        '5',
        '9',
        '0',
        '#',
    ];
    let key = '';
    for (let i = 1; i <= 36; i++) {
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
    myCurrentPokemonStaticHP = myStaticPokemon.hp;
    myPokeName.innerHTML = `${makeFirstLetterBig(myStaticPokemon.name)} | Lv.${
        myStaticPokemon.level
    } -- KP.${myStaticPokemon.hp}`;
    console.log('MyCreated', myStaticPokemon);
}

//######################################################
// Erstellt Zufallszahl und checkt, ob ID bereits im Array FacedPokemons gespeichert ist,
// wenn nein, Fetch Request an Poke API
//######################################################
function createWildPokemon() {
    let randomPokemon = parseInt(Math.random() * todayPokemons.length);
    randomPokemon = todayPokemons[randomPokemon];
    let foundIdInFacedPokemonArray = false;
    // ? Checke FacedPokemon Array
    console.log('facedPokemons', facedPokemons);
    for (let i = 0; i < facedPokemons.length; i++) {
        if (randomPokemon === facedPokemons[i].id) {
            currentWildPokemon = new Pokemon(
                facedPokemons[i].id,
                makeFirstLetterBig(facedPokemons[i].name),
                facedPokemons[i].type,
                parseInt(Math.random() * 20) + 3,
                facedPokemons[i].moves,
                facedPokemons[i].spriteFront,
                facedPokemons[i].spriteBack,
                facedPokemons[i].statAttack,
                facedPokemons[i].statDefense,
                facedPokemons[i].xp,
                facedPokemons[i].hp,
            );

            wildPokeImage.src = currentWildPokemon.spriteFront;
            // wildPokeImage.style.opacity = "1";
            wildPokeName.innerHTML = `${makeFirstLetterBig(
                currentWildPokemon.name,
            )} | Lv. ${currentWildPokemon.level} -- KP.${
                currentWildPokemon.hp
            }`;
            currentWildPokeHP = currentWildPokemon.hp;
            console.log('Found Pokemon in FacedPokemons', currentWildPokemon);
            foundIdInFacedPokemonArray = true;
            break;
        }
    }

    // Pokemon nicht im Array facedPokemons enthalten, also Fetch Req
    if (foundIdInFacedPokemonArray === false) {
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
        .then((data) => {
            console.log('data', data);
            let four_moves = [];
            for (let i = 0; i <= 4; i++) {
                const randomMove =
                    Math.floor(Math.random() * (data.moves.length - 1)) + 1;
                four_moves.push(data.moves[randomMove].move.name);
            }
            currentWildPokemon = new Pokemon(
                data.id,
                data.name,
                data.types[0].type.name,
                parseInt(Math.random() * 20) + 3,
                four_moves,
                data.sprites.front_default,
                data.sprites.back_default,
                data.stats[1].base_stat,
                data.stats[2].base_stat,
                data.base_experience,
                data.stats[0].base_stat,
            );
            console.log('currentWildPokemon', currentWildPokemon);
            // Wildes Pokemon rendern
            wildPokeImage.src = currentWildPokemon.spriteFront;
            wildPokeImage.style.opacity = '1';
            wildPokeName.innerHTML = `${makeFirstLetterBig(
                currentWildPokemon.name,
            )} | Lv. ${currentWildPokemon.level} -- KP.${
                currentWildPokemon.hp
            }`;
            currentWildPokeHP = currentWildPokemon.hp;
            showInfoBox(
                `Ein wildes ${makeFirstLetterBig(
                    currentWildPokemon.name,
                )} erscheint`,
            );
            // Pokemon auf dem Gerät abspeichern, um beim nächsten mal keinen erneuten Fetch Request auszulösen
            save_Object.allFacedPokemons.push(currentWildPokemon);
            save_SaveObj();
        })
        .catch((error) => {
            console.warn(error);
            createWildPokemon();
        });
}

//######################################################
// Wichtige Informationen einer Attacke fetchen und ganze Attacke abspeichern
//######################################################
function fetchAttack(nameId) {
    fetch(`https://pokeapi.co/api/v2/move/${nameId}/`)
        .then((res) => res.json())
        .then((data) => {
            console.log('Move', data);
            pokeMove = new PokeMove(
                data.name,
                data.names[4].name,
                data.flavor_text_entries[22].flavor_text,
                data.accuracy,
                data.power,
                data.meta.minHits,
                data.meta.maxHits,
                data.pp,
                data.type.name,
            );
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
    for (let i = 0; i < allMoves.length; i++) {
        if (moveName === allMoves[i].name) {
            currentAttack = new PokeMove(
                allMoves[i].name,
                allMoves[i].germanName,
                allMoves[i].descr,
                allMoves[i].accuracy,
                allMoves[i].baseDamage,
                allMoves[i].minHits,
                allMoves[i].maxHits,
                allMoves[i].pp,
                allMoves[i].type,
            );
            console.log('GeladenMove:', allMoves);
            foundMoveInAllMoves = true;
            pokeMove = currentAttack;
        }
    }

    if (foundMoveInAllMoves === false) {
        fetchAttack(moveName);
    }

    setTimeout(() => {
        myPokemonAttack('myPokemon');
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
    let defPokeType = currentWildPokemon.type;
    const typeCalc = 0.5; // Typ Attacke wird mit Typ verteidigendesPokemon verglichen 0x / 0.5x / 1x / 2x --TODO: Funktion für den Vergleich bauen
    let whoIsAffected = 'wildPokemon';
    // Wenn wildes Pokemon angreift
    if (whoIsExecuting === 'wildPokemon') {
        lv = currentWildPokemon.level;
        defPokeLv = myStaticPokemon.level;
        attackVal = currentWildPokemon.statAttack;
        defenceVal = myStaticPokemon.statDefense;
        defPokeType = myStaticPokemon.type;
        whoIsAffected = 'myPokemon';
    } else {
    }

    // Grundsätzliche Berechnung des Schadens
    const rawDamage =
        (lv * 0.4 + 2) *
        attbaseDamage *
        (attackVal / (defenceVal + 50 + defPokeLv)) *
        3 *
        f2 *
        (z / 100);
    const damage = parseInt((rawDamage * typeCalc) / 20);

    // Wenn wildes Pokemon am Zug ist
    if (whoIsExecuting === 'wildPokemon') {
        myCurrentPokemonHP -= damage;
        if (damage > 0) {
            myPokeImage.classList.add('getAttacked');
            setTimeout(() => {
                myPokeImage.classList.remove('getAttacked');
            }, 600);
        }
    } else {
        currentWildPokeHP -= damage;
        if(damage > 0) {
            wildPokeImage.classList.add('getAttacked');
            setTimeout(() => {
                wildPokeImage.classList.remove('getAttacked');
            }, 600);
        }
    }
    animateProgressBar(damage, whoIsAffected);
}

//######################################################

//######################################################
function animateProgressBar(damage, whoIsAffected) {
    let fullHP = currentWildPokemon.hp;
    let currentHP = currentWildPokeHP;
    let hpInPercent = parseInt((currentHP * 100) / fullHP);
    let effectedImage = wildPokeImage;
    let effectedPokeName = wildPokeName;
    let effectedProgressbar = wildPokemonProgress;
    let atackerPokemon = myStaticPokemon;
    let defenderPokemon = currentWildPokemon;

    if (whoIsAffected === 'myPokemon') {
        fullHP = myCurrentPokemonStaticHP;
        currentHP = myCurrentPokemonHP;
        hpInPercent = parseInt((currentHP * 100) / fullHP);
        effectedImage = myPokeImage;
        effectedPokeName = myPokeName;
        effectedProgressbar = myPokemonProgress;
        atackerPokemon = currentWildPokemon;
        defenderPokemon = myStaticPokemon;
    }
    console.log(
        `whoIsAffected: ${whoIsAffected} // fullHP ${fullHP} // currentHP ${currentHP}  hpInPercent: ${hpInPercent}`,
    );

    // Balken anzeigen
    if (hpInPercent <= 0) {
        effectedProgressbar.style.width = 0;
        console.log('effectedProgressbar.value', effectedProgressbar.value);
    } else {
        if (damage > 0) {
            // effectedProgressbar.style.width = `${hpInPercent}%`;
            effectedProgressbar.value = hpInPercent;
            console.log('effectedProgressbar', effectedProgressbar);
        }
    }

    // Auswirkungsanzeige
    setTimeout(() => {
        // Textbox
        if (hpInPercent <= 0) {
            // Textbox
            showInfoBox(
                `${makeFirstLetterBig(defenderPokemon.name)} wurde besiegt`,
            );
            // Besiegtes Pokemon verschwindet
            effectedImage.classList.add('getDestroyed');
            setTimeout(() => {
                effectedImage.style.opacity = '0';
                effectedPokeName.innerHTML = '';
                if(whoIsAffected === 'myPokemon') {
                    myPokemonXPProgress.style.width = '0%'
                }
            }, 400);
            if (whoIsAffected !== 'myPokemon') {
                battleSound2.pause();
                victorySound.play();
            }
        } else {
            showInfoBox(
                `${makeFirstLetterBig(atackerPokemon.name)} führt "${
                    makeFirstLetterBig(pokeMove.name)
                }" aus und richtet ${damage} Schaden an.`,
            );
            effectedPokeName.innerHTML = `${makeFirstLetterBig(
                defenderPokemon.name,
            )} | Lv. ${defenderPokemon.level} | KP.${currentHP}`;
        }
    }, 1000);

    setTimeout(() => {
        checkWhoExecuteNext();
    }, 2000);
}

// Angreifer ist Objektname Verteidiger Inhalte
pokeType_Normal = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1];
function checkPokeTypes() {}

// Gameloop

function checkWhoExecuteNext() {
    if (iamExecuting === true) {
        enableMainButtons();
        iamExecuting = false;
    } else {
        disableMainButtons();
        ki_Move();
        iamExecuting = true;
    }
}

//######################################################

//######################################################

function ki_Move() {
    if (currentWildPokeHP > 0) {
        const randomMove = parseInt(
            Math.random() * currentWildPokemon.moves.length,
        );
        const move = currentWildPokemon.moves[randomMove];
        fetchAttack(move);
        setTimeout(() => {
            myPokemonAttack('wildPokemon');
        }, 3000);
    } else {
        // Battle Szene hier beenden
        level_up();
        setTimeout(() => {           
            window.location.reload();
        }, 3000);
    }
}

//######################################################
// Wildes Pokemon fangen
//######################################################

function catchPokemon() {
    // Abfragen, ob man noch Pokebälle hat
    if (myPokeballAmount > 0) {
        myPokeballAmount--;
        outpPokeball.innerHTML = myPokeballAmount;
        pokeball.classList.add('active');
        setTimeout(() => {
            pokeball.classList.remove('active');
            const fullHP = currentWildPokemon.hp;
            const hpInPercent = parseInt((currentWildPokeHP * 100) / fullHP);
            const catchquote =
                25 +
                parseInt((Math.random() * hpInPercent) / 2) -
                parseInt(Math.random() * (hpInPercent + 5));

            if (catchquote >= 25) {
                // Unsichtbar machen
                wildPokeImage.style.opacity = '0';
                wildPokeName.innerHTML = '';
                showInfoBox(
                    `${makeFirstLetterBig(
                        currentWildPokemon.name,
                    )} wurde gefangen`,
                );
                save_Object.myCatchedPokemons.push(currentWildPokemon);
                save_SaveObj();
                setTimeout(() => {
                    showInfoBox(`${myStaticPokemon.name} erhält 20xp`);
                    window.location.reload();
                }, 1000);
            } else {
                showInfoBox(
                    `${makeFirstLetterBig(
                        currentWildPokemon.name,
                    )} lässt sich nicht fangen`,
                );
                checkWhoExecuteNext()
            }
        }, 1500);
    } else {
        showInfoBox(`Nicht genug Pokebälle`);
    }
}

//######################################################
// Macht den Anfangsbuchstaben groß
//######################################################
function makeFirstLetterBig(word) {
    const firstLetter = word[0];
    let exportword = firstLetter.toUpperCase();
    for (let i = 1; i < word.length; i++) {
        exportword += word[i];
    }
    return exportword;
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
    document.getElementById('mainButton1').disabled = true;
    document.getElementById('mainButton2').disabled = true;
}

function enableMainButtons() {
    mainButtons.style.backgroundColor = 'rgba(0, 0, 10, 0.384)';
    document.getElementById('mainButton1').disabled = false;
    document.getElementById('mainButton2').disabled = false;
}

//######################################################
// Move Steuerung
//######################################################
function pokeFight() {
    showMoveButtons();
}

function attackAction(btnMoveName) {
    showMainButtons(btnMoveName);
    init_Move(btnMoveName);
}

// function attack2() {
//     playBattleSound();
// }

// function attack3() {
//     playBattleSound();
// }

// ########################################################
// Schicke ein anderes Pokemon in den Kampf
if (pokemon1) {
    pokemon1.addEventListener('click', () => {
        try {
            const choosenPokemon = myTeam[0];
            if(choosenPokemon.hp > 0) {
                myCurrentPokemonIndex = 0;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(`Los ${makeFirstLetterBig(choosenPokemon.name)}. Du schaffst das`);
            }else {alert('Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden')}
        } catch (error) {}
    });
}

if (pokemon2) {
    pokemon2.addEventListener('click', () => {
        try {
            const choosenPokemon = myTeam[1];
            if(choosenPokemon.hp > 0) {
                myCurrentPokemonIndex = 1;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(`Los ${makeFirstLetterBig(choosenPokemon.name)}. Du schaffst das`);
            }else {alert('Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden')}
        } catch (error) {}
    });
}

if (pokemon3) {
    pokemon3.addEventListener('click', () => {
        try {
            const choosenPokemon = myTeam[2];
            if(choosenPokemon.hp > 0) {
                myCurrentPokemonIndex = 2;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(`Los ${makeFirstLetterBig(choosenPokemon.name)}. Du schaffst das`);
            }else {alert('Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden')}
        } catch (error) {}
    });
}

if (pokemon4) {
    pokemon4.addEventListener('click', () => {
        try {
            const choosenPokemon = myTeam[3];
            if(choosenPokemon.hp > 0) {
                myCurrentPokemonIndex = 3;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(`Los ${makeFirstLetterBig(choosenPokemon.name)}. Du schaffst das`);
            }else {alert('Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden')}
        } catch (error) {}
    });
}

function chooseNewPokemon(choosenPokemon) {
        console.log('myStaticPokemon.id',myStaticPokemon.id);
        myStaticPokemon.id = choosenPokemon.id;
        myStaticPokemon.name = choosenPokemon.name;
        myStaticPokemon.src = choosenPokemon.spriteBack;
        myStaticPokemon.type = choosenPokemon.type;
        myStaticPokemon.level = choosenPokemon.level;
        myStaticPokemon.moves = choosenPokemon.moves;
        myStaticPokemon.statAttack = choosenPokemon.statAttack;
        myStaticPokemon.statDefense = choosenPokemon.statDefense;
        myStaticPokemon.xp = choosenPokemon.xp;
        myStaticPokemon.hp = choosenPokemon.hp;
        myStaticPokemon.unique_ID = choosenPokemon.unique_ID;
        myPokeImage.style.opacity = '1';
        myPokeImage.src = choosenPokemon.spriteBack;
        myCurrentPokemonHP = choosenPokemon.hp;
        myCurrentPokemonStaticHP = choosenPokemon.hp;
        myPokemonXPProgress.style.width = '10%'
        myPokemonXPProgress.value = myStaticPokemon.xp;
        myPokemonProgress.style.width = '30%'
        myPokemonProgress.value = 100;
        myPokeName.innerHTML = `${makeFirstLetterBig(
            choosenPokemon.name,
        )} | Lv.${choosenPokemon.level} -- KP.${choosenPokemon.hp}`;
        document.getElementById('windowMenu').classList.remove('active');
        // Lade Moves
        for (let i = 0; i <= 3; i++) {
            document.getElementById(`btnAttack${i}`).innerText =
                myStaticPokemon.moves[i];
        }
}


function level_up() {
    const enemyLevel = currentWildPokemon.level;
    let currentLevel = myStaticPokemon.level;
    const oldXP = myStaticPokemon.xp;
    const calcXP = Math.floor((enemyLevel * 4) + (myStaticPokemon.hp + 160) / (currentLevel + 3));
    const newXP = oldXP + calcXP;
    let pokemonIndex = -1;
    for (let i = 0; i < save_Object.myCatchedPokemons.length; i++) {
        if (myStaticPokemon.unique_ID === save_Object.myCatchedPokemons[i].unique_ID) {
            pokemonIndex = i;
            console.log('Gefunden', pokemonIndex);
            break;
        }
    }
    if(oldXP <= 300) {
        if(newXP > 300) {
            const newLevel = currentLevel++;
            save_Object.myPokemonTeam[myCurrentPokemonIndex].level = currentLevel;
            save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = 0;
            save_Object.myCatchedPokemons[pokemonIndex].xp = 0;
            save_Object.myCatchedPokemons[pokemonIndex].level = currentLevel;
            myPokemonXPProgress.value = myStaticPokemon.xp
            save_SaveObj();
            showInfoBox(`${makeFirstLetterBig(myStaticPokemon.name)} erreicht Level ${currentLevel}`);
            setTimeout(() => {
                myPokeName.innerHTML = `${makeFirstLetterBig(myStaticPokemon.name)} | Lv.${
                    currentLevel
                } -- KP.${myStaticPokemon.hp}`;
            }, 1000);
        }else {
            save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = newXP;
            save_Object.myCatchedPokemons[pokemonIndex].xp = newXP;
            myPokemonXPProgress.value = myStaticPokemon.xp
            save_SaveObj();
            showInfoBox(`${makeFirstLetterBig(myStaticPokemon.name)} erhält ${calcXP} XP`);
        }

    }else if(oldXP > 300) {
        const newLevel = currentLevel++;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].level = currentLevel;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = 0;
        save_Object.myCatchedPokemons[pokemonIndex].xp = 0;
        save_Object.myCatchedPokemons[pokemonIndex].level = currentLevel;
        myPokemonXPProgress.value = myStaticPokemon.xp
        save_SaveObj();
        showInfoBox(`${makeFirstLetterBig(myStaticPokemon.name)} erreicht Level ${currentLevel}`);
        setTimeout(() => {
            myPokeName.innerHTML = `${makeFirstLetterBig(myStaticPokemon.name)} | Lv.${
                currentLevel
            } -- KP.${myStaticPokemon.hp}`;
        }, 1000);
    }
}



/**
 * // Leveln
    func leveln(){
        allocateXPAndGk()
        let enLv = enemyPokemonLevel
        let oldXP = currentXP
                                                        print(" \(currentEnemyPokemon) / enLv \(enLv)")
        // Formel
        //let calcXP = (currentGK * enLv * 2 + myLife + 100) / (level - 3)
        let calcXP = (currentGK * enLv * 2 + myLife + 160) / (level - 3)

                                                        print("calcXP \(calcXP)")
        // Neue Zuweisung
        let newXP = currentXP + calcXP
                                                        print("newXP \(newXP)")
        // prüfen ob level erhöht werden kann
        if oldXP <= 100 {
            if newXP > 100{
                level += 1
                let resetXP = 0
                currentXP = resetXP
                // level löschen und erneut speichern
                pokemonLevel.removeValue(forKey: currentPokemon)
                pokemonLevel[currentPokemon] = level
                UserDefaults.standard.set(pokemonLevel, forKey: "gespPokemonLevel")
                xP[currentPokemon] = resetXP
                UserDefaults.standard.set(xP, forKey: "gespXp")
                CreateAlert(title: "Level +1", message: "\(currentPokemon) hat level \(level) erreicht")
                let sizeOfXpFrame = currentXP * 2
                lblXP.frame = CGRect(x: 60, y: 314, width: sizeOfXpFrame, height: 12)
                lblXP.text = "   XP:\(currentXP)  +\(calcXP)"
                LifeInPercent.text = "\(nameOfMyFightingPokemon) L.\(level) - \(myLife)%"
                // prüfen ob sich pokemon weiterentwickeln kann weil 10er Stufe erreicht
                //checkingEvolve()
            }else{
                xP[currentPokemon] = newXP
                currentXP = newXP
                UserDefaults.standard.set(xP, forKey: "gespXp")
                let sizeOfXpFrame = currentXP * 2
                lblXP.frame = CGRect(x: 60, y: 314, width: sizeOfXpFrame, height: 12)
                lblXP.text = "   XP:\(currentXP)  +\(calcXP)"
                print("\(currentPokemon): xP: \(currentXP) / GK: \(currentGK)")
            }
        }else if oldXP > 100{
                  level += 1
                  let resetXP = 0
                  currentXP = resetXP
                  // level löschen und erneut speichern
                  pokemonLevel.removeValue(forKey: currentPokemon)
                  pokemonLevel[currentPokemon] = level
                  UserDefaults.standard.set(pokemonLevel, forKey: "gespPokemonLevel")
                  xP[currentPokemon] = resetXP
                  UserDefaults.standard.set(xP, forKey: "gespXp")
                  CreateAlert(title: "Level +1", message: "\(currentPokemon) hat level \(level) erreicht")
                  let sizeOfXpFrame = currentXP * 2
                  lblXP.frame = CGRect(x: 60, y: 314, width: sizeOfXpFrame, height: 12)
                  lblXP.text = "   XP:\(currentXP)  +\(calcXP)"
                  LifeInPercent.text = "\(nameOfMyFightingPokemon) L.\(level) - \(myLife)%"
        }


    }


 */
