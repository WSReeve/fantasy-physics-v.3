
const clock = document.querySelector(".timer");
const initTime = 5;
let time = initTime;
let runTimer;

function countDown() {
    clock.innerHTML = `${time}`;

    if (time < 1) {
        clock.innerHTML = `Play`;
        time = initTime;
        clearInterval(runTimer);
        compareCards();
    }

    time--;
}

clock.addEventListener("click", (event) => {
    chooseRndmCard();
    runTimer = setInterval(countDown,1000);
});


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
    console.log(`start ${this.className}`);
}

function dragEnd() {
    this.classList.remove('clicked');
    this.classList.remove('invisible');
    console.log(`end ${playerCard}`);
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
    console.log("chosen card = " +playerCardType);
    clock.innerHTML = `Play`;
}