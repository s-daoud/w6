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

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);
	
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView(game, rootEl) {
	  this.game = game;
	  this.rootEl = rootEl;
	  this.setupTowers();
	  this.render();
	  this.fromTower = undefined;
	  this.clickTower();
	}
	
	HanoiView.prototype.setupTowers = function() {
	  const ul0 = $('<ul>');
	  const ul1 = $('<ul>');
	  const ul2 = $('<ul>');
	
	  ul0.addClass("0");
	  ul1.addClass("1");
	  ul2.addClass("2");
	
	  let ulArray = [ul0, ul1, ul2];
	
	  for(let i = 0; i < 3; i++) {
	    this.rootEl.append(ulArray[i]);
	    for(let j = 0; j < 3; j++) {
	      let li = $("<li>");
	      li.attr("data-pos", [i, j]);
	      ulArray[i].append(li);
	    }
	  }
	}
	
	HanoiView.prototype.render = function() {
	
	  for(let i = 0; i < 3; i++) {
	    for(let j = 0; j < 3; j++) {
	      let towerClass = "undefined"
	      switch(this.game.towers[i][j]) {
	        case 1:
	          towerClass = "one";
	          break;
	        case 2:
	          towerClass = "two";
	          break;
	        case 3:
	          towerClass = "three";
	          break;
	        }
	      $(`li[data-pos="${i},${j}"]`).removeClass();
	      $(`li[data-pos="${i},${j}"]`).addClass(towerClass);
	    }
	  }
	}
	
	HanoiView.prototype.clickTower = function() {
	  $('ul').on("click", e => {
	    const $clicked = $(e.currentTarget);
	    if (this.fromTower === undefined) {
	      this.fromTower = parseInt($clicked.attr("class"));
	    } else {
	      const toTower = parseInt($clicked.attr("class"));
	      if(!this.game.isValidMove(this.fromTower, toTower)) {
	        alert("Invalid Move!");
	      }
	      this.game.move(this.fromTower, toTower);
	      this.fromTower = undefined;
	      this.render();
	      if (this.game.isWon()) {
	        alert("Congrats, you're a winner!");
	      }
	    }
	  })
	}
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map