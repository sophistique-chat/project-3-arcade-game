//GLOBAL VARIABLES//

var config = {
    s_width: 101,
    s_height: 83,
    initX: 0,
    initY: 585,
    gemOff: -100,
    coll1: 40,
    coll2: 83,
    collH: 60
}
//----GLOBAL VARIABLES----//

//------ENEMY CONSTRUCTOR FUNCTION-------//

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {

        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bird.png';
        //image taken from https://www.kisspng.com/
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {

        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x > 600) {

            //Randomiser idea taken from W3schools "JavaScript random() Method",
            //https://www.w3schools.com/jsref/jsref_random.asp
            this.x = Math.floor((Math.random() * (-500)) - 50);
            this.speed = Math.floor((Math.random() * 10) + 250);
        }
        this.x = this.x + this.speed * dt;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//------END ENEMY CONSTRUCTOR FUNCTION-------//

//--------GEMS CONSTRUCTOR FUNCTION--------//
class Gems {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.blue = 'images/Gem-Blue-petit.png';
        this.green = 'images/Gem-Green-petit.png';
        this.orange = 'images/Gem-Orange-petit.png';
        this.pink = 'images/Gem-Pink-petit.png'
    }

    update(dt) {
        if (this.y > 440) {
            this.y = Math.floor((Math.random() * 30) + 50);
        }
        this.y = this.y + this.speed * dt;
    }

    render() {
        if (this.speed <= 170 && this.speed >= 140) {
            ctx.drawImage(Resources.get(this.blue), this.x, this.y);
        } else
        if (this.speed <= 139 && this.speed >= 100) {
            ctx.drawImage(Resources.get(this.green), this.x, this.y);
        } else if (this.speed <= 99 && this.speed >= 60) {
            ctx.drawImage(Resources.get(this.orange), this.x, this.y);
        } else if (this.speed <= 59) {
            ctx.drawImage(Resources.get(this.pink), this.x, this.y);
        }
    }
}
//---------END GEMS CONSTRUCTOR FUNCTION--------//

//---------PLAYER CONSTRUCTOR FUNCTION--------//

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-rabbit.png';
        this.numLives = document.getElementById('numLives');
        this.numGems = document.getElementById('numGems');
        this.lives = 3;
        this.gems = 0;
        this.modal = document.querySelector('.modal');
        this.modal1 = document.querySelector('.modal1');
        this.audioWin = document.querySelector('#winSound');
        this.audioLose = document.querySelector('#loseSound');
        this.collision = document.querySelector('#collision');
        this.bell = document.querySelector('#bell');
        this.numG = document.querySelector('.numG');
    }

    update() {
        if (this.lives >= 0) {
            this.checkCollisions();
            this.touch();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keys) {
        if (keys == 'left') {
            this.x -= config.s_width;
        }
        if (keys == 'up') {
            this.y -= config.s_height;
        }
        if (keys == 'right') {
            this.x += config.s_width;
        }
        if (keys == 'down') {
            this.y += config.s_height;
        }
        if (this.y < 50 || this.y > 600) {
            this.x = config.initX;
            this.y = config.initY;
        }
        if (this.x > 700) {
            this.x = config.initX;
        }
        if (this.x < 0) {
            this.x = 600;
        }
    }
    //TOUCHSCREEN CONTROLS//
    touch() {
        $(document).ready(function () {
            $('.up-left').click(function () {
                this.y -= config.s_height;
                this.render();
            });

            $('.up-right').click(function () {
                this.y -= config.s_height;
                this.render();
            });

            $('.left').click(function () {
                this.x -= config.s_width;
                this.render();
            });

            $('.right').click(function () {
                this.x += config.s_width;
                this.render();
            });

            $('.down-left').click(function () {
                this.y += config.s_height;
                this.render();
            });

            $('.down-right').click(function () {
                this.y += config.s_height;
                this.render();
            });
        });
        if (this.y < 50 || this.y > 600) {
            this.x = config.initX;
            this.y = config.initY;
        }
        if (this.x > 700) {
            this.x = config.initX;
        }
        if (this.x < 0) {
            this.x = 600;
        }
    }
    //END TOUCHSCREEN CONTROLS//

    checkCollisions() {
        //Idea taken from MDN "2D collision detection",
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

        //ENEMY COLLISIONS//
        if (danger1.x <= this.x + config.coll1 &&
            danger1.x + config.coll1 >= this.x &&
            danger1.y <= this.y + config.coll1 &&
            config.coll1 + danger1.y >= this.y) {
            this.collision.play();
            this.collision.playbackRate = 3.0;
            this.y = config.initY;
            this.lives--;
            this.numLives.innerHTML = `${this.lives}`;
        }
        if (danger2.x <= this.x + config.coll1 &&
            danger2.x + config.coll1 >= this.x &&
            danger2.y <= this.y + config.coll1 &&
            config.coll1 + danger2.y >= this.y) {
            this.collision.playbackRate = 3.0;
            this.collision.play();
            this.y = config.initY;
            this.lives--;
            this.numLives.innerHTML = `${this.lives}`;
        }
        if (danger3.x <= this.x + config.coll1 &&
            danger3.x + config.coll1 >= this.x &&
            danger3.y <= this.y + config.coll1 &&
            config.coll1 + danger3.y >= this.y) {
            this.collision.playbackRate = 3.0;
            this.collision.play();
            this.y = config.initY;
            this.lives--;
            this.numLives.innerHTML = `${this.lives}`;
        }
        if (danger4.x <= this.x + config.coll1 &&
            danger4.x + config.coll1 >= this.x &&
            danger4.y <= this.y + config.coll1 &&
            config.coll1 + danger4.y >= this.y) {
            this.collision.playbackRate = 3.0;
            this.collision.play();
            this.y = config.initY;
            this.lives--;
            this.numLives.innerHTML = `${this.lives}`;
        }
        if (danger5.x <= this.x + config.coll1 &&
            danger5.x + config.coll1 >= this.x &&
            danger5.y <= this.y + config.coll1 &&
            config.coll1 + danger5.y >= this.y) {
            this.collision.playbackRate = 3.0;
            this.collision.play();
            this.y = config.initY;
            this.lives--;
            this.numLives.innerHTML = `${this.lives}`;
        }
        //END ENEMY COLLISIONS//

        //GEM COLLISIONS//
        if (gem1.x <= this.x + config.coll1 &&
            gem1.x + config.coll1 >= this.x &&
            gem1.y <= this.y + config.coll2 &&
            config.coll2 + gem1.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem1.y = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }

        if (gem2.x <= this.x + config.coll1 &&
            gem2.x + config.coll1 >= this.x &&
            gem2.y <= this.y + config.coll2 &&
            config.coll2 + gem2.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem2.y = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }

        if (gem3.x <= this.x + config.coll1 &&
            gem3.x + config.coll1 >= this.x &&
            gem3.y <= this.y + config.coll2 &&
            config.coll2 + gem3.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem3.y = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }

        if (gem4.x <= this.x + config.coll1 &&
            gem4.x + config.coll1 >= this.x &&
            gem4.y <= this.y + config.coll2 &&
            config.coll2 + gem4.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem4.y = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }

        if (gem5.x <= this.x + config.coll1 &&
            gem5.x + config.coll1 >= this.x &&
            gem5.y <= this.y + config.coll2 &&
            config.coll2 + gem5.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem5.y = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }

        if (gem6.x <= this.x + config.coll1 &&
            gem6.x + config.coll1 >= this.x &&
            gem6.y <= this.y + config.coll2 &&
            config.coll2 + gem6.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem6.y = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }

        if (gem7.x <= this.x + config.coll1 &&
            gem7.x + config.coll1 >= this.x &&
            gem7.y <= this.y + config.coll2 &&
            config.coll2 + gem7.y >= this.y) {
            this.bell.playbackRate = 3.0;
            this.bell.play();
            gem7.x = -100;
            this.gems = this.gems + 1;
            this.numGems.innerHTML = `${this.gems}`;
        }
        //END GEM COLLISIONS//

        //ENTER THE HOUSE//
        if (home.x <= this.x + config.collH &&
            home.x + config.collH >= this.x &&
            home.y <= this.y + config.collH &&
            config.collH + home.y >= this.y) {
            //This is to make sure no collisions will 
            //happen after win modal appears
            this.x = -300;
            danger1.x = config.gemOff;
            danger2.x = config.gemOff;
            danger3.x = config.gemOff;
            danger4.x = config.gemOff;
            danger5.x = config.gemOff;
            danger1.speed = 0;
            danger2.speed = 0;
            danger3.speed = 0;
            danger4.speed = 0;
            danger5.speed = 0;
            gem1.y = config.gemOff;
            gem2.y = config.gemOff;
            gem3.y = config.gemOff;
            gem4.y = config.gemOff;
            gem5.y = config.gemOff;
            gem6.y = config.gemOff;
            gem7.y = config.gemOff;
            gem1.speed = 0;
            gem2.speed = 0;
            gem3.speed = 0;
            gem4.speed = 0;
            gem5.speed = 0;
            gem6.speed = 0;
            gem7.speed = 0;
            //--------------//
            this.modal.style.display = "block";
            this.numG.innerHTML = `${this.numGems.innerHTML}`;
            this.audioWin.play();
            this.restart();
        }
        
        //END ENTER THE HOUSE//

        //LOSE FUCTIONALITY//
        if (this.lives < 0) {
            this.lose();
            this.restart();
        }
    }

    lose() {
        this.x = -300;
        this.modal1.style.display = "block";
        let that = this;
        setTimeout(function () {
            that.audioLose.play();
        }, 500);
    }

    restart() {
        $('.button').click(function () {
            location.reload();
        });
    }
}
//------END PLAYER CONSTRUCTOR FUNCTION-------//

//---------HOUSE CONSTRUCTOR FUNCTION--------//
class House {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.house = 'images/fairy-house.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.house), this.x, this.y, 170, 190);
    }
}
//------END HOUSE CONSTRUCTOR FUNCTION--------//

//---------DECORATION CONSTRUCTOR FUNCTION--------//
class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.flower = 'images/flower-block.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.flower), this.x, this.y, 150, 80);
    }
}
//------END DECORATION CONSTRUCTOR FUNCTION------//

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//CREATING A PLAYER, ENEMIES, GEMS, HOUSE, DECORATION//

let player = new Player(0, 585);

let danger1 = new Enemy(-400, 130, 130);
let danger2 = new Enemy(-130, 220, 200);
let danger3 = new Enemy(-350, 300, 90);
let danger4 = new Enemy(-100, 390, 100);
let danger5 = new Enemy(-200, 60, 180);
let allEnemies = [danger1, danger2, danger3, danger4, danger5];

let gem1 = new Gems(25, 10, 59);
let gem2 = new Gems(100, 0, 160);
let gem3 = new Gems(200, 12, 80);
let gem4 = new Gems(315, 0, 100);
let gem5 = new Gems(425, 7, 150);
let gem6 = new Gems(525, 1, 70);
let gem7 = new Gems(620, 3, 50);
let allGems = [gem1, gem2, gem3, gem4, gem5, gem6, gem7];

let home = new House(570, 45);

let flower = new Flower(0, 670);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
