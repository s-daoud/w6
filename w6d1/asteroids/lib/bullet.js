const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");

function Bullet(options) {
  const x = options.vel[0];
  const y = options.vel[1];
  // debugger
  const newPos = options.pos.slice();
  MovingObject.call(this, {pos: newPos, vel: [x + (1 * options.vel[0]), y + (1 * options.vel[0])], radius: 5, color: "#000000", game: options.game});
  this.isWrappable = false;
}

Util.inherits(MovingObject, Bullet);

Bullet.prototype.collideWith = function (otherObject) {
  this.game.remove(this);
  this.game.remove(otherObject);
};

module.exports = Bullet;
