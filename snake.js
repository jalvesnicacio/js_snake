// Define o canvas e seu contexto
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define as dimensões do canvas
canvas.width = 500;
canvas.height = 500;

// Define as variáveis da cobra e da comida
var snake = [{ x: 10, y: 10 }];
var food = { x: 0, y: 0 };
var direction = "right";

// Define a função de desenho da cobra e da comida
function draw() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

  // Desenha a comida
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function update() {
    // Atualiza a posição da cabeça da cobra
    if (direction === "left") snake[0].x -= 10;
    else if (direction === "up") snake[0].y -= 10;
    else if (direction === "right") snake[0].x += 10;
    else if (direction === "down") snake[0].y += 10;
  
    // Verifica se a cobra colidiu com a parede
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
      clearInterval(gameLoop);
      alert("Game over!");
    }
  
    // Verifica se a cobra colidiu com a comida
    if (snake[0].x === food.x && snake[0].y === food.y) {
      // Cria um novo objeto para a próxima parte do corpo da cobra
      let newBody = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
      snake.push(newBody);
  
      // Gera uma nova posição para a comida
      food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
      food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    }
  
    // Atualiza a posição das partes do corpo da cobra
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }
  }
  

//====================================

// Define a função de atualização da cobra e da comida
// function update() {
//   // Move a cobra
//   var head = { x: snake[0].x, y: snake[0].y };
//   if (direction === "right") head.x += 10;
//   else if (direction === "left") head.x -= 10;
//   else if (direction === "up") head.y -= 10;
//   else if (direction === "down") head.y += 10;

//   // Verifica se a cobra comeu a comida
//   if (head.x === food.x && head.y === food.y) {
//     food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
//     food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
//   } else {
//     snake.pop();
//   }

//   // Verifica se a cobra colidiu com as paredes ou com seu próprio corpo
//   if (
//     head.x < 0 ||
//     head.x >= canvas.width ||
//     head.y < 0 ||
//     head.y >= canvas.height ||
//     snake.some((body) => body.x === head.x && body.y === head.y)
//   ) {
//     clearInterval(gameLoop);
//     alert("Game over!");
//   }
// }

// Define a função de controle da cobra
function control(event) {
    if (event.keyCode === 37 && direction !== "right") direction = "left";
    else if (event.keyCode === 38 && direction !== "down") direction = "up";
    else if (event.keyCode === 39 && direction !== "left") direction = "right";
    else if (event.keyCode === 40 && direction !== "up") direction = "down";
}
    
// Define a função de inicialização do jogo
function init() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;

    // Define o loop do jogo
    gameLoop = setInterval(() => {
    update();
    draw();
    }, 200);

    // Adiciona o controle da cobra
    document.addEventListener("keydown", control);
}
    
    // Inicializa o jogo
    init();
