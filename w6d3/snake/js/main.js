const SnakeView = require("./snake-view.js");

$( () => {
  const rootEl = $('.snakediv');
  new SnakeView(rootEl);
});
