/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-template/./src/scss/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/store.js */ \"./src/js/store.js\");\n/* harmony import */ var _js_store_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_store_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_pokedex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/pokedex.js */ \"./src/js/pokedex.js\");\n/* harmony import */ var _js_pokedex_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_pokedex_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/script.js */ \"./src/js/script.js\");\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_battle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/battle.js */ \"./src/js/battle.js\");\n/* harmony import */ var _js_battle_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_battle_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://project-template/./src/index.js?");

/***/ }),

/***/ "./src/js/battle.js":
/*!**************************!*\
  !*** ./src/js/battle.js ***!
  \**************************/
/***/ (() => {

eval("//######################################################\r\n// Variablen\r\n//######################################################\r\nlet currentWildPokemon;\r\nlet myCurrentPokemon;\r\nlet wildPokeImage = document.getElementById('imgPoke');\r\nlet wildPokeName = document.getElementById('wildPokeName');\r\nlet myPokeImage = document.getElementById('imgMyPoke');\r\nlet myPokeName = document.getElementById('myPokeName');\r\nlet wildPokemonProgress = document.getElementById('wildPokemonProgress');\r\nlet myPokemonProgress = document.getElementById('myPokemonProgress');\r\nlet infoBox = document.getElementById('infoBox');\r\nlet moveButtons = document.getElementById('moveButtonCont');\r\nlet mainButtons = document.getElementById('mainButtonCont');\r\nlet myCatchedPokemons = [];\r\nlet myTeam = [];\r\nlet allMoves = [];\r\nlet facedPokemons = [];\r\nlet pokeMove;\r\nlet currentAttack;\r\nlet currentWildPokeHP;\r\nlet myCurrentPokemonHP;\r\nlet iamExecuting = false;\r\nconst battleSound2 = new Audio('assets/sound/battle2.mp3');\r\nconst victorySound = new Audio('assets/sound/victory.mp3');\r\nlet musikIsPlaying = true; // Wenn auf false, wird sie nach erster Aktion abgespielt\r\nlet myPokeballAmount = 35;\r\nlet todayPokemons = []; // 20 Pokemon werden random mäßig erstellt\r\nconst maxPokemon = 898;\r\nconst pokemonGenerationen = {\r\n    gen1_start: 1,\r\n    gen1_end: 150,\r\n};\r\nconst pokeball = document.getElementById('pokeball');\r\nconst mainButton1 = document.getElementById('mainButton1');\r\nconst btnAttack1 = document.getElementById('btnAttack1');\r\nconst throwPokeball = document.getElementById(\"mainButton2\");\r\n\r\n\r\nlet save_Object = {\r\n    today_Date: '',\r\n    myPokemonTeam: [],\r\n    myCatchedPokemons: [],\r\n    allFacedPokemons: [],\r\n    allPokemonMoves: [],\r\n    today_Pokemons: [],\r\n    items: {\r\n        pokeballs: 20,\r\n        money: 100,\r\n    },\r\n};\r\n\r\nif (mainButton1) {\r\n    mainButton1.addEventListener('click', () => {\r\n        pokeFight();\r\n    });\r\n}\r\n\r\nif (btnAttack1) {\r\n    btnAttack1.addEventListener('click', () => {\r\n        console.log('Action Button wird ausgelöst');\r\n        attack1();\r\n    });\r\n}\r\n\r\n// Werfe Pokeball\r\nif(throwPokeball) {\r\n    throwPokeball.addEventListener(\"click\", ()=> {\r\n        catchPokemon()\r\n    })\r\n}\r\n\r\n//######################################################\r\n// Klassen\r\n//######################################################\r\nclass Pokemon {\r\n    constructor(\r\n        id,\r\n        name,\r\n        type,\r\n        level,\r\n        moves,\r\n        spriteFront,\r\n        spriteBack,\r\n        statAttack,\r\n        statDefense,\r\n        xp,\r\n        hp,\r\n        unique_ID,\r\n    ) {\r\n        this.id = id;\r\n        this.name = name;\r\n        this.type = type;\r\n        this.level = level;\r\n        this.moves = moves;\r\n        this.spriteFront = spriteFront;\r\n        this.spriteBack = spriteBack;\r\n        this.statAttack = statAttack;\r\n        this.statDefense = statDefense;\r\n        this.xp = xp;\r\n        this.hp = hp;\r\n        this.unique_ID = uniqueID_Generator();\r\n    }\r\n}\r\n\r\nclass PokeMove {\r\n    constructor(\r\n        name,\r\n        germanName,\r\n        descr,\r\n        accuracy,\r\n        baseDamage,\r\n        minHits,\r\n        maxHits,\r\n        pp,\r\n        type,\r\n    ) {\r\n        (this.name = name),\r\n            (this.germanName = germanName),\r\n            (this.descr = descr),\r\n            (this.accuracy = accuracy),\r\n            (this.baseDamage = baseDamage),\r\n            (this.minHits = minHits),\r\n            (this.maxHits = maxHits),\r\n            (this.pp = pp),\r\n            (this.type = type);\r\n    }\r\n}\r\n\r\n//######################################################\r\n// Statisches Pokemon\r\n//######################################################\r\n// Statisches Pokemon -- Glurak\r\nlet myStaticPokemon = new Pokemon(\r\n    6,\r\n    'Charizard',\r\n    'fire',\r\n    8,\r\n    'mega-punch',\r\n    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',\r\n    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',\r\n    84,\r\n    78,\r\n    0,\r\n    78,\r\n);\r\n\r\nwindow.onload = init();\r\n\r\nfunction init() {\r\n    // Check first if battle window is open\r\n    if (document.getElementById('battleTag')) {\r\n        load_SaveObj();\r\n        generate_today_Pokemons();\r\n        myPokemonProgress.value = 100;\r\n        wildPokemonProgress.value = 100;\r\n        createMyPokemon();\r\n    }\r\n}\r\n\r\nfunction load_SaveObj() {\r\n    if (localStorage.getItem('stored_save_Object') != null) {\r\n        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));\r\n        facedPokemons = save_Object.allFacedPokemons;\r\n        allMoves = save_Object.allPokemonMoves;\r\n    }\r\n}\r\n\r\nfunction save_SaveObj() {\r\n    localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));\r\n    console.log('SaveObj', save_Object);\r\n}\r\n\r\n// Funktion erstellt zufällig 20 Pokemon. Diese sollen für einen Tag abgespeichert\r\n// werden und die möglichen Pokemon bildem, denen man begegnen kann\r\n\r\nfunction generate_today_Pokemons() {\r\n    if (today_equal_savedDay() === true) {\r\n        todayPokemons = save_Object.today_Pokemons;\r\n        console.log('todayPokemons aus saved: ', todayPokemons);\r\n        createWildPokemon();\r\n    } else {\r\n        // const min = pokemonGenerationen.gen1_start;\r\n        // const max = pokemonGenerationen.gen1_end;\r\n        const min = 1;\r\n        const max = 850;\r\n\r\n        for (let i = 1; i <= 20; i++) {\r\n            const randomPokemon = Math.floor(Math.random() * (max - min)) + min;\r\n            todayPokemons.push(randomPokemon);\r\n        }\r\n        save_Object.today_Pokemons = todayPokemons;\r\n        save_Object.today_Date = createDateFromToday();\r\n        save_SaveObj();\r\n        createWildPokemon();\r\n        console.log('Today Pokemons', todayPokemons);\r\n    }\r\n}\r\n\r\nfunction today_equal_savedDay() {\r\n    const checkDay = save_Object.today_Date;\r\n    const today = createDateFromToday();\r\n\r\n    if (checkDay === today) {\r\n        return true;\r\n    } else {\r\n        return false;\r\n    }\r\n}\r\n\r\nfunction createDateFromToday() {\r\n    const date = new Date();\r\n    const day = addZero(date.getDate());\r\n    const month = addZero(date.getMonth() + 1);\r\n    const year = date.getFullYear();\r\n    const today = `${day}.${month}.${year}`;\r\n    return today;\r\n}\r\n\r\nfunction addZero(val) {\r\n    if (val < 10) {\r\n        val = `0${val}`;\r\n    }\r\n    return val;\r\n}\r\n\r\nfunction currentRandomPokemon() {\r\n    const randomPokemon = parseInt(Math.random() * todayPokemons.length);\r\n    fetchPokemon(todayPokemons[randomPokemon]);\r\n}\r\n\r\nfunction uniqueID_Generator() {\r\n    const rndStuff = [\r\n        'A',\r\n        'B',\r\n        'C',\r\n        'D',\r\n        'E',\r\n        'F',\r\n        'G',\r\n        'H',\r\n        'I',\r\n        'J',\r\n        'K',\r\n        'L',\r\n        'M',\r\n        'N',\r\n        'O',\r\n        'P',\r\n        'Q',\r\n        'R',\r\n        'S',\r\n        'T',\r\n        'U',\r\n        'V',\r\n        'W',\r\n        'X',\r\n        'Y',\r\n        'Z',\r\n        '$',\r\n        '!',\r\n        '1',\r\n        '2',\r\n        '3',\r\n        '4',\r\n        '8',\r\n        '7',\r\n        '6',\r\n        '5',\r\n        '9',\r\n        '0',\r\n        '#',\r\n    ];\r\n    let key = '';\r\n    for (let i = 1; i <= 36; i++) {\r\n        key += rndStuff[parseInt(Math.random() * rndStuff.length)];\r\n    }\r\n    return key;\r\n}\r\n\r\n//######################################################\r\n// Mein Pokemon rendern\r\n//######################################################\r\nfunction createMyPokemon() {\r\n    myPokeImage.src = myStaticPokemon.spriteBack;\r\n    myCurrentPokemonHP = myStaticPokemon.hp;\r\n    myPokeName.innerHTML = `${makeFirstLetterBig(myStaticPokemon.name)} | Lv.${\r\n        myStaticPokemon.level\r\n    } -- KP.${myStaticPokemon.hp}`;\r\n}\r\n\r\n//######################################################\r\n// Erstellt Zufallszahl und checkt, ob ID bereits im Array FacedPokemons gespeichert ist,\r\n// wenn nein, Fetch Request an Poke API\r\n//######################################################\r\nfunction createWildPokemon() {\r\n    let randomPokemon = parseInt(Math.random() * todayPokemons.length);\r\n    randomPokemon = todayPokemons[randomPokemon]\r\n    console.log('randomPokemon', randomPokemon);\r\n    let foundIdInFacedPokemonArray = false;\r\n    // ? Checke FacedPokemon Array\r\n    console.log('facedPokemons', facedPokemons);\r\n    for (let i = 0; i < facedPokemons.length; i++) {\r\n        if (randomPokemon === facedPokemons[i].id) {\r\n            currentWildPokemon = new Pokemon(\r\n                facedPokemons[i].id,\r\n                facedPokemons[i].name,\r\n                facedPokemons[i].type,\r\n                parseInt(Math.random() * 20) + 3,\r\n                facedPokemons[i].moves,\r\n                facedPokemons[i].spriteFront,\r\n                facedPokemons[i].spriteBack,\r\n                facedPokemons[i].statAttack,\r\n                facedPokemons[i].statDefense,\r\n                facedPokemons[i].xp,\r\n                facedPokemons[i].hp,\r\n            );\r\n\r\n            wildPokeImage.src = currentWildPokemon.spriteFront;\r\n            // wildPokeImage.style.opacity = \"1\";\r\n            wildPokeName.innerHTML = `${makeFirstLetterBig(\r\n                currentWildPokemon.name,\r\n            )} | Lv. ${currentWildPokemon.level} -- KP.${\r\n                currentWildPokemon.hp\r\n            }`;\r\n            currentWildPokeHP = currentWildPokemon.hp;\r\n            console.log('Found Pokemon in FacedPokemons');\r\n            foundIdInFacedPokemonArray = true;\r\n            break;\r\n        }\r\n    }\r\n\r\n    // Pokemon nicht im Array facedPokemons enthalten, also Fetch Req\r\n    if (foundIdInFacedPokemonArray === false) {\r\n        console.log('Nicht gefunden also fetchPokemon mit ID ', randomPokemon);\r\n        fetchPokemon(randomPokemon);\r\n    }\r\n}\r\n\r\n//######################################################\r\n// Fetch Request an Poke API. Kann mittels ID oder Name übergeben werden\r\n//######################################################\r\n\r\nfunction fetchPokemon(id) {\r\n    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)\r\n        .then((res) => res.json())\r\n        .then((data) => {\r\n            console.log('data', data);\r\n            let four_moves = [];\r\n            for (let i = 0; i <= 4; i++) {\r\n                const randomMove =\r\n                    Math.floor(Math.random() * (data.moves.length - 1)) + 1;\r\n                four_moves.push(data.moves[randomMove].move.name);\r\n            }\r\n            currentWildPokemon = new Pokemon(\r\n                data.id,\r\n                data.name,\r\n                data.types[0].type.name,\r\n                parseInt(Math.random() * 20) + 3,\r\n                four_moves,\r\n                data.sprites.front_default,\r\n                data.sprites.back_default,\r\n                data.stats[1].base_stat,\r\n                data.stats[2].base_stat,\r\n                data.base_experience,\r\n                data.stats[0].base_stat,\r\n            );\r\n            console.log('currentWildPokemon', currentWildPokemon);\r\n            // Wildes Pokemon rendern\r\n            wildPokeImage.src = currentWildPokemon.spriteFront;\r\n            wildPokeImage.style.opacity = '1';\r\n            wildPokeName.innerHTML = `${makeFirstLetterBig(\r\n                currentWildPokemon.name,\r\n            )} | Lv. ${currentWildPokemon.level} -- KP.${\r\n                currentWildPokemon.hp\r\n            }`;\r\n            currentWildPokeHP = currentWildPokemon.hp;\r\n            showInfoBox(\r\n                `Ein wildes ${makeFirstLetterBig(\r\n                    currentWildPokemon.name,\r\n                )} erscheint`,\r\n            );\r\n            // Pokemon auf dem Gerät abspeichern, um beim nächsten mal keinen erneuten Fetch Request auszulösen\r\n            save_Object.allFacedPokemons.push(currentWildPokemon);\r\n            save_SaveObj();\r\n        }).catch (error => {\r\n            console.warn(error)\r\n            createWildPokemon()\r\n        })\r\n\r\n}\r\n\r\n//######################################################\r\n// Wichtige Informationen einer Attacke fetchen und ganze Attacke abspeichern\r\n//######################################################\r\nfunction fetchAttack(nameId) {\r\n    fetch(`https://pokeapi.co/api/v2/move/${nameId}/`)\r\n        .then((res) => res.json())\r\n        .then((data) => {\r\n            console.log('Move', data);\r\n            pokeMove = new PokeMove(\r\n                data.name,\r\n                data.names[4].name,\r\n                data.flavor_text_entries[22].flavor_text,\r\n                data.accuracy,\r\n                data.power,\r\n                data.meta.minHits,\r\n                data.meta.maxHits,\r\n                data.pp,\r\n                data.type.name,\r\n            );\r\n            // In alle Attacken abspeichern\r\n            save_Object.allPokemonMoves.push(pokeMove);\r\n            allMoves.push(pokeMove);\r\n            save_SaveObj();\r\n        });\r\n}\r\n\r\n//######################################################\r\n\r\n//######################################################\r\nfunction init_Move(moveName) {\r\n    let foundMoveInAllMoves = false;\r\n    // Checke Attacke im Attacken Array\r\n    for (let i = 0; i < allMoves.length; i++) {\r\n        if (moveName === allMoves[i].name) {\r\n            currentAttack = new PokeMove(\r\n                allMoves[i].name,\r\n                allMoves[i].germanName,\r\n                allMoves[i].descr,\r\n                allMoves[i].accuracy,\r\n                allMoves[i].baseDamage,\r\n                allMoves[i].minHits,\r\n                allMoves[i].maxHits,\r\n                allMoves[i].pp,\r\n                allMoves[i].type,\r\n            );\r\n            console.log('GeladenMove:', allMoves);\r\n            foundMoveInAllMoves = true;\r\n            pokeMove = currentAttack;\r\n        }\r\n    }\r\n\r\n    if (foundMoveInAllMoves === false) {\r\n        fetchAttack(moveName);\r\n    }\r\n\r\n    setTimeout(() => {\r\n        myPokemonAttack('myPokemon');\r\n    }, 1000);\r\n}\r\n\r\n//######################################################\r\n// Quelle: https://www.pokewiki.de/Schaden\r\n// Formel für Schadensberechnung\r\n// Schaden=⌊((Level⋅25+2)⋅Basisschaden⋅(Sp.) Angr.50⋅(Sp.) Vert.⋅F1+2)⋅Volltreffer⋅F2⋅Z100⋅STAB⋅Typ1⋅Typ2⋅F3⌋\r\n//!!!!!\r\n// Schaden = ((angriffPokeLevel * 40% + 2) * baseDamage * (angriffstatAttack / 50 + VertPokestatDefense) * 1 + 2) * Volltreffer * F2 * (Z / 100) * 1.5 * Typverrechnung\r\n// [((lv 25 * 40% + 2) * tackle=40 (Glurak Angr 84 / 50 + Magneton Vert 95) * 3) * 1,1 * (95 / 100) * 1,5] *  WertAusTypvergl=FeuerVsElektro=1\r\n// ((12) * 40 * (0,58) * 3)) * 1,1 * (0,95) * 1,5 * 1 = 1.309\r\n//!!!!!\r\n// Level gibt das aktuelle Level des Angreifers an und kann dementsprechend zwischen 1 und 100 variieren.\r\n// (Sp.-)Angr. gibt allgemein den Angriffs- bzw. Spezial-Angriffs-Wert des Angreifers an\r\n// Volltreffer ist für gewöhnlich 1 (Berechnung aus Accuracy)\r\n// Z ist ein Wert, der berechnet wird, indem von 100 eine zufällige Zahl zwischen 0 und 15 abgezogen wird\r\n// F2 zwischen 1 und 1,3\r\n\r\n// Die Bezeichnungen Typ1 und Typ2 stellen die Effektivität der genutzten Attacke auf das Ziel dar. Ist die Attacke nicht sehr effektiv gegenüber dem Typen des Ziels,\r\n// ist der Faktor 0,5, ist er sehr effektiv, wird 2 eingesetzt und hat sie keinen Einfluss auf den Gegner, so wird 0 eingesetzt. In allen anderen Fällen wird 1 eingesetzt\r\n//######################################################\r\nfunction myPokemonAttack(whoIsExecuting) {\r\n    // Initwerte sind so eingestellt, dass ein Angriff von meinem Pokemon aus geht\r\n    let lv = myStaticPokemon.level;\r\n    let defPokeLv = currentWildPokemon.level;\r\n    const attbaseDamage = pokeMove.baseDamage;\r\n    let attackVal = myStaticPokemon.statAttack;\r\n    let defenceVal = currentWildPokemon.statDefense;\r\n    const f2 = Math.random() * (1.3 - 1) + 1;\r\n    const z = 100 - parseInt(Math.random() * 15 + 1);\r\n    const attackType = pokeMove.type;\r\n    let defPokeType = currentWildPokemon.type;\r\n    const typeCalc = 0.5; // Typ Attacke wird mit Typ verteidigendesPokemon verglichen 0x / 0.5x / 1x / 2x --TODO: Funktion für den Vergleich bauen\r\n    let whoIsAffected = 'wildPokemon';\r\n\r\n    // Wenn wildes Pokemon angreift\r\n    if (whoIsExecuting === 'wildPokemon') {\r\n        lv = currentWildPokemon.level;\r\n        defPokeLv = myStaticPokemon.level;\r\n        attackVal = currentWildPokemon.statAttack;\r\n        defenceVal = myStaticPokemon.statDefense;\r\n        defPokeType = myStaticPokemon.type;\r\n        whoIsAffected = 'myPokemon';\r\n    } else {\r\n    }\r\n\r\n    // Grundsätzliche Berechnung des Schadens\r\n    const rawDamage =\r\n        (lv * 0.4 + 2) *\r\n        attbaseDamage *\r\n        (attackVal / (defenceVal + 50 + defPokeLv)) *\r\n        3 *\r\n        f2 *\r\n        (z / 100);\r\n    const damage = parseInt((rawDamage * typeCalc) / 20);\r\n\r\n    // Wenn wildes Pokemon am Zug ist\r\n    if (whoIsExecuting === 'wildPokemon') {\r\n        myCurrentPokemonHP -= damage;\r\n        if(damage > 0) {\r\n            myPokeImage.classList.add('getAttacked');\r\n            setTimeout(() => {\r\n                myPokeImage.classList.remove('getAttacked');\r\n            }, 600);\r\n        }\r\n    } else {\r\n        currentWildPokeHP -= damage;\r\n    }\r\n    animateProgressBar(damage, whoIsAffected);\r\n}\r\n\r\n//######################################################\r\n\r\n//######################################################\r\nfunction animateProgressBar(damage, whoIsAffected) {\r\n    let fullHP = currentWildPokemon.hp;\r\n    let currentHP = currentWildPokeHP;\r\n    let hpInPercent = parseInt((currentHP * 100) / fullHP);\r\n    let effectedImage = wildPokeImage;\r\n    let effectedPokeName = wildPokeName;\r\n    let effectedProgressbar = wildPokemonProgress;\r\n    let atackerPokemon = myStaticPokemon;\r\n    let defenderPokemon = currentWildPokemon;\r\n\r\n    if (whoIsAffected === 'myPokemon') {\r\n        fullHP = myStaticPokemon.hp;\r\n        currentHP = myCurrentPokemonHP;\r\n        hpInPercent = parseInt((currentHP * 100) / fullHP);\r\n        effectedImage = myPokeImage;\r\n        effectedPokeName = myPokeName;\r\n        effectedProgressbar = myPokemonProgress;\r\n        atackerPokemon = currentWildPokemon;\r\n        defenderPokemon = myStaticPokemon;\r\n    }\r\n    console.log(\r\n        `whoIsAffected: ${whoIsAffected} // fullHP ${fullHP} // currentHP ${currentHP}  hpInPercent: ${hpInPercent}`,\r\n    );\r\n\r\n    // Balken anzeigen\r\n    if (hpInPercent <= 0) {\r\n        effectedProgressbar.style.width = 0;\r\n        console.log('effectedProgressbar.value', effectedProgressbar.value);\r\n    } else {\r\n        if(damage > 0) {\r\n            // effectedProgressbar.style.width = `${hpInPercent}%`;\r\n            effectedProgressbar.value = hpInPercent\r\n            console.log('effectedProgressbar', effectedProgressbar);\r\n        }\r\n    }\r\n\r\n    // Auswirkungsanzeige\r\n    setTimeout(() => {\r\n        // Textbox\r\n        if (hpInPercent <= 0) {\r\n            // Textbox\r\n            showInfoBox(\r\n                `${makeFirstLetterBig(defenderPokemon.name)} wurde besiegt`,\r\n            );\r\n            // Besiegtes Pokemon verschwindet\r\n            effectedImage.classList.add(\"getDestroyed\");\r\n            setTimeout(() => {\r\n                effectedImage.style.opacity = '0';\r\n                effectedPokeName.innerHTML = '';\r\n            }, 400);\r\n            if (whoIsAffected !== 'myPokemon') {\r\n                battleSound2.pause();\r\n                victorySound.play();\r\n            }\r\n        } else {\r\n            showInfoBox(\r\n                `${makeFirstLetterBig(atackerPokemon.name)} führt \"${\r\n                    pokeMove.name\r\n                }\" aus und richtet ${damage} Schaden an.`,\r\n            );\r\n            effectedPokeName.innerHTML = `${makeFirstLetterBig(\r\n                defenderPokemon.name,\r\n            )} | Lv. ${defenderPokemon.level} | KP.${currentHP}`;\r\n        }\r\n    }, 1000);\r\n\r\n    setTimeout(() => {\r\n        checkWhoExecuteNext();\r\n    }, 2000);\r\n}\r\n\r\n// Angreifer ist Objektname Verteidiger Inhalte\r\npokeType_Normal = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1];\r\nfunction checkPokeTypes() {}\r\n\r\n// Gameloop\r\n\r\nfunction checkWhoExecuteNext() {\r\n    if (iamExecuting === true) {\r\n        enableMainButtons();\r\n        iamExecuting = false;\r\n    } else {\r\n        disableMainButtons();\r\n        ki_Move();\r\n        iamExecuting = true;\r\n    }\r\n}\r\n\r\n//######################################################\r\n\r\n//######################################################\r\n\r\nfunction ki_Move() {\r\n    if (currentWildPokeHP > 0) {\r\n        const randomMove = parseInt(\r\n            Math.random() * currentWildPokemon.moves.length,\r\n        );\r\n        const move = currentWildPokemon.moves[randomMove];\r\n        fetchAttack(move);\r\n        setTimeout(() => {\r\n            myPokemonAttack('wildPokemon');\r\n        }, 3000);\r\n    } else {\r\n        // Battle Szene hier beenden\r\n        setTimeout(() => {\r\n            showInfoBox(`${myStaticPokemon.name} erhält 20xp`);\r\n            window.location = 'pokedex.html';\r\n        }, 3000);\r\n    }\r\n}\r\n\r\n//######################################################\r\n// Wildes Pokemon fangen\r\n//######################################################\r\n\r\nfunction catchPokemon() {\r\n    // Abfragen, ob man noch Pokebälle hat\r\n    if (myPokeballAmount > 0) {\r\n        myPokeballAmount--;\r\n        pokeball.classList.add('active');\r\n        setTimeout(() => {\r\n            pokeball.classList.remove('active');\r\n            const fullHP = currentWildPokemon.hp;\r\n            const hpInPercent = parseInt((currentWildPokeHP * 100) / fullHP);\r\n            const catchquote =\r\n                25 +\r\n                parseInt((Math.random() * hpInPercent) / 2) -\r\n                parseInt(Math.random() * (hpInPercent + 5));\r\n            console.log(\r\n                `Catchquote: ${catchquote} // Pokebälle: ${myPokeballAmount}`,\r\n            );\r\n            if (catchquote >= 25) {\r\n                // Unsichtbar machen\r\n                wildPokeImage.style.opacity = '0';\r\n                wildPokeName.innerHTML = '';\r\n                showInfoBox(\r\n                    `${makeFirstLetterBig(\r\n                        currentWildPokemon.name,\r\n                    )} wurde gefangen`,\r\n                );\r\n                myCatchedPokemons.push(currentWildPokemon);\r\n                console.log('--- !!!  !!! ---> CATCHED', myCatchedPokemons);\r\n            } else {\r\n                showInfoBox(\r\n                    `${makeFirstLetterBig(\r\n                        currentWildPokemon.name,\r\n                    )} lässt sich nicht fangen`,\r\n                );\r\n            }\r\n        }, 1500);\r\n    } else {\r\n        showInfoBox(`Nicht genug Pokebälle`);\r\n    }\r\n}\r\n\r\n//######################################################\r\n// Macht den Anfangsbuchstaben groß\r\n//######################################################\r\nfunction makeFirstLetterBig(pokeName) {\r\n    const firstLetter = pokeName[0];\r\n    let exportPokeName = firstLetter.toUpperCase();\r\n    for (let i = 1; i < pokeName.length; i++) {\r\n        exportPokeName += pokeName[i];\r\n    }\r\n    return exportPokeName;\r\n}\r\n\r\n//######################################################\r\n// UI Elemente\r\n//######################################################\r\nfunction showInfoBox(text) {\r\n    infoBox.hidden = false;\r\n    infoBox.innerHTML = text;\r\n    setTimeout(() => {\r\n        infoBox.hidden = true;\r\n    }, 4000);\r\n}\r\n\r\nfunction showMainButtons() {\r\n    moveButtons.hidden = true;\r\n    mainButtons.hidden = false;\r\n    disableMainButtons();\r\n}\r\n\r\nfunction showMoveButtons() {\r\n    moveButtons.hidden = false;\r\n    mainButtons.hidden = true;\r\n}\r\n\r\nfunction disableMainButtons() {\r\n    mainButtons.style.backgroundColor = 'red';\r\n    document.getElementById('mainButton1').disabled = true;\r\n    document.getElementById('mainButton2').disabled = true;\r\n    document.getElementById('mainButton3').disabled = true;\r\n}\r\n\r\nfunction enableMainButtons() {\r\n    mainButtons.style.backgroundColor = 'rgba(0, 0, 10, 0.384)';\r\n    document.getElementById('mainButton1').disabled = false;\r\n    document.getElementById('mainButton2').disabled = false;\r\n    document.getElementById('mainButton3').disabled = false;\r\n}\r\n\r\n//######################################################\r\n// Move Steuerung\r\n//######################################################\r\nfunction pokeFight() {\r\n    showMoveButtons();\r\n}\r\n\r\nfunction attack1() {\r\n    showMainButtons();\r\n    const btnMoveName = btnAttack1.innerText;\r\n    init_Move(btnMoveName);\r\n    wildPokeImage.classList.add('getAttacked');\r\n    setTimeout(() => {\r\n        wildPokeImage.classList.remove('getAttacked');\r\n    }, 600);\r\n}\r\n\r\nfunction attack2() {\r\n    playBattleSound();\r\n}\r\n\r\nfunction attack3() {\r\n    playBattleSound();\r\n}\r\n\n\n//# sourceURL=webpack://project-template/./src/js/battle.js?");

/***/ }),

/***/ "./src/js/pokedex.js":
/*!***************************!*\
  !*** ./src/js/pokedex.js ***!
  \***************************/
/***/ (() => {

eval("facedPokemons = [];\r\n\r\n        let save_Object = {\r\n            today_Date: '',\r\n            myPokemonTeam: [],\r\n            myCatchedPokemons: [],\r\n            allFacedPokemons: [],\r\n            allPokemonMoves: [],\r\n            today_Pokemons: [],\r\n            items: {\r\n                pokeballs: 20,\r\n                money: 100,\r\n            }\r\n        }\r\n\r\n        window.onload = init();\r\n\r\n\r\n        function init() {\r\n            if(document.getElementById(\"pokedexTag\")) {\r\n                loadFacedPokemons();\r\n            }\r\n\r\n        }\r\n\r\n\r\n        function loadFacedPokemons() {\r\n            if (localStorage.getItem('storedFacedPokemons') != null) {\r\n                save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));\r\n                facedPokemons = save_Object.allFacedPokemons;\r\n                renderPokeCards();\r\n            }\r\n        }\r\n\r\n\r\n        function renderPokeCards() {\r\n            let pokeId = 0;\r\n            let pokename = '';\r\n            let pokelevel = 0;\r\n            let poketype = '';\r\n\r\n            console.log(facedPokemons);\r\n\r\n            for (let i = 0; i < facedPokemons.length; i++) {\r\n                pokeId = facedPokemons[i].id;\r\n                pokename = facedPokemons[i].name;\r\n                pokelevel = facedPokemons[i].level;\r\n                poketype = facedPokemons[i].type;\r\n                buildCard(pokeId, pokename, pokelevel, poketype);\r\n\r\n            }\r\n        }\r\n\r\n\r\n        function buildCard(id, name, level, type) {\r\n            const cont = document.createElement('div');\r\n            const txtlbl = document.createElement('p');\r\n            const imgP = document.createElement('img');\r\n            txtlbl.innerText = `${name} Nr.${id}`;\r\n            txtlbl.classList.add('pokedexName');\r\n            imgP.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;\r\n            cont.appendChild(imgP);\r\n            cont.appendChild(document.createTextNode(name));\r\n            cont.classList.add('container');\r\n            cont.classList.add(addColorClass(type));\r\n            cont.appendChild(txtlbl);\r\n            let card = document.getElementById('cards');\r\n            card.appendChild(cont);\r\n        }\r\n\r\n\r\n\r\n        function addColorClass(type) {\r\n            if (type === '') {\r\n\r\n            }\r\n\r\n            switch (type) {\r\n                case 'fire':\r\n                    return 'orangeContainer';\r\n                    break;\r\n                case 'water':\r\n                    return 'blueContainer';\r\n                    break;\r\n                case 'bug':\r\n                    return 'greenContainer';\r\n                    break;\r\n                case 'grass':\r\n                    return 'greenContainer';\r\n                    break;\r\n                case 'ground':\r\n                    return 'brownContainer';\r\n                    break;\r\n                case 'poison':\r\n                    return 'purpleContainer';\r\n                    break;\r\n                case 'rock':\r\n                    return 'brownContainer';\r\n                    break;\r\n                case 'electric':\r\n                    return 'yellowContainer';\r\n                    break;\r\n\r\n                default:\r\n                    return 'greyContainer';\r\n                    break;\r\n            }\r\n        }\r\n\n\n//# sourceURL=webpack://project-template/./src/js/pokedex.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

/***/ }),

/***/ "./src/js/store.js":
/*!*************************!*\
  !*** ./src/js/store.js ***!
  \*************************/
/***/ (() => {

eval("console.log('Loaded store');\r\n\n\n//# sourceURL=webpack://project-template/./src/js/store.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;