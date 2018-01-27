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

var GameVideo = function(game){};
var video;
GameVideo.prototype = {

	// show initial screen with character selection
    create: function(){
    	console.log("Function: GameVideo.create");

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        video = this.add.video('video');
        var scaleX = this.game.width / video.width;
        var scaleY = this.game.height / video.height;
        //  x, y, anchor x, anchor y, scale x, scale y
        video.addToWorld(0,0, 0,0,scaleX, scaleY);
        video.width = this.game.width;
        video.play(true);
        setTimeout(this.stopVideo(this), 3000);
    },
    stopVideo:function (that) {
        video.play(false);
        that.input.onDown.add(that.selectCharacter, that);
    },

	// TODO: call this function when the player click "Play" button
    selectCharacter: function(){
    	console.log("Function: GameVideo.selectCharacter");
        this.game.state.start("GameSelectCharacter");
    }

}