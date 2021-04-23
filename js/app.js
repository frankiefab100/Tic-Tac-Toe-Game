import Display from "./display.js";
import Game from "./game.js";

let game = new Game();
let display = new Display(document.querySelector(".container"));

display.onTileClick = function (i) {
  game.makeMove(i);
  display.update(game);
};

display.onRestartClick = function () {
  game = new Game();
  display.update(game);
};
