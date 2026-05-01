(() => {
  "use strict";

  // ######################################################
  // State aus Session/LocalStorage laden
  // ######################################################
  const myName = sessionStorage.getItem("pvp_trainerName") || "Trainer";
  const roomCode = sessionStorage.getItem("pvp_roomCode") || "";
  const opponentName = sessionStorage.getItem("pvp_opponentName") || "Gegner";

  let opponentTeam = [];
  try {
    opponentTeam = JSON.parse(
      sessionStorage.getItem("pvp_opponentTeam") || "[]",
    );
  } catch {}

  let myTeam = [];
  try {
    const save = JSON.parse(localStorage.getItem("stored_save_Object") || "{}");
    myTeam = (save.myPokemonTeam || []).map((p) => ({ ...p }));
  } catch {}

  if (!roomCode || !opponentTeam.length || !myTeam.length) {
    alert("PvP-Daten fehlen. Zurück zur Lobby.");
    window.location = "pvp-lobby.html";
    return;
  }

  // ######################################################
  // Kampf-State
  // ######################################################
  // HP getrennt verwalten, damit das team-Objekt nicht mutiert wird
  const myHp = myTeam.map((p) => p.hp ?? p.maxHp ?? 100);
  const oppHp = opponentTeam.map((p) => p.hp ?? p.maxHp ?? 100);
  const myDefeated = myTeam.map(() => false);
  const oppDefeated = opponentTeam.map(() => false);

  let myCurrentIndex = 0;
  let oppCurrentIndex = 0;
  let myTurn = false;
  let battleEnded = false;
  let socket = null;

  // ######################################################
  // DOM-Referenzen
  // ######################################################
  const wildPokeImage = document.getElementById("imgPoke");
  const wildPokeName = document.getElementById("wildPokeName");
  const pvpOpponentNameEl = document.getElementById("pvpOpponentName");
  const wildPokemonProgress = document.getElementById("wildPokemonProgress");

  const myPokeImage = document.getElementById("imgMyPoke");
  const myPokeNameEl = document.getElementById("myPokeName");
  const myPokemonProgress = document.getElementById("myPokemonProgress");

  const infoBox = document.getElementById("infoBox");
  const moveButtonCont = document.getElementById("moveButtonCont");
  const pvpWaitOverlay = document.getElementById("pvpWaitOverlay");
  const pvpWaitText = document.getElementById("pvpWaitText");
  const pvpTeamSelector = document.getElementById("pvpTeamSelector");
  const pvpTeamDots = document.getElementById("pvpTeamDots");
  const oppTeamDots = document.getElementById("oppTeamDots");

  const btnAttack0 = document.getElementById("btnAttack0");
  const btnAttack1 = document.getElementById("btnAttack1");
  const btnAttack2 = document.getElementById("btnAttack2");
  const btnAttack3 = document.getElementById("btnAttack3");

  // ######################################################
  // Menü-Toggle
  // ######################################################
  document.getElementById("btn_Menue")?.addEventListener("click", () => {
    document.getElementById("windowMenu")?.classList.toggle("active");
  });
  document.getElementById("btnCloseMenue")?.addEventListener("click", () => {
    document.getElementById("windowMenu")?.classList.remove("active");
  });

  // ######################################################
  // Init
  // ######################################################
  renderOpponent();
  renderMy();
  renderTeamDots();
  showInfo("Verbinde mit Server…");
  showWaiting("Verbinde…");
  connectSocket();

  // ######################################################
  // Socket
  // ######################################################
  function connectSocket() {
    socket = io();

    socket.on("connect", () => {
      socket.emit("rejoin-battle", { roomCode, trainerName: myName });
    });

    socket.on("battle-ready", ({ myTurn: turn }) => {
      myTurn = turn;
      hideWaiting();
      if (myTurn) {
        showInfo("Du bist dran! Wähle eine Attacke.");
        showActions();
      } else {
        showWaiting(`${opponentName} wählt Attacke…`);
      }
    });

    socket.on("opponent-attacked", ({ moveName, damage, remainingHp }) => {
      handleReceiveAttack(moveName, damage, remainingHp);
    });

    socket.on("opponent-switched", ({ pokemonIndex }) => {
      oppCurrentIndex = pokemonIndex;
      oppDefeated[pokemonIndex] = false; // frisch eingewechselt
      renderOpponent();
      renderTeamDots();
      showInfo(
        `${opponentName} schickt ${fmt(opponentTeam[pokemonIndex]?.name)} in den Kampf!`,
      );
      hideWaiting();
      setTimeout(() => {
        myTurn = true;
        showInfo("Du bist dran! Wähle eine Attacke.");
        showActions();
      }, 1500);
    });

    socket.on("wait-for-attack", () => {
      showWaiting(`${opponentName} greift an…`);
    });

    socket.on("battle-end", ({ winner }) => {
      handleBattleEnd(winner);
    });

    socket.on("opponent-disconnected", () => {
      if (battleEnded) return;
      battleEnded = true;
      alert(`${opponentName} hat die Verbindung getrennt. Du gewinnst!`);
      awardWin();
      cleanup();
      window.location = "map1.html";
    });

    socket.on("connect_error", () => {
      alert("Verbindung zum PvP-Server verloren. Zurück zur Lobby.");
      window.location = "pvp-lobby.html";
    });
  }

  // ######################################################
  // Angriff (mein Zug)
  // ######################################################
  function onAttackClick(moveName) {
    if (!myTurn || battleEnded) return;
    myTurn = false;
    hideActions();

    const me = myTeam[myCurrentIndex];
    const opp = opponentTeam[oppCurrentIndex];
    const damage = calcDamage(me, opp);

    oppHp[oppCurrentIndex] = Math.max(0, oppHp[oppCurrentIndex] - damage);
    showInfo(
      `Du setzt "${fmt(moveName)}" ein und richtet ${damage} Schaden an.`,
    );

    wildPokeImage.classList.add("getAttacked");
    setTimeout(() => wildPokeImage.classList.remove("getAttacked"), 600);

    setTimeout(() => {
      renderOpponentHp();

      if (oppHp[oppCurrentIndex] <= 0) {
        handleOpponentPokemonDefeated(moveName, damage);
      } else {
        socket.emit("pvp-attack", {
          moveName: fmt(moveName),
          damage,
          remainingHp: oppHp[oppCurrentIndex],
          pokemonIndex: oppCurrentIndex,
        });
        showWaiting(`${opponentName} wählt Attacke…`);
      }
    }, 1500);
  }

  function handleOpponentPokemonDefeated(moveName, damage) {
    oppDefeated[oppCurrentIndex] = true;
    renderTeamDots();

    wildPokeImage.classList.add("getDestroyed");
    setTimeout(() => {
      wildPokeImage.style.opacity = "0";
    }, 400);

    // Angriff mit remainingHp=0 senden (signalisiert K.O. an Gegner)
    socket.emit("pvp-attack", {
      moveName: fmt(moveName),
      damage,
      remainingHp: 0,
      pokemonIndex: oppCurrentIndex,
    });

    const allOppDefeated = oppDefeated.every((d) => d);
    if (allOppDefeated) {
      socket.emit("battle-end", { winner: "me" });
      setTimeout(() => handleBattleEnd("me"), 1800);
    } else {
      showInfo(
        `${opponentName}s ${fmt(opponentTeam[oppCurrentIndex]?.name)} wurde besiegt! Warte auf nächstes Pokemon…`,
      );
      showWaiting(`${opponentName} wechselt Pokemon…`);
    }
  }

  // ######################################################
  // Angriff empfangen (Gegner-Zug)
  // ######################################################
  function handleReceiveAttack(moveName, damage, remainingHp) {
    showInfo(
      `${opponentName} setzt "${moveName}" ein und richtet ${damage} Schaden an.`,
    );

    myPokeImage.classList.add("getAttacked");
    setTimeout(() => myPokeImage.classList.remove("getAttacked"), 600);

    myHp[myCurrentIndex] = Math.max(0, remainingHp);

    setTimeout(() => {
      renderMyHp();

      if (myHp[myCurrentIndex] <= 0) {
        handleMyPokemonDefeated();
      } else {
        myTurn = true;
        showInfo("Du bist dran! Wähle eine Attacke.");
        showActions();
      }
    }, 1500);
  }

  function handleMyPokemonDefeated() {
    myDefeated[myCurrentIndex] = true;
    renderTeamDots();

    myPokeImage.classList.add("getDestroyed");
    setTimeout(() => {
      myPokeImage.style.opacity = "0";
    }, 400);

    const allMyDefeated = myDefeated.every((d) => d);
    if (allMyDefeated) {
      socket.emit("battle-end", { winner: "opponent" });
      setTimeout(() => handleBattleEnd("opponent"), 1800);
    } else {
      setTimeout(() => showTeamSelector(), 800);
    }
  }

  // ######################################################
  // Pokemon wechseln (nach K.O.)
  // ######################################################
  function switchTo(index) {
    if (myDefeated[index]) return;
    myCurrentIndex = index;
    hideTeamSelector();
    renderMy();
    socket.emit("switch-pokemon", { pokemonIndex: index });
    showWaiting(`${opponentName} greift an…`);
  }

  // ######################################################
  // Kampfende
  // ######################################################
  function handleBattleEnd(winner) {
    if (battleEnded) return;
    battleEnded = true;
    hideWaiting();
    hideTeamSelector();
    hideActions();

    if (winner === "me") {
      showInfo("🏆 Du hast den PvP-Kampf gewonnen! +50 Münzen");
      awardWin();
    } else {
      showInfo("Du hast den PvP-Kampf verloren.");
    }

    cleanup();
    setTimeout(() => {
      window.location = "map1.html";
    }, 3500);
  }

  function awardWin() {
    try {
      const save = JSON.parse(
        localStorage.getItem("stored_save_Object") || "{}",
      );
      save.items = save.items || {};
      save.items.money = (save.items.money || 0) + 50;
      localStorage.setItem("stored_save_Object", JSON.stringify(save));
    } catch {}
  }

  function cleanup() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    sessionStorage.removeItem("pvp_roomCode");
    sessionStorage.removeItem("pvp_opponentName");
    sessionStorage.removeItem("pvp_opponentTeam");
    sessionStorage.removeItem("pvp_myTurn");
  }

  // ######################################################
  // Schadensberechnung (client-seitig beim Angreifer)
  // ######################################################
  function calcDamage(attacker, defender) {
    const lv = attacker.level || 5;
    const atk = attacker.statAttack || 50;
    const def = defender.statDefense || 50;
    const sdef = defender.specialDefense || 0;
    const basePower = 50;
    const raw = (lv * 0.2 + 2) * basePower * (atk / (def + sdef + 50 + lv)) * 3;
    // ±15 % Zufallsvariation
    const variance = 0.85 + Math.random() * 0.3;
    return Math.max(1, Math.floor((raw / 20) * variance));
  }

  // ######################################################
  // Render
  // ######################################################
  function renderOpponent() {
    const p = opponentTeam[oppCurrentIndex];
    if (!p) return;

    if (wildPokeImage) {
      wildPokeImage.src = p.spriteFront || "";
      wildPokeImage.style.opacity = "1";
      wildPokeImage.className = "wildPokemonImage";
    }
    if (pvpOpponentNameEl) {
      pvpOpponentNameEl.textContent = `⚔️ ${opponentName}`;
    }
    renderOpponentHp();
  }

  function renderOpponentHp() {
    const p = opponentTeam[oppCurrentIndex];
    if (!p) return;
    const maxHp = p.maxHp || 100;
    const pct = Math.max(0, Math.round((oppHp[oppCurrentIndex] * 100) / maxHp));
    if (wildPokemonProgress) wildPokemonProgress.value = pct;
    if (wildPokeName)
      wildPokeName.textContent = `${fmt(p.name)} | Lv.${p.level} | KP.${oppHp[oppCurrentIndex]}`;
  }

  function renderMy() {
    const p = myTeam[myCurrentIndex];
    if (!p) return;

    if (myPokeImage) {
      myPokeImage.src = p.spriteBack || p.spriteFront || "";
      myPokeImage.style.opacity = "1";
      myPokeImage.className = "myPokemonImage";
    }
    renderMyHp();
    renderMoveButtons();
  }

  function renderMyHp() {
    const p = myTeam[myCurrentIndex];
    if (!p) return;
    const maxHp = p.maxHp || 100;
    const pct = Math.max(0, Math.round((myHp[myCurrentIndex] * 100) / maxHp));
    if (myPokemonProgress) myPokemonProgress.value = pct;
    if (myPokeNameEl)
      myPokeNameEl.textContent = `${fmt(p.name)} | Lv.${p.level} | KP.${myHp[myCurrentIndex]}`;
  }

  function renderMoveButtons() {
    const p = myTeam[myCurrentIndex];
    const btns = [btnAttack0, btnAttack1, btnAttack2, btnAttack3];
    btns.forEach((btn, i) => {
      if (!btn) return;
      const move = p?.moves?.[i];
      if (move) {
        const moveName =
          typeof move === "string"
            ? move
            : move.name || move.germanName || "Attacke";
        btn.textContent = fmt(moveName);
        btn.style.display = "";
      } else {
        btn.style.display = "none";
      }
    });
  }

  function renderTeamDots() {
    if (pvpTeamDots) {
      pvpTeamDots.innerHTML = myDefeated
        .map((d, i) => {
          const cls = d ? "defeated" : i === myCurrentIndex ? "active" : "";
          return `<span class="team-dot ${cls}">●</span>`;
        })
        .join("");
    }
    if (oppTeamDots) {
      oppTeamDots.innerHTML = oppDefeated
        .map((d, i) => {
          const cls = d ? "defeated" : i === oppCurrentIndex ? "active" : "";
          return `<span class="team-dot ${cls}">●</span>`;
        })
        .join("");
    }
  }

  // ######################################################
  // UI-Helfer
  // ######################################################
  function showInfo(msg) {
    if (infoBox) {
      infoBox.textContent = msg;
      infoBox.hidden = false;
    }
  }

  function showActions() {
    hideWaiting();
    if (moveButtonCont) moveButtonCont.hidden = false;
  }

  function hideActions() {
    if (moveButtonCont) moveButtonCont.hidden = true;
  }

  function showWaiting(text) {
    hideActions();
    if (pvpWaitText) pvpWaitText.textContent = text || "Warte…";
    if (pvpWaitOverlay) pvpWaitOverlay.style.display = "flex";
  }

  function hideWaiting() {
    if (pvpWaitOverlay) pvpWaitOverlay.style.display = "none";
  }

  function showTeamSelector() {
    hideWaiting();
    if (!pvpTeamSelector) return;
    // Bestehende Buttons entfernen, Titel lassen
    Array.from(pvpTeamSelector.querySelectorAll("button")).forEach((b) =>
      b.remove(),
    );
    showInfo("Dein Pokemon wurde besiegt! Wähle ein neues.");

    myTeam.forEach((p, i) => {
      if (myDefeated[i]) return;
      const btn = document.createElement("button");
      btn.className = "actionButton2";
      btn.textContent = `${fmt(p.name)} | Lv.${p.level} | KP.${myHp[i]}`;
      btn.addEventListener("click", () => switchTo(i));
      pvpTeamSelector.appendChild(btn);
    });
    pvpTeamSelector.style.display = "block";
  }

  function hideTeamSelector() {
    if (pvpTeamSelector) pvpTeamSelector.style.display = "none";
  }

  // ######################################################
  // Util
  // ######################################################
  function fmt(name) {
    if (!name) return "?";
    return String(name)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // ######################################################
  // Button-Events
  // ######################################################
  [btnAttack0, btnAttack1, btnAttack2, btnAttack3].forEach((btn) => {
    if (btn)
      btn.addEventListener("click", () => onAttackClick(btn.textContent));
  });
})();
