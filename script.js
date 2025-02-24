const gameBoard = (function() {
  let boardArr = [null, null, null, null, null, null, null, null, null];

  const resetBoard = function() {
    boardArr.fill(null);
  };

  const checkForWinner = function() {
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
        return boardArr[i1];
      }
    }
    return null;
  };

  const addMarker = function(marker, i) {
    if (boardArr[i] != null) {
      throw Error("Cannot place this shit here");
    }
    boardArr[i] = marker;
    console.log(`Added marker ${marker} at index ${i}`);
    console.log(boardArr);
    const winner = checkForWinner();
    if (winner != null) {
      console.log("We've got a winner!");
      resetBoard(); 
      // might not want to keep that here, because I might want to 
      // keep showing the result until a new game is started manually
    }
    return winner;
  };

  return { boardArr, addMarker, resetBoard };
})();

console.log(gameBoard.addMarker("x", 3));
console.log(gameBoard.addMarker("x", 4));
console.log(gameBoard.addMarker("x", 5));
//gameBoard.resetBoard();
console.log(gameBoard.boardArr);
