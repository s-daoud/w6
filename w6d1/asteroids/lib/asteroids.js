const GameView = require("./game_view.js");

const canvasEl = document.getElementById("game-canvas");

const ctx = canvasEl.getContext("2d");

const asteroids = new GameView(ctx);

asteroids.start();
