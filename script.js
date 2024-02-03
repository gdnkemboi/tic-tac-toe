function createPlayer(name, marker) {
  const playerName = name;
  marker = marker;

  return { playerName, marker };
}

// function returnWinner(marker, winner) {
//   if (player.marker === marker) {
//     winner = player.marker;
//   } else {
//     winner = computer.marker;
//   }
// }

function checkWinner(board, player, computer, winner) {
  function returnWinner(marker) {
    if (player.marker === marker) {
      return player.marker;
    } else {
      return computer.marker;
    }
  }
  // Check rows
  for (let row of board) {
    if (row.includes(-1)) {
      continue;
    } else {
      if (row.every((cell) => cell === "X")) {
        winner = returnWinner("X");
        return winner;
      } else if (row.every((cell) => cell === "O")) {
        winner = returnWinner("O");
        return winner;
      }
    }
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    if (board.every((row) => row[col] === "X")) {
      winner = returnWinner("X");
      return winner;
    } else if (board.every((row) => row[col] === "O")) {
      winner = returnWinner("O");
      return winner;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
    (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")
  ) {
    winner = returnWinner("X");
    return winner;
  } else if (
    (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
    (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
  ) {
    winner = returnWinner("O");
    return winner;
  }

  // Check for a draw
  if (board.flat().every((cell) => cell === "X" || cell === "O")) {
    return (winner = "draw");
  }

  // No winner or draw yet
  return (winner = "");
}

function getPlayerSelection(event, board, player) {
  const classToIndex = {
    one: [0, 0],
    two: [0, 1],
    three: [0, 2],
    four: [1, 0],
    five: [1, 1],
    six: [1, 2],
    seven: [2, 0],
    eight: [2, 1],
    nine: [2, 2],
  };

  const clickedElementClass = event.target.classList[0];
  const [rowIndex, colIndex] = classToIndex[clickedElementClass];
  board[rowIndex][colIndex] = player.marker;
  event.target.textContent = player.marker;

  console.log("player");
  console.log(board[0]);
  console.log(board[1]);
  console.log(board[2]);
}

function getPositionClass(row, col) {
  const positionMap = {
    0: { 0: "one", 1: "two", 2: "three" },
    1: { 0: "four", 1: "five", 2: "six" },
    2: { 0: "seven", 1: "eight", 2: "nine" },
  };
  return positionMap[row][col];
}

function getComputerSelection(board, computer) {
  do {
    var randomNumber = Math.floor(Math.random() * 3);
    var randomNumber2 = Math.floor(Math.random() * 3);
  } while (board[randomNumber][randomNumber2] != -1);

  board[randomNumber][randomNumber2] = computer.marker;
  const cellClass = `.${getPositionClass(randomNumber, randomNumber2)}`;
  const cellElement = document.querySelector(cellClass);
  cellElement.textContent = computer.marker;

  console.log("computer");
  console.log(board[0]);
  console.log(board[1]);
  console.log(board[2]);
}

function initializeGame() {
  let winner = "";
  let player;
  document.addEventListener("click", makePlayer);
  function makePlayer(event) {
    const x = document.querySelector(".x");
    const o = document.querySelector(".o");

    if (event.target == x || event.target == o) {
      const playerMarker = event.target.textContent;
      player = createPlayer("player", playerMarker);
    }
  }

  const modal = document.querySelector(".modal");
  const startGameBtn = document.querySelector(".startGame");
  startGameBtn.addEventListener("click", () => {
    if (player.marker !== "") {
      modal.style.display = "none";
      game();
    }
  });

  const winnerTag = document.querySelector(".winner");
  const gameOverModal = document.querySelector(".gameOver");
  const gameOverModalContent = document.querySelector(
    ".gameOver > .modalContent"
  );
  const winsTag = document.querySelector(".wins");
  const playAgainBtn = document.querySelector(".playAgain");
  const restartBtn = document.querySelector(".restart");

  function gameOver() {
    if (winner == "draw") {
      gameOverModalContent.removeChild(winsTag);
      winnerTag.textContent = "Draw!";
    } else if (winner !== "") {
      winnerTag.textContent = winner;
    }

    gameOverModal.style.display = "flex";
  }

  document.addEventListener("click", (event) => {
    if (event.target == restartBtn || event.target == playAgainBtn) {
      location.reload();
    }
  });

  function game() {
    const markers = ["X", "O"];
    const computerMarker = markers.find((marker) => marker !== player.marker);
    const computer = createPlayer("computer", computerMarker);

    const rows = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];

    document.addEventListener("click", handleClick);

    function handleClick(event) {
      if (event.target.textContent == "" && winner === "") {
        getPlayerSelection(event, rows, player);
        winner = checkWinner(rows, player, computer);
        if (winner !== "") {
          document.removeEventListener("click", handleClick);
          gameOver();
        }
        if (winner === "") {
          getComputerSelection(rows, computer);
          winner = checkWinner(rows, player, computer);
          if (winner !== "") {
            document.removeEventListener("click", handleClick);
            gameOver();
          }
        } else if (winner === "draw") {
          gameOver();
        }
      }
    }
  }
}

initializeGame();
