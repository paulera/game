// import libraries
const express = require('express');
const http = require('http');
const socket = require('socket.io');


// ExpressJS app listener
const app = express();
const server = http.createServer(app);

// Starts the server
if (process.env.C9_PROJECT) {
    server.listen(process.env.PORT, process.env.IP);
    console.log ('Serving on https://' + process.env.C9_HOSTNAME + ':' + process.env.PORT);
} else {
    server.listen(8000, '127.0.0.1');
    console.log ('Serving on http://localhost:8000');
}

// Socket.io listener - listen through
const socketHandler = socket.listen(server);

/*********************************************************
 * ROUTES
 */

// serve static files from public folder - make it root
app.use(express.static('public'))

// serve the index.html file
app.get ('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

/*********************************************************
 * SOCKET LISTENERS
 */
var players = [];
var connections = [];

// Listener for connection requests on socket.io
socketHandler.sockets.on('connection', function(socket) {


    // --------------------------------------
    // SOCKET CONNECTION

    // Register the socket in the sockets array
    connections.push(socket);
    console.log('Connected: %s connections connected', connections.length);
    console.log(socket.id);

    if (players.indexOf(socket) > -1){
        players.splice(players.indexOf(socket), 1)
    }

    // --------------------------------------
    // SOCKET EVENT LISTENERS

    // Disconnect
    socket.on('disconnect', function (data) {
        // Notify all sockets a user is gone
        socketHandler.sockets.emit('player gone', socket.username);

        // remove the socket object from the connections array
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s connections connected', connections.length);

        if (players.indexOf(socket) > -1){
            players.splice(players.indexOf(socket), 1)
        }
    });

    socket.on('select character', function(data) {
        socket.character = data;
        console.log("Receiving message on server: " + data);
    });

    socket.on('waiting for game', function() {
        socket.waitingForGame = 1;
        console.log("Receiving message on server: waiting for game ");
        //players.splice(players.indexOf(socket), 1);
        if (players.indexOf(socket) > -1){
            players.splice(players.indexOf(socket), 1)
        }
        players.push(socket);

        console.log("players: "+players.length);
        if (players.length === 2){
            console.log("play!!!! ");
            socketHandler.sockets.connected[players[0].id].emit('play', players[1].character);
            socketHandler.sockets.connected[players[1].id].emit('play', players[0].character);
        }else if(players.length > 2){
            console.log("More then 2 players connected to play");
            players = [];
        }else{
            console.log("waiting for more players");
        }
    });

});