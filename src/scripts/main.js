import Game from '../modules/Game.class.js';
// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here

const game = new Game();

const startBtn = document.querySelector('.start');
const scoreElement = document.querySelector('.game-score');
const statusMessages = {
  start: document.querySelector('.message-start'),
  win: document.querySelector('.message-win'),
  lose: document.querySelector('.message-lose'),
};

const cells = document.querySelectorAll('.field-cell');

function render() {
  const state = game.getState();
  const score = game.getScore();

  scoreElement.textContent = score;

  const flatField = state.flat();

  cells.forEach((cell, index) => {
    const value = flatField[index];

    cell.textContent = value !== 0 ? value : '';

    cell.className = 'field-cell';

    if (value !== 0) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  updateStatusMessages(state);
}

function updateStatusMessages(gameStatus) {
  statusMessages.start.classList.toggle('hidden', gameStatus !== 'idle');
  statusMessages.win.classList.toggle('hidden', gameStatus !== 'win');
  statusMessages.lose.classList.toggle('hidden', gameStatus !== 'lose');
}

startBtn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    startBtn.textContent = 'New Game';
  } else {
    game.restart();
  }
  render();
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (event.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  render();
});
