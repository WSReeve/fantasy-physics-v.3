let cards = [];
let cardContainers = [];
cardContainers = document.querySelectorAll('.card-cont');

window.onload = function() {
    cards.push(new Card('Proton', 'Particle', 'this is the proton card.', 'card-imgs/card-proton.png', 'd-cms'));
    cards.push(new Card('Higgs Boson', 'Particle', 'this is the higgs card.', 'card-imgs/card-higgs.png', 'd-cms'));
    cards.push(new Card('CMS', 'Device', 'this is the CMS card.', 'card-imgs/FP-card-CMS.png', 'd-cms'));
    cards.push(new Card('Muon', 'Particle', 'this is the Muon card.', 'card-imgs/card-muon.png', 'd-cms'));
    cards.push(new Card('Neural Network', 'Concept', 'this is the Neural Network card.', 'card-imgs/FP-card-neuralNet.png', 'd-cms'));

    for (let i = 0; i < cardContainers.length; i++) {
        console.log(cardContainers[i]);
        let tempCards = cards;
        let r = getRandomInt(tempCards.length);
        tempCards[r].create(cardContainers[i]);
        tempCards.splice(r, 1);
    }
}

class Card {
    constructor(_name, _type, _description, _image, _deckId) {
        this.name = _name;
        this.type = _type;
        this.description = _description;
        this.image = _image;
        this.deckId = _deckId;
    }
    create(_cardContainer) {
        console.log(_cardContainer);
        _cardContainer.innerHTML = 
        `<img src="${this.image}" alt="${this.name} ${this.type}">
        <div class="card__content">
            <h2 class="card__name">${this.name}</h2>
            <h3 class="card__type">${this.type}</h3>
            <div class="card__text">
                <p>${this.description}</p>
            </div>
        </div>`
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
