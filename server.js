// import libraries
const express = require('express');
const http = require('http');

// ExpressJS app listener
const app = express();
const server = http.createServer(app);

// Socket listener
const socket = require('socket.io').listen(server);

// Starts the server
if (process.env.C9_PROJECT) {
    server.listen(process.env.PORT, process.env.IP);
    console.log ('Serving on https://' + process.env.C9_HOSTNAME + ':' + process.env.PORT);
} else {
    server.listen(8000, '127.0.0.1');
    console.log ('Serving on http://localhost:8000');
}


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

var connections = [];

// Listener for connection requests
socket.sockets.on('connection', function(socket) {
    console.log ('Client connected')
})