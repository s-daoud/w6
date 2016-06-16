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
