// Create array to hold board data
let boardData = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
]

// Define game variables
let player = 1;
let gameOver = false;

// Pull in cells from DOM
const cellElements = document.querySelectorAll(".cell");
// Pull in the result text from DOM
const resultElement = document.getElementById("result");

// Add event listener
cellElements.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    placeMarker(index);
  });
});

// Create function for placing markers
function placeMarker(index) {
  // Determine row and column from index
  let col = index % 3
  let row = (index - col) / 3
  // Check if the current cell is empty
  if(boardData[row][col] == 0 && gameOver == false) {
    boardData[row][col] = player;
    // change player
    player *= -1;
    // Update the screen with markers
    drawMarkers();
    // Check if anyone has won
    checkResult();
  }
}

// Create function for drawing player markers
function drawMarkers() {
  // Iterate over rows
  for(let row = 0; row < 3; row++) {
    // Iterate over columns
    for(let col = 0; col <3; col++) {
      // Check if it is player 1's marker
      if(boardData[row][col] == 1) {
        // Update cell class to add a cross
        cellElements[(row * 3) + col].classList.add("cross");
      } else if(boardData[row][col] == -1) {
        // Update cell class to add a circle
        cellElements[(row * 3) + col].classList.add("circle");
      }
    }
  }
}

// Create function for checking the result of the game
function checkResult() {
  // Check rows and columns
  for(let i = 0; i < 3; i++) {
    let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
    let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
    if(rowSum == 3 || colSum == 3) {
      // Player 1 wins
      endGame(1);
      return
    } else if(rowSum == -3 || colSum == -3) {
      // Player 2 wins
      endGame(2);
      return
    }
  }

  // Check diagonals
  let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
  let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
  if(diagonalSum1 == 3 || diagonalSum2 == 3) {
    // Player 1 wins
    endGame(1);
    return
  } else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
    // Player 2 wins
    endGame(2);
    return
  }

  // Check for a tie
  if(boardData[0].indexOf(0) == -1 &&
    boardData[1].indexOf(0) == -1 &&
    boardData[2].indexOf(0) == -1) {
    endGame(0);
    return
  }
}

// Function to end the game and display the result
function endGame(winner) {
  // Trigger game over
  gameOver = true;
  // Check if game ended in a tie
  if(winner == 0) {
    resultElement.innerText = "It's a tie!"
  } else {
    resultElement.innerText = `Player ${winner} wins!`
  }
}

// Restart Game
const restartButton = document.getElementById("restart");
// Add event listener to restart button
restartButton.addEventListener("click", () => {
  // Reset game variables
  boardData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
  ]
  player = 1;
  gameOver = false;
  // Reset game board
  cellElements.forEach(cell => {
    cell.classList.remove("cross", "circle");
  });
  // Reset outcome text
  resultElement.innerText = ""
});