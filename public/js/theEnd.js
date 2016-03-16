var SantaGame = SantaGame || {};

//title screen
SantaGame.theEnd = function(){};

SantaGame.theEnd.prototype = {
  init: function(score) {
    var myScore = score
    console.log("Score === ",score)
    this.playerScore = this.playerScore || 0
    this.playerScore = myScore
  },
  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tile5');
    music = this.add.audio('bg5')
    music.play();
    this.background.autoScroll(-20, 0);

    this.loadMan = this.game.add.sprite(this.game.width/2 - 80, this.game.height/2 - 200,'gosanta');
    this.loadMan.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11], 10, true);
    this.loadMan.animations.play('fly');

    sprite = this.game.add.sprite(35, 410, 'pic');
    sprite.scale.setTo(2)
   

    // var style = { font: "32px 'Press Start 2P'", fill: "White", wordWrap: true, wordWrapWidth: sprite.width, align: "center", backgroundColor: "#ffff00" };

    // text = this.game.add.text(0, 0, "- Santa Got his present back! -\nClick to Keep Going!",style)
    // text.anchor.set(0.5);
    //start game text
    var text = "SANTA GOT HIS PRESENTS BACK!";
    var style = { font: "30px 'Press Start 2P'", fill: "White", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    var text = "You've defeated the mecha-deer.";
    var style = { font: "20px 'Press Start 2P'", fill: "White", align: "center" };
    var a = this.game.add.text(this.game.width/2, this.game.height/2 + 45, text, style);
    a.anchor.set(0.5);

    var text = "Keep trying, and get your score even higher!";
    var style = { font: "20px 'Press Start 2P'", fill: "White", align: "center" };
    var b = this.game.add.text(this.game.width/2, this.game.height/2 + 75, text, style);
    b.anchor.set(0.5);

    var text = "CLICK ANYWHERE TO GO BACK TO THE START!";
    var style = { font: "20px 'Press Start 2P'", fill: "White", align: "center" };
    var c = this.game.add.text(this.game.width/2, this.game.height/2 + 110, text, style);
    c.anchor.set(0.5);

    //highest score
    var text = "This Game's Score: "+ this.playerScore;
    style = { font: "15px 'Press Start 2P'", fill: "Green", align: "center" };
    var d = this.game.add.text(this.game.width/2, this.game.height/2 + 145, text, style);
    d.anchor.set(0.5);
  
    // var h = this.game.add.text(this.game.width/2, this.game.height/2 + 135, text, style);
    // h.anchor.set(0.5);
  },
  update: function() {

    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('MainMenu', true, false, this.playerScore);
      music.stop()
    }
  }
};