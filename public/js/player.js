var Player = function(game, characterFolder) {
	this.game = game;
	this.characterFolder = characterFolder;
	this.place = "left";
};

Player.prototype = {

	setPlace: function (place) {
		if (place == "right") {
			this.place = "right";
		} else {
			this.place = "left";
		}
	},

	render: function() {
		
	}



}