/**
 * 
 * MAIN GAME
 * 
 * Finally we get into the fun part. The main state will contain our actual game code.
 * 
 * */

var Main = function(game){

};

Main.prototype = {

    create: function() {
    	console.log("Function: main.create");
    },

    // update the screen based on the current game status
    update: function() {
		console.log("Function: main.update");
    },

    gameOver: function(){
    	console.log("Function: main.gameOver");
        this.game.state.start('GameOver');
    },

};