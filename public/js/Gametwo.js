var SantaGame = SantaGame || {};

//title screen
SantaGame.Gametwo = function(){};
SantaGame.Gametwo.prototype = {
  create: function() {
    music = this.add.audio('bg2')
    //set world dimensions
    this.game.world.setBounds(0, 0, 1920, 1920);
    music.play();
    //background
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mospace');

    //create player
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(2);
    this.player.animations.add('fly', [0, 1, 2, 3, 4, 5, 6], 5, true);
    this.player.animations.play('fly');

    //player initial score of zero
    this.playerScore = 0;

    //enable player physics
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 180 ;
    this.player.body.collideWorldBounds = true;

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //generate game elements
    this.generateCollectables();
    this.generateAsteriods();
    this.generateCandies();

    //show score
    this.showLabels();

    //sounds
    this.explosionSound = this.game.add.audio('explosion');
   
    this.collectSound = this.game.add.audio('collect');

    this.candySound = this.game.add.audio('chomp')

    stater = this.game.state
      gameChange = function(){
        music.stop()
        stater.start('Gamethree')
    }
    spaceBar.onDown.add(gameChange)
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      
      //move on the direction of the input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }

    //collision between player and asteroids
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

    //overlapping between player and collectables
    this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.candies, this.getCandy, null, this);
  },
  generateCollectables: function() {
    this.collectables = this.game.add.group();

    //enable physics in them
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numCollectables = this.game.rnd.integerInRange(20, 40)
    var collectable;

    for (var i = 0; i < numCollectables; i++) {
      //add sprite
      collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
      collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectable.animations.play('fly');
    }

  },
  generateCandies: function() {
    this.candies = this.game.add.group();

    //enable physics in them
    this.candies.enableBody = true;
    this.candies.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numCandies = this.game.rnd.integerInRange(5, 15)
    var candy;

    for (var i = 0; i < numCandies; i++) {
      //add sprite
      candy = this.candies.create(this.game.world.randomX, this.game.world.randomY, 'candy');
      candy.animations.add('fly', [0, 1, 2, 3], 5, true);
      candy.animations.play('fly');
    }

  },
  generateAsteriods: function() {
    this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(100, 150)
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
        asteriod.body.velocity.x = 100;
        asteriod.body.velocity.y = 100;
      } else {
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-30, 30);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-30, 30);}

      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
      asteriod.body.bounce.setTo(0.9, 0.9);
      // console.log("Asteroid coords ===",asteriod.position)
      // console.log("Asteroid random num ===", rando )
    }
  },
  hitAsteroid: function(player, asteroid) {
    //play explosion sound
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
  },
  gameOver: function() {    
    //pass it the score as a parameter 
    this.game.state.start('MainMenu', true, false, this.playerScore);
  },
  collect: function(player, collectable) {
    //play collect sound
    this.collectSound.play();

    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;

    //remove sprite
    collectable.destroy();
  },
  getCandy: function(player, candy) {
    //play collect sound
    this.candySound.play();

    //update scale
    this.player.scale.y +=.3
    this.player.scale.x +=.3
    

    //remove sprite
    candy.destroy();
  },
  showLabels: function() {
    //score text
    var text = "0";
    var style = { font: "25px Georgia", fill: "Red", align: "center" };
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
  }
};
