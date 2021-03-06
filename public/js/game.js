var utils = new Utils();
var gameServer = new GameServer();
var _game;
(function() {

        // // get users screen size
        // winW = document.body.offsetWidth;
        // winH = document.body.offsetHeight;

        // var game = new Phaser.Game(winW, winH, Phaser.CANVAS, '', { preload: preload, create: create, update:update}); 


        //Create a new game that fills the screen
        // var game = new Phaser.Game(
        //     document.body.offsetWidth,// * window.devicePixelRatio,
        //     document.body.offsetHeight, // * window.devicePixelRatio,
        //     Phaser.CANVAS
        // );

        // //Create a new game that fills the screen
        var game = new Phaser.Game(
            window.innerWidth, // * window.devicePixelRatio,
            window.innerHeight, // * window.devicePixelRatio,
            Phaser.AUTO
        );

        _game = game;

        //Add all states
        game.state.add("Boot", Boot);
        game.state.add("Preload", Preload);
        game.state.add("GameVideo", GameVideo);
        game.state.add("GameSelectCharacter", GameSelectCharacter);
        game.state.add("Main", Main);
        game.state.add("GameWin", GameWin);
        game.state.add("GameLose", GameLose);
        game.state.add("GameOver", GameOver);

        //Start the first state
        game.state.start("Boot");

})();