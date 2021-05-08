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
