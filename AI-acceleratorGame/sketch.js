var pipeBodySprite;
var pipePeakSprite;
var playerSprite;
var bkgdImg;
let bkgdX = 0;
let parallax = 0.8;

let score = 0;
let maxScore = 0;

let gameoverFrame = 0;
let isOver = false;

let bird;
let pipes = [];

function preload() {
    pipeBodySprite = loadImage('graphics/player_proton_64x64.png');
    pipePeakSprite = loadImage('graphics/pipe_body.png');
    playerSprite = loadImage('graphics/player_proton_64x64.png');
    bkgdImg = loadImage('graphics/background_60x120.png');
  }

function setup() {
    createCanvas(800,600);
    reset();
}

function draw() {
    background(0);

    //handling bkgd image
    image(bkgdImg, bkgdX, 0, bkgdImg.width, height);
    bkgdX -= pipes[0].speed * parallax;
  
    if (bkgdX <= -bkgdImg.width + width) {
      image(bkgdImg, bkgdX + bkgdImg.width, 0, bkgdImg.width, height);
      if (bkgdX <= -bkgdImg.width) {
        bkgdX = 0;
      }
    }

    for (let i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].pass(bird)) {
            score++;
          }

        if (pipes[i].hits(bird)) {
            //console.log("HIT");
            gameover();
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    bird.update();
    bird.show();

    if ((frameCount - gameoverFrame) % 150 == 0) {
        pipes.push(new Pipe());
    }

    showScores();
}

function keyPressed() {
    if (key == ' ') {
        if (isOver) {
            console.log("reset click");
            reset();
        }
    }
}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}