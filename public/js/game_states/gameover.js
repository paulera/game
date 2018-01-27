/**
 * 
 * GAME OVER
 * 
 * Eventually our player is going to die or win, at which point they will arrive in this state.
 * We will use this screen to display a score and offer them the opportunity to start a new game.
 * 
 * */

var GameOver = function(game){};

GameOver.prototype = {

    create: function(){
    	console.log("Function: gameover.create");
    },

    restartGame: function(){
    	console.log("Function: gameover.restartgame");
        this.game.state.start("GameTitle");
    }

}