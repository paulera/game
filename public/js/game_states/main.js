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

    },

    update: function() {

    },

    gameOver: function(){
        this.game.state.start('GameOver');
    },

};