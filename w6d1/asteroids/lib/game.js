const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({game: this});
  this.bullets = [];
};

Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({ pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.randomPosition = function () {
  let x = Math.random() * Game.DIM_X;
  let y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((obj) => obj.draw(ctx));
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach((obj) => {
    obj.move();
  });
};

Game.prototype.wrap = function (pos) {
  if (pos[0] < 0) {
    pos[0] += Game.DIM_X;
  }
  if (pos[0] > Game.DIM_X) {
    pos[0] -= Game.DIM_X;
  }
  if (pos[1] < 0) {
    pos[1] += Game.DIM_Y;
  }
  if (pos[1] > Game.DIM_Y) {
    pos[1] -= Game.DIM_Y;
  }
  return pos;
};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.checkCollisons = function () {
  const allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length; i++) {
    for (let j = i + 1; j < allObjects.length; j++) {
      if (allObjects[i].isCollidedWith(allObjects[j])) {
        allObjects[i].collideWith(allObjects[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisons();
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroid) {
    let index = this.asteroids.indexOf(obj);
    this.asteroids.splice(index, 1);
  }
  else if (obj instanceof Bullet){
    let index = this.bullets.indexOf(obj);
    this.bullets.splice(index, 1);
  }
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

module.exports = Game;
