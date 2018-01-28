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
        usa.events.onInputDown.add(this.actionOnClickTrump, this);
        malta.events.onInputDown.add(this.actionOnClickMuscat, this);

        var style = { font: "45px Comic Sans MS", fill: '#dd0044', align: "center" };
        this.text3 = this.add.text(this.world.centerX, this.world.centerY - 170, "Select your character", style);
        this.text3.anchor.setTo(0.5, 0.5);
        this.text3.visible = true;
    },

    actionOnClickTrump: function  () {

        gameServer.selectCharacter('trump');
    	//save the char selected
        _game.selectedCharacter = 'trump';
        this.startGame();
    },

    actionOnClickMuscat: function  () {

        gameServer.selectCharacter('muscat');
        //save the char selected
        _game.selectedCharacter = 'muscat';
        this.startGame();
    },

	// TODO: call this function when the player click "Play" button
    startGame: function(){
    	console.log("Function: GameSelectCharacter.startGame");

        gameServer.waitingForGame(function (data) {
            _game.otherCharacter = data;
            _game.state.start("Main")
        });
    }

}