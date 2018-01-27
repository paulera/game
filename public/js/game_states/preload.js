/**
 * 
 * PRELOAD STATE
 * 
 * Preload is our second state and will be used to load in all the assets
 * (images, audio, etc.) our game needs to function. The next state won't
 * be triggered until all the assets are ready.
 * 
 * */

var Preload = function(game){};

Preload.prototype = {

    preload: function(){ 

    },

    create: function(){
        this.game.state.start("GameTitle");
    }
}