let facedPokemons = [];
let myTeam = [];
let pokemonByID = [];

let save_Object = {
  today_Date: "",
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
  gen: "all",
};

window.onload = init();

function init() {
  if (document.getElementById("pokedexTag")) {
    loadFacedPokemons();
  }
}

function loadFacedPokemons() {
  if (localStorage.getItem("stored_save_Object") != null) {
    save_Object = JSON.parse(localStorage.getItem("stored_save_Object"));
    facedPokemons = save_Object.allFacedPokemons;
    console.log("facedPokemons", facedPokemons);
    pokemonByID = facedPokemons.slice(0);
    pokemonByID.sort(function (a, b) {
      return a.id - b.id;
    });

    myTeam = save_Object.myPokemonTeam;
    loadMyTeam();
    setupPokedexControls();
    renderPokeCards();
  } else {
    console.log("Konnte nicht geladen werden");
  }
}

//myPokemonTeam
function loadMyTeam() {
  for (let i = 0; i < myTeam.length; i++) {
    document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront;
    document.getElementById(`teamPokeName_${i}`).innerHTML = makeFirstLetterBig(
      myTeam[i].name,
    );
    let hpInPercent = (myTeam[i].hp * 100) / myTeam[i].maxHp;
    document.getElementById(`teamPokeProgress_${i}`).value = hpInPercent;
  }
}

function renderPokeCards() {
  const container = document.getElementById("cards");
  if (!container) return;
  container.innerHTML = "";

  const query = (document.getElementById("pokedexSearch")?.value || "")
    .toLowerCase()
    .trim();
  const filterType =
    document.getElementById("pokedexFilterType")?.value || "all";

  const filtered = pokemonByID.filter((p) => {
    if (filterType !== "all" && p.type !== filterType) return false;
    if (!query) return true;
    const q = query.replace("#", "");
    return (
      String(p.id).includes(q) || (p.name && p.name.toLowerCase().includes(q))
    );
  });

  const resultBar = document.getElementById("pokedexResultsBar");
  if (resultBar) {
    resultBar.innerText = `${filtered.length} Treffer`;
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<div class="pokedexEmpty">Keine Pokémon gefunden. Passe Suche oder Typ-Filter an.</div>';
    return;
  }

  filtered.forEach((p) => {
    const stats = `Ang:${p.statAttack} Ver:${p.statDefense} Kp:${p.hp}`;
    buildCard(p.id, p.name, p.level, p.type, stats, p);
  });
}

function buildCard(id, name, level, type, stats, pokemonData) {
  const cont = document.createElement("div");
  cont.className = "pokedexCard " + addColorClass(type);
  cont.tabIndex = 0;

  const imgP = document.createElement("img");
  imgP.alt = name;
  imgP.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const nm = document.createElement("div");
  nm.className = "name";
  nm.innerText = makeFirstLetterBig(name);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerText = `Nr.${id} · Typ: ${makeFirstLetterBig(type)} · Lv:${level}`;

  const statEl = document.createElement("div");
  statEl.className = "meta chip";
  statEl.innerText = stats;

  cont.appendChild(imgP);
  cont.appendChild(nm);
  cont.appendChild(meta);
  cont.appendChild(statEl);

  cont.addEventListener("click", () =>
    openPokedexModal({ id, name, level, type, stats, ...pokemonData }),
  );
  cont.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPokedexModal({ id, name, level, type, stats, ...pokemonData });
    }
  });

  const card = document.getElementById("cards");
  card.appendChild(cont);
}

function setupPokedexControls() {
  const search = document.getElementById("pokedexSearch");
  const filter = document.getElementById("pokedexFilterType");
  if (search) search.addEventListener("input", debounce(renderPokeCards, 180));
  if (filter) filter.addEventListener("change", renderPokeCards);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePokedexModal();
    }
  });
}

function openPokedexModal(p) {
  const modal = document.getElementById("pokedexModal");
  if (!modal) return;
  modal.innerHTML = "";
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  const panel = document.createElement("div");
  panel.className = "panel";

  const close = document.createElement("button");
  close.className = "closeBtn";
  close.innerText = "Schließen";
  close.addEventListener("click", closePokedexModal);

  const title = document.createElement("h2");
  title.innerText = `${makeFirstLetterBig(p.name)} · Nr.${p.id}`;

  const detailsWrap = document.createElement("div");
  detailsWrap.className = "detailsWrap";

  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
  img.alt = p.name;

  const info = document.createElement("div");
  const typeLabel = p.type ? makeFirstLetterBig(p.type) : "-";
  info.innerHTML = `
        <p><strong>Typ:</strong> ${typeLabel}</p>
        <p><strong>Level:</strong> ${p.level ?? "-"}</p>
        <p><strong>Erfahrung:</strong> ${p.exp ?? "-"}</p>
        <div class="statsGrid">
            <div class="statItem">Angriff: ${p.statAttack ?? "-"}</div>
            <div class="statItem">Verteidigung: ${p.statDefense ?? "-"}</div>
            <div class="statItem">HP: ${p.hp ?? "-"}</div>
            <div class="statItem">Max HP: ${p.maxHp ?? "-"}</div>
        </div>
    `;

  detailsWrap.appendChild(img);
  detailsWrap.appendChild(info);

  panel.appendChild(close);
  panel.appendChild(title);
  panel.appendChild(detailsWrap);

  modal.appendChild(panel);

  modal.addEventListener(
    "click",
    (e) => {
      if (e.target === modal) {
        closePokedexModal();
      }
    },
    { once: true },
  );
}

function closePokedexModal() {
  const modal = document.getElementById("pokedexModal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = "";
}

function debounce(fn, wait) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), wait);
  };
}

function addColorClass(type) {
  if (type === "") {
  }

  switch (type) {
    case "fire":
      return "orangeContainer";
      break;
    case "water":
      return "blueContainer";
      break;
    case "bug":
      return "greenContainer";
      break;
    case "grass":
      return "greenContainer";
      break;
    case "ground":
      return "brownContainer";
      break;
    case "poison":
      return "purpleContainer";
      break;
    case "rock":
      return "brownContainer";
      break;
    case "electric":
      return "yellowContainer";
      break;

    default:
      return "greyContainer";
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
