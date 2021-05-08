let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //Tamanho em pixel de cada Quadrado

const snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";

function criarBG() {
  context.fillStyle = "lightGreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function iniciarJogo() {
  criarBG();
  criarCobrinha();

  //Criando ponto de Partida
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Movimento da Cobra:  Direções
  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  //Movimento da Cobra: Renderiza nova posição
  snake.pop();
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
}

iniciarJogo();

let jogo = setInterval(iniciarJogo, 100);
