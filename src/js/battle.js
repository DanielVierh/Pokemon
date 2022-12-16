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
let variableMoveName = false;
let isHealing = false;
let avarageLevel = 0;

const pokeball = document.getElementById('pokeball');
const mainButton1 = document.getElementById('mainButton1');
const btnAttack0 = document.getElementById('btnAttack0');
const btnAttack1 = document.getElementById('btnAttack1');
const btnAttack2 = document.getElementById('btnAttack2');
const btnAttack3 = document.getElementById('btnAttack3');
const throwPokeball = document.getElementById('mainButton2');
const btn_closeActionwindow = document.getElementById('btn_closeActionwindow');

const pokemon1 = document.getElementById('teamPoke_0');
const pokemon2 = document.getElementById('teamPoke_1');
const pokemon3 = document.getElementById('teamPoke_2');
const pokemon4 = document.getElementById('teamPoke_3');
const outpPokeball = document.getElementById('outpPokeball');
const img_Animat = document.getElementById('img_Animat');
const wildPkeBattleCard = document.getElementById('wildPkeBattleCard');
const myPkeBattleCard = document.getElementById('myPkeBattleCard');

let save_Object = {
    today_Date: '',
    myPokemonTeam: [],
    myCatchedPokemons: [],
    allFacedPokemons: [],
    allPokemonMoves: [],
    today_Pokemons: [],
    items: {
        pokeballs: 60,
        money: 100,
        beleber: 5,
        trank: 5,
        bonbon: 3,
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
        if (myCurrentPokemonHP > 0) {
            catchPokemon();
        }
    });
}

if (btn_closeActionwindow) {
    btn_closeActionwindow.addEventListener('click', () => {
        moveButtons.hidden = true;
        mainButtons.hidden = false;
    });
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
        specialDefense,
        xp,
        hp,
        maxHp,
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
        this.specialDefense = specialDefense;
        this.xp = xp;
        this.hp = hp;
        this.maxHp = maxHp;
        this.unique_ID = uniqueID_Generator();
    }
    isDefeated = false;
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
        healing,
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
        this.healing = healing;
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
        createMyFirstPokemon();
    }
}

function load_SaveObj() {
    if (localStorage.getItem('stored_save_Object') != null) {
        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
        facedPokemons = save_Object.allFacedPokemons;
        allMoves = save_Object.allPokemonMoves;
        myTeam = save_Object.myPokemonTeam;
        try {
            if (save_Object.allFacedPokemons.length === 0) {
                createMyStarterPokemon();
                createMyFirstPokemon();
            }
            loadMyTeam();
            myPokeballAmount = save_Object.items.pokeballs;
            outpPokeball.innerHTML = myPokeballAmount;
        } catch (error) {
            console.warn('Team konnte nicht angezeigt werden: ', error);
        }
    } else {
        createMyStarterPokemon();
        createMyFirstPokemon();
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
        70,
        0,
        90,
        90,
        'rabdomVal123',
    );
    save_Object.myPokemonTeam.push(myStaticPokemon);
    save_Object.myCatchedPokemons.push(myStaticPokemon);
    save_SaveObj();
    createMyPokemon();
}

function createMyFirstPokemon() {
    let nextAvailablePokemon = 0;
    for (let i = 0; i < myTeam.length; i++) {
        if (myTeam[i].isDefeated === false) {
            nextAvailablePokemon = i;
            break;
        }
    }
    try {
        const choosenPokemon = myTeam[nextAvailablePokemon];
        if (choosenPokemon.isDefeated === false) {
            myCurrentPokemonIndex = nextAvailablePokemon;
            chooseNewPokemon(choosenPokemon);
            showInfoBox(
                `Los ${makeFirstLetterBig(
                    choosenPokemon.name,
                )}. Du schaffst das`,
            );
        } else {
            alert(
                'Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden',
            );
        }
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
    let levelSum = 0;
    for (let i = 0; i < myTeam.length; i++) {
        document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront;
        levelSum = levelSum += myTeam[i].level;
        if (myTeam[i].isDefeated === true) {
            document.getElementById(`teamPoke_${i}`).classList.add('defeat');
        }
    }
    // Durchschnittslevel berechnen
    avarageLevel = parseInt(levelSum / myTeam.length);
}

// Funktion erstellt zufällig 25 Pokemon. Diese sollen für einen Tag abgespeichert
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

        for (let i = 1; i <= 30; i++) {
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
    myCurrentPokemonStaticHP = myStaticPokemon.maxHp;
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
                parseInt(Math.random() * avarageLevel) + 3,
                facedPokemons[i].moves,
                facedPokemons[i].spriteFront,
                facedPokemons[i].spriteBack,
                facedPokemons[i].statAttack,
                facedPokemons[i].statDefense,
                facedPokemons[i].specialDefense,
                facedPokemons[i].xp,
                facedPokemons[i].hp,
                facedPokemons[i].maxHp,
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
                data.stats[4].base_stat,
                data.base_experience,
                data.stats[0].base_stat,
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
                data.meta.healing,
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
                allMoves[i].healing,
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
    let attbaseDamage = pokeMove.baseDamage;
    let attackVal = myStaticPokemon.statAttack;
    let defenceVal = currentWildPokemon.statDefense;
    let specialDefenseVal = currentWildPokemon.specialDefense;
    const f2 = Math.random() * (1.3 - 1) + 1;
    const z = 100 - parseInt(Math.random() * 15 + 1);
    const healVal = pokeMove.healing;
    console.log('healVal', healVal);
    let attackType = pokeMove.type;
    let defPokeType = currentWildPokemon.type;
    const typeCalc = checkPokeTypes(attackType, defPokeType); // Typ Attacke wird mit Typ verteidigendesPokemon verglichen 0x / 0.5x / 1x / 2x --TODO: Funktion für den Vergleich bauen
    let whoIsAffected = 'wildPokemon';
    variableMoveName = false;
    isHealing = false;

    // Wenn wildes Pokemon angreift
    if (whoIsExecuting === 'wildPokemon') {
        // Wenn Basedamage = 0 soll per zufall tackle ausgeführt werden
        if (attbaseDamage === null && randomize()) {
            attackType = 'normal';
            attbaseDamage = 50;
            variableMoveName = true;
        }

        lv = currentWildPokemon.level;
        defPokeLv = myStaticPokemon.level;
        attackVal = currentWildPokemon.statAttack;
        defenceVal = myStaticPokemon.statDefense;
        specialDefenseVal = myStaticPokemon.specialDefense;
        defPokeType = myStaticPokemon.type;
        whoIsAffected = 'myPokemon';
    } else {
    }

    // Grundsätzliche Berechnung des Schadens
    // Am 13.12 abgeändert, (lv * 0.4_Auf_0,2 + 2)
    const rawDamage =
        (lv * 0.2 + 2) *
        attbaseDamage *
        (attackVal / (defenceVal + 50 + defPokeLv + specialDefenseVal)) *
        3 *
        f2 *
        (z / 100);

    const damage = parseInt((rawDamage * typeCalc) / 20);

    //Todo:  Wenn Heil Move verwendet
    if (healVal != undefined && healVal > 0) {
        isHealing = true;
    }

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
        if (damage > 0) {
            img_Animat.classList.add('active');
            setTimeout(() => {
                img_Animat.classList.remove('active');
            }, 300);
            wildPokeImage.classList.add('getAttacked');
            setTimeout(() => {
                wildPokeImage.classList.remove('getAttacked');
            }, 600);
        }
    }
    animateProgressBar(damage, whoIsAffected, healVal);
}

//######################################################

//######################################################
function animateProgressBar(damage, whoIsAffected, healVal) {
    let fullHP = currentWildPokemon.maxHp;
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

    // Balken anzeigen
    if (hpInPercent <= 0) {
        effectedProgressbar.style.width = 0;
    } else {
        if (damage > 0) {
            effectedProgressbar.value = hpInPercent;
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
                if (whoIsAffected === 'myPokemon') {
                    myPokemonXPProgress.style.width = '0%';
                    save_Object.myPokemonTeam[
                        myCurrentPokemonIndex
                    ].isDefeated = true;
                    document
                        .getElementById(`teamPoke_${myCurrentPokemonIndex}`)
                        .classList.add('defeat');
                    save_SaveObj();
                }
            }, 400);
            if (whoIsAffected !== 'myPokemon') {
                battleSound2.pause();
                victorySound.play();
            }
        } else {
            if (variableMoveName === false) {
                showInfoBox(
                    `${makeFirstLetterBig(
                        atackerPokemon.name,
                    )} führt "${makeFirstLetterBig(
                        pokeMove.name,
                    )}" aus und richtet ${damage} Schaden an.`,
                );
            } else {
                showInfoBox(
                    `${makeFirstLetterBig(
                        atackerPokemon.name,
                    )} führt "Tackle" aus und richtet ${damage} Schaden an.`,
                );
            }

            effectedPokeName.innerHTML = `${makeFirstLetterBig(
                defenderPokemon.name,
            )} | Lv. ${defenderPokemon.level} | KP.${currentHP}`;
        }
    }, 1000);

    setTimeout(() => {
        checkWhoExecuteNext();
    }, 2000);
}

// Gameloop
function checkWhoExecuteNext() {
    if (iamExecuting === true) {
        enableMainButtons();
        iamExecuting = false;
        wildPkeBattleCard.classList.remove('active');
        myPkeBattleCard.classList.add('active');
    } else {
        disableMainButtons();
        ki_Move();
        iamExecuting = true;
        myPkeBattleCard.classList.remove('active');
        wildPkeBattleCard.classList.add('active');
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
        //? Battle Szene endet hier
        save_Object.myPokemonTeam[myCurrentPokemonIndex].hp =
            myCurrentPokemonHP;
        // Speichert pro Sieg einen Geldbetrag wild pokemon lv / 2 Todo später verringern
        save_Object.items.money += parseInt(currentWildPokemon.level / 2);
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
        save_Object.items.pokeballs = myPokeballAmount;
        save_SaveObj();
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
                save_Object.myPokemonTeam[myCurrentPokemonIndex].hp =
                    myCurrentPokemonHP;
                level_up();
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
                checkWhoExecuteNext();
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
    if (myCurrentPokemonHP > 0) {
        showMoveButtons();
    }
}

function attackAction(btnMoveName) {
    showMainButtons(btnMoveName);
    init_Move(btnMoveName);
}

// ########################################################
// Schicke ein anderes Pokemon in den Kampf
if (pokemon1) {
    pokemon1.addEventListener('click', () => {
        try {
            try {
                save_Object.myPokemonTeam[myCurrentPokemonIndex].hp =
                    myCurrentPokemonHP;
                save_SaveObj();
            } catch (error) {
                console.log('Error Error', error);
            }

            const choosenPokemon = myTeam[0];
            if (choosenPokemon.isDefeated === false) {
                myCurrentPokemonIndex = 0;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(
                    `Los ${makeFirstLetterBig(
                        choosenPokemon.name,
                    )}. Du schaffst das`,
                );
                checkWhoExecuteNext();
            } else {
                alert(
                    'Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden',
                );
            }
        } catch (error) {}
    });
}

if (pokemon2) {
    pokemon2.addEventListener('click', () => {
        try {
            try {
                save_Object.myPokemonTeam[myCurrentPokemonIndex].hp =
                    myCurrentPokemonHP;
                save_SaveObj();
            } catch (error) {
                console.log('Error Error', error);
            }
            const choosenPokemon = myTeam[1];
            if (choosenPokemon.isDefeated === false) {
                myCurrentPokemonIndex = 1;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(
                    `Los ${makeFirstLetterBig(
                        choosenPokemon.name,
                    )}. Du schaffst das`,
                );
                checkWhoExecuteNext();
            } else {
                alert(
                    'Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden',
                );
            }
        } catch (error) {}
    });
}

if (pokemon3) {
    pokemon3.addEventListener('click', () => {
        try {
            try {
                save_Object.myPokemonTeam[myCurrentPokemonIndex].hp =
                    myCurrentPokemonHP;
                save_SaveObj();
            } catch (error) {
                console.log('Error Error', error);
            }
            const choosenPokemon = myTeam[2];
            if (choosenPokemon.isDefeated === false) {
                myCurrentPokemonIndex = 2;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(
                    `Los ${makeFirstLetterBig(
                        choosenPokemon.name,
                    )}. Du schaffst das`,
                );
                checkWhoExecuteNext();
            } else {
                alert(
                    'Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden',
                );
            }
        } catch (error) {}
    });
}

if (pokemon4) {
    pokemon4.addEventListener('click', () => {
        try {
            try {
                save_Object.myPokemonTeam[myCurrentPokemonIndex].hp =
                    myCurrentPokemonHP;
                save_SaveObj();
            } catch (error) {
                console.log('Error Error', error);
            }
            const choosenPokemon = myTeam[3];
            if (choosenPokemon.isDefeated === false) {
                myCurrentPokemonIndex = 3;
                chooseNewPokemon(choosenPokemon);
                showInfoBox(
                    `Los ${makeFirstLetterBig(
                        choosenPokemon.name,
                    )}. Du schaffst das`,
                );
                checkWhoExecuteNext();
            } else {
                alert(
                    'Ein besiegtes Pokemon kann nicht in den Kampf geschickt werden',
                );
            }
        } catch (error) {}
    });
}

function chooseNewPokemon(choosenPokemon) {
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
    myCurrentPokemonStaticHP = choosenPokemon.maxHp;
    myPokemonXPProgress.style.width = '10%';
    myPokemonXPProgress.value = myStaticPokemon.xp;
    myPokemonProgress.style.width = '30%';
    const hpInPercent = parseInt(
        (myCurrentPokemonHP * 100) / myCurrentPokemonStaticHP,
    );
    myPokemonProgress.value = hpInPercent;
    myPokeName.innerHTML = `${makeFirstLetterBig(choosenPokemon.name)} | Lv.${
        choosenPokemon.level
    } -- KP.${choosenPokemon.hp}`;
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
    const calcXP = Math.floor(
        enemyLevel * 4 + (myStaticPokemon.hp + 160) / (currentLevel + 3),
    );
    const newXP = oldXP + calcXP;
    let pokemonIndex = -1;
    for (let i = 0; i < save_Object.myCatchedPokemons.length; i++) {
        if (
            myStaticPokemon.unique_ID ===
            save_Object.myCatchedPokemons[i].unique_ID
        ) {
            pokemonIndex = i;
            console.log('Gefunden', pokemonIndex);
            break;
        }
    }
    if (oldXP <= 400) {
        if (newXP > 400) {
            const newLevel = currentLevel++;
            const levelDevideBy5 = currentLevel % 5;
            let newAttackMessage = '';
            let newAttackName = '';
            // ? Wenn Level 5 Modulus = 0, soll neue Attacke gelernt werden
            if (levelDevideBy5 === 0) {
                console.log('Ist = 0');
                const pokemonId = save_Object.myPokemonTeam[myCurrentPokemonIndex].id;
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log('Newdata', data);
                        newAttackName = data.moves[Math.floor(Math.random() * (data.moves.length))].move.name;
                        newAttackMessage = `${makeFirstLetterBig(myStaticPokemon.name)} lernt ${newAttackName}`;
                        save_Object.myCatchedPokemons[pokemonIndex].moves.push(newAttackName)
                        save_Object.myPokemonTeam[myCurrentPokemonIndex].level = currentLevel;
                        save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = 0;
                        save_Object.myPokemonTeam[myCurrentPokemonIndex].hp += 1;
                        save_Object.myPokemonTeam[myCurrentPokemonIndex].maxHp += 1;
                        save_Object.myPokemonTeam[myCurrentPokemonIndex].statAttack += 1;
                        save_Object.myPokemonTeam[myCurrentPokemonIndex].statDefense += 1;
                        save_Object.myCatchedPokemons[pokemonIndex].xp = 0;
                        save_Object.myCatchedPokemons[pokemonIndex].level = currentLevel;
                        save_Object.myCatchedPokemons[pokemonIndex].maxHp += 1;
                        save_Object.myCatchedPokemons[pokemonIndex].hp += 1;
                        save_Object.myCatchedPokemons[pokemonIndex].statAttack += 1;
                        save_Object.myCatchedPokemons[pokemonIndex].statDefense += 1;
                        myPokemonXPProgress.value = myStaticPokemon.xp;
                        save_SaveObj();
                        showInfoBox(`${makeFirstLetterBig(
                            myStaticPokemon.name,
                        )} erreicht Level ${currentLevel} <br>
                    Gesundheit: + 1 <br>
                    Angriff: + 1 <br>
                    Verteidigung: + 1 <br>
                    ${newAttackMessage}`);
                        setTimeout(() => {
                            myPokeName.innerHTML = `${makeFirstLetterBig(
                                myStaticPokemon.name,
                            )} | Lv.${currentLevel} -- KP.${myStaticPokemon.hp}`;
                        }, 1000);
                    })
                    .catch((error) => {
                        console.warn(error);
                    });
                    // ? Normales Leveln ohne neue Attacke zu erlernen
            }else {
                save_Object.myPokemonTeam[myCurrentPokemonIndex].level = currentLevel;
                save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = 0;
                save_Object.myPokemonTeam[myCurrentPokemonIndex].hp += 1;
                save_Object.myPokemonTeam[myCurrentPokemonIndex].maxHp += 1;
                save_Object.myPokemonTeam[myCurrentPokemonIndex].statAttack += 1;
                save_Object.myPokemonTeam[myCurrentPokemonIndex].statDefense += 1;
                save_Object.myCatchedPokemons[pokemonIndex].xp = 0;
                save_Object.myCatchedPokemons[pokemonIndex].level = currentLevel;
                save_Object.myCatchedPokemons[pokemonIndex].maxHp += 1;
                save_Object.myCatchedPokemons[pokemonIndex].hp += 1;
                save_Object.myCatchedPokemons[pokemonIndex].statAttack += 1;
                save_Object.myCatchedPokemons[pokemonIndex].statDefense += 1;
                myPokemonXPProgress.value = myStaticPokemon.xp;
                save_SaveObj();
                showInfoBox(`${makeFirstLetterBig(
                    myStaticPokemon.name,
                )} erreicht Level ${currentLevel} <br>
            Gesundheit: + 1 <br>
            Angriff: + 1 <br>
            Verteidigung: + 1`);
                setTimeout(() => {
                    myPokeName.innerHTML = `${makeFirstLetterBig(
                        myStaticPokemon.name,
                    )} | Lv.${currentLevel} -- KP.${myStaticPokemon.hp}`;
                }, 1000);
            }
        } else {
            save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = newXP;
            save_Object.myCatchedPokemons[pokemonIndex].xp = newXP;
            myPokemonXPProgress.value = myStaticPokemon.xp;
            save_SaveObj();
            showInfoBox(
                `${makeFirstLetterBig(
                    myStaticPokemon.name,
                )} erhält ${calcXP} XP`,
            );
        }
    } else if (oldXP > 400) {
        const newLevel = currentLevel++;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].level = currentLevel;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].xp = 0;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].hp += 1;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].maxHp += 1;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].statAttack += 1;
        save_Object.myPokemonTeam[myCurrentPokemonIndex].statDefense += 1;
        save_Object.myCatchedPokemons[pokemonIndex].xp = 0;
        save_Object.myCatchedPokemons[pokemonIndex].level = currentLevel;
        save_Object.myCatchedPokemons[pokemonIndex].hp += 1;
        save_Object.myCatchedPokemons[pokemonIndex].maxHp += 1;
        save_Object.myCatchedPokemons[pokemonIndex].statAttack += 1;
        save_Object.myCatchedPokemons[pokemonIndex].statDefense += 1;
        myPokemonXPProgress.value = myStaticPokemon.xp;
        save_SaveObj();
        showInfoBox(`${makeFirstLetterBig(
            myStaticPokemon.name,
        )} erreicht Level ${currentLevel} <br>
        Gesundheit: + 1 <br>
        Angriff: + 1 <br>
        Verteidigung: + 1`);
        setTimeout(() => {
            myPokeName.innerHTML = `${makeFirstLetterBig(
                myStaticPokemon.name,
            )} | Lv.${currentLevel} -- KP.${myStaticPokemon.hp}`;
        }, 1000);
    }
}

function checkPokeTypes(attackType, defenderType) {
    console.log('attackType', attackType);
    switch (attackType) {
        case 'fire':
            img_Animat.src = `./assets/mv_fire.png`;
            break;
        case 'electric':
            img_Animat.src = `./assets/mv_electro.png`;
            break;
        case 'water':
            img_Animat.src = `./assets/mv_water.png`;
            break;
        case 'normal':
            img_Animat.src = `./assets/mv_normal.png`;
            break;
        case 'rock':
            img_Animat.src = `./assets/mv_rock.png`;
            break;
        case 'grass':
            img_Animat.src = `./assets/mv_grass.png`;
            break;
        default:
            img_Animat.src = `./assets/mv_normal.png`;
            break;
    }

    const attackTypeValues = {
        normal: {
            200: [],
            100: [
                'normal',
                'fighting',
                'flying',
                'poison',
                'ground',
                'bug',
                'fire',
                'water',
                'grass',
                'electric',
                'psychic',
                'ice',
                'dragon',
                'dark',
                'fairy',
            ],
            50: ['rock', 'steel'],
            0: ['ghost'],
        },
        fighting: {
            200: ['normal', 'rock', 'steel', 'ice', 'dark'],
            100: [
                'fighting',
                'ground',
                'fire',
                'water',
                'grass',
                'electric',
                'dragon',
            ],
            50: ['flying', 'poison', 'bug', 'psychic', 'fairy'],
            0: ['ghost'],
        },
        flying: {
            200: ['fighting', 'bug', 'grass'],
            100: [
                'normal',
                'flying',
                'poison',
                'ground',
                'ghost',
                'fire',
                'water',
                'psychic',
                'ice',
                'dragon',
                'dark',
                'fairy',
            ],
            50: ['rock', 'steel', 'electric'],
            0: [],
        },
        poison: {
            200: ['grass', 'fairy'],
            100: [
                'normal',
                'fighting',
                'flying',
                'bug',
                'fire',
                'water',
                'electric',
                'psychic',
                'ice',
                'dragon',
                'dark',
            ],
            50: ['poison', 'ground', 'rock', 'ghost'],
            0: ['steel'],
        },
        ground: {
            200: ['poison', 'rock', 'steel', 'fire', 'electric'],
            100: [
                'normal',
                'fighting',
                'ground',
                'ghost',
                'water',
                'psychic',
                'ice',
                'dragon',
                'dark',
                'fairy',
            ],
            50: ['bug', 'grass'],
            0: ['flying'],
        },
        rock: {
            200: ['flying', 'bug', 'fire', 'ice'],
            100: [
                'normal',
                'poison',
                'rock',
                'ghost',
                'water',
                'grass',
                'electric',
                'psychic',
                'dragon',
                'dark',
                'fairy',
            ],
            50: ['fighting', 'ground', 'steel'],
            0: [],
        },
        bug: {
            200: ['grass', 'psychic', 'dark'],
            100: [
                'normal',
                'ground',
                'rock',
                'bug',
                'water',
                'electric',
                'ice',
                'dragon',
            ],
            50: [
                'fighting',
                'flying',
                'poison',
                'ghost',
                'steel',
                'fire',
                'fairy',
            ],
            0: [],
        },
        ghost: {
            200: ['ghost', 'psychic'],
            100: [
                'fighting',
                'flying',
                'poison',
                'ground',
                'rock',
                'bug',
                'steel',
                'fire',
                'water',
                'grass',
                'electric',
                'ice',
                'dragon',
                'fairy',
            ],
            50: ['dark'],
            0: ['normal'],
        },
        steel: {
            200: ['rock', 'ice', 'fairy'],
            100: [
                'normal',
                'fighting',
                'flying',
                'poison',
                'ground',
                'bug',
                'ghost',
                'grass',
                'psychic',
                'dragon',
                'dark',
            ],
            50: ['steel', 'fire', 'water', 'electric'],
            0: [],
        },
        fire: {
            200: ['bug', 'steel', 'grass', 'ice'],
            100: [
                'normal',
                'fighting',
                'flying',
                'poison',
                'ground',
                'ghost',
                'electric',
                'psychic',
                'dark',
                'fairy',
            ],
            50: ['rock', 'fire', 'water', 'dragon'],
            0: [],
        },
        water: {
            200: ['ground', 'rock', 'fire'],
            100: [
                'normal',
                'fighting',
                'flying',
                'poison',
                'bug',
                'ghost',
                'steel',
                'electric',
                'psychic',
                'ice',
                'dark',
                'fairy',
            ],
            50: ['water', 'grass', 'dragon'],
            0: [],
        },
        grass: {
            200: ['ground', 'rock', 'water'],
            100: [
                'normal',
                'fighting',
                'ghost',
                'electric',
                'psychic',
                'ice',
                'dark',
                'fairy',
            ],
            50: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
            0: [],
        },
        electric: {
            200: ['flying', 'water'],
            100: [
                'normal',
                'fighting',
                'poison',
                'rock',
                'bug',
                'ghost',
                'steel',
                'fire',
                'psychic',
                'ice',
                'dark',
                'fairy',
            ],
            50: ['grass', 'electric', 'dragon'],
            0: ['ground'],
        },
        psychic: {
            200: ['fighting', 'poison'],
            100: [
                'normal',
                'flying',
                'ground',
                'rock',
                'bug',
                'ghost',
                'fire',
                'water',
                'grass',
                'electric',
                'ice',
                'dragon',
                'fairy',
            ],
            50: ['steel', 'psychic'],
            0: ['dark'],
        },
        ice: {
            200: ['flying', 'ground', 'grass', 'dragon'],
            100: [
                'normal',
                'fighting',
                'poison',
                'rock',
                'bug',
                'ghost',
                'electric',
                'psychic',
                'dark',
                'fairy',
            ],
            50: ['steel', 'fire', 'water', 'ice'],
            0: [],
        },
        dragon: {
            200: ['dragon'],
            100: [
                'normal',
                'fighting',
                'flying',
                'poison',
                'ground',
                'rock',
                'bug',
                'ghost',
                'fire',
                'water',
                'grass',
                'electric',
                'psychic',
                'ice',
                'dark',
            ],
            50: ['steel'],
            0: ['fairy'],
        },
        dark: {
            200: ['ghost', 'psychic'],
            100: [
                'normal',
                'flying',
                'poison',
                'ground',
                'rock',
                'bug',
                'steel',
                'fire',
                'water',
                'grass',
                'electric',
                'ice',
                'dragon',
            ],
            50: ['fighting', 'dark', 'fairy'],
            0: [],
        },
        fairy: {
            200: ['fighting', 'dragon', 'dark'],
            100: [
                'normal',
                'flying',
                'ground',
                'rock',
                'bug',
                'ghost',
                'water',
                'grass',
                'electric',
                'psychic',
                'ice',
                'fairy',
            ],
            50: ['poison', 'steel', 'fire'],
            0: [],
        },
    };

    let attackTypeValue = 0;
    let attackReturnValue = 0;
    const keyWord = `${attackType}`;
    const effectedPokemonArrays = attackTypeValues[keyWord];
    for (const [key, value] of Object.entries(effectedPokemonArrays)) {
        if (value.includes(defenderType)) {
            attackTypeValue = parseInt(key);
            parseInt(attackTypeValue);
            break;
        }
    }

    if (attackTypeValue === 200) {
        attackReturnValue = 2;
    }
    if (attackTypeValue === 100) {
        attackReturnValue = 1;
    }
    if (attackTypeValue === 50) {
        attackReturnValue = 0.5;
    }
    if (attackTypeValue === 0) {
        attackReturnValue = 0;
    }

    return attackReturnValue;
}

function randomize() {
    const randomnumber = Math.random();
    if (randomnumber <= 0.5) {
        return true;
    } else {
        return false;
    }
}
