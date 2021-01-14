
const clock = document.querySelector(".timer");
const initTime = 3;
let time = initTime;
let runTimer = 1;

const howButton = document.querySelector("#howButton");
const howBoxDisp = document.querySelector(".howBox");
function howBox() {
    if(howButton.checked) {
        howBoxDisp.classList.remove("hidden");
        //console.log(howBoxDisp.classList);
    } else {
        howBoxDisp.classList.add("hidden");
        //console.log(howBoxDisp.classList);
    }
}

function countDown() {
    clock.innerHTML = `${time}`;

    if (time < 1) {
        showOppCard();
        clock.innerHTML = `Play`;
        time = initTime;
        clearInterval(runTimer);
        runTimer = undefined;
        compareCards();
    }

    time--;
}

clock.addEventListener("click", (event) => {
    if(runTimer == undefined) {
        chooseRndmCard();
        runTimer = setInterval(countDown,1000);
        if(oArea.hasChildNodes()) {
            oArea.removeChild(oArea.childNodes[0]);
        }
    }
});

const oArea = document.querySelector(".o-area");

const cards = document.querySelectorAll(".card");
const areas = document.querySelectorAll(".area");
let playerCard;
let playerCardContent;
let playerCardContentType;
let playerCardType;


for(const card of cards) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

for(const area of areas) {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragenter', dragEnter);
    area.addEventListener('drop', dragDrop);
}

function dragStart() {
    playerCard = this;
    this.classList.add('clicked');
    setTimeout(() => this.classList.add('invisible'), 0);
    //console.log(`start ${this.className}`);
}

function dragEnd() {
    this.classList.remove('clicked');
    this.classList.remove('invisible');
    //console.log(`end ${playerCard}`);
}

function dragOver(e) {
    if(this.classList.contains('cards')) {
        e.preventDefault();
    } else if (this.children.length == 0) {
        e.preventDefault();
    }
}

function dragEnter(e) {
    e.preventDefault();
}

function dragDrop() {
    if (this.classList.contains('card-area')) {
        playerCard.classList.add('drug');
    } else {
        playerCard.classList.remove('drug');
    }
    this.appendChild(playerCard);
    playerCardContent = playerCard.children[1];
    playerCardContentType = playerCardContent.children[1];
    playerCardType = playerCardContentType.innerHTML;
    //console.log("chosen card = " +playerCardType);
    clock.innerHTML = `Play`;
    runTimer = undefined;
}

// function createOppDiv(_this) {
//     let div = document.createElement("div");
//     div.setAttribute("class", "card drug");
    
//     let img = document.createElement("img");
//     img.setAttribute("src", _this.image);
//     img.setAttribute("alt", _this.name + " " + _this.type);
//     div.appendChild(img);

//     let content = document.createElement("div");
//     content.setAttribute("class", "card__content");

//     let h2 = document.createElement("h2");
//     h2.setAttribute("class", "card__name");
//     h2.innerText = _this.name;
//     content.appendChild(h2);

//     let h3 = document.createElement("h3");
//     h3.setAttribute("class", "card__type");
//     h3.innerText = _this.type;
//     content.appendChild(h3);

//     let text = document.createElement("div");
//     text.setAttribute("class", "card__text");
//     let p = createElement("P");
//     p.innerText = _this.description;
//     text.appendChild(p);
//     content.appendChild(p);

//     div.appendChild(content);

//     return(div);
// }

function showOppCard() {
    let opponentCard;
    let deck;
    if(opponentCardType == "Particle") {
        deck = oParticleCards;
    } else if(opponentCardType == "Device") {
        deck = oDeviceCards;
    } else {
        deck = oConceptCards;
    }
    let max = deck.length;
    let cardIndex = Math.floor(Math.random() * Math.floor(max));
    opponentCard = deck[cardIndex];
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card drug");
    opponentCard.create(cardDiv);
    oArea.appendChild(cardDiv);
    return(console.log("done!"));
}