const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Asteroid(options) {
  MovingObject.call(this, {pos: options.pos, vel: Util.randomVec((Math.random() * 2) + .5), radius: 15, color: "#800080", game: options.game});
}

Util.inherits(MovingObject, Asteroid);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObject);
  }
};

module.exports = Asteroid;
