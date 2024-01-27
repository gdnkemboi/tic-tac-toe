function createPlayer(name, marker) {
  const playerName = name;
  const playerMarker = marker;

  return { playerName, playerMarker };
}

function checkWinner(board, player, computer, winner) {
  // Check rows
  for (let row of board) {
    if (row.includes(-1)) {
      continue;
    } else {
      if (row.every((cell) => cell === "X")) {
        console.log("X wins!");
        winner = player.playerMarker
        return winner;
      } else if (row.every((cell) => cell === "O")) {
        console.log("O wins!");
        winner = computer.playerMarker
        return winner;
      }
    }
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    if (board.every((row) => row[col] === "X")) {
      console.log("X wins!");
      winner = player.playerMarker
      return winner;
    } else if (board.every((row) => row[col] === "O")) {
      console.log("O wins!");
      winner = computer.playerMarker
      return winner;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
    (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")
  ) {
    console.log("X wins!");
    winner = player.playerMarker
    return winner;
  } else if (
    (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
    (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
  ) {
    console.log("O wins!");
    winner = computer.playerMarker
    return winner;
  }

  // Check for a draw
  if (board.flat().every((cell) => cell === "X" || cell === "O")) {
    console.log("It's a draw!");
    return (winner = "draw");
  }

  // No winner or draw yet
  console.log("No winner or draw yet.");
  return (winner = "")
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

  event.target.textContent = player.playerMarker;
  board[rowIndex][colIndex] = player.playerMarker;

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

  board[randomNumber][randomNumber2] = computer.playerMarker;
  const cellClass = `.${getPositionClass(randomNumber, randomNumber2)}`;
  const cellElement = document.querySelector(cellClass);
  cellElement.textContent = computer.playerMarker;

  console.log("computer");
  console.log(board[0]);
  console.log(board[1]);
  console.log(board[2]);
}

function game() {
  let winner = ""
  const markers = ["X", "O"];
  const playerMarker = prompt("Enter your marker{X or O):").toUpperCase();
  const player = createPlayer("player", playerMarker);
  let computerMarker;

  if (markers.indexOf(player.playerMarker) == 0) {
    computerMarker = markers[1];
  } else {
    computerMarker = markers[0];
  }
  const computer = createPlayer("computer", computerMarker);
  console.log(computer.playerMarker);

  const rows = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];

  // document.addEventListener("click", (event) => {
  //   if (event.target.textContent == "" && winner == "") {
  //     getPlayerSelection(event, rows, player);
  //     checkWinner(rows, player, computer, winner);
  //     console.log(winner)
  //     if (winner == "") {
  //       getComputerSelection(rows, computer);
  //       checkWinner(rows, player, computer, winner);
  //       console.log(winner)
  //     }
  //   }
  // });

  // if (winner != "") {
  //   alert(winner + " wins!");
  //   return;
  // }

  document.addEventListener("click", handleClick);

  function handleClick(event) {
    if (event.target.textContent == "" && winner === "") {
      getPlayerSelection(event, rows, player);
      winner = checkWinner(rows, player, computer);
      console.log(winner);

      if (winner === "") {
        getComputerSelection(rows, computer);
        winner = checkWinner(rows, player, computer);
        console.log(winner);

        if (winner !== "") {
          alert(winner + " wins!");
          document.removeEventListener("click", handleClick); // Remove the click event listener after the game is over
        }
      }
    }
  }
}
