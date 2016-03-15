var SantaGame = SantaGame || {};
//title screen
SantaGame.Gamefour = function(){};
SantaGame.Gamefour.prototype = {
  init: function(score) {
    var myScore = score || 0
    // console.log("Score === ",score)
    this.playerScore = this.playerScore || 0
    this.playerScore = myScore
  },
  create: function() {
      
  
    spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.x = this.game.time.now
    // this.initKeyboard();
    music = this.add.audio('bg4')
    //set world dimensions
    this.game.world.setBounds(0, 0, 1920, 1920);
    music.play();
    //background
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'tile4');
    //create player
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(2);
    this.player.animations.add('fly', [0, 1, 2, 3, 4, 5, 6], 6, true);
    this.player.animations.play('fly');
    this.player.smoothed = false;
  var gamez = this.game
  var playa = this.player
  // var bullets
      bullets = gamez.add.group();
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.enableBody = true;

      bullets.createMultiple(50, 'bullet');
      bullets.setAll('checkWorldBounds', true);
      bullets.setAll('outOfBoundsKill', true);

  var fire = function() {
      this.pewSound = gamez.add.audio('pew')

     
      
      // var fireRate = 100;
    
     //    nextFire = this.game.time.now + fireRate;

        var bullet = bullets.getFirstDead()

        bullet.reset(playa.x - 8, playa.y - 8);

        gamez.physics.arcade.moveToPointer(bullet, 300);
    
    myBullets = bullet
    this.pewSound.play();
      }
    spaceBar.onDown.add(fire)

    //enable player physics
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 180 ;
    this.player.body.collideWorldBounds = true;


    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //generate game elements
    
    this.generateReindeer();
    this.generateAsteriods();

    //show score
    this.showLabels();


    //sounds
    this.explosionSound = this.game.add.audio('explosion');
   
    this.collectSound = this.game.add.audio('collect');

    this.candySound = this.game.add.audio('chomp');

    

    this.presentCount = this.presentCount || 0
    // stater = this.game.state
    //   gameChange = function(){
    //     music.stop()
    //     stater.start('Gamefour')
    // }
    // spaceBar.onDown.add(gameChange)
    
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      
      //move on the direction of the input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }
    //collision between player and asteroids
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
    this.game.physics.arcade.collide(this.player, this.reindeer, this.hitAsteroid, null, this);

    //overlapping between player and collectables
    this.game.physics.arcade.collide(bullets, this.asteroids, this.breakAsteroid, null, this);
    this.game.physics.arcade.collide(bullets, this.reindeer, this.breakDeer, null, this);
    this.game.physics.arcade.overlap(this.player, this.candies, this.getCandy, null, this);
    
   
  },
  // initKeyboard: function () {
  //       this.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //   },
  // checkPlayerInput: function () {
        
  //       if (this.key_fire.isDown) {
  //           this.fire();
  //       }
  //   },
breakAsteroid: function(bullet, asteroid) {

    this.explosionSound.play();
    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;
    bullet.kill();
    asteroid.kill();
    // if (this.presentCount === this.getCount){
    //   music.stop()
    // this.game.state.start('Gametwo', true, false, this.playerScore)
    // }

 
  },
breakDeer: function(bullet, reindeer){
  
    this.explosionSound.play();
    //update score
    
  
    reindeer.scale.y -=.2
    reindeer.scale.x -=.2
    bullet.kill();
    reindeer.HP -= 1
    var pointX = reindeer.x
    var pointY = reindeer.y
    console.log(reindeer.HP)
    if (reindeer.HP <= 0){
      var splode = this.game.add.sprite(pointX, pointY, 'asplode')
      splode.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 25, false);
      splode.animations.play('fly');
      reindeer.kill()
    }
  
},
  generateReindeer: function() {
    this.reindeer = this.game.add.group();
    
    //enable physics in them
    this.reindeer.enableBody = true;
    var numreindeer = 2
    var deer;
    

    for (var i = 0; i < numreindeer; i++) {
      //add sprite
      deer = this.reindeer.create(this.game.world.randomX, this.game.world.randomY, 'reindeer');
      

      // physics properties
      // deer.scale.setTo(2);
      deer.animations.add('fly', [0, 1, 2, 3, 4, 5, 6], 15, true);
      deer.animations.play('fly');
      deer.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
      deer.body.velocity.y = this.game.rnd.integerInRange(-100, 100);
      deer.scale.setTo(2.5);
      deer.body.immovable = true;
      deer.body.collideWorldBounds = true;
      deer.body.bounce.setTo(0.9, 0.9);
      deer.HP = 11
    }

  },
  generateAsteriods: function() {
    this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(50, 100)
    var asteriod;
    

    for (var i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      rando = (this.game.rnd.integerInRange(.5, 2)/2);
      if (rando === 0){
        rando+=.25
      }
      asteriod.scale.setTo(rando)

      // physics properties

      if (rando <=.25){
        asteriod.body.velocity.x = this.game.rnd.integerInRange(-80, 80);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-80, 80);
      } else {
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 30);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 30);}

      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
      asteriod.body.bounce.setTo(0.9, 0.9);
    }
  },
   hitAsteroid: function(player, asteroid) {
    //play explosion sound
  
    if(this.game.time.now > this.x + 5000){
    this.explosionSound.play();
  
    //make the player explode
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
    this.player.kill();
    this.game.time.events.add(800, this.gameOver, this);
    music.stop()
  }
  },
  gameOver: function() {    
    //pass it the score as a parameter 
    this.game.state.start('MainMenu', true, false, this.playerScore);
    this.presentCount = 0
  },

  gameChange : function(){
    music.stop()
    this.game.state.start('Gamefive', true, false, this.playerScore)
  },
  
  showLabels: function() {
    //score text
    var text = "0";
    var style = { font: "25px Georgia", fill: "Red", align: "center" };
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
  }
};
