var level = 1;
let header = document.querySelector(".caption");
// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = randomNumber(64,128);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed+(level-1)*20) * dt;
    if (this.x >= 505) {
        this.x = -55;
    }
    if (this.x + 75 > player.x && this.x < player.x + 40 && this.y + 70 > player.y && this.y < player.y + 40) {
        alert("You fail at level " + level);
        player.reset();
        resetLevel();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.changeSprite = function(imageUrl) {
    this.sprite = imageUrl;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.update = function () {
    if (player.y < 0) {
        increaseLevel();
        if(level == 11){
            alert("Congratulation.You win!");
            resetLevel();
            player.y = 380;
        }else{
            player.y = 380;
        }
    }
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function(){
    player.x = 200;
    player.y = 380;
}

Player.prototype.handleInput = function (direction) {
    if (direction === "left" && this.x > 0) {
        this.x = this.x - 101;
    } else if (direction === "right" && this.x < 400) {
        this.x = this.x + 101;
    } else if (direction === "up" && this.y > 20) {
        this.y = this.y - 83;
    } else if (direction === "down" && this.y < 380) {
        this.y = this.y + 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 60);
const enemy2 = new Enemy(200, 143);
const enemy3 = new Enemy(400, 226);
// const enemy4 = new Enemy(255, 60);
// const enemy5 = new Enemy(255, 143);
// const enemy6 = new Enemy(255, 226);
const allEnemies = [enemy1, enemy2, enemy3/*, enemy4, enemy5,enemy6*/];

const player = new Player(200, 380);


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

function resetLevel(){
    level = 1;
    header.innerHTML = 'Level '+level;
    changeAllEnemySpriteToImage('images/enemy-bug.png');
}

function increaseLevel(){
    level ++;
    header.innerHTML = 'Level '+level;
    switch (level) {
        case 3:
            changeAllEnemySpriteToImage('images/level3.png');
            break;
        case 5:
            changeAllEnemySpriteToImage('images/level5.png');
            break;
        case 6:
            changeAllEnemySpriteToImage('images/level6.png');
            break;
        case 8:
            changeAllEnemySpriteToImage('images/level8.png');
            break;
        case 10:
            changeAllEnemySpriteToImage('images/level10.png');
            break;
        default:
            break;
    }
}

function changeAllEnemySpriteToImage(imageUrl){
    for (let index = 0; index < allEnemies.length; index++) {
        const enemy = allEnemies[index];
        enemy.changeSprite(imageUrl);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

