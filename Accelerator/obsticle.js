class Obsticle {
    constructor() {

        this.icon = playerSprite;
        this.iconradius = 32;

        this.minY = 20 + this.iconradius;
        this.maxY = height - 20 - this.iconradius;
        this.x = width;

        //parameters
        this.x1;
        this.y1;
        this.x2;
        this.y2;

        this.collision_X = [];
        this.collision_Y = [];

        this.num_p;

    }

    create() {
        //start pos of obsticle
        this.x1 = this.x;
        this.y1 = Math.floor(random(this.minY, this.maxY));
        //end y of obsticle
        this.num_p = Math.floor(random(3,8)); // num of protons defined
        let len = this.num_p * 2 * this.iconradius;

        let y2_max;
        let y2_min;
        if(this.y1 + len < this.maxY) {
            y2_max = this.y1 + length;
        } else {
            y2_max = this.maxY;
        }
        if(this.y1 - len > this.minY) {
            y2_min = this.y1 - length;
        } else {
            y2_min = this.minY;
        }
        this.y2 = Math.floor(random(y2_min, y2_max));
        //end x of obsticle dx^2 = r^2 - dy^2
        let del_x = Math.sqrt((len**2)  - ((this.y2 - this.y1)**2));
        this.x2 = del_x + this.x1;
        
        //for collisions

        let dx = (this.x2 - this.x1)/this.num_p; //calc dx
        let dy = (this.y2 - this.y1)/this.num_p; // calc dy

        for(let i = 0; i <= this.num_p; i++) {
            this.collision_X.push(this.x1 + (i * dx));
            this.collision_Y.push(this.y1 + (i * dy));
        }

        //console.log("length of " + this.num_p + " protons."); // debug
    }

    show() {
        for(let i = 0; i <= this.collision_X.length; i++) {
            image(this.icon, this.collision_X[i] - this.iconradius, this.collision_Y[i] - this.iconradius, 64, 64);
            //ellipse(this.collision_X[i], this.collision_Y[i], 64, 64);
        }
        //line(this.x1, this.y1, this.x2, this.y2);
    }

    update() {
        this.x1 -= speed;
        this.x2 -= speed;

        let dx = (this.x2 - this.x1)/this.num_p; //calc dx

        for(let i = 0; i <= this.num_p; i++) {
            this.collision_X.splice(i, 1, this.x1 + (i * dx));
        }
    }

    offscreen() {
        return(this.x2 < (-this.iconradius * 2))
    }


};