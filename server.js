const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Statische Dateien aus dem Projekt-Root ausliefern
app.use(express.static(path.join(__dirname)));

// ######################################################
// Raum-Verwaltung
// ######################################################

/**
 * rooms = Map<code, {
 *   code: string,
 *   player1: { socketId, trainerName, team, currentPokemon: number } | null,
 *   player2: { socketId, trainerName, team, currentPokemon: number } | null,
 *   currentTurn: 'player1' | 'player2',
 *   status: 'waiting' | 'battling' | 'finished'
 * }>
 */
const rooms = new Map();

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // I und O weggelassen (Verwechslungsgefahr)
  let code;
  do {
    code = Array.from(
      { length: 4 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  } while (rooms.has(code));
  return code;
}

function getRoomBySocket(socketId) {
  for (const room of rooms.values()) {
    if (
      room.player1?.socketId === socketId ||
      room.player2?.socketId === socketId
    ) {
      return room;
    }
  }
  return null;
}

function getPlayerRole(room, socketId) {
  if (room.player1?.socketId === socketId) return "player1";
  if (room.player2?.socketId === socketId) return "player2";
  return null;
}

function getOpponent(room, role) {
  return role === "player1" ? room.player2 : room.player1;
}

function getOpenRooms() {
  const result = [];
  for (const room of rooms.values()) {
    if (room.status === "waiting" && room.player2 === null) {
      result.push({ code: room.code, host: room.player1.trainerName });
    }
  }
  return result;
}

function broadcastOpenRooms() {
  io.emit("open-rooms", { rooms: getOpenRooms() });
}

// ######################################################
// Socket.io Events
// ######################################################
io.on("connection", (socket) => {
  console.log(`[connect] ${socket.id}`);

  // --- Kampf wieder beitreten (nach Seitennavigation von Lobby → Battle) ---
  socket.on("rejoin-battle", ({ roomCode, trainerName }) => {
    const code = (roomCode || "").toUpperCase().trim();
    const room = rooms.get(code);

    if (!room) {
      socket.emit("error", { message: `Raum "${code}" nicht mehr vorhanden.` });
      return;
    }

    // Spieler anhand des Trainer-Namens identifizieren und socketId aktualisieren
    if (room.player1 && room.player1.trainerName === trainerName) {
      room.player1.socketId = socket.id;
      socket.join(code);
      socket.emit("battle-ready", { myTurn: room.currentTurn === "player1" });
      console.log(`[rejoin] ${trainerName} (player1) in Raum ${code}`);
    } else if (room.player2 && room.player2.trainerName === trainerName) {
      room.player2.socketId = socket.id;
      socket.join(code);
      socket.emit("battle-ready", { myTurn: room.currentTurn === "player2" });
      console.log(`[rejoin] ${trainerName} (player2) in Raum ${code}`);
    } else {
      socket.emit("error", { message: "Trainer nicht im Raum gefunden." });
    }
  });

  // --- Raum erstellen ---
  socket.on("create-room", ({ trainerName }) => {
    if (!trainerName || typeof trainerName !== "string") {
      socket.emit("error", { message: "Ungültiger Trainer-Name." });
      return;
    }
    const code = generateRoomCode();
    const room = {
      code,
      player1: {
        socketId: socket.id,
        trainerName: trainerName.trim().slice(0, 20),
        team: null,
        currentPokemon: 0,
      },
      player2: null,
      currentTurn: "player1",
      status: "waiting",
    };
    rooms.set(code, room);
    socket.join(code);
    socket.emit("room-created", { roomCode: code });
    broadcastOpenRooms();
    console.log(`[room] Erstellt: ${code} von ${trainerName}`);
  });

  // --- Raum beitreten ---
  socket.on("join-room", ({ roomCode, trainerName }) => {
    if (!roomCode || !trainerName) {
      socket.emit("error", { message: "Ungültige Daten." });
      return;
    }
    const code = roomCode.toUpperCase().trim();
    const room = rooms.get(code);

    if (!room) {
      socket.emit("error", { message: `Raum "${code}" nicht gefunden.` });
      return;
    }
    if (room.status !== "waiting") {
      socket.emit("error", {
        message: "Dieser Raum ist bereits voll oder beendet.",
      });
      return;
    }
    if (room.player2 !== null) {
      socket.emit("error", { message: "Dieser Raum ist bereits voll." });
      return;
    }

    room.player2 = {
      socketId: socket.id,
      trainerName: trainerName.trim().slice(0, 20),
      team: null,
      currentPokemon: 0,
    };
    socket.join(code);

    // Beide Spieler informieren
    socket.emit("room-joined", {
      roomCode: code,
      opponentName: room.player1.trainerName,
    });
    io.to(room.player1.socketId).emit("player-joined", {
      opponentName: room.player2.trainerName,
    });
    broadcastOpenRooms();

    console.log(`[room] ${trainerName} ist Raum ${code} beigetreten`);
  });

  // --- Team senden (nach Lobby-Beitritt) ---
  socket.on("player-team", ({ team }) => {
    const room = getRoomBySocket(socket.id);
    if (!room) return;

    const role = getPlayerRole(room, socket.id);
    room[role].team = team;

    const opponent = getOpponent(room, role);

    // Wenn beide Teams da sind → Kampf starten
    if (room.player1.team && room.player2.team) {
      room.status = "battling";
      // Zufällig bestimmen, wer anfängt
      room.currentTurn = Math.random() < 0.5 ? "player1" : "player2";

      io.to(room.player1.socketId).emit("battle-start", {
        opponentTeam: room.player2.team,
        opponentName: room.player2.trainerName,
        myTurn: room.currentTurn === "player1",
      });
      io.to(room.player2.socketId).emit("battle-start", {
        opponentTeam: room.player1.team,
        opponentName: room.player1.trainerName,
        myTurn: room.currentTurn === "player2",
      });
      console.log(
        `[battle] Kampf gestartet in Raum ${room.code}, beginnt: ${room.currentTurn}`,
      );
    }
  });

  // --- Angriff ausführen ---
  socket.on("pvp-attack", ({ moveName, damage, remainingHp, pokemonIndex }) => {
    const room = getRoomBySocket(socket.id);
    if (!room || room.status !== "battling") return;

    const role = getPlayerRole(room, socket.id);
    if (room.currentTurn !== role) return; // Nicht am Zug

    const opponent = getOpponent(room, role);
    if (!opponent) return;

    // Zug wechseln
    room.currentTurn = role === "player1" ? "player2" : "player1";

    // Gegner informieren
    io.to(opponent.socketId).emit("opponent-attacked", {
      moveName,
      damage,
      remainingHp,
      pokemonIndex,
    });

    // Angreifer: Zug wurde registriert
    socket.emit("turn-granted");
  });

  // --- Pokemon wechseln ---
  socket.on("switch-pokemon", ({ pokemonIndex }) => {
    const room = getRoomBySocket(socket.id);
    if (!room || room.status !== "battling") return;

    const role = getPlayerRole(room, socket.id);
    if (room[role]) room[role].currentPokemon = pokemonIndex;

    const opponent = getOpponent(room, role);
    if (!opponent) return;

    // Nach einem erzwungenen Wechsel (Pokemon besiegt) ist der Angreifer am Zug
    room.currentTurn = role === "player1" ? "player2" : "player1";

    // Gegner (Angreifer) bekommt den nächsten Zug
    io.to(opponent.socketId).emit("opponent-switched", { pokemonIndex });

    // Wechselnder Spieler wartet auf Angriff
    socket.emit("wait-for-attack");
  });

  // --- Kampf beenden ---
  socket.on("battle-end", ({ winner }) => {
    const room = getRoomBySocket(socket.id);
    if (!room) return;

    room.status = "finished";
    const role = getPlayerRole(room, socket.id);
    const opponent = getOpponent(room, role);

    if (opponent) {
      io.to(opponent.socketId).emit("battle-end", {
        winner: winner === "me" ? "opponent" : "me",
      });
    }

    console.log(`[battle] Kampf beendet in Raum ${room.code}`);
    // Raum nach kurzer Verzögerung aufräumen
    setTimeout(() => rooms.delete(room.code), 30000);
  });

  // --- Offene Räume abrufen ---
  socket.on("get-open-rooms", () => {
    socket.emit("open-rooms", { rooms: getOpenRooms() });
  });

  // --- Raum verlassen ---
  socket.on("leave-room", () => {
    handleDisconnect(socket);
  });

  // --- Verbindung getrennt ---
  socket.on("disconnect", () => {
    console.log(`[disconnect] ${socket.id}`);
    handleDisconnect(socket);
  });
});

function handleDisconnect(socket) {
  const room = getRoomBySocket(socket.id);
  if (!room) return;

  const role = getPlayerRole(room, socket.id);
  const opponent = getOpponent(room, role);

  if (opponent && room.status !== "finished") {
    io.to(opponent.socketId).emit("opponent-disconnected");
  }

  rooms.delete(room.code);
  broadcastOpenRooms();
  console.log(`[room] Raum ${room.code} gelöscht (Disconnect)`);
}

server.listen(PORT, () => {
  console.log(`Pokemon PvP Server läuft auf http://localhost:${PORT}`);
});
