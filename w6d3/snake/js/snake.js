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
