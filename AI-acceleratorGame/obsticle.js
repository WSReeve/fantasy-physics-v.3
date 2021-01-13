class Obsticle {
    constructor() {

        this.icon = playerSprite;
        this.iconradius = 32;

        this.length = Range(4,12);
        this.minY = 20 + this.iconradius;
        this.maxY = height - 20 - this.iconradius;
        this.x = width;

        this.speed = 2;
    }

    draw() {
        let numberProtons;
        let x1 = this.x;
        let y1 = Range(minY, maxY);
        let angle = sqrt(y)
        let y2 = Range(minY, maxY);
        for (let i = 0; i < this.length; i++) {
            Image(this.icon, this.x, )
        }
    }

    update() {
        this.x += this.speed;
    }

    offscreen() {
        return(this.x < (-this.iconradius * 2))
    }


};