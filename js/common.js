const CANVAS = document.getElementById('game');
const ctx = CANVAS.getContext('2d');

const GROUND = new Image();
GROUND.src = '../assets/ground.png';

const FOOD = new Image();
FOOD.src = '../assets/apple.png';

let SCORE = 0;
const BOX = 20;
let dir;
let delay = 200;
const speedBoost = 20;

let food = {
  x: Math.floor(Math.random() * 15 + 1) * BOX,
  y: Math.floor(Math.random() * 15 + 4) * BOX
};

let SNAKE = [];
SNAKE[0] = {
  x: 100,
  y: 100
};

let snakeX = SNAKE[0].x;
let snakeY = SNAKE[0].y;

let direction = event => {
  if (event.keyCode == 37 && dir != 'right') {
    dir = 'left';
  } else if (event.keyCode == 38 && dir != 'down') {
    dir = 'up';
  } else if (event.keyCode == 39 && dir != 'left') {
    dir = 'right';
  } else if (event.keyCode == 40 && dir != 'up') {
    dir = 'down';
  }
};

let eatTeil = (head, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      gameOver();
    }
  }
};

let drawScore = () => {
  let scoreText = `SCORE: ${SCORE}`;
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 500, BOX * 3);
  ctx.fillStyle = 'white';
  ctx.font = '40px Arial';
  ctx.fillText(scoreText, BOX * 2.5, BOX * 2.5);
};

let drawSnakeBody = () => {
  for (let i = 0; i < SNAKE.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'lime';
    ctx.fillRect(SNAKE[i].x, SNAKE[i].y, BOX, BOX);
  }
};

let gameOver = () => {
  let textGameOver = 'Game Over';
  ctx.fillStyle = 'white';
  ctx.font = '60px Arial';
  ctx.fillText(textGameOver, 100, 270);
  clearInterval(start);
};

let draw = () => {
  ctx.drawImage(GROUND, 0, 0);
  ctx.drawImage(FOOD, food.x, food.y);

  drawScore();
  drawSnakeBody();

  if (snakeX === food.x && snakeY === food.y) {
    SCORE++;
    delay -= speedBoost;
    food = {
      x: Math.floor(Math.random() * 20 + 1) * BOX,
      y: Math.floor(Math.random() * 20 + 4) * BOX
    };
  } else {
    SNAKE.pop();
  }

  if (snakeX < BOX || snakeX > BOX * 23 || snakeY < 4 * BOX || snakeY > BOX * 22) {
    gameOver();
  }

  if (dir === 'left') snakeX -= BOX;
  if (dir === 'right') snakeX += BOX;
  if (dir === 'up') snakeY -= BOX;
  if (dir === 'down') snakeY += BOX;

  let newElement = {
    x: snakeX,
    y: snakeY
  };

  eatTeil(newElement, SNAKE);
  SNAKE.unshift(newElement);
};

document.addEventListener('keydown', direction);

let start = setInterval(draw, delay);
