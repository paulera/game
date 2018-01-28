var Player = function(game, characterFolder, place) {
	this.game = game;
	this.characterFolder = characterFolder;
	this.place = place;

	this.faceSprites = [];
	this.bodySprites = [];
	this.activeFaceSprite;
	this.activeBodySprite;

	for (var i = 1; i <= 4; i++) {
		var body = this.game.add.sprite(0, 0, this.characterFolder+'_body_'+i);
		var bodyScale = 0.8;
		if (this.place == "left") {
	        body.alignIn(imgBackground, Phaser.BOTTOM_LEFT);
	        body.y -= 150;
	        body.x += 45;
	        body.scale.setTo(bodyScale);
	    } else if (this.place == "right") {
	    	body.alignIn(imgBackground, Phaser.BOTTOM_RIGHT);
	        body.y -= 150;
	        body.x += 190;
	        body.scale.setTo(-bodyScale,bodyScale);
	    }
	    body.visible = false;
	    this.bodySprites[i] = body;
	}

	for (var i = 1; i <= 1; i++) {
	    var face = this.game.add.sprite(0, 0, this.characterFolder+'_face_'+i);
	    var faceScale = 0.6;
		if (this.place == "left") {
	        face.alignIn(imgBackground, Phaser.BOTTOM_LEFT);
	        face.y -= 200;
	        face.x += 15;
	        face.scale.setTo(faceScale);
	    } else if (this.place == "right") {
	    	face.alignIn(imgBackground, Phaser.BOTTOM_RIGHT);
	        face.y -= 200;
	        face.x += 339;
	        face.scale.setTo(-faceScale,faceScale);
	    }
	    face.visible = false;
	    this.faceSprites[i] = face;
	}
};

Player.prototype = {

	standStill: function() {
		this.setFace(1);
		this.setBody(1);
	},

	animateToAttackPosition: function() {
		this.setFace(1);
		this.setBody(1);
	},

	setFace: function(index) {
		if (this.faceSprites[index] != this.activeFaceSprite) {
			if (this.activeFaceSprite != undefined) {
				this.activeFaceSprite.visible = false;
			}
			this.activeFaceSprite = this.faceSprites[index];
		}
		this.activeFaceSprite.visible = true;
	},

	setBody: function(index) {
		if (this.bodySprites[index] != this.activeBodySprite) {
			if (this.activeBodySprite != undefined) {
				this.activeBodySprite.visible = false;
			}
			this.activeBodySprite = this.bodySprites[index];
		}
		this.activeBodySprite.visible = true;
	}




}