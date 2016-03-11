var SantaGame = SantaGame || {};

//title screen
SantaGame.MainMenu = function(){};

SantaGame.MainMenu.prototype = {
  init: function(score) {
    var score = score || 0;
    this.highestScore = this.highestScore || 0;
    // console.log(score)
    this.highestScore = Math.max(score, this.highestScore);
    // console.log(this.highestScore)
   },
  create: function() {
  	//show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    
    //give it speed in x
    this.background.autoScroll(-20, 0);

    this.loadMan = this.game.add.sprite(this.game.width/2 - 80, this.game.height/2 - 200,'gosanta');
    this.loadMan.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11], 10, true);
    this.loadMan.animations.play('fly');
    //start game text
    var text = "PRESENT GRABBER";
    var style = { font: "30px Georgia", fill: "Red", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    var text = "CLICK ANYWHERE TO START";
    var style = { font: "20px Georgia", fill: "Red", align: "center" };
    var g = this.game.add.text(this.game.width/2, this.game.height/2 + 35, text, style);
    g.anchor.set(0.5);

    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Georgia", fill: "Green", align: "center" };
  
    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 60, text, style);
    h.anchor.set(0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};