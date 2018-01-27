// import libraries
const express = require('express');
const http = require('http');

// Socket listener
const socket = require('socket.io').listen(http);

// ExpressJS app listener
const app = express();
const server = http.createServer(app);

// Starts the server
if (process.env.C9_PROJECT) {
    server.listen(process.env.PORT, process.env.IP);
    console.log ('Serving on https://' + process.env.C9_HOSTNAME + ':' + process.env.PORT);
} else {
    server.listen(8080, '127.0.0.1');
    console.log ('Serving on https://localhost:8080');
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
