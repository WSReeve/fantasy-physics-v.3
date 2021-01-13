const opponentArea = document.querySelector('.opponent-card');
const opponentDeck = ['Particle','Device','Concept'];

let opponentCardType;

const scoreBoard = document.querySelector('.score');
let winCounter = 0;
let lossCounter = 0;
let drawCounter = 0;

function onDraw() {
    drawCounter++;
    updateScore();
    alert(`DRAW NUMBER ${drawCounter}!`);
}
function onWin() {
    winCounter++;
    updateScore();
    alert(`WIN NUMBER ${winCounter}!`);
}
function onLoss() {
    lossCounter++;
    updateScore();
    alert(`LOSS NUMBER ${lossCounter}!`);
}

function updateScore() {
    scoreBoard.innerHTML = `Wins: ${winCounter} | Losses: ${lossCounter} | Ties: ${drawCounter}`;
}

function chooseRndmCard() {
    let max = opponentDeck.length;
    let cardIndex = Math.floor(Math.random() * Math.floor(max));
    opponentCardType = opponentDeck[cardIndex];
    console.log(opponentCardType);
}

function compareCards() {
    console.log(`${playerCardType} vs ${opponentCardType}`)
    if (playerCardType === opponentCardType) {
        onDraw();
    } else if (playerCardType === "Particle") {
        if (opponentCardType === "Concept") {
            onWin();
        } else {
            onLoss();
        }
    } else if (playerCardType === "Device") {
        if (opponentCardType === "Particle") {
            onWin(); 
        } else {
            onLoss();
        }
    } else if (playerCardType == "Concept") {
        if (opponentCardType === "Device") {
            onWin();
        } else {
            onLoss();
        }
    } 
}