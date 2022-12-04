let myCatchedPokemons = [];
let myTeam = [];

const catchedPokemonContaier = document.getElementById("catchedPokemonContaier");
const teamPokemonContainer = document.getElementById("teamPokemonContainer");
const btn_ResetGame = document.getElementById("btn_ResetGame");

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

        try {
            renderCatchedPokemons();
            renderTeam();
        } catch (error) {

        }
    }
}

function save_SaveObj() {
    localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));
    console.log('SaveObj', save_Object);
}


function renderCatchedPokemons() {
    for (let i = 0; i < myCatchedPokemons.length; i++) {
        let pokeCont = document.createElement('div');
        pokeCont.classList.add("pokemonContaier")

        let addBtn = document.createElement("div");
        addBtn.innerHTML = "+"
        addBtn.classList.add("addButton")
        addBtn.id = myCatchedPokemons[i].unique_ID

        let pokeimage = document.createElement("img");
        pokeimage.src = myCatchedPokemons[i].spriteFront;

        let pokename = document.createElement("p");
        pokename.innerHTML = myCatchedPokemons[i].name;

        let infocont = document.createElement("div");
        infocont.classList.add("infobox");

        let level = document.createElement("p");
        level.innerHTML = `Lv.${myCatchedPokemons[i].level}`;

        let type = document.createElement("p");
        type.innerHTML = `Typ: ${myCatchedPokemons[i].type}`;

        let number = document.createElement("p");
        number.innerHTML = `Nr. ${myCatchedPokemons[i].id}`;

        infocont.appendChild(level)
        infocont.appendChild(type)
        infocont.appendChild(number)

        pokeCont.appendChild(addBtn)
        pokeCont.appendChild(pokeimage)
        pokeCont.appendChild(pokename)
        pokeCont.appendChild(infocont)

        catchedPokemonContaier.appendChild(pokeCont)
    }
}



// Pokemon hinzufügen
const addBtn = document.querySelectorAll('.addButton');
if (addBtn) {
    addBtn.forEach((button) => {
        button.addEventListener('click', () => {
            let pokemonIndex = -1;
            let addedPokemon;
            for (let i = 0; i < myCatchedPokemons.length; i++) {
                if (button.id === myCatchedPokemons[i].unique_ID) {
                    pokemonIndex = i;
                    break;
                }
            }

            // Prüfen ob Pokemon gefunden
            if (pokemonIndex >= 0) {
                addedPokemon = myCatchedPokemons[pokemonIndex]
                // console.log('addedPokemon', addedPokemon);

                // check ob teamplatz frei
                const freeTeamNumbers = myTeam.length;
                if (freeTeamNumbers < 4) {
                    //! check, ob dieses Pokemon schon im Team
                    myTeam.unshift(addedPokemon);
                    console.log(myTeam);
                    renderTeam()
                    save_SaveObj();
                    location.reload();
                } else {
                    alert("Kein Platz mehr frei")
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



function renderTeam() {
    teamPokemonContainer.innerHTML = "";
    for (let i = 0; i < myTeam.length; i++) {
        let pokeCont = document.createElement('div');
        pokeCont.classList.add("pokemonContaier")

        let addBtn = document.createElement("div");
        addBtn.innerHTML = "-"
        addBtn.classList.add("deleteButton")
        addBtn.id = myTeam[i].unique_ID

        let pokeimage = document.createElement("img");
        pokeimage.src = myTeam[i].spriteFront;
        document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront

        let pokename = document.createElement("p");
        pokename.innerHTML = myTeam[i].name;

        let infocont = document.createElement("div");
        infocont.classList.add("infobox");

        let level = document.createElement("p");
        level.innerHTML = `Lv.${myTeam[i].level}`;

        let type = document.createElement("p");
        type.innerHTML = `Typ: ${myTeam[i].type}`;

        let number = document.createElement("p");
        number.innerHTML = `Nr. ${myTeam[i].id}`;

        infocont.appendChild(level)
        infocont.appendChild(type)
        infocont.appendChild(number)

        pokeCont.appendChild(addBtn)
        pokeCont.appendChild(pokeimage)
        pokeCont.appendChild(pokename)
        pokeCont.appendChild(infocont)

        teamPokemonContainer.appendChild(pokeCont)
    }
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
                pokeballs: 20,
                money: 100,
            },
        };

        save_SaveObj();
        location.reload();
      }
    })
}
