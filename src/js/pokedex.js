facedPokemons = [];

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

        window.onload = init();


        function init() {
            if(document.getElementById("pokedexTag")) {
                loadFacedPokemons();
            }

        }


        function loadFacedPokemons() {
            if (localStorage.getItem('storedFacedPokemons') != null) {
                save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
                facedPokemons = save_Object.allFacedPokemons;
                renderPokeCards();
            }
        }


        function renderPokeCards() {
            let pokeId = 0;
            let pokename = '';
            let pokelevel = 0;
            let poketype = '';

            console.log(facedPokemons);

            for (let i = 0; i < facedPokemons.length; i++) {
                pokeId = facedPokemons[i].id;
                pokename = facedPokemons[i].name;
                pokelevel = facedPokemons[i].level;
                poketype = facedPokemons[i].type;
                buildCard(pokeId, pokename, pokelevel, poketype);

            }
        }


        function buildCard(id, name, level, type) {
            const cont = document.createElement('div');
            const txtlbl = document.createElement('p');
            const imgP = document.createElement('img');
            txtlbl.innerText = `${name} Nr.${id}`;
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
