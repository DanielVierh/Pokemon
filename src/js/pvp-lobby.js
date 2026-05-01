// PvP Lobby – Client-Logik
// Läuft auf pvp-lobby.html, nutzt window.io (socket.io CDN)

(function () {
  // ---- DOM ----
  const sectionName = document.getElementById("section-name");
  const sectionChoice = document.getElementById("section-choice");
  const sectionCreate = document.getElementById("section-create");
  const sectionJoin = document.getElementById("section-join");
  const sectionWaiting = document.getElementById("section-waiting");
  const pvpRoomList = document.getElementById("pvp-room-list");
  const pvpRoomListEmpty = document.getElementById("pvp-room-list-empty");

  const inpName = document.getElementById("inp-name");
  const btnNameConfirm = document.getElementById("btn-name-confirm");
  const errName = document.getElementById("err-name");

  const lblTrainerName = document.getElementById("lbl-trainer-name");
  const btnCreate = document.getElementById("btn-create");
  const btnGoJoin = document.getElementById("btn-go-join");

  const lblRoomCode = document.getElementById("lbl-room-code");
  const statusCreate = document.getElementById("status-create");
  const errCreate = document.getElementById("err-create");
  const btnCancelCreate = document.getElementById("btn-cancel-create");

  const inpRoomCode = document.getElementById("inp-room-code");
  const btnJoin = document.getElementById("btn-join");
  const errJoin = document.getElementById("err-join");
  const btnBackJoin = document.getElementById("btn-back-join");

  const statusWaiting = document.getElementById("status-waiting");

  // ---- State ----
  let trainerName = "";
  let roomCode = "";
  let socket = null;

  // ---- Hilfsfunktionen ----
  function showSection(id) {
    [
      sectionName,
      sectionChoice,
      sectionCreate,
      sectionJoin,
      sectionWaiting,
    ].forEach((s) => {
      s.style.display = "none";
    });
    document.getElementById(id).style.display = "flex";
  }

  function getTeamFromLocalStorage() {
    try {
      const raw = localStorage.getItem("stored_save_Object");
      if (!raw) return [];
      const obj = JSON.parse(raw);
      // Serialisiertes Team schicken (nur die nötigen Felder, kein Overhead)
      return (obj.myPokemonTeam || []).map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        level: p.level,
        moves: p.moves,
        spriteFront: p.spriteFront,
        statAttack: p.statAttack,
        statDefense: p.statDefense,
        specialDefense: p.specialDefense,
        hp: p.hp,
        maxHp: p.maxHp,
        xp: p.xp,
        unique_ID: p.unique_ID,
        isDefeated: false,
      }));
    } catch {
      return [];
    }
  }

  function connectSocket() {
    if (socket && socket.connected) return;
    socket = io();

    socket.on("connect_error", () => {
      showSection("section-choice");
      errCreate.textContent = "Verbindung zum Server fehlgeschlagen.";
    });

    // ---- Raum erstellt ----
    socket.on("room-created", ({ roomCode: code }) => {
      roomCode = code;
      lblRoomCode.textContent = code;
      statusCreate.textContent = "Warte auf Gegner…";
      errCreate.textContent = "";
      showSection("section-create");
    });

    // ---- Jemand tritt bei (Ersteller) ----
    socket.on("player-joined", ({ opponentName }) => {
      statusCreate.textContent = `${opponentName} ist beigetreten! Starte Kampf…`;
      sendTeamAndWait();
    });

    // ---- Beigetreten (Beitretender) ----
    socket.on("room-joined", ({ roomCode: code, opponentName }) => {
      roomCode = code;
      statusWaiting.textContent = `Verbunden mit ${opponentName}. Starte Kampf…`;
      showSection("section-waiting");
      sendTeamAndWait();
    });

    // ---- Kampf startet ----
    socket.on("battle-start", ({ opponentTeam, opponentName, myTurn }) => {
      sessionStorage.setItem("pvp_trainerName", trainerName);
      sessionStorage.setItem("pvp_roomCode", roomCode);
      sessionStorage.setItem("pvp_opponentName", opponentName);
      sessionStorage.setItem("pvp_opponentTeam", JSON.stringify(opponentTeam));
      sessionStorage.setItem("pvp_myTurn", myTurn ? "1" : "0");
      window.location = `pvp-battle.html`;
    });

    // ---- Fehler vom Server ----
    socket.on("error", ({ message }) => {
      errCreate.textContent = message;
      errJoin.textContent = message;
    });

    // ---- Offene Räume empfangen ----
    socket.on("open-rooms", ({ rooms }) => {
      renderRoomList(rooms);
    });

    // ---- Gegner getrennt (während Lobby) ----
    socket.on("opponent-disconnected", () => {
      alert("Dein Gegner hat die Verbindung getrennt.");
      showSection("section-choice");
    });
  }

  function sendTeamAndWait() {
    const team = getTeamFromLocalStorage();
    socket.emit("player-team", { team });
  }

  function renderRoomList(rooms) {
    if (!pvpRoomList) return;
    pvpRoomList.innerHTML = "";
    // Eigenen Raum ausblenden (falls man gerade erstellt hat)
    const visible = rooms.filter((r) => r.code !== roomCode);
    if (visible.length === 0) {
      pvpRoomListEmpty.style.display = "block";
      pvpRoomList.style.display = "none";
    } else {
      pvpRoomListEmpty.style.display = "none";
      pvpRoomList.style.display = "flex";
      visible.forEach((r) => {
        const entry = document.createElement("div");
        entry.className = "pvp-room-entry";
        entry.innerHTML = `
          <span class="pvp-room-entry-name">🏆 ${r.host}</span>
          <span class="pvp-room-entry-code">${r.code}</span>
          <button class="pvp-room-entry-btn">Beitreten</button>
        `;
        entry.querySelector("button").addEventListener("click", () => {
          errJoin.textContent = "";
          socket.emit("join-room", { roomCode: r.code, trainerName });
        });
        pvpRoomList.appendChild(entry);
      });
    }
  }

  // ---- UI-Events ----

  // Name bestätigen
  btnNameConfirm.addEventListener("click", () => {
    const val = inpName.value.trim();
    if (!val) {
      errName.textContent = "Bitte gib einen Trainer-Namen ein.";
      return;
    }
    trainerName = val.slice(0, 20);
    errName.textContent = "";
    lblTrainerName.textContent = trainerName;
    localStorage.setItem("pvp_trainerName", trainerName);
    connectSocket();
    showSection("section-choice");
  });

  inpName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnNameConfirm.click();
  });

  // Raum erstellen
  btnCreate.addEventListener("click", () => {
    errCreate.textContent = "";
    showSection("section-create");
    statusCreate.textContent = "Erstelle Raum…";
    socket.emit("create-room", { trainerName });
  });

  // Zu Join-Sektion
  btnGoJoin.addEventListener("click", () => {
    errJoin.textContent = "";
    inpRoomCode.value = "";
    showSection("section-join");
    // Offene Räume sofort laden
    socket.emit("get-open-rooms");
  });

  // Zurück zu Choice
  btnBackJoin.addEventListener("click", () => {
    showSection("section-choice");
  });

  // Raum beitreten
  btnJoin.addEventListener("click", () => {
    const code = inpRoomCode.value.trim().toUpperCase();
    if (code.length !== 4) {
      errJoin.textContent = "Bitte gib einen 4-stelligen Code ein.";
      return;
    }
    errJoin.textContent = "";
    socket.emit("join-room", { roomCode: code, trainerName });
  });

  inpRoomCode.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnJoin.click();
  });

  // Abbrechen (Ersteller wartet)
  btnCancelCreate.addEventListener("click", () => {
    if (socket) socket.emit("leave-room");
    showSection("section-choice");
  });

  // ---- Start: gespeicherten Namen vorab eintragen ----
  const savedName = localStorage.getItem("pvp_trainerName");
  if (savedName) inpName.value = savedName;
  showSection("section-name");
})();
