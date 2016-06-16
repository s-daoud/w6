const Board = require('./board.js');

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
