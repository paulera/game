(function() {

    var config = {
        type: Phaser.CANVAS,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create
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

        this.load.image('pic', 'assets/pics/barbarian-loading.png');
        this.load.image('block', 'assets/sprites/block.png');

    }

    function create() {

        var pic = this.add.image(0, 0, 'pic');
        var block = this.add.image(0, 0, 'block');

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(pic, this.add.zone(400, 300, 800, 600));

        //  Center the sprite to the picture
        Phaser.Display.Align.In.BottomLeft(block, pic);
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