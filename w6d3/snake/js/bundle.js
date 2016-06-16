/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);
	
	$( () => {
	  const rootEl = $('.snakediv');
	  new SnakeView(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	function SnakeView(rootEl) {
	  this.board = new Board();
	  this.$el = rootEl;
	  this.setupSnake();
	  this.turnSnake();
	  setInterval(this.step.bind(this), 500);
	}
	
	SnakeView.prototype.turnSnake = function() {
	  $(window).keydown(e => {
	    this.board.snake.turn(e.keyCode);
	  })
	}
	
	SnakeView.prototype.step = function() {
	  let oldMove = this.board.snake.move();
	  this.render(oldMove);
	}
	
	SnakeView.prototype.makeMouse = function () {
	  let coords = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
	  let box = $(`li[data-pos="${coords}"]`)
	  if (box.attr("class") === "isSnake") {
	    this.makeMouse();
	  } else {
	    box.addClass("mouse");
	  }
	};
	
	SnakeView.prototype.setupSnake = function() {
	  for(let i = 0; i < 20; i++) {
	    const rowIdx = i;
	    const $row = $("<ul>").addClass("group");
	    for(let colIdx = 0; colIdx < 20; colIdx++) {
	      const $square = $("<li>").attr("data-pos", [rowIdx, colIdx]);
	      $row.append($square);
	    }
	    this.$el.append($row);
	  }
	  this.makeMouse();
	}
	
	SnakeView.prototype.render = function(oldMove) {
	  let segs = this.board.snake.segments;
	  for(let i = 0; i < segs.length; i++) {
	    let coords = segs[i].join(",");
	    if ($(`li[data-pos="${coords}"]`).attr("class") === "mouse") {
	      this.makeMouse();
	      this.board.snake.eating = 2;
	    }
	    if (oldMove) {
	      $(`li[data-pos="${oldMove.join(",")}"]`).removeClass();
	    }
	    $(`li[data-pos="${coords}"]`).addClass("isSnake").removeClass("mouse");
	    // if ($(`li[data-pos="${this.board.snake.applyDelta(this.board.snake.direction).join(",")}"]`).attr("class") === "isSnake") {
	    //   alert(`You lose! Your snake is ${this.board.snake.segments.length} long!`);
	    // }
	  }
	}
	
	module.exports = SnakeView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3)
	
	function Board () {
	  this.snake = new Snake();
	}
	
	module.exports = Board


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Snake() {
	  this.direction = "N";
	  this.segments = [[10,10]];
	  this.deltas = {"N": [-1,0],
	    "E": [0,1],
	    "S": [1,0],
	    "W": [0,-1]}
	  this.eating = 0;
	}
	
	Snake.prototype.move = function() {
	  this.segments.unshift(this.applyDelta(this.direction));
	  if (this.eating > 0) {
	    this.eating--;
	  } else {
	    return this.segments.pop();
	  }
	}
	
	Snake.prototype.applyDelta = function(direction) {
	  let firstSeg = this.segments[0];
	  return [firstSeg[0] + this.deltas[direction][0],
	    firstSeg[1] + this.deltas[direction][1]]
	}
	
	Snake.prototype.turn = function(keyCode) {
	  switch(keyCode) {
	    case 38:
	      this.direction = "N";
	      break;
	    case 39:
	      this.direction = "E";
	      break;
	    case 40:
	      this.direction = "S";
	      break;
	    case 37:
	      this.direction = "W";
	      break;
	  }
	}
	
	module.exports = Snake;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map