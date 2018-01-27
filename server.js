// import libraries
const express = require('express');
const app = express();
const http = require('http');

// ExpressJS app listener
const server = http.createServer(app);

const socket = require('socket.io').listen(http);

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
 
app.use(express.static('public'))
 
app.get ('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
