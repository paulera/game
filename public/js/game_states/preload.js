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


        this.load.image('pic', 'assets/pics/bg2.png');
        this.load.image('player1', 'assets/sprites/block.png');
        this.load.image('player2', 'assets/sprites/block.png');
        this.load.image('beam', 'assets/sprites/block.png');


        // game.canvas.addEventListener('mousedown', onMouseDown, true);
        // game.canvas.addEventListener('mouseup', onMouseUp, true);
        // game.canvas.addEventListener('touchstart', onTouchStart, true);
        // game.canvas.addEventListener('touchend', onTouchEnd, true);
        // game.canvas.addEventListener('touchmove', onTouchMove, true);

        /***************************************
	     * LOW LEVEL EVENT LISTENERS
	     */

	    var tapThreshold = 10;
	    var swipeThreshold = 30;
	    var swipeLimit = 30;

	    var lastDown;
	    var lastUp;
	    var position;

	    function getPositionFromEvent(event) {
	        var x, y, timestamp;
	        if (event instanceof TouchEvent) {
	            // touch
	            x = event.touches[0].pageX;
	            y = event.touches[0].pageY;
	        } else {
	            // mouse
	            x = event.x;
	            y = event.y;
	        }
	        timestamp = event.timestamp;
	        return {
	            x: x,
	            y: y,
	            timestamp: timestamp
	        }
	    }

	    function onMouseDown(event) {
	        position = getPositionFromEvent(event);
	        lastDown = position;
	    }

	    function onMouseUp(event) {
	        position = getPositionFromEvent(event);
	        parseAction(position);
	        lastUp = position;
	    }

	    function onTouchStart(event) {
	        position = getPositionFromEvent(event);
	        lastDown = position;
	    }

	    function onTouchMove(event) {
	        position = getPositionFromEvent(event);
	    }

	    function onTouchEnd(event) {
	        // position is not available on touchend so we have to capture in touch move
	        parseAction(position);
	        lastUp = position;
	    }

	    function parseAction(position) {
	        if (Math.abs(position.x - lastDown.x) < tapThreshold && Math.abs(position.y - lastDown.y) < 10) {
	            // the variation on coordinates is too short. that's a tap
	            tap();
	        } else {
	            // the variation on coordinates is long. it is a swipe.
	            parseSwipe(position);
	        }
	    }

	    function parseSwipe(position) {
	        var deltaX = position.x - lastDown.x;
	        var deltaY = position.y - lastDown.y;
	        var deltaXabs = Math.abs(deltaX);
	        var deltaYabs = Math.abs(deltaY);

	        if (deltaXabs > deltaYabs) {
	            // horizontal
	            if (deltaX > swipeThreshold) {
	                console.log("right");
	            } else if (-deltaX > swipeThreshold) {
	                console.log("left");
	            }
	        } else {
	            if (deltaY > swipeThreshold) {
	                console.log("down");
	            } else if (-deltaY > swipeThreshold) {
	                console.log("up");
	            }
	        }
	        

	    }


	    /***************************************8
	     * HIGH LEVEL EVENT LISTENERS
	     */

	    function tap() {
	        console.log("tap");
	    }

	    function swipe() {
	        console.log("swipe");
	    }
    },

    create: function(){
        this.game.state.start("GameTitle");
    }
}