import Game from '../modules/Game.class.js';
// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here

const game = new Game();

const startBtn = document.querySelector('.start');
const restartBtn = document.querySelector('.restart');
const statusMessages = {
  start: document.querySelector('.message-start'),
  win: document.querySelector('.message-win'),
  lose: document.querySelector('.message-lose'),
};

const cells = document.querySelectorAll('.field-cell');

function render() {
  const gameStatus = game.getStatus();
  const score = game.getScore();
  const state = game.getState();

  document.querySelector('.game-score').textContent = score;

  const flatField = state.flat();

  cells.forEach((cell, index) => {
    const value = flatField[index];

    cell.textContent = value !== 0 ? value : '';

    cell.className = 'field-cell';

    if (value > 0) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  statusMessages.lose.classList.toggle('hidden', gameStatus !== 'lose');
  statusMessages.win.classList.toggle('hidden', gameStatus !== 'win');
  statusMessages.start.classList.toggle('hidden', gameStatus !== 'idle');

  if (gameStatus !== 'idle') {
    startBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
  } else {
    startBtn.classList.remove('hidden');
    restartBtn.classList.add('hidden');
  }
}

startBtn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
  } else {
    game.restart();
  }
  render();
});

restartBtn.addEventListener('click', () => {
  game.restart();
  render();
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
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
