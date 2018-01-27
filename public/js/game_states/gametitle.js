/**
 * 
 * GAME TITLE
 * 
 * This state will be used to display the games title screen. Usually we will display the
 * title of the game here, maybe some graphics and a 'Play' or 'Start' button to take the
 * player into the game. Perhaps we might even want to add an 'Instructions' button in here
 * too that could open up it's own Instructions or Tutorial state.
 * 
 * */

var GameTitle = function(game){};
var video;
GameTitle.prototype = {

	// show initial screen with character selection
    create: function(){
    	console.log("Function: gametitle.preload");

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        video = this.add.video('video');

        video.play(true);



        var ratio = parseFloat(video.height) / parseFloat(video.width);
        var scaleX = this.game.width / video.width;
        var scaleY = this.game.height / video.height;

        //  x, y, anchor x, anchor y, scale x, scale y
        video.addToWorld(0,0, 0,0,scaleX, scaleY);
        video.width = this.game.width;

        setTimeout(this.stopVideo(this), 3000);



        /*
    	var bgImage = this.add.image(this.world.centerX, this.world.centerY, 'pic');
    	bgImage.anchor.set(0.5);
        this.stage.backgroundColor = '#182d3b';
        */

        //var background = this.add.tileSprite(0, 0, 800, 600, 'pic');

        //var button = this.add.button(this.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);

    },

    actionOnClick: function  () {

        alert('play');
        //this.scale.startFullScreen(false);
    	//this.startGame();
	},

    stopVideo:function (that) {
        video.play(false);
        that.input.onDown.add(that.actionOnClick, that);
    },

	// TODO: call this function when the player click "Play" button
    startGame: function(){
    	console.log("Function: gametitle.startGame");
        this.game.state.start("Main");
    }

}