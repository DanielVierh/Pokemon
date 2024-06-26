let myCatchedPokemons = [];
let myTeam = [];
let pokemonByID = []
let currentDetailPokemonIndex = -1;
let newLearnedMoveIndex = -1;
let is_LearningNewMove = false;

const pokeballPrice = 10;
const trankPrice = 15;
const beleberPrice = 20;
const bonbonPrice = 50;


const catchedPokemonContaier = document.getElementById("catchedPokemonContaier");
const teamPokemonContainer = document.getElementById("teamPokemonContainer");
const btn_ResetGame = document.getElementById("btn_ResetGame");
const btnHeal = document.getElementById("btnHeal");
const cont_Detail = document.getElementById("cont_Detail")
const btnCloseDetails = document.getElementById("btnCloseDetails");
const lbl_Money = document.getElementById("lbl_Money");
const lbl_Shop_Money = document.getElementById("lbl_Shop_Money");
const shopWindow = document.getElementById("shopWindow");
const btnCloseShop = document.getElementById("btnCloseShop");
const btn_open_Pokelist = document.getElementById("btn_open_Pokelist");
const btn_Pokeball = document.getElementById("btn_Pokeball");
const lbl_Amount_Pokeballs = document.getElementById("lbl_Amount_Pokeballs");
const btn_Buy = document.getElementById("btn_Buy");
const setting_Gen = document.getElementById("setting_Gen");
const btn_refresh_todays_Pokemon = document.getElementById("btn_refresh_todays_Pokemon");
const pokemonListCont = document.getElementById("pokemonListCont");
const btnClosePokemonList = document.getElementById("btnClosePokemonList");
const todayPokemonListWindow = document.getElementById("todayPokemonListWindow");

const mv_0 = document.getElementById("mv_0");
const mv_1 = document.getElementById("mv_1");
const mv_2 = document.getElementById("mv_2");
const mv_3 = document.getElementById("mv_3");
const modalMoves = document.getElementById("modalMoves");
let addedPokemon;


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
        bonbon: 3
    },
    gen: 'all'
};


window.onload = init();

function init() {
    if (document.getElementById("catchPokeTag")) {
        load_SaveObj();
    }
}


function load_SaveObj() {
    if (localStorage.getItem('stored_save_Object') != null) {
        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
        myTeam = save_Object.myPokemonTeam;
        myCatchedPokemons = save_Object.myCatchedPokemons;
        document.getElementById("outpCatchedAmount").innerHTML = `${myCatchedPokemons.length} gefangen`

        pokemonByID = myCatchedPokemons.slice(0);
        pokemonByID.sort(function(a,b) {
            return a.id - b.id;
        });

        try {
            renderCatchedPokemons();
            renderTeam();
            render_replaceable_pokemon()
            renderTodayPokemons();
            lbl_Money.innerHTML = `$ - ${save_Object.items.money}`;
            setting_Gen.value = save_Object.gen
        } catch (error) {

        }
    }
}

function save_SaveObj() {
    localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));
    console.log('SaveObj', save_Object);
}


function renderCatchedPokemons() {
    for (let i = 0; i < pokemonByID.length; i++) {
        let pokeCont = document.createElement('div');
        pokeCont.classList.add("pokemonContaier")

        let addBtn = document.createElement("div");
        addBtn.innerHTML = "+"
        addBtn.classList.add("addButton")
        addBtn.id = pokemonByID[i].unique_ID

        for(let j = 0; j < myTeam.length; j++) {
            if(pokemonByID[i].unique_ID === myTeam[j].unique_ID) {
                pokeCont.classList.add('isMember')
                break
            }
        }


        let detailBtn = document.createElement("div");
        detailBtn.innerHTML = "i "
        detailBtn.classList.add("detailBtn")
        detailBtn.id = pokemonByID[i].unique_ID

        let sellBtn = document.createElement("div");
        sellBtn.innerHTML = "$"
        sellBtn.classList.add("sellBtn")
        sellBtn.id = pokemonByID[i].unique_ID

        let pokeimage = document.createElement("img");
        pokeimage.src = pokemonByID[i].spriteFront;

        let pokename = document.createElement("p");
        pokename.innerHTML = makeFirstLetterBig(pokemonByID[i].name) + ` | Lv.${pokemonByID[i].level}`;

        let infocont = document.createElement("div");
        infocont.classList.add("infobox");

        let level = document.createElement("p");
        level.innerHTML = `Lv.${pokemonByID[i].level}`;

        let type = document.createElement("p");
        type.innerHTML = `Typ: ${makeFirstLetterBig(pokemonByID[i].type)}`;

        let number = document.createElement("p");
        number.innerHTML = `Nr. ${pokemonByID[i].id}`;

        infocont.appendChild(level)
        infocont.appendChild(type)
        infocont.appendChild(number)

        pokeCont.appendChild(addBtn)
        pokeCont.appendChild(detailBtn)
        pokeCont.appendChild(sellBtn)
        pokeCont.appendChild(pokeimage)
        pokeCont.appendChild(pokename)
        // pokeCont.appendChild(infocont)

        catchedPokemonContaier.appendChild(pokeCont)
    }
}
//####################################################################
// HEUTIGE POKEMON
//####################################################################

function renderTodayPokemons() {
    for(let i = 0; i < save_Object.today_Pokemons.length; i++) {
        let box = document.createElement('div');
        box.classList.add('pokeBox');
        let isKnown = false;
        let imgP = document.createElement('img');
        const searchedID = save_Object.today_Pokemons[i]
        for(let j = 0; j < save_Object.allFacedPokemons.length; j++) {
            if(searchedID === save_Object.allFacedPokemons[j].id) {
                isKnown = true;
                imgP.src = save_Object.allFacedPokemons[j].spriteFront;
                break;
            }
        }
        if(isKnown === true) {
            box.appendChild(imgP)
        }else {
            box.innerHTML = `? <br> ${save_Object.today_Pokemons[i]}`;
        }
        pokemonListCont.appendChild(box)
    }
}

// Öffnen
if(btn_open_Pokelist) {
    btn_open_Pokelist.addEventListener("click", ()=> {
        todayPokemonListWindow.classList.add('active')
    })
}

if(btnClosePokemonList) {
    btnClosePokemonList.addEventListener('click', ()=> {
        todayPokemonListWindow.classList.remove('active')
    })
}
//####################################################################

//*ANCHOR -  Pokemon hinzufügen
const addBtn = document.querySelectorAll('.addButton');
if (addBtn) {
    addBtn.forEach((button) => {
        button.addEventListener('click', () => {
            let pokemonIndex = -1;
            // let addedPokemon;
            for (let i = 0; i < myCatchedPokemons.length; i++) {
                if (button.id === myCatchedPokemons[i].unique_ID) {
                    pokemonIndex = i;
                    break;
                }
            }

            //* Prüfen ob Pokemon gefunden
            if (pokemonIndex >= 0) {
                addedPokemon = myCatchedPokemons[pokemonIndex]

                //* check ob teamplatz frei
                const freeTeamNumbers = myTeam.length;
                if (freeTeamNumbers < 4) {
                    let isAlreadyInTeam = false;
                    for(let i = 0; i < myTeam.length; i++) {
                        if(myTeam[i].unique_ID === addedPokemon.unique_ID) {
                            isAlreadyInTeam = true;
                            break
                        }
                    }
                    if(isAlreadyInTeam === false) {
                        myTeam.unshift(addedPokemon);
                        console.log(myTeam);
                        save_SaveObj();
                        location.reload();
                    }
                } else {
                    alert("Kein Platz mehr frei");
                    document.getElementById('modal_Replace_Pokemon').classList.add('active');
                }
            }
        });
    });
}


const delBtn = document.querySelectorAll('.deleteButton');
if (delBtn) {
    delBtn.forEach((button) => {
        button.addEventListener('click', () => {
            let pokemonIndex = -1;
            let removedPokemon;
            for (let i = 0; i < myTeam.length; i++) {
                if (button.id === myTeam[i].unique_ID) {
                    pokemonIndex = i;
                    break;
                }
            }

            if (pokemonIndex >= 0) {
                myTeam.splice(pokemonIndex, 1);
                renderTeam();
                save_SaveObj();
                location.reload();
            }
        });
    });
}


const sellBtn = document.querySelectorAll('.sellBtn');
if (sellBtn) {
    sellBtn.forEach((button) => {
        button.addEventListener('click', () => {
            // Nur verkaufen, wenn mehr als 1 Pokemon vorhanden ist
           if(myCatchedPokemons.length > 1) {
            let pokemonIndex = -1;
            for (let i = 0; i < myCatchedPokemons.length; i++) {
                if (button.id === myCatchedPokemons[i].unique_ID) {
                    pokemonIndex = i;
                    break;
                }
            }

            if (pokemonIndex >= 0) {
                const pokemonPrice = parseInt(myCatchedPokemons[pokemonIndex].level * 9)
                const confirmSell = window.confirm(`Möchtest du das Pokemon: "${myCatchedPokemons[pokemonIndex].name}" wirklich verkaufen? \nDu erhälst dafür ${pokemonPrice}$`)
                if(confirmSell) {
                myCatchedPokemons.splice(pokemonIndex, 1);

                 pokemonIndex = -1;
                for (let i = 0; i < myTeam.length; i++) {
                    if (button.id === myTeam[i].unique_ID) {
                        pokemonIndex = i;
                        break;
                    }
                }
                if (pokemonIndex >= 0) {
                    myTeam.splice(pokemonIndex, 1);
                }
                save_Object.items.money += pokemonPrice;
                save_SaveObj();
                location.reload();
                }
            }
           }else {
            alert("Du benötigst mindestens 1 Pokemon")
           }
        });
    });
}


const detailBtn = document.querySelectorAll('.detailBtn');
if (detailBtn) {
    detailBtn.forEach((button) => {
        button.addEventListener('click', () => {
            let pokemonIndex = -1;
            for (let i = 0; i < myCatchedPokemons.length; i++) {
                if (button.id === myCatchedPokemons[i].unique_ID) {
                    pokemonIndex = i;
                    currentDetailPokemonIndex = i
                    break;
                }
            }

            if (pokemonIndex >= 0) {
                console.log('myCatchedPokemons[pokemonIndex]', myCatchedPokemons[pokemonIndex]);
                cont_Detail.classList.add("active");
                document.getElementById("det_Pokename").innerHTML = makeFirstLetterBig(myCatchedPokemons[pokemonIndex].name)
                document.getElementById("det_PokemonImage").src = myCatchedPokemons[pokemonIndex].spriteFront
                document.getElementById("det_Attack").innerHTML = `Angriff: ${myCatchedPokemons[pokemonIndex].statAttack}`
                document.getElementById("det_Def").innerHTML = `Verteidigung: ${myCatchedPokemons[pokemonIndex].statDefense}`
                document.getElementById("det_Lv").innerHTML = `Lv.${myCatchedPokemons[pokemonIndex].level}`
                document.getElementById("det_HP").innerHTML = `Max KP: ${myCatchedPokemons[pokemonIndex].maxHp}`
                document.getElementById("det_Type").innerHTML = `Typ: ${myCatchedPokemons[pokemonIndex].type}`
                document.getElementById("det_Nr").innerHTML = `Nr: ${myCatchedPokemons[pokemonIndex].id}`
                document.getElementById("det_catchDate").innerHTML = `Gefangen am: <br> -`
                document.getElementById("det_catchName").innerHTML = `Name: <br> -`
                document.getElementById("det_catchLv").innerHTML = `Level: <br> -`
                try {
                    document.getElementById("det_catchDate").innerHTML = `Gefangen am: <br> ${myCatchedPokemons[pokemonIndex].catchval.catchDate}`
                    document.getElementById("det_catchName").innerHTML = `Name: <br> ${makeFirstLetterBig(myCatchedPokemons[pokemonIndex].catchval.catchName)}`
                    document.getElementById("det_catchLv").innerHTML = `Level: <br> ${myCatchedPokemons[pokemonIndex].catchval.catchLevel}`
                } catch (error) { }

            // moveList
            const moveList = document.getElementById("moveList");
            moveList.innerHTML = ''
            for(let i = 0; i < myCatchedPokemons[pokemonIndex].moves.length; i++) {
                    let mvBtn = document.createElement('div')
                    mvBtn.innerHTML = myCatchedPokemons[pokemonIndex].moves[i]
                    mvBtn.classList.add('move_button')
                    if(i <= 3) {
                        mvBtn.classList.add("move_active")
                    }
                    moveList.appendChild(mvBtn)
                }
            }



            // Funktion für Move ändern
            const moveButtonClick = document.querySelectorAll('.move_button');
            if (moveButtonClick) {
                moveButtonClick.forEach((button, index) => {
                    button.addEventListener('click', () => {
                        if(index > 3) {
                            if(is_LearningNewMove === false) {
                                const confirmLerning = window.confirm(`Möchtest du, dass dein Pokemon die Attacke ${myCatchedPokemons[currentDetailPokemonIndex].moves[index]} erlernt?`)
                                if(confirmLerning) {
                                    is_LearningNewMove = true
                                    newLearnedMoveIndex = index
                                    // alert("Klicke auf die Attacke, welche verlernt werden soll. Keine sorge, dein Pokemon vergisst sie nicht vollständig.")
                                    modalMoves.classList.add("active")
                                    for(let i = 0; i <= 3; i++) {
                                        document.getElementById(`mv_${i}`).innerHTML = myCatchedPokemons[pokemonIndex].moves[i];
                                    }
                                }
                            }
                        }
                    });
                });
            }
        });
    });
}

if(btnCloseDetails) {
    btnCloseDetails.addEventListener("click", ()=> {
        cont_Detail.classList.remove("active");
    })
}


if(mv_0) {
    mv_0.addEventListener("click", ()=> {
        learn_forget_Attack(0)
        modalMoves.classList.remove("active")
    })
}
if(mv_1) {
    mv_1.addEventListener("click", ()=> {
        learn_forget_Attack(1)
        modalMoves.classList.remove("active")
    })
}
if(mv_2) {
    mv_2.addEventListener("click", ()=> {
        learn_forget_Attack(2)
        modalMoves.classList.remove("active")
    })
}
if(mv_3) {
    mv_3.addEventListener("click", ()=> {
        learn_forget_Attack(3)
        modalMoves.classList.remove("active")
    })
}


 // Attacke aufnehmen die vergessen werden soll und tauschen
function learn_forget_Attack(forgotIndex) {
    let teamPokemonIndex = -1;
    const searchID = myCatchedPokemons[currentDetailPokemonIndex].unique_ID

    // * Assign teamPokemonIndex
    for(let i = 0; i < myTeam.length; i++) {
        if(myTeam[i].unique_ID === searchID) {
            teamPokemonIndex = i;
            break
        }
    }

    //* Catched Pokemon is learning a new attack
    const toForgetMoveName = myCatchedPokemons[currentDetailPokemonIndex].moves[forgotIndex]
    const toLearnMoveName = myCatchedPokemons[currentDetailPokemonIndex].moves[newLearnedMoveIndex]
    myCatchedPokemons[currentDetailPokemonIndex].moves.splice(forgotIndex, 1, toLearnMoveName)
    myCatchedPokemons[currentDetailPokemonIndex].moves.splice(newLearnedMoveIndex, 1)
    myCatchedPokemons[currentDetailPokemonIndex].moves.push(toForgetMoveName)

     //* Team Pokemon is learning a new attack
    if(teamPokemonIndex !== -1) {
        const toForgetMoveName = myTeam[teamPokemonIndex].moves[forgotIndex]
        const toLearnMoveName = myTeam[teamPokemonIndex].moves[newLearnedMoveIndex]
        myTeam[teamPokemonIndex].moves.splice(forgotIndex, 1, toLearnMoveName)
        myTeam[teamPokemonIndex].moves.splice(newLearnedMoveIndex, 1)
        myTeam[teamPokemonIndex].moves.push(toForgetMoveName)
    }

    is_LearningNewMove = false;
    alert(`${makeFirstLetterBig(toLearnMoveName)} wurde erlernt und ${makeFirstLetterBig(toForgetMoveName)} wurde vergessen.`)
    save_SaveObj();
    cont_Detail.classList.remove("active");
}


// Move Pokemon 1 pos down
const moveDownButton = document.querySelectorAll('.movedownButton');
if (moveDownButton) {
    moveDownButton.forEach((button) => {
        button.addEventListener('click', () => {
            let pokemonIndex = -1;
            let movedPokemon;
            for (let i = 0; i < myTeam.length; i++) {
                if (button.id === myTeam[i].unique_ID) {
                    pokemonIndex = i;
                    break;
                }
            }

            if (pokemonIndex >= 0) {
                movedPokemon = myTeam[pokemonIndex];
                myTeam.splice(pokemonIndex, 1);
                myTeam.push(movedPokemon)
                renderTeam();
                save_SaveObj();
                location.reload();
            }
        });
    });
}



function renderTeam() {
    teamPokemonContainer.innerHTML = "";
    for (let i = 0; i < myTeam.length; i++) {
        let pokeCont = document.createElement('div');
        pokeCont.classList.add("pokemonContaier")
        pokeCont.classList.add("tp")

        let delBtn = document.createElement("div");
        delBtn.innerHTML = "-"
        delBtn.classList.add("deleteButton")
        delBtn.id = myTeam[i].unique_ID

        let moveBtn = document.createElement('div');
        moveBtn.innerHTML = '>'
        moveBtn.classList.add("movedownButton")
        moveBtn.id = myTeam[i].unique_ID

        let pokeimage = document.createElement("img");
        pokeimage.src = myTeam[i].spriteFront;
        document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront
        document.getElementById(`teamPokeName_${i}`).innerHTML = makeFirstLetterBig(myTeam[i].name)
        let hpInPercent = myTeam[i].hp * 100 / myTeam[i].maxHp
        document.getElementById(`teamPokeProgress_${i}`).value = hpInPercent
        
        if(myTeam[i].isDefeated === true) {
            document.getElementById(`teamPoke_${i}`).classList.add("defeat");
        }

        let pokename = document.createElement("p");
        pokename.innerHTML = makeFirstLetterBig(myTeam[i].name);

        let infocont = document.createElement("div");
        infocont.classList.add("infobox");

        let level = document.createElement("p");
        level.innerHTML = `Lv.${myTeam[i].level}`;

        let type = document.createElement("p");
        type.innerHTML = `Typ: ${makeFirstLetterBig(myTeam[i].type)}`;

        let number = document.createElement("p");
        number.innerHTML = `Nr. ${myTeam[i].id}`;

        infocont.appendChild(level)
        infocont.appendChild(type)
        infocont.appendChild(number)

        pokeCont.appendChild(delBtn)
        pokeCont.appendChild(moveBtn)
        pokeCont.appendChild(pokeimage)


        teamPokemonContainer.appendChild(pokeCont)
    }
}

// *ANCHOR - Pokemon die ersetzt werden können im team
function render_replaceable_pokemon() {
    
    for (let i = 0; i < myTeam.length; i++) {

        //delBtn.id = myTeam[i].unique_ID

        let pokeimage = document.createElement("img");
        pokeimage.src = myTeam[i].spriteFront;

        let pokename = document.createElement('p');
        pokename.innerHTML = `${makeFirstLetterBig(myTeam[i].name)} - Lv. ${myTeam[i].level}`;

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('hstack');
        contentContainer.classList.add('content');
        contentContainer.appendChild(pokeimage);
        contentContainer.appendChild(pokename);

        document.getElementById(`repl_pk_${i}`).appendChild(contentContainer);

    }
}
const replaced_pokemon_0 = document.getElementById('repl_pk_0');
const replaced_pokemon_1 = document.getElementById('repl_pk_1');
const replaced_pokemon_2 = document.getElementById('repl_pk_2');
const replaced_pokemon_3 = document.getElementById('repl_pk_3');

if(replaced_pokemon_0) {
    replaced_pokemon_0.addEventListener("click", ()=> {
        replace_pokemon(0);
        document.getElementById('modal_Replace_Pokemon').classList.remove('active');
    })
}
if(replaced_pokemon_1) {
    replaced_pokemon_1.addEventListener("click", ()=> {
        replace_pokemon(1);
        document.getElementById('modal_Replace_Pokemon').classList.remove('active');
    })
}
if(replaced_pokemon_2) {
    replaced_pokemon_2.addEventListener("click", ()=> {
        replace_pokemon(2);
        document.getElementById('modal_Replace_Pokemon').classList.remove('active');
    })
}
if(replaced_pokemon_3) {
    replaced_pokemon_3.addEventListener("click", ()=> {
        replace_pokemon(3);
        document.getElementById('modal_Replace_Pokemon').classList.remove('active');
    })
}

function replace_pokemon(index) {
    myTeam.splice(index, 1);
    myTeam.splice(index, 0, addedPokemon);
    save_SaveObj();
    location.reload();
}


// ######################################################
// Lösche alles
if(btn_ResetGame) {
    btn_ResetGame.addEventListener("click", ()=> {
      const decision = window.confirm("Soll das Spiel wirklich zurückgesetzt werden? Der ganze Spielstand geht verloren!");
      if(decision) {
        save_Object = {
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
                bonbon: 3
            },
            gen: 'all'
        };

        save_SaveObj();
        location.reload();
      }
    })
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


if(btnHeal){
    btnHeal.addEventListener("click", ()=> {
        for(let i = 0; i < myTeam.length; i++) {
            myTeam[i].isDefeated = false;
            myTeam[i].hp = myTeam[i].maxHp;
            let hpInPercent = myTeam[i].hp * 100 / myTeam[i].maxHp
            document.getElementById(`teamPokeProgress_${i}`).value = hpInPercent
        }
        for(let i = 0; i < myCatchedPokemons.length; i++) {
            myCatchedPokemons[i].isDefeated = false;
            myCatchedPokemons[i].hp = myCatchedPokemons[i].maxHp;
        }

        for(let i = 0; i < save_Object.myCatchedPokemons.length; i++) {
            save_Object.myCatchedPokemons[i].hp = save_Object.myCatchedPokemons[i].maxHp;
        }

        for(let i = 0; i < save_Object.myPokemonTeam.length; i++) {
            save_Object.myPokemonTeam[i].hp = save_Object.myPokemonTeam[i].maxHp;
            document.getElementById(`teamPoke_${i}`).classList.remove("defeat");
        }

        save_SaveObj();
        alert("Deine Pokemon wurden geheilt")
    })
}

// #####################################################################
// Shop
let pokeballBuyAmount = 0;
let shopMoney = 0;





// Close
if(btnCloseShop) {
    btnCloseShop.addEventListener("click", ()=> {
        shopWindow.classList.remove("active");
    })
}

// Increase Pokeball
if(btn_Pokeball) {
    btn_Pokeball.addEventListener("click", ()=> {
        if(shopMoney >= pokeballPrice) {
            pokeballBuyAmount++;
            shopMoney -= pokeballPrice;
            updateShop()
        }
    })
}


if(btn_Buy) {
    btn_Buy.addEventListener("click", ()=> {
        if(pokeballBuyAmount > 0) {
            save_Object.items.money = shopMoney;
            save_Object.items.pokeballs += pokeballBuyAmount;
            lbl_Money.innerHTML = `$ - ${save_Object.items.money}`;
            save_SaveObj();
            if(pokeballBuyAmount === 1) {
                alert(`Du hast erfolgreich ${pokeballBuyAmount} Pokeball gekauft.`)
            }else {
                alert(`Du hast erfolgreich ${pokeballBuyAmount} Pokebälle gekauft.`)
            }
            shopWindow.classList.remove("active");
        }
    })
}

function updateShop() {
    lbl_Shop_Money.innerHTML = `$ - ${shopMoney}`;
    lbl_Amount_Pokeballs.innerHTML = pokeballBuyAmount;
}


// Generation auswählen

if(setting_Gen) {
    setting_Gen.addEventListener("change", ()=> {
        const value = setting_Gen.value;
        save_Object.gen = value;
        resetPokemon()
    })
}



if(btn_refresh_todays_Pokemon) {
    btn_refresh_todays_Pokemon.addEventListener("click", ()=> {
        const request = window.confirm("Sollen die Pokemon von Heute neu gemischt werden?")
        if(request) {
            resetPokemon()
        }
    })
}

function resetPokemon() {
    save_Object.today_Date = '';
    save_SaveObj()
}
