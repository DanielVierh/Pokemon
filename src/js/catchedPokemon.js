let myCatchedPokemons = [];
let myTeam = [];

const catchedPokemonContaier = document.getElementById("catchedPokemonContaier");

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
    if(document.getElementById("catchPokeTag")) {
        load_SaveObj();
    }
}


function load_SaveObj() {
    if (localStorage.getItem('stored_save_Object') != null) {
        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
        myTeam = save_Object.myPokemonTeam;
        myCatchedPokemons = save_Object.myCatchedPokemons;

        try {
            renderCatchedPokemons();
        } catch (error) {

        }
    }
}

function save_SaveObj() {
    localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));
    console.log('SaveObj', save_Object);
}


function renderCatchedPokemons() {
    console.log(myCatchedPokemons);
    for(let i = 0; i < myCatchedPokemons.length; i++) {
        console.log(myCatchedPokemons[i].spriteFront);
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

        infocont.appendChild(level)
        infocont.appendChild(type)

        pokeCont.appendChild(addBtn)
        pokeCont.appendChild(pokeimage)
        pokeCont.appendChild(pokename)
        pokeCont.appendChild(infocont)



        catchedPokemonContaier.appendChild(pokeCont)
    }
}