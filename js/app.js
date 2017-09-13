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
For enemies moving right, when pass threshold, go to left of canvas
For enemies moving left, once past threshold, move to right of canvas
*/
Enemy.prototype.update = function(dt) {
  var thresholdRight = 800;
  var thresholdLeft = -100;
  this.x += dt * this.speed;
  if (this.x > thresholdRight) {
    this.x = thresholdLeft;
  }
  if (this.x < thresholdLeft) {
    this.x = thresholdRight;
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

Player.prototype.update = function() {
  // TODO:
};

/*By visual inspection, character can be located (0, -12) through (404, 403)
and movement tolerance is calculated from there
*/
Player.prototype.handleInput = function(keycode) {
  // TODO: remove magic numbers
  console.log(this.x + " " + this.y);

console.log(keycode);
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
        // TODO: check if this has landed in top row and if so, call a game won function
      }
      break;

    case 'down':
      if (this.y < 321) {
        this.y += 83;
      }
      break;
  }
  console.log(this.x + " " + this.y);

};

/*
A function to get a random integer from 0 to cap
*/
var getStart = function() {
  // TODO: have them start off screen
  var cap = 500;
  return Math.floor(Math.random() * cap);
}

/*
A function to get a random speed
*/
var getSpeed = function() {
  var minSpeed = 200;
  var maxSpeed = 900;
  var speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  var direction = Math.pow(-1, Math.floor(Math.random() * 2))
  return speed * direction;
}

// TODO: remove magic numbers
var enemy01 = new Enemy();
enemy01.setLoc(getStart(), 63);
enemy01.setUp(getSpeed());

var enemy02 = new Enemy();
enemy02.setLoc(getStart(), 146);
enemy02.setUp(getSpeed());

var enemy03 = new Enemy();
enemy03.setLoc(getStart(), 232);
enemy03.setUp(getSpeed());

var allEnemies = [];
allEnemies.push(enemy01);
allEnemies.push(enemy02);
allEnemies.push(enemy03);

var player = new Player();
// TODO: remove magic numbers
// put player in middle of width wise and then center niceley
player.setLoc(202, 320);
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

var checkCollisions = function() {
  allEnemies.forEach(function(enemy) {
    // TODO: remove magic numbers
    if ((Math.abs(enemy.x - player.x) < 5) & (Math.abs(enemy.y - player.y) < 65)) {
      console.log("collision with " + enemy.x + ' ' + enemy.y);
      player.setLoc(202, 320);
    }
  });
}
