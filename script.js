function createPlayer(name, marker) {
  const playerName = name;
  const playerMarker = marker;

  return { playerName, playerMarker };
}

function game() {
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

  const rows = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  let winner = "";

  function checkWinner(board) {
    // Check rows
    for (let row of rows) {
      if (row.length === 3) {
        for (let i = 0; i < 3; i++) {
          if (row[i] === null) {
            break;
          } else {
            if (row.every((cell) => cell === "X")) {
              console.log("X wins!");
              return (winner = player.playerName);
            } else if (row.every((cell) => cell === "O")) {
              console.log("O wins!");
              return (winner = computer.playerName);
            }
          }
        }
      } else {
        continue;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (rows.every((row) => row[col] === "X")) {
        console.log("X wins!");
        return (winner = player.playerName);
      } else if (rows.every((row) => row[col] === "O")) {
        console.log("O wins!");
        return (winner = computer.playerName);
      }
    }

    // Check diagonals
    if (
      (rows[0][0] === "X" && rows[1][1] === "X" && rows[2][2] === "X") ||
      (rows[0][2] === "X" && rows[1][1] === "X" && rows[2][0] === "X")
    ) {
      console.log("X wins!");
      return (winner = player.playerName);
    } else if (
      (rows[0][0] === "O" && rows[1][1] === "O" && rows[2][2] === "O") ||
      (rows[0][2] === "O" && rows[1][1] === "O" && rows[2][0] === "O")
    ) {
      console.log("O wins!");
      return (winner = computer.playerName);
    }

    if (rows.every((row) => row.length === 3 && row.includes(-1) === false)) {
      console.log("It's a draw!");
    }
  }

  while (winner == "") {
    const playerRow = rows[parseInt(prompt("Enter row:"))];
    const playerRowPostn = parseInt(prompt("Enter postn:"));
    playerRow[playerRowPostn] = player.playerMarker;
    checkWinner(rows);

    let computerRow = "";
    let computerRowPostn = "";
    do {
      const randomNumber = Math.floor(Math.random() * 3);
      computerRow = rows[randomNumber];
      computerRowPostn = Math.floor(Math.random() * 3);
    } while (computerRow[computerRowPostn] !== -1);

    computerRow[computerRowPostn] = computer.playerMarker;
    checkWinner(rows);
  }
}
