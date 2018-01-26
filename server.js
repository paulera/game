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
httpServer.listen(process.env.PORT, process.env.IP);
console.log ('Serving on https://' + process.env.C9_HOSTNAME + ':' + process.env.PORT)


/*********************************************************
 * ROUTES
 */
 
expressJsApp.get ('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
