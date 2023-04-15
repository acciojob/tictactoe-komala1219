//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let turn = 1;
let gameEnd = false;

const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");

document.getElementById("player-form").addEventListener("submit", (event) => {
  event.preventDefault();
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;
  currentPlayer = player1;
  message.textContent = `${currentPlayer}, you're up!`;
  document.getElementById("player-form").style.display = "none";
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && !gameEnd) {
      cell.textContent = turn % 2 === 1 ? "X" : "O";
      if (checkWin()) {
        message.textContent = `${currentPlayer}, congratulations, you won!`;
        gameEnd = true;
      } else if (checkDraw()) {
        message.textContent = "It's a draw!";
        gameEnd = true;
      } else {
        turn++;
        currentPlayer = turn % 2 === 1 ? player1 : player2;
        message.textContent = `${currentPlayer}, you're up!`;
      }
    }
  });
});

function checkWin() {
  return (
    checkLine(1, 2, 3) ||
    checkLine(4, 5, 6) ||
    checkLine(7, 8, 9) ||
    checkLine(1, 4, 7) ||
    checkLine(2, 5, 8) ||
    checkLine(3, 6, 9) ||
    checkLine(1, 5, 9) ||
    checkLine(3, 5, 7)
  );
}

function checkLine(cell1, cell2, cell3) {
  return (
    cells[cell1 - 1].textContent === cells[cell2 - 1].textContent &&
    cells[cell2 - 1].textContent === cells[cell3 - 1].textContent &&
    cells[cell1 - 1].textContent !== ""
  );
}

function checkDraw() {
  return Array.from(cells).every((cell) => cell.textContent !== "");
}
