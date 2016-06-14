const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");

function Ship(options) {
  MovingObject.call(this, {pos: options.game.randomPosition(), vel: [0, 0], radius: 15, color: "#ff59ff", game: options.game});
}

Util.inherits(MovingObject, Ship);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse, press) {
  if (press === 38) {
    this.vel[1] -= impulse;
  } else if (press === 40) {
    this.vel[1] += impulse;
  } else if (press === 37) {
    this.vel[0] -= impulse;
  } else if (press === 39) {
    this.vel[0] += impulse;
  }
};

Ship.prototype.fireBullet = function () {
  if (this.vel === [0,0]) return;
  let bullet = new Bullet({ pos: this.pos, vel: this.vel, game: this.game });
  if (this.game.bullets.length === 0) {
    // debugger
    this.game.bullets.push(bullet);
  }
};

module.exports = Ship;
