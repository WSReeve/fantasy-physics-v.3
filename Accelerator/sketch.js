var pipeBodySprite;
var pipePeakSprite;
var playerSprite;
var bkgdImg;
let bkgdX = 0;
let parallax = 0.8;

let slider;
let slider2;
let speed = 2;
let counter = 0;

let score = 0;
let maxScore = 0;

let pauseButton;
let pauseLabel;

let gameoverFrame = 0;
let isOver = true;
let isPaused = false;

const population = 1;
let protons = [];
let oldProtons = []; // for NN
let obsticles = [];

function preload() {
    pipeBodySprite = loadImage('graphics/player_proton_64x64.png');
    pipePeakSprite = loadImage('graphics/pipe_body.png');
    playerSprite = loadImage('graphics/player_proton_64x64.png');
    bkgdImg = loadImage('graphics/background_60x120.png');
  }

function setup() {
    createCanvas(800,600);
    tf.setBackend('cpu');
    //frameRate(60);
    //slider = createSlider(1, 100, 3);
    //slider2 = createSlider(1, 100, 1);
    pauseButton = document.querySelector("#pauseButton");
    pauseLabel = document.querySelector("#pauseLabel");
    noLoop();
}

function draw() {
  //speed = slider.value();

  //draw bkgd
  background(0);
  image(bkgdImg, bkgdX, 0, bkgdImg.width, height);
  bkgdX -= speed * parallax;
  
  if (bkgdX <= -bkgdImg.width + width) {
    image(bkgdImg, bkgdX + bkgdImg.width, 0, bkgdImg.width, height);
    if (bkgdX <= -bkgdImg.width) {
      bkgdX = 0;
    }
  }

  for (let proton of protons) {
    proton.show();
  }
  for (let obsticle of obsticles) {
    obsticle.show();
  }

  //move

    for (let n = 0; n < /*slider2.value()*/1; n++) {
      if (counter % round(1000/speed) == 0) {
        obsticles.push(new Obsticle());
        obsticles[obsticles.length - 1].create();
      }
      counter++;
  
      for (let i = obsticles.length-1; i >= 0; i--) {
        obsticles[i].update();
  
        if (counter % 50 == 0) {
          score += round(speed/4);
        }
        
        // speed up for players...
  
        if (speed < 3) {
          if ((frameCount - gameoverFrame) % 1000 == 0) {
            speed += 0.05;
            console.log("faster...");
          }
        } else if (speed < 5) {
          if ((frameCount - gameoverFrame) % 800 == 0) {
            speed += 0.05;
            console.log("faster...");
          }
        } else if (speed < 8) {
          if ((frameCount - gameoverFrame) % 500 == 0) {
            speed += 0.05;
            console.log("faster...");
          }
        } else if (speed > 10) {
          if ((frameCount - gameoverFrame) % 250 == 0) {
            speed += 0.05;
            console.log("faster...");
          }
        }
  
        for (let j = protons.length - 1; j >= 0; j--) {
          if (protons[j].hits(obsticles[i])) {
            gameover(); //for player control
            //oldProtons.push(protons.splice(j, 1)[0]); //for NN
          }
        }
  
        if (obsticles[i].offscreen()) {
            obsticles.splice(i, 1);
        }
      }
  
      for (let proton of protons) {
        //proton.think(obsticles); //NN
        proton.update();
      }
  
      //checks if all birds are dead for NN
      if (protons.length == 0) {
        counter = 0;
        //nextGen(); //NN
        obsticles = [];
      }
    }

    showScores();

    if (maxScore == 0 && counter == 0) {
      start();
    }
}

//for player controll
function keyPressed() {
    if (key == ' ') {
        if (isOver) {
            console.log("reset click");
            reset();
        }
    }
}

function reset() {
  isOver = false;
  counter = 0;
  score = 0;
  speed = 2; // foer variable speed reset
  obsticles = [];
  for (let i = 0; i < population; i++) {
    protons[i] = new Proton();
  }
  loop();
}

function pause() {
  if(pauseButton.checked) {
    console.log("checked");
    isPaused = true;
    pauseLabel.innerHTML = "Unpause";
    noLoop();
  } else {
    console.log("unchecked");
    isPaused = false;
    pauseLabel.innerHTML = "Pause";
    loop();
  }
}

//functions that access the dom:

function start() { //Just do dom stuff instead!!!
  strokeWeight(6);
  stroke('#e5ff00');
  fill('#2f2f2f');
  rect(width/2 - 350, height/2 - 40, 700, 80, 20);
  noStroke();
  fill(255);
  textFont('Montserrat');
  textStyle(BOLD);
  textSize(42);
  textAlign(CENTER, CENTER);
  text('PRESS [SPACEBAR] TO START', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  noStroke();
}

function gameover() {
  strokeWeight(6);
  stroke('#e5ff00');
  fill('#2f2f2f');
  rect(width/2 - 300, height/2 - 125, 600, 250, 20);
  noStroke();
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2 - 45);
  textSize(28);
  text('Energy: ' + score, width / 2, height / 2 + 5);
  text('PRESS [SPACEBAR] TO PLAY AGAIN', width / 2, height / 2 + 50);
  textAlign(LEFT, BASELINE);
  noStroke();
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function showScores() {
  textFont('Montserrat');
  textStyle(BOLD);
  fill(0);
  textSize(32);
  text('Energy: ' + score, 1, 32);
  text('Record: ' + maxScore, 1, 64);
}