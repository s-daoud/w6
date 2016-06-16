var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $('li').on("click", e => {
    const $sq = $(e.currentTarget);
    const mark = this.game.currentPlayer;
    let stringPos = $sq.attr("data-pos");
    let pos = [parseInt(stringPos[0]), parseInt(stringPos[2])];
    try {
      this.game.playMove(pos);
      this.makeMove($sq, mark);
      if(this.game.isOver()){
        if(this.game.winner()) {
        alert(`${mark.toUpperCase()} wins!`);
        } else {
        alert("No one wins!")
        }
      }
    }
    catch(err) {
      alert("Invalid Move!");
    }
  });
};

View.prototype.makeMove = function ($square, mark) {
  $square.addClass("clicked");
  const h1 = $("<h1>").text(mark);
  $square.append(h1);
};

View.prototype.setupBoard = function () {
  const ul = $("<ul>");
  ul.css("width", "600");
  ul.css("height", "600");
  this.$el.append(ul);
  for(let i = 0; i < 9; i++) {
    let li = $("<li>");
    li.attr("data-pos", [Math.floor(i/3), i%3]);
    ul.append(li);
  }
};

module.exports = View;
