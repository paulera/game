var GameServer = function(){
	var socket;
};

GameServer.prototype = {

	connect: function() {
        this.socket = io.connect();
    },
    disconnect: function() {
        this.socket.disconnect();
    },
    selectCharacter: function(characterName) {
        this.socket.emit('select character', characterName);
    },
    waitingForGame: function(callback) {
        this.socket.emit('waiting for game');
        this.socket.on('play', function(data) {
            console.log('other player: '+ data);
            callback(data)
        });
    }
};