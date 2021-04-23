export default class Display {
  constructor(app) {
    this.app = app;
    this.app.innerHTML = `
    <div class="header">
    <div class="turn">
   
    </div>
    <div class="status">
   
    </div>
    <button class="replay">
    Replay
    </button>
    </div>

    <div class="board">
    <div class="board-tile" data-index="0"></div>
    <div class="board-tile" data-index="1"></div>
    <div class="board-tile" data-index="2"></div>
    <div class="board-tile" data-index="3"></div>
    <div class="board-tile" data-index="4"></div>
    <div class="board-tile" data-index="5"></div>
    <div class="board-tile" data-index="6"></div>
    <div class="board-tile" data-index="7"></div>
    <div class="board-tile" data-index="8"></div>
    </div>
    `;

    this.onTileClick = undefined;
    this.onRestartClick = undefined;

    this.app.querySelectorAll(".board-tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        if (this.onTileClick) {
          this.onTileClick(tile.dataset.index);
        }
      });
    });

    this.app.querySelector(".replay").addEventListener("click", () => {
      if (this.onRestartClick) {
        this.onRestartClick();
      }
    });
  }

  update(game) {
    this.updatePlayer(game);
    this.updateStatus(game);
    this.updateBoard(game);
  }

  updatePlayer(game) {
    this.app.querySelector(
      ".turn"
    ).textContent = `Player ${game.player}'s turn`;
  }

  updateStatus(game) {
    let status = "In Progress";
    if (game.findWins()) {
      status = `${game.player} Won!`;
    } else if (!game.isInProgress()) {
      status = "It's a tie!";
    }
    this.app.querySelector(".status").textContent = status;
  }

  updateBoard(game) {
    for (let i = 0; i < game.board.length; i++) {
      const tile = this.app.querySelector(`.board-tile[data-index="${i}"]`);

      if (game.findWins() && game.findWins().includes(i)) {
        tile.classList.add("board-winner");
      }
      tile.textContent = game.board[i];
      tile.classList.remove("board-winner");
    }
  }
}
