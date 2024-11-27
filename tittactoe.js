// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'O';
let gameState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return gameState.includes(null) ? null : 'Draw';
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] || checkWinner()) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  const winner = checkWinner();
  if (winner) {
    statusText.textContent = winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
