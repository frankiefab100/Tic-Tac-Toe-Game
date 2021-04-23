export default class Game {
  constructor() {
    this.player = "X";
    this.board = [, , , , , , , , ,].fill(null);
  }
  nextPlayer() {
    this.player = this.player === "X" ? "O" : "X";
  }
  makeMove(i) {
    if (!this.isInProgress()) {
      return;
    }
    if (this.board[i]) {
      return;
    }
    this.board[i] = this.player;
    if (!this.findWins()) {
      this.nextPlayer();
    }
  }

  findWins() {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    for (const combos of winCombos) {
      const [a, b, c] = combos;

      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      )
        return winCombos;
    }
    return null;
  }

  isInProgress() {
    return !this.findWins() && this.board.includes(null);
  }
}
