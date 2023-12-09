const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const SCREEN_UPDATE_DELAY = 10;

const PADDLE_W = 150;
const PADDLE_H = 20;
const PADDLE_COLOR = "green";
const PADDLE_SPEED_X = 50;
const PADDLE_BORDER_RADIUS = 10;
const PADDLE_INITIAL_X = (CANVAS_WIDTH - PADDLE_W) / 2;
const PADDLE_INITIAL_Y = (CANVAS_HEIGHT - PADDLE_H) / 100 * 90; // 90%

const BALL_RADIUS = 15;
const BALL_COLOR = "red";
const INITIAL_BALL_SPEED = 3
const BALL_INITIAL_X = (CANVAS_WIDTH - PADDLE_W) / 2 + random(-1000, 1000);
const BALL_INITIAL_Y = (CANVAS_HEIGHT - PADDLE_H) / 100 * 10; // 10%
const BALL_SCORE_ACCELERATION = 5000


const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

const GAME_OVER_TEXT = "GAME OVER.-!";
const GAME_OVER_FONT = "30px Arial";
const GAME_OVER_COLOR = "RED";
const GAME_OVER_X = CANVAS_WIDTH / 2;
const GAME_OVER_Y = CANVAS_HEIGHT / 2;

const SCORE_JUMP = 50;
const SCORE_TEXT = "SCORE : ";
const SCORE_FONT = "30px Arial";
const SCORE_COLOR = "red";
const SCORE_X = CANVAS_WIDTH / 100 * 25; // 7%
const SCORE_Y = CANVAS_HEIGHT / 100 * 5; // 5%




const PLAY_AGAIN_BUTTON = document.getElementById("playAgainButton")
const USERNAME_INPUT = document.getElementById("usernameInput")


function clear() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

async function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.roundRect(x, y, PADDLE_W, PADDLE_H, PADDLE_BORDER_RADIUS);
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

async function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = BALL_COLOR;
    ctx.fill();
}

function handleMouseMove(event) {
    const mouseX = event.screenX;
    if(mouseX > paddleX + PADDLE_W){
        paddleRight();
    }else if(mouseX < paddleX) {
        paddleLeft();
    }
}

function moveBall() {
    if(ballX < 0 || ballX > CANVAS_WIDTH){
        ballDirectionX = (ballDirectionX*-1);
        touchedWall = true;
    }
    if(ballY < 0){
        ballDirectionY = (ballDirectionY*-1)
        touchedWall = true;
    }
    if(ballY + BALL_RADIUS >= PADDLE_INITIAL_Y && ballY - BALL_RADIUS <= PADDLE_INITIAL_Y + PADDLE_H && ballX + BALL_RADIUS >= paddleX && ballX - BALL_RADIUS <= paddleX + PADDLE_W){
        if(touchedWall){
            score += SCORE_JUMP
            touchedWall = false
            sendScore()
        }
        ballDirectionY = (ballDirectionY*-1)
    }

    ballX += ballSpeed * ballDirectionX;
    ballY += ballSpeed * ballDirectionY;
}


async function drawScore() {
    ctx.font = SCORE_FONT;
    ctx.fillStyle = SCORE_COLOR;
    ctx.textAlign = "center";
    ctx.fillText(SCORE_TEXT + score, SCORE_X, SCORE_Y); 
}

function updateGame(){
    if(ballY >= CANVAS_HEIGHT) {
        gameOver();
        clearInterval(gameInterval)
        return;
    }
    moveBall();
    clear();
    drawPaddle(paddleX, PADDLE_INITIAL_Y);
    drawBall(ballX, ballY);
    ballSpeed += score / SCORE_JUMP / BALL_SCORE_ACCELERATION
    drawScore()
}

async function gameOver(){
    clearInterval(gameInterval)
    start()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function sendScore() {
    var formData = new FormData();

    formData.append('username', USERNAME_INPUT.value);
    formData.append('score', score);

    fetch("api/addScore.php", {
        method: "post",
        body: formData,
    })
    
}

function start() {

    USERNAME_INPUT.style.display = 'none';
    PLAY_AGAIN_BUTTON.style.display = "none";

    paddleX = PADDLE_INITIAL_X;


    ballX = BALL_INITIAL_X;
    ballY = BALL_INITIAL_Y;
    ballDirectionY = -1
    ballDirectionX = -1
    ballSpeed = INITIAL_BALL_SPEED
    score = 0;
    
    touchedWall = false;
    
    document.addEventListener("mousemove", handleMouseMove);
    
    gameInterval = setInterval(updateGame, SCREEN_UPDATE_DELAY)
}


var paddleX = PADDLE_INITIAL_X;


var ballX
var ballY
var ballDirectionY
var ballDirectionX
var ballSpeed
var score

var touchedWall
var gameInterval
