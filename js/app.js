var Entity = function(){
};
Entity.prototype.setLoc = function(x, y){
  this.x = x;
  this.y = y;
};
Entity.prototype.setSprite = function(sprite){
  this.sprite = sprite;
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    if (this.x >800){
      this.x = -100;
    }
    if (this.x < -100){
      this.x = 800;
    }
};
Enemy.prototype.setSpeed = function(speed){
  this.speed = speed;
}

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

var getStart = function(){
  return Math.floor(Math.random()*500);
}

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
