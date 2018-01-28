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

        this.player = new Player(this, _game.selectedCharacter, 'left');
        this.player.standStill();
        this.game.player = this.player;
        this.opponent = new Player(this, _game.otherCharacter, 'right');
        this.opponent.standStill();
        this.game.opponent = this.opponent;

        var color = "#dd0044";

        var style = { font: "1900px Bangers, Arial", fill: color, align: "center" };
        this.text3 = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 170, " 3 ", style);
        this.text3.anchor.setTo(0.5, 0.5);
        this.text3.visible = false;

        this.text2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 170, " 2 ", style);
        this.text2.anchor.setTo(0.5, 0.5);
        this.text2.visible = false;

        this.text1 = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 170, " 1 ", style);
        this.text1.anchor.setTo(0.5, 0.5);
        this.text1.visible = false;

        var style = { font: "400px Bangers, Arial", fill: color, align: "center" };
        this.textFight = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 170, " Fight! ", style);
        this.textFight.anchor.setTo(0.5, 0.5);
        this.textFight.scale.setTo(0.1);
        this.textFight.alpha = 1;
        this.textFight.visible = false;

        this.animateCountDown();
        this.animateStartFight();

        this.beamDuel = new BeamDuel(this);
        this.beamDuel.load();
        this.beamDuel.setPosition(0);

        gameServer.waitForgameUpdates(function(data){
            console.log('game change:'+data);
            _game.beamDuel.setPosition(data);
        });

        gameServer.gameWin(function(){
            console.log('game wine:');
            _game.state.start("GameWin");
        });

        gameServer.gameLose(function(){
            console.log('game lose:');
            _game.state.start("GameLose");
        });

        this.game.beamDuel = this.beamDuel;

    },

    animateStartFight: function() {
        var that = this;
        setTimeout(function() {
            that.player.animateToAttackPosition();
            that.opponent.animateToAttackPosition();    
        }, 4200);

    },

    animateCountDown: function () {

        var that = this;
    
        var countdownInterval = 1000;

        this.text3.visible = false;
        this.text2.visible = false;
        this.text1.visible = false;
        this.textFight.visible = false;
        
        setTimeout(function () {
            that.text3.visible = true;
            that.game.add.tween(that.text3).to( { alpha: 0 }, countdownInterval, Phaser.Easing.Circular.None, true);
            that.game.add.tween(that.text3.scale).to( { x: 0.05, y: 0.05 }, countdownInterval, Phaser.Easing.Cubic.Out, true);
        }, countdownInterval);

        setTimeout(function () {
            that.text2.visible = true;
            that.game.add.tween(that.text2).to( { alpha: 0 }, countdownInterval, Phaser.Easing.Circular.None, true);
            that.game.add.tween(that.text2.scale).to( { x: 0, y: 0 }, countdownInterval, Phaser.Easing.Cubic.Out, true);
        }, countdownInterval * 2);

        setTimeout(function () {
            that.text1.visible = true;
            that.game.add.tween(that.text1).to( { alpha: 0 }, countdownInterval, Phaser.Easing.Circular.None, true);
            that.game.add.tween(that.text1.scale).to( { x: 0.05, y: 0.05 }, countdownInterval, Phaser.Easing.Cubic.Out, true);
        }, countdownInterval * 3);

        setTimeout(function () {
            that.textFight.visible = true;
            //that.game.add.tween(that.textFight).to( { alpha: 1 }, countdownInterval / 3, Phaser.Easing.Circular.None, true);
            that.game.add.tween(that.textFight.scale).to( { x: 1, y: 1 }, countdownInterval / 3, Phaser.Easing.Elastic.Out, true);
            setTimeout(function () {
                that.game.add.tween(that.textFight.scale).to( { x: 0, y: 0 }, countdownInterval / 3, Phaser.Easing.Elastic.In, true);
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

        that.spaceKey = that.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        that.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        that.spaceKey.onDown.add(that.onTap, this);

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


    /***************************************
     * HIGH LEVEL EVENT LISTENERS
     */

    onTap: function() {
        console.log("tap");
        gameServer.attack();
    },

    onSwipe: function (direction) {
        console.log("swipe: " + direction);
    }

};