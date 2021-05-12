let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let menu = document.getElementById("menu");
let btn = document.getElementById("replay");
let message = document.getElementById("message");
let box = 16;
let quantity = 32; //Tamanho em pixel de cada Quadrado

let jogo = null;
let snake = [];
let direction = "right";
snake[0] = {
  x: (quantity / 2) * box,
  y: (quantity / 2) * box,
  dir: direction,
};
let food = {};
let speed = 100; //Quanto Maior Mais Devagar, e Quanto Menor Mais Rápido

function criarBG() {
  context.fillStyle = "rgb(195, 224, 195)";
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
}

//Movimento pelas Setas do Teclado
document.addEventListener("keydown", update);
function update(event) {
  // A Direção não pode a oposta da direção atual;
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
}

//Movimenta Cobrinha
function movimentaCobra(snakeX, snakeY) {
  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;
  return { x: snakeX, y: snakeY };
}

//Verifica os Limites da Tela
function limites() {
  if (snake[0].x > (quantity - 1) * box) snake[0].x = 0 * box;
  if (snake[0].x < 0 * box) snake[0].x = quantity * box;
  if (snake[0].y > (quantity - 1) * box) snake[0].y = 0 * box;
  if (snake[0].y < 0 * box) snake[0].y = quantity * box;
}

//Verifica Colisão da Cobrinha
function colisaoCobra() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(jogo);
      gameOver();
    }
  }
}
function gameOver() {
  message.innerText = "GAME OVER";
  btn.innerText = "Replay";
  menu.style.display = "block";
}

function replay() {
  menu.style.display = "none";
  snake = [];
  direction = "right";
  snake[0] = {
    x: (quantity / 2) * box,
    y: (quantity / 2) * box,
    dir: direction,
  };
  speed = 100;
  criaComida();
  iniciarJogo();
  jogo = setInterval(iniciarJogo, speed);
}

btn.addEventListener("click", replay);

//Colisão com comida
function colisaoComida(snakeX, snakeY, foodX, foodY) {
  if (snakeX !== foodX || snakeY !== foodY) return true;
  return false;
}

function iniciarJogo() {
  //Volta a "Cobrinha" quando ela passa dos limites da área do jogo
  limites();
  colisaoCobra();
  criarBG();
  criarCobrinha();
  desenhaComida();

  //Criando ponto de Partida
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  let newPos = {};

  //Movimento da Cobra
  newPos = movimentaCobra(snakeX, snakeY);
  snakeX = newPos.x;
  snakeY = newPos.y;

  //Verifica Colisao com Comida
  if (colisaoComida(snakeX, snakeY, food.x, food.y)) {
    snake.pop();
  } else {
    criaComida();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
    dir: direction,
  };
  snake.unshift(newHead);
}
