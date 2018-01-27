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
    	console.log("Function: main.create");
    	this.bindPointerEvents(this);
    	this.createGameBaseEnvironment();

        var player = new Player(this, 'trump');
        player.render();
        
    },

    // update the screen based on the current game status
    update: function() {
		//console.log("Function: main.update");
    },

    gameOver: function(){
    	console.log("Function: main.gameOver");
        this.game.state.start('GameOver');
    },

    createGameBaseEnvironment: function() {
    	imgBackground = utils.showBackground(this, 'bg_blue');

        var cloudBack = this.add.sprite(0, 0, 'cloud_back');
        cloudBack.alignIn(imgBackground, Phaser.BOTTOM_CENTER);
        cloudBack.y += 60;
    	
        var spotLeft = this.add.sprite(0, 0, 'spot');
    	spotLeft.alignIn(imgBackground, Phaser.BOTTOM_LEFT);

    	var spotRight = this.add.sprite(0, 0, 'spot');
    	spotRight.alignIn(imgBackground, Phaser.BOTTOM_RIGHT);
    	spotRight.anchor.setTo(1,0);
    	spotRight.scale.x *= -1;

        var cloudFront = this.add.sprite(0, 0, 'cloud_front');
        cloudFront.alignIn(imgBackground, Phaser.BOTTOM_CENTER);
        cloudFront.y += 60;

    },

    bindPointerEvents: function(that) {

    	that.input.mouse.mouseDownCallback = onMouseDown;
        that.input.mouse.mouseUpCallback = onMouseUp;
        that.input.touch.touchStartCallback = onTouchStart;
        that.input.touch.touchEndCallback = onTouchEnd;
        that.input.touch.touchMoveCallback = onTouchMove;

        /***************************************
         * LOW LEVEL EVENT LISTENERS
         */

        var tapThreshold = 10;
        var swipeThreshold = 30;

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
            timestamp = Date.now();
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
                that.onTap();
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
                    that.onSwipe("right");
                } else if (-deltaX > swipeThreshold) {
                    that.onSwipe("left");
                }
            } else {
                if (deltaY > swipeThreshold) {
                    that.onSwipe("down");
                } else if (-deltaY > swipeThreshold) {
                    that.onSwipe("up");
                }
            }

        }

    },


    /***************************************8
     * HIGH LEVEL EVENT LISTENERS
     */

    onTap: function() {
        console.log("tap");
    },

    onSwipe: function (direction) {
        console.log("swipe: " + direction);
    }

};