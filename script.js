function createPlayer(name, marker) {
  const playerName = name;
  marker = marker;

  return { playerName, marker };
}

function checkWinner(board, player, computer, winner) {
  // Check rows
  for (let row of board) {
    if (row.includes(-1)) {
      continue;
    } else {
      if (row.every((cell) => cell === "X")) {
        console.log("X wins!");
        winner = player.marker;
        return winner;
      } else if (row.every((cell) => cell === "O")) {
        console.log("O wins!");
        winner = computer.marker;
        return winner;
      }
    }
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    if (board.every((row) => row[col] === "X")) {
      console.log("X wins!");
      winner = player;
      return winner;
    } else if (board.every((row) => row[col] === "O")) {
      console.log("O wins!");
      winner = computer;
      return winner;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
    (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")
  ) {
    console.log("X wins!");
    winner = player;
    return winner;
  } else if (
    (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
    (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
  ) {
    console.log("O wins!");
    winner = computer;
    return winner;
  }

  // Check for a draw
  if (board.flat().every((cell) => cell === "X" || cell === "O")) {
    console.log("It's a draw!");
    return (winner = "draw");
  }

  // No winner or draw yet
  console.log("No winner or draw yet.");
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
    console.log(event.target.textContent)
      const playerMarker = event.target.textContent;
      console.log(playerMarker)
      player = createPlayer("player", playerMarker);
      console.log(player.marker)
    }
  }

  const modal = document.querySelector(".modal");
  const startGameBtn = document.querySelector(".startGame");
  startGameBtn.addEventListener("click", () => {
    modal.style.display = "none";
    game();
  });

  const winnerTag = document.querySelector(".winner");
  const gameOverModal = document.querySelector(".gameOver");
  const gameOverModalContent = document.querySelector(".modalContent");
  const winsTag = document.querySelector(".wins");

  function gameOver() {
    if (winner == "draw") {
      gameOverModalContent.removeChild(winsTag);
      winnerTag.textContent = "Draw!";
    } else {
      console.log(winner.marker);
      winnerTag.textContent = winner.marker;
    }

    gameOverModal.style.display = "flex";
  }

  function game() {
    const markers = ["X", "O"];
    const computerMarker = markers.find((marker) => marker !== player.marker);
    const computer = createPlayer("computer", computerMarker);
    console.log(computer.marker);

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

        if (winner === "") {
          getComputerSelection(rows, computer);
          winner = checkWinner(rows, player, computer);
        } else if (winner === "draw") {
          alert("Draw");
        } else {
          document.removeEventListener("click", handleClick);
          gameOver();
        }
      }
    }
  }
}

initializeGame();
