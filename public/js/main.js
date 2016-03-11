var SantaGame = SantaGame || {};

SantaGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SantaGame.game.state.add('Boot', SantaGame.Boot);
SantaGame.game.state.add('Preload', SantaGame.Preload);
SantaGame.game.state.add('MainMenu', SantaGame.MainMenu);
SantaGame.game.state.add('Game', SantaGame.Game);
SantaGame.game.state.add('Gametwo', SantaGame.Gametwo);
SantaGame.game.state.add('Gamethree', SantaGame.Gamethree);

SantaGame.game.state.start('Boot');