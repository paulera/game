// import libraries
const moduleExpressJS = require('express');
const moduleHttp = require('http');
const moduleSocketIo = require('socket.io');

// ExpressJS app listener
const expressJsApp = moduleExpressJS();
const httpServer = moduleHttp.createServer(expressJsApp);

// Socket.io listener - listen through 
const socketHandler = moduleSocketIo.listen(httpServer);

// Starts the server
if (process.env.C9_PROJECT) {
    httpServer.listen(process.env.PORT, process.env.IP);
    console.log ('Serving on https://' + process.env.C9_HOSTNAME + ':' + process.env.PORT);
} else {
    httpServer.listen(8080, '127.0.0.1');
    console.log ('Serving on https://localhost:8080');
}


/*********************************************************
 * ROUTES
 */
 
expressJsApp.get ('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
