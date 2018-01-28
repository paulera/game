var BeamDuel = function(game) {
	this.game = game;
	this.position = 50;
	this.minPosition = 0;
	this.maxPosition = 100;
	this.beanLeft = undefined;
	this.beanRight = undefined;
}

BeamDuel.prototype =  {

	load: function() {
		// var leftColor = Math.floor(Math.random() * 8);
		// var rightColor = Math.floor(Math.random() * 8);
		// while (leftColor == rightColor) {
		// 	rightColor = Math.floor(Math.random() * 8);
		// }

		var leftColor = this.game.player.getBeamColor();
		var rightColor = this.game.opponent.getBeamColor();
		this.beamLeft = this.createBeam(leftColor);
		this.beamLeft.x = 194;
		this.beamRight = this.createBeam(rightColor);
		this.beamRight.anchor.x = 1;
		this.beamRight.x = 1245;
		this.boom = this.createBoom();
	},

	createBoom: function() {
		var boom = this.game.add.sprite(300, 200, 'boom');
    	boom.animations.add('boomCrash');
    	boom.animations.play('boomCrash', 15, true);
    	boom.anchor.setTo(0.5,0.5);
    	boom.alignIn(this.game.world, Phaser.BOTTOM_CENTER);
    	boom.y -= 240;
    	return boom;
	},
	// color = 0 to 7
	createBeam: function(color) {
		var beam = this.game.add.tileSprite(0, 0, 100, 70, 'beam');
        beam.animations.add('waves0', [0, 1, 2, 3, 2, 1]);
        beam.animations.add('waves1', [4, 5, 6, 7, 6, 5]);
        beam.animations.add('waves2', [8, 9, 10, 11, 10, 9]);
        beam.animations.add('waves3', [12, 13, 14, 15, 14, 13]);
        beam.animations.add('waves4', [16, 17, 18, 19, 18, 17]);
        beam.animations.add('waves5', [20, 21, 22, 23, 22, 21]);
        beam.animations.add('waves6', [24, 25, 26, 27, 26, 25]);
        beam.animations.add('waves7', [28, 29, 30, 31, 30, 29]);
        beam.alignIn(this.game.world, Phaser.BOTTOM);
        beam.y += 676;

        // change to animation num
        beam.animations.play('waves' + color, 8, true);
        return beam;
	},

	setPosition: function(position) {
		this.setBoomPosition(710 + (position * 5.26));
		// var i = 526;
		this.setLeftBeamSize((position + 100) * 5.26);
		this.setRightBeamSize((-position + 100) * 5.26);
	},

	setBoomPosition: function (position) {
		this.boom.x = position;
	},

	setLeftBeamSize: function(size) {
		this.beamLeft.width = size;
	},

	setRightBeamSize: function(size) {
		this.beamRight.width = size;
	},

	

}