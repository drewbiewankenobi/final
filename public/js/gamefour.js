var SantaGame = SantaGame || {};
//title screen
SantaGame.Gamefour = function(){};
SantaGame.Gamefour.prototype = {
  init: function(score) {
    var myScore = score
    console.log("Score === ",score)
    this.playerScore = this.playerScore || 0
    this.playerScore = myScore
  },
  create: function() {
    // for (key in Phaser.Keyboard){
    //   console.log(key)}
    this.x = this.game.time.now
    this.initKeyboard();
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

    //player initial score of zero
    

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

    this.candySound = this.game.add.audio('chomp')

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

    this.checkPlayerInput();
    // spaceBar.onDown.add(this.gameChange)

    //collision between player and asteroids
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
    this.game.physics.arcade.collide(this.player, this.reindeer, this.hitAsteroid, null, this);

    //overlapping between player and collectables
    this.game.physics.arcade.collide(this.bullets, this.asteroids, this.breakAsteroid, null, this);
    this.game.physics.arcade.overlap(this.player, this.candies, this.getCandy, null, this);
    
   
  },
  initKeyboard: function () {
        this.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
  checkPlayerInput: function () {
        
        if (this.key_fire.isDown) {
            this.fire();
        }
    },
  fire : function() {
  	// console.log("game time === ",this.game.time.now)
    // if (this.game.time.now/1000 > this.nextFire && bullets.countDead() > 0) {
      console.log(this.game.time)
      
	   
    	bullets = this.game.add.group();
    	bullets.enableBody = true;
    	bullets.physicsBodyType = Phaser.Physics.ARCADE;

    	bullets.createMultiple(50, 'bullet');
    	bullets.setAll('checkWorldBounds', true);
    	bullets.setAll('outOfBoundsKill', true);
    	var fireRate = 100;
		
        nextFire = this.game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(this.player.x - 8, this.player.y - 8);

        this.game.physics.arcade.moveToPointer(bullet, 300);
        console.log(bullets)
        this.bullets = bullets
        console.log(this.bullets)
     
    // }

},
breakAsteroid: function(player, collectable) {
    //play collect sound
    this.explosionSound.play();
    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;
    // if (this.presentCount === this.getCount){
    //   music.stop()
    // this.game.state.start('Gametwo', true, false, this.playerScore)
    // }

    // console.log("fired!")

    //remove sprite
    console.log(this.bullets)
    // this.bullets.destroy()
  },
  generateReindeer: function() {
    this.reindeer = this.game.add.group();
    
    //enable physics in them
    this.reindeer.enableBody = true;

    //phaser's random number generator
    var numreindeer = 2
    var deer;
    console.log("reindeer in play ===",numreindeer)

    for (var i = 0; i < numreindeer; i++) {
      //add sprite
      deer = this.reindeer.create(this.game.world.randomX, this.game.world.randomY, 'reindeer');
      

      // physics properties
      // deer.scale.setTo(2);
      deer.animations.add('fly', [0, 1, 2, 3, 4, 5, 6], 15, true);
      deer.animations.play('fly');
      deer.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
      deer.body.velocity.y = this.game.rnd.integerInRange(-100, 100);}

      deer.body.immovable = true;
      deer.body.collideWorldBounds = true;
      deer.body.bounce.setTo(0.9, 0.9);
  },
  generateAsteriods: function() {
    this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(50, 100)
    var asteriod;
    console.log("Asteroids in play ===",numAsteroids)

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
    console.log(this.x)
    if(this.game.time.now > this.x + 5000){
    this.explosionSound.play();
    // console.log("Player coords ===",this.player.x, this.player.y)
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
