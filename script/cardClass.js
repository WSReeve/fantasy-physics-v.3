

class Card {
    constructor(_name, _type, _description, _image, _deckId) {
        this.name = _name;
        this.type = _type;
        this.description = _description;
        this.image = _image;
        this.deckId = _deckId;
    }
    create(_cardContainer) {
        //console.log(_cardContainer);
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