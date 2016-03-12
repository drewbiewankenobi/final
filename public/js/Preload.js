var SantaGame = SantaGame || {};

//loading the game assets
SantaGame.Preload = function(){};

SantaGame.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets

    //bg tiles
    this.load.image('space', '/assets/images/tile.jpg');
    this.load.image('mospace', '/assets/images/tile2.jpg');
    this.load.image('tile3', '/assets/images/tile3.jpg');
    this.load.image('tile4', '/assets/images/tile4.jpg');

    //sprites
    this.load.image('candy', '/assets/images/candy.png');
    this.load.image('rock', '/assets/images/chimmey.png');
    this.load.spritesheet('playership', '/assets/images/santadance.png',16,16);
    this.load.spritesheet('gosanta', '/assets/images/gosanta.png',165,173);
    this.load.spritesheet('reindeer', '/assets/images/reindeer.png',279.4285714286,456);
    this.load.image('power', '/assets/images/present.png');
    this.load.image('playerParticle', '/assets/images/player-particle.png');
    this.load.image('bullet', '/assets/images/ball.gif');

    //audio
    this.load.audio('collect', '/assets/audio/collect.ogg');
    this.load.audio('chomp', '/assets/audio/chomp.wav');
    this.load.audio('explosion', '/assets/audio/explosion.ogg');
    this.load.audio('bg', ['/assets/audio/Gradius.mp3'])
    this.load.audio('bg2', ['/assets/audio/aqua.mp3'])
    this.load.audio('bg3', ['/assets/audio/gradiusthree.mp3'])
    this.load.audio('bg4', ['/assets/audio/ffboss.mp3'])
    var music;
    var bullets;
    var nextFire

  },
  create: function() {
  	this.state.start('MainMenu');
  }
};