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

GameTitle.prototype = {

	// show initial screen with character selection
    create: function(){
    	console.log("Function: gametitle.preload");

    	var bgImage = this.add.image(this.world.centerX, this.world.centerY, 'pic');
    	bgImage.anchor.set(0.5);

    	// ---------------------------------------
    	// skip initial screen - remove me
    	//this.startGame();
    	// ---------------------------------------

    },

    // TODO: call this function when the player click "Play" button
    startGame: function(){
    	console.log("Function: gametitle.startGame");
        this.game.state.start("Main");
    }

}