/**
 * 
 * BOOT STATE
 * 
 * This is our first state, and it will be invoked as soon as our game is launched.
 * We won't be using this state for a lot, just to initially scale the dimensions
 * of the game to the appropriate size and then call our second state.
 * 
 * */


var Boot = function(game){

};

Boot.prototype = {

    preload: function(){
        console.log("Function: boot.preload");
    },

    create: function(){
        console.log("Function: boot.create");
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.updateLayout(true);
        
        this.game.state.start("Preload");
    }
}