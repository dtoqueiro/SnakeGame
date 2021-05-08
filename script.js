let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //Tamanho em pixel de cada Quadrado

const snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

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

criarBG();
criarCobrinha();
