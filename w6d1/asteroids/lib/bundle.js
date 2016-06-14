/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	const canvasEl = document.getElementById("game-canvas");

	const ctx = canvasEl.getContext("2d");

	const asteroids = new GameView(ctx);

	asteroids.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits(parent, child) {
	    function Surrogate () {};
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    child.prototype.constructor = child;
	  },

	  dir (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },

	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },

	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },

	  randomVec(length) {
	    let deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },

	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	}



	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	  this.isWrappable = true;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  if (this.game.isOutOfBounds(this.pos)) {
	    if (this.isWrappable) {
	      this.pos = this.game.wrap(this.pos);
	    } else {
	    this.game.remove(this);
	    }
	  }
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  if (Util.dist(this.pos, otherObject.pos) < (this.radius + otherObject.radius)) {
	    return true;
	  } else {
	    return false;
	  }
	};

	MovingObject.prototype.collideWith = function (otherObject) {

	};

	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

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


/***/ }
/******/ ]);