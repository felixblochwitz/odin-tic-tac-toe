const gameBoard = (function () {
  let boardArr = new Array(9).fill(null);

  const resetBoard = function () {
    boardArr.fill(null);
  };

  const checkForWinner = function () {
    let winner = null;
    const winningCombos = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];
    for (const [i1, i2, i3] of winningCombos) {
      if (
        boardArr[i1] == boardArr[i2] &&
        boardArr[i1] == boardArr[i3] &&
        boardArr[i2] == boardArr[i3] &&
        boardArr[i1] != null
      ) {
        winner = boardArr[i1];
        break;
      }
    }
    if (winner === null && !boardArr.includes(null)) {
      winner = "draw";
    }
    return winner;
  };

  const placeMarker = function (marker, i) {
    if (boardArr[i] != null) {
      throw Error("Cannot place this shit here");
    }
    boardArr[i] = marker;
    console.log(`Added marker ${marker} at index ${i}`);
    console.log(boardArr);
    const winner = checkForWinner();
    if (["x", "o"].includes(winner)) {
      console.log("We've got a winner!");
      resetBoard();
      // might not want to keep that here, because I might want to
      // keep showing the result until a new game is started manually
    } else if (winner === "draw") {
      console.log("The game is a draw");
      resetBoard();
    }
    return winner;
  };

  return { boardArr, addMarker: placeMarker, resetBoard };
})();

function createPlayer() {
  let score = 0;
  let playerName;
  let playerMarker;
  const increaseScore = function () {
    score++;
  };
  const getScore = function () {
    return score;
  };
  const setPlayerName = function (name) {
    playerName = name;
  };
  const getPLayerName = function () {
    return playerName;
  };
  const setMarker = function (marker) {
    playerMarker = marker;
  };
  const getMarker = function () {
    return playerMarker;
  };
  return {
    increaseScore,
    getScore,
    setPlayerName,
    getPLayerName,
    setMarker,
  };
}

const gameFlow = (function () {
  let round = 0;
  let running = true;
  const startGame = function (gameBoard) {
    // create player one
    const player1 = createPlayer();
    player1.setPlayerName();
    player1.setMarker("x");
    // create player two
    const player2 = createPlayer();
    player2.setPlayerName();
    player2.setMarker("o");
    // reset board
    gameBoard.resetBoard();
    // create this for player order
    let starting = player1;
    let turn = starting;
    while (running) {
      gameBoard.placeMarker(turn.getMarker(), index);
      if (turn === player1) {
        turn = player2;
      } else {
        turn = player1;
      }
      if (!gameBoard.checkForWinner() === null) {
        running = false;
        if (starting === player1) {
          starting = player2;
        } else {
          starting = player1;
        }
      }
    }
  };
  return { startGame };
})();

/*
console.log("DRAW TEST")
console.log(gameBoard.addMarker("x", 0));
console.log(gameBoard.addMarker("o", 4));
console.log(gameBoard.addMarker("x", 1));
console.log(gameBoard.addMarker("o", 2));
console.log(gameBoard.addMarker("x", 6));
console.log(gameBoard.addMarker("o", 3));
console.log(gameBoard.addMarker("x", 5));
console.log(gameBoard.addMarker("o", 7));
console.log(gameBoard.addMarker("x", 8));
console.log("WINNER TEST")
console.log(gameBoard.addMarker("x", 0));
console.log(gameBoard.addMarker("o", 4));
console.log(gameBoard.addMarker("x", 1));
console.log(gameBoard.addMarker("o", 2));
console.log(gameBoard.addMarker("x", 3));
console.log(gameBoard.addMarker("o", 6));
*/
