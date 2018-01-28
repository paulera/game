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

        this.loadCharacterAssets('trump');

        //game tiitle
        this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        this.load.video('video', 'assets/video/start.mp4');

        //select character
        this.load.image('bgSelectChar', 'assets/pics/bg-select-char.png');
        this.load.image('charUsa', 'assets/pics/usa.png');
        this.load.image('charMalta', 'assets/pics/malta.png');

    },

    create: function(){
    	console.log("Function: preload.create");
        this.game.state.start("GameVideo");
    },

    loadCharacterAssets: function (characterFolder) {
    	this.load.image(characterFolder + '_body_1', 'assets/characters/' + characterFolder + '/body_1.png');
    	this.load.image(characterFolder + '_body_2', 'assets/characters/' + characterFolder + '/body_2.png');
    	this.load.image(characterFolder + '_body_3', 'assets/characters/' + characterFolder + '/body_3.png');
    	this.load.image(characterFolder + '_body_4', 'assets/characters/' + characterFolder + '/body_4.png');
    	this.load.image(characterFolder + '_face_1', 'assets/characters/' + characterFolder + '/face_1.png');
    	this.load.image(characterFolder + '_portrait', 'assets/characters/' + characterFolder + '/portrait.png');
    },

}