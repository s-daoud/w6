const Game = require("./game.js");

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  const animateCallback = () => {
    this.bindKeyHandlers();
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(animateCallback);
  }
  animateCallback();
};

GameView.prototype.bindKeyHandlers = function () {
  let press = key.getPressedKeyCodes()[0];
  key("up", () => this.game.ship.power(.005, press));
  key("down", () => this.game.ship.power(.005, press));
  key("left", () => this.game.ship.power(.005, press));
  key("right", () => this.game.ship.power(.005, press));
  key("space", () => this.game.ship.fireBullet());
};

module.exports = GameView;
