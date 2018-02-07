//

"use strict"

var server = require( "http" ).createServer()
server.listen( 3000 )
var io = require( "socket.io" )( server )
io.on( "connection", function ( socket ) {
	console.log( `client connected ${socket.request.connection.remoteAddress}` )
	// socket.handshake.address
	// socket.request.connection.remoteAddress
	socket.player = new Player( socket.id, socket.handshake.address )
	// addPlayer( socket.id, socket.handshake.address )
	socket.on( "event", function ( data ) {
		console.log( data )
	} )
	socket.on( "disconnect", function () {
		console.log( "disconnected" )
	} )
	// socket.on( "join", function ( data ) {
	// 	console.log( "join", data )
	// } )
	// socket.on( "action", function ( action, start ) {
	// 	socket.player.applyAction( action, start )
	// 	console.log( "action", action, start )
	// } )
} )

// setInterval( updateNetwork, 100 )
// function updateNetwork() {
// 	io.sockets.emit( "update", entities )
// }

// io.on('connection', function(socket){
// 	socket.emit('request', /* */); // emit an event to the socket
// 	io.emit('broadcast', /* */); // emit an event to all connected sockets
// 	socket.on('reply', function(){ /* */ }); // listen to the event
// });
