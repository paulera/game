var Utils = function(){

};

Utils.prototype = {

	showBackground: function(that, image) {
	    var bgImage = that.add.image(0, 0, image);
    	var ratio = parseFloat(bgImage.height) / parseFloat(bgImage.width);

    	bgImage.width = that.game.width;
    	bgImage.height = that.game.width * ratio;
    	bgImage.y = that.game.height - bgImage.height;
    }
}