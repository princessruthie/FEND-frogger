/*
Entity, superclass for both player and enemy, provides
render setLoc and setSprite functions
*/
var Entity = function(){
};
/*
Entity location setter
*/
Entity.prototype.setLoc = function(x, y){
  this.x = x;
  this.y = y;
};
/*
Entity sprite setter
*/
Entity.prototype.setSprite = function(sprite){
  this.sprite = sprite;
};

/*
Renders entity to canvas
*/
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
Enemy class of moving obstacles
*/
var Enemy = function() {
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/*
Update the enemy's position
Parameter: dt, a time delta between ticks
For enemies moving right, when pass threshold, go to left of canvas
For enemies moving left, once past threshold, move to right of canvas
*/
Enemy.prototype.update = function(dt) {
    var thresholdRight = 800;
    var thresholdLeft = -100;
    this.x += dt*this.speed;
    if (this.x >thresholdRight){
      this.x = thresholdLeft;
    }
    if (this.x < thresholdLeft){
      this.x = thresholdRight;
    }
};
/*
Speed setter function
*/
Enemy.prototype.setSpeed = function(speed){
  this.speed = speed;
}

/*
Player class for interactive image
*/
var Player = function(){
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
  // TODO:
};

Player.prototype.handleInput = function (){
  // TODO:
};

/*
A function to get a random integer from 0 to cap
*/
var getStart = function(){
  var cap = 500;
  return Math.floor(Math.random()*cap);
}

/*
A function to get a random speed
*/
var getSpeed = function(){
  var minSpeed = 200;
  var maxSpeed = 900;
  var speed =  Math.random()*(maxSpeed-minSpeed)+minSpeed;
  var direction = Math.pow(-1, Math.floor(Math.random()*2) )
  return speed*direction;
}

var enemy01 = new Enemy();
enemy01.setLoc(getStart(), 63);
enemy01.setSprite('images/enemy-bug.png');
enemy01.setSpeed(getSpeed());

var enemy02 = new Enemy();
enemy02.setLoc(getStart(), 146);
enemy02.setSprite('images/enemy-bug.png');
enemy02.setSpeed(getSpeed());

var enemy03 = new Enemy();
enemy03.setLoc(getStart(), 232);
enemy03.setSprite('images/enemy-bug.png');
enemy03.setSpeed(getSpeed());

var allEnemies = [];
allEnemies.push(enemy01);
allEnemies.push(enemy02);
allEnemies.push(enemy03);

var player = new Player();
player.setLoc(200, 295);
player.setSprite('images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
