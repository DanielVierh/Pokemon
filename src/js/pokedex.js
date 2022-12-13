facedPokemons = [];
let myTeam = [];
let pokemonByID = []

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
};

window.onload = init();

function init() {
    if (document.getElementById('pokedexTag')) {
        loadFacedPokemons();
    }
}

function loadFacedPokemons() {
    if (localStorage.getItem('stored_save_Object') != null) {
        save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
        facedPokemons = save_Object.allFacedPokemons;
        console.log('facedPokemons', facedPokemons);
        pokemonByID = facedPokemons.slice(0);
        pokemonByID.sort(function(a,b) {
            return a.id - b.id;
        });

        myTeam = save_Object.myPokemonTeam;
        loadMyTeam();
        renderPokeCards();
    }else {
        console.log('Konnte nicht geladen werden');
    }
}

//myPokemonTeam
function loadMyTeam() {
    for (let i = 0; i < myTeam.length; i++) {
        document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront;
    }
}

function renderPokeCards() {
    let pokeId = 0;
    let pokename = '';
    let pokelevel = 0;
    let poketype = '';

    console.log(facedPokemons);

    for (let i = 0; i < pokemonByID.length; i++) {
        pokeId = pokemonByID[i].id;
        pokename = pokemonByID[i].name;
        pokelevel = pokemonByID[i].level;
        poketype = pokemonByID[i].type;
        buildCard(pokeId, pokename, pokelevel, poketype);
    }
}

function buildCard(id, name, level, type) {
    let cont = document.createElement('div');
    let txtlbl = document.createElement('p');
    let imgP = document.createElement('img');
    txtlbl.innerText = `${makeFirstLetterBig(name)} Nr.${id} \n Typ: ${makeFirstLetterBig(type)}`;
    txtlbl.classList.add('pokedexName');
    imgP.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    cont.appendChild(imgP);
    cont.appendChild(document.createTextNode(name));
    cont.classList.add('container');
    cont.classList.add(addColorClass(type));
    cont.appendChild(txtlbl);
    let card = document.getElementById('cards');
    card.appendChild(cont);
}

function addColorClass(type) {
    if (type === '') {
    }

    switch (type) {
        case 'fire':
            return 'orangeContainer';
            break;
        case 'water':
            return 'blueContainer';
            break;
        case 'bug':
            return 'greenContainer';
            break;
        case 'grass':
            return 'greenContainer';
            break;
        case 'ground':
            return 'brownContainer';
            break;
        case 'poison':
            return 'purpleContainer';
            break;
        case 'rock':
            return 'brownContainer';
            break;
        case 'electric':
            return 'yellowContainer';
            break;

        default:
            return 'greyContainer';
            break;
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
