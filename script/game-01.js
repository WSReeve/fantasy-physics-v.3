const opponentArea = document.querySelector('.opponent-card');
const opponentDeck = ['Particle','Device','Concept'];
const oParticleCards = [new Card('Proton', 'Particle', 'this is the proton card.', 'card-imgs/card-proton.png', 'd-cms'), new Card('Higgs Boson', 'Particle', 'this is the higgs card.', 'card-imgs/card-higgs.png', 'd-cms'), new Card('Muon', 'Particle', 'this is the Muon card.', 'card-imgs/card-muon.png', 'd-cms')];
const oDeviceCards = [new Card('CMS', 'Device', 'this is the CMS card.', 'card-imgs/FP-card-CMS.png', 'd-cms')];
const oConceptCards = [new Card('Neural Network', 'Concept', 'this is the Neural Network card.', 'card-imgs/FP-card-neuralNet.png', 'd-cms')];

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