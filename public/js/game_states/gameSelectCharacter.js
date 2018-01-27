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
        utils.showBackground(this, 'bg_blue');

        //var button = this.add.button(this.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);

        //add usa char
        var usa = this.add.image(this.world.centerX - 350, this.world.centerY - 125,'charUsa');
        var malta = this.add.image(this.world.centerX + 100, this.world.centerY - 125,'charMalta');

        usa.inputEnabled = true;
        malta.inputEnabled = true;
        usa.events.onInputDown.add(this.actionOnClickusa, this);
        malta.events.onInputDown.add(this.actionOnClickmalta, this);
    },

    actionOnClickusa: function  () {

        //this.scale.startFullScreen(false);
    	this.startGame();

    	//save the char selected
        this.game.selectedCharacter = 1
	},


    actionOnClickmalta: function  () {

        //this.scale.startFullScreen(false);
        this.startGame();

        //save the char selected
        this.game.selectedCharacter = 0
    },

	// TODO: call this function when the player click "Play" button
    startGame: function(){
    	console.log("Function: GameSelectCharacter.startGame");
        this.game.state.start("Main");
    }

}