(function() {
/*
    var config = {
        type: Phaser.CANVAS,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            render: render
        },
        callbacks: {
            preBoot: preBoot,
            postBoot: postBoot
        }
    };
*/
    var config = {
        type: Phaser.CANVAS,
        parent: 'phaser-example',
        width: 800,
        height: 400,
        scene: {
            preload: preload,
            create: create,
            render: render
        },
        callbacks: {
            preBoot: preBoot,
            postBoot: postBoot
        }
    };

    var game = new Phaser.Game(config);

    /***************************************8
     * GAME PREPARATION
     */

    function preload() {

        this.load.image('pic', 'assets/pics/bg2.png');
        this.load.image('player1', 'assets/sprites/block.png');
        this.load.image('player2', 'assets/sprites/block.png');
        this.load.image('beam', 'assets/sprites/block.png');

    }

    function create() {

        //bg color
        //game.stage.backgroundColor = '#440e62';

        var pic = this.add.image(0, 0, 'pic');
        var player1 = this.add.image(0, 0, 'player1');
        var player2 = this.add.image(0, 0, 'player2');
        var beam = this.add.image(0, 0, 'beam');
        var zone = this.add.zone(
            400,
            200,
            800,
            400
        );

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(pic, zone);

        //  first player
        Phaser.Display.Align.In.BottomLeft(player1, pic);

        //  second player
        Phaser.Display.Align.In.BottomRight(player2, pic);

        //been
        Phaser.Display.Align.In.BottomCenter(beam, pic);
    }

    function render () {

    }
    function preBoot() {
        console.log('I get called before all of the Game systems are created, but after Device is available');
    }

    function postBoot() {
        console.log('I get called after all of the Game systems are running, immediately before raf starts');
        game.canvas.addEventListener('mousedown', onMouseDown, true);
        game.canvas.addEventListener('mouseup', onMouseUp, true);
    }

    /***************************************8
     * EVENT LISTENERS
     */

    function onMouseDown() {
        console.log("mouse down");
    }

    function onMouseUp() {
        console.log("mouse up");
    }

})();