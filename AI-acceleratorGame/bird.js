let onGround = false;

class Bird {
    constructor() {
        this.y = height/2;
        this.x = 64;

        this.gravity = 0.1;
        this.acceleration = 0;
        this.lift = -0.2;
        this.velocity = 0;

        this.icon = playerSprite;
        this.width = 64;
        this.height = 64;
    }

    show() {
        fill(255);
        image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    flap() {
        this.acceleration += this.lift;
    }


    update() {
        if (onGround == false) {
            this.acceleration +=this.gravity
        }
        this.velocity += this.acceleration;
        this.velocity *= 0.8;
        this.y += this.velocity;

        if (keyIsPressed == true && key == ' ') {
            //console.log(flaps);
            this.flap();
        }

        if (key == []) {
            this.velocity = 0;
            this.acceleration = 0;
        }

        if (this.y > height - 52) {
            this.y = height - 52;
            this.velocity = 0;
            this.acceleration = 0;
            onGround = true;
            //console.log("floor");
        } else onGround = false;

        if (this.y < 52) {
            this.y = 52;
            this.velocity = 0;
            this.acceleration *= -0.1;
            //console.log("ceiling");
        }
    }
}