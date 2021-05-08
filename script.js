let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;
let quantity = 32; //Tamanho em pixel de cada Quadrado

const snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";
let food = {};

function criarBG() {
  context.fillStyle = "lightGreen";
  context.fillRect(0, 0, quantity * box, quantity * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function criaComida() {
  food.x = Math.floor(Math.random() * quantity) * box;
  food.y = Math.floor(Math.random() * quantity) * box;
}

function desenhaComida() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
  //context.fillRect(0, 0, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  /* KeyCodes:
    "left":   37,
    "right":  39,
    "up":     38,
    "down":   40,
  */

  // A Direção não pode a oposta da direção atual;
  if (event.keyCode === 37 && direction !== "right") direction = "left";
  if (event.keyCode === 38 && direction !== "down") direction = "up";
  if (event.keyCode === 39 && direction !== "left") direction = "right";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
}

function iniciarJogo() {
  //Volta a "Cobrinha" quando ela passa dos limites da área do jogo
  if (snake[0].x > (quantity - 1) * box) snake[0].x = 0 * box;
  if (snake[0].x < 0 * box) snake[0].x = quantity * box;
  if (snake[0].y > (quantity - 1) * box) snake[0].y = 0 * box;
  if (snake[0].y < 0 * box) snake[0].y = quantity * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(jogo);
      alert("Game Over :( ");
    }
  }

  criarBG();
  criarCobrinha();
  desenhaComida();

  //Criando ponto de Partida
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Movimento da Cobra:  Direções
  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  //Movimento da Cobra: Renderiza nova posição
  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    criaComida();
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
}

criaComida();
iniciarJogo();

let jogo = setInterval(iniciarJogo, 100);
