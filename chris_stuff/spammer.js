const WebSocket = require( "ws" )

const clients = 100
const sockets = []

function choose( arr ) {
	return arr[Math.floor(Math.random()*arr.length)]
}


for ( let i = 0; i < clients; i++ ) {
	socket = new WebSocket( "ws://b3351865.ngrok.io/ws" )
	sockets.push( socket )
}



var emojis = `🍇
🍈
🍉
🍊
🍋
🍌
🍍
🍎
🍏
🍐
🍑
🍒
🍓
🥝`.split( "" )

for ( let socket of sockets ) {
	socket.on( "open", function open() {
		socket.send( choose( emojis ) )
		// setInterval( function () {
		// 	socket.send( "a".repeat( 500 ) )
		// }, 1 )
	} )
}
