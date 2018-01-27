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

    	console.log("Function: preload.preload");

        this.load.image('pic', 'assets/pics/bg2.png');
        this.load.image('bg_blue', 'assets/pics/bg_blue.png');
        this.load.image('cloud_back', 'assets/sprites/cloud_back.png');
        this.load.image('cloud_front', 'assets/sprites/cloud_front.png');
        this.load.image('spot', 'assets/sprites/spot.png');
        this.load.image('player1', 'assets/sprites/block.png');
        this.load.image('player2', 'assets/sprites/block.png');
        this.load.image('beam', 'assets/sprites/block.png');

        //game tiitle
        this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        this.load.video('video', 'assets/video/start.mp4');


    },

    create: function(){
    	console.log("Function: preload.create");
        this.game.state.start("GameVideo");
    }
}