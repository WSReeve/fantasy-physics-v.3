let onGround = false;

class Proton {
    constructor(brain) {
        this.y = height/2;
        this.x = 64;
        this.gravity = 0.1;
        this.acceleration = 0;
        this.lift = -0.25;
        this.velocity = 0;

        this.icon = playerSprite;
        this.width = 64;
        this.height = 64;

        //for NN
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }

        this.score = 0;
        this.fitness = 0;
    }

    hits(_obs) {
        //make list of the center of all protons that make up the obsticles, then check if the bird gets within one radius of all of them?
            for (let j = 0; j < _obs.collision_X.length; j++) {
                let _x = _obs.collision_X[j];
                let _y = _obs.collision_Y[j]
                let d = sqrt((this.x - _x)**2 + (this.y - _y)**2);
                if (d <= 64) {
                    return true;
                };
            }
    }

    show() {
        stroke(255)
        //fill(255, 50);
        image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        //ellipse(this.x, this.y, 64, 64);
        //line(this.x, this.y, this.x + 32, this.y);
    }

    up() {
        this.acceleration += this.lift;
    }

    //for NN

    dispose() {
        this.brain.dispose();
    }

    think(obsticles) {
        let _x1;
        let _x2;
        let _y1;
        let _y2;

        //find closest obsticle
        let closest = null;
        let closest_d = Infinity;
        for (let i = 1; i < obsticles.length; i++) {
            let d = obsticles[i].x1 - this.x;
            if (d < closest_d && d > 0) {
                closest = obsticles[i];
                closest_d = d;
            }
        }

        if (closest === null) {
            _x1 = width;
            _x2 = width;
            _y1 = height / 2;
            _y2 = height / 2;
        } else {
            _x1 = closest.x1;
            _x2 = closest.x2;
            _y1 = closest.y1;
            _y2 = closest.y2;
        }
    
        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = _x1 / width;
        inputs[2] = _x2 / height;
        inputs[3] = _y1 / width;
        inputs[4] = _y2 / height;

        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.up();
        }
    }

    update() {
        this.score++;

        if (onGround == false) {
            this.acceleration +=this.gravity
        }
        this.velocity += this.acceleration;
        this.velocity *= 0.85;
        this.y += this.velocity;

        //for player controll
        if (keyIsPressed == true && key == ' ') {
            this.up();
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