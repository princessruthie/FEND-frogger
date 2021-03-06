/*
Entity, superclass for both player and enemy, provides
render setLoc and setSprite functions
*/
var Entity = function() {};
/*
Entity location setter
*/
Entity.prototype.setLoc = function(x, y) {
  this.x = x;
  this.y = y;
};
/*
Entity sprite setter
*/
Entity.prototype.setSprite = function(sprite) {
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
var Enemy = function() {};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/*
Update the enemy's position
Parameter: dt, a time delta between ticks
For enemies moving right, when past threshold, go to left of canvas
For enemies moving left, once past threshold, move to right of canvas
*/
Enemy.prototype.update = function(dt) {
  var THRESHOLD_RIGHT = 800;
  var THRESHOLD_LEFT = -100;
  this.x += dt * this.speed;
  if (this.x > THRESHOLD_RIGHT) {
    this.x = THRESHOLD_LEFT;
  }
  if (this.x < THRESHOLD_LEFT) {
    this.x = THRESHOLD_RIGHT;
  }
};

Enemy.prototype.setUp = function(speed) {
  this.speed = speed;
  if (speed < 0) {
    this.setSprite('images/enemy-bug-rtl.png');
  } else {
    this.setSprite('images/enemy-bug.png');
  }
}

/*
Player class for interactive image
*/
var Player = function() {}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {};

/*
Put player in middle of width wise and then center niceley
x is at (canvas width + player width)/2
y is offset by 12px and then advanced 4 rows for -12 + 83*4 = 320
*/
Player.prototype.resetLocation = function() {
  this.setLoc(202, 320);
};

/*
Rather than go long on this project, the calcs are as follows:
x values can go from 0 to (#cols -1)*col-width -- 0 through 404
y values can go from -12 to -12 + (#rows -1)*83 -- -12 through 403
since x moves by 101 and y moves by 83, the ranges are as below
*/
Player.prototype.handleInput = function(keycode) {
  switch (keycode) {
    case 'left':
      if (this.x > 100) {
        this.x -= 101;
      }
      break;

    case 'right':
      if (this.x < 304) {
        this.x += 101;
      }
      break;

    case 'up':
      if (this.y > 70) {
        this.y -= 83;
        /*if in the top row, turn into a bug! */
        if (this.y == -12){
          this.setSprite('images/enemy-bug.png');
        }
      }
      break;

    case 'down':
      if (this.y < 321) {
        this.y += 83;
      }
      break;
  }
};

/*
A function to get a random integer from 0 to cap
*/
var getStart = function() {
  var cap = 500;
  return -Math.floor(Math.random() * cap);
}

/*
A function to get a random speed
*/
var getSpeed = function() {
  var MIN_SPEED = 200;
  var MAX_SPEED = 900;
  var speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
  var direction = Math.pow(-1, Math.floor(Math.random() * 2))
  return speed * direction;
}

/*
Enemies run on rows. The bugs are offset from edge by 20 and increment at 83,
yielding 63, 146, 229
*/
var enemy01 = new Enemy();
enemy01.setLoc(getStart(), 63);
enemy01.setUp(getSpeed());

var enemy02 = new Enemy();
enemy02.setLoc(getStart(), 146);
enemy02.setUp(getSpeed());

var enemy03 = new Enemy();
enemy03.setLoc(getStart(), 229);
enemy03.setUp(getSpeed());

var allEnemies = [];
allEnemies.push(enemy01);
allEnemies.push(enemy02);
allEnemies.push(enemy03);

var player = new Player();
player.resetLocation();
player.setSprite('images/char-boy.png');
/*
This listens for key presses and sends the keys to your
Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

/*
Resets all the enemies to offscreen but keeps the direction and speed
*/
var resetEnemies = function(){
  for (var i = 0; i< allEnemies.length; i++){
  console.log("test");
  allEnemies[i].setLoc(getStart(), 63 + i*83);
  }
};

var checkCollisions = function() {
  /*
  Char pngs have 16px white space so use width-whitespace = 101-16 = 85
  Bugs and char rows are usually separated by some multiple of 83 with
  whitespace of 20 for a difference of 63
  */
  allEnemies.forEach(function(enemy) {
    if ((Math.abs(enemy.x - player.x) < 85) & (Math.abs(enemy.y - player.y) < 63)) {
      console.log("collision with " + enemy.x + ' ' + enemy.y);
      player.resetLocation();
      resetEnemies();
    }
  });
}
