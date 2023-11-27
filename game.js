const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const SCREEN_UPDATE_DELAY = 50;

const PADDLE_W = 30;
const PADDLE_H = 4;
const PADDLE_COLOR = "green";
const PADDLE_SPEED_X = PADDLE_W / 2;
const PADDLE_INITIAL_X = (CANVAS_WIDTH - PADDLE_W) / 2;
const PADDLE_INITIAL_Y = (CANVAS_HEIGHT - PADDLE_H) / 100 * 90; // 90%

const BALL_RADIUS = 3;
const BALL_COLOR = "red";
const BALL_SPEED = 3;
const BALL_INITIAL_X = (CANVAS_WIDTH - PADDLE_W) / 2;
const BALL_INITIAL_Y = (CANVAS_HEIGHT - PADDLE_H) / 100 * 10; // 10%


const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

const GAME_OVER_TEXT = "GAME OVER.-!";
const GAME_OVER_FONT = "30px Arial";
const GAME_OVER_COLOR = "RED";
const GAME_OVER_X = CANVAS_WIDTH / 2;
const GAME_OVER_Y = CANVAS_HEIGHT / 2;


function clear() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, PADDLE_W, PADDLE_H);
    ctx.fillStyle = PADDLE_COLOR;
    ctx.fill();
    ctx.closePath();
}

function paddleLeft() {
    if(paddleX - PADDLE_SPEED_X > 0 - PADDLE_W){
        paddleX -= PADDLE_SPEED_X;
    }
}

function paddleRight() {
    if(paddleX + PADDLE_SPEED_X < CANVAS_WIDTH){
        paddleX += PADDLE_SPEED_X;
    }
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = BALL_COLOR;
    ctx.fill();
}

function handleKeyPress(event) {
    event.preventDefault();
    const key = event.keyCode;
    switch (key) {
        case ARROW_LEFT:
            paddleLeft();
            break;

        case ARROW_RIGHT:
            paddleRight();
            break;
    }
}

function moveBall() {
    if(ballX < 0 || ballX > CANVAS_WIDTH){
        ballDirectionX *= -1;
    }
    if(ballY < 0){
        ballDirectionY *= -1;
    }
    if(ballY + BALL_RADIUS >= PADDLE_INITIAL_Y && ballY - BALL_RADIUS <= PADDLE_INITIAL_Y + PADDLE_H && ballX + BALL_RADIUS >= paddleX && ballX - BALL_RADIUS <= paddleX + PADDLE_W){
        ballDirectionY *= -1;
    }

    ballX += BALL_SPEED * ballDirectionX;
    ballY += BALL_SPEED * ballDirectionY;
}

function updateGame(){
    if(ballY >= CANVAS_HEIGHT) {
        gameOver();
        return;
    }
    moveBall();
    clear();
    drawPaddle(paddleX, PADDLE_INITIAL_Y);
    drawBall(ballX, ballY);
}

function gameOver(){
    clearInterval(gameInterval)
    ctx.font = GAME_OVER_FONT;
    ctx.fillStyle = GAME_OVER_COLOR;
    ctx.textAlign = "center";
    ctx.fillText(GAME_OVER_TEXT, GAME_OVER_X, GAME_OVER_Y); 
}

var paddleX = PADDLE_INITIAL_X;


var ballX = BALL_INITIAL_X;
var ballY = BALL_INITIAL_Y;
var ballDirectionY = -1
var ballDirectionX = -1


document.addEventListener("keydown", handleKeyPress);

var gameInterval = setInterval(updateGame, SCREEN_UPDATE_DELAY)