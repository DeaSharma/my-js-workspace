document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const snakeElement = document.getElementById('snake');
  const foodElement = document.getElementById('food');

  let snakeX = 10;
  let snakeY = 10;
  let foodX = 5;
  let foodY = 5;
  let dx = 0;
  let dy = 0;
  const snakeSpeed = 100;
  const boardSize = 20; // Number of squares in each row and column
  let snakeLength = 1;
  const snakeSegments = [{x: snakeX, y: snakeY}];

  function updateSnake() {
    // Move the snake by adding new segment at the front and removing the last one
    snakeX += dx;
    snakeY += dy;

    // Check if snake has collided with the boundaries
    if (snakeX < 0 || snakeX >= boardSize || snakeY < 0 || snakeY >= boardSize) {
      gameOver();
      return;
    }

    // Check if snake has collided with itself
    for (let i = 1; i < snakeSegments.length; i++) {
      if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y) {
        gameOver();
        return;
      }
    }

    // Update snake segments
    snakeSegments.unshift({x: snakeX, y: snakeY});
    if (snakeSegments.length > snakeLength) {
      snakeSegments.pop();
    }

    // Update snake visual representation
    snakeElement.style.left = snakeX * 20 + 'px';
    snakeElement.style.top = snakeY * 20 + 'px';
  }

  function generateFood() {
    foodX = Math.floor(Math.random() * boardSize);
    foodY = Math.floor(Math.random() * boardSize);

    foodElement.style.left = foodX * 20 + 'px';
    foodElement.style.top = foodY * 20 + 'px';
  }

  function checkCollision() {
    // Check if snake has eaten the food
    if (snakeX === foodX && snakeY === foodY) {
      snakeLength++;
      generateFood();
    }
  }

  function gameLoop() {
    updateSnake();
    checkCollision();
    setTimeout(gameLoop, snakeSpeed);
  }

  function gameOver() {
    alert("Game Over! Your score: " + (snakeLength - 1));
    // Reset game
    snakeX = 10;
    snakeY = 10;
    snakeSegments.splice(1);
    snakeLength = 1;
    dx = 0;
    dy = 0;
    generateFood();
  }

  gameLoop();

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        if (dy !== 1) { // Prevent moving directly opposite
          dx = 0;
          dy = -1;
        }
        break;
      case 'ArrowDown':
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;
      case 'ArrowLeft':
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;
      case 'ArrowRight':
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  });
});
