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

var GameSelectCharacter = function(game){};
var video;
GameSelectCharacter.prototype = {

	// show initial screen with character selection
    create: function(){
    	console.log("Function: GameSelectCharacter.create");
    	;
        this.stage.backgroundColor = '#182d3b';

        var button = this.add.button(this.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);

    },

    actionOnClick: function  () {

        alert('play');
        //this.scale.startFullScreen(false);
    	//this.startGame();
	},

	// TODO: call this function when the player click "Play" button
    startGame: function(){
    	console.log("Function: GameSelectCharacter.startGame");
        this.game.state.start("Main");
    }

}