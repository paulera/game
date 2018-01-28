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

        this.player = new Player(this, 'trump', 'right');
        this.player.standStill();
        this.opponent = new Player(this, 'trump', 'left');
        this.opponent.standStill();

        this.startFight();
    },

    startFight: function () {

        var that = this;
        var text3, text2, text1, textFight;
        var style = { font: "2000px Arial", fill: "#ff0044", align: "center" };
        var countdownInterval = 1000;

        var text3 = that.game.add.text(that.game.world.centerX, that.game.world.centerY, "3", style);
        text3.anchor.setTo(0.5, 0.5);
        text3.visible = false;

        var text2 = that.game.add.text(that.game.world.centerX, that.game.world.centerY, "2", style);
        text2.anchor.setTo(0.5, 0.5);
        text2.visible = false;

        var text1 = that.game.add.text(that.game.world.centerX, that.game.world.centerY, "1", style);
        text1.anchor.setTo(0.5, 0.5);
        text1.visible = false;

        var style = { font: "400px Arial", fill: "#ff0044", align: "center" };
        var textFight = that.game.add.text(that.game.world.centerX, that.game.world.centerY, "Fight!", style);
        textFight.anchor.setTo(0.5, 0.5);
        textFight.scale.setTo(0.1);
        textFight.alpha = 1;
        textFight.visible = false;
        
        setTimeout(function () {
            text3.visible = true;
            that.game.add.tween(text3).to( { alpha: 0 }, countdownInterval, Phaser.Easing.Circular.None, true);
            that.game.add.tween(text3.scale).to( { x: 0.1, y: 0.1 }, countdownInterval, Phaser.Easing.Exponential.None, true);
        }, countdownInterval);

        setTimeout(function () {
            text2.visible = true;
            that.game.add.tween(text2).to( { alpha: 0 }, countdownInterval, Phaser.Easing.Circular.None, true);
            that.game.add.tween(text2.scale).to( { x: 0.1, y: 0.1 }, countdownInterval, Phaser.Easing.Exponential.None, true);
        }, countdownInterval * 2);

        setTimeout(function () {
            text1.visible = true;
            that.game.add.tween(text1).to( { alpha: 0 }, countdownInterval, Phaser.Easing.Circular.None, true);
            that.game.add.tween(text1.scale).to( { x: 0.1, y: 0.1 }, countdownInterval, Phaser.Easing.Exponential.None, true);
        }, countdownInterval * 3);

        setTimeout(function () {
            textFight.visible = true;
            //that.game.add.tween(textFight).to( { alpha: 1 }, countdownInterval / 3, Phaser.Easing.Circular.None, true);
            that.game.add.tween(textFight.scale).to( { x: 1, y: 1 }, countdownInterval / 3, Phaser.Easing.Elastic.Out, true);
            setTimeout(function () {
                that.game.add.tween(textFight.scale).to( { x: 0, y: 0 }, countdownInterval / 3, Phaser.Easing.Elastic.In, true);
            }, countdownInterval / 2);
        }, countdownInterval * 4);
    
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