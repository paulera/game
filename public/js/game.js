var utils = new Utils();

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

        //Add all states
        game.state.add("Boot", Boot);
        game.state.add("Preload", Preload);
        game.state.add("GameVideo", GameVideo);
        game.state.add("GameSelectCharacter", GameSelectCharacter);
        game.state.add("Main", Main);
        game.state.add("GameOver", GameOver);

        //Start the first state
        game.state.start("Boot");

})();