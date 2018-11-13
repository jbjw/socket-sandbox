const WebSocket = require( "ws" )

const clients = 1
const sockets = []

function choose( arr ) {
	return arr[Math.floor(Math.random()*arr.length)]
}

for ( let i = 0; i < clients; i++ ) {
	// ws://35.230.55.6/
	// ws://b3351865.ngrok.io/ws
	socket = new WebSocket( "ws://35.230.55.6/ws" )
	sockets.push( socket )
}

// 0-47

var gunString = `
0000000000000000000000000000000000000
0000000000000000000000000100000000000
0000000000000000000000010100000000000
0000000000000110000001100000000000011
0000000000001000100001100000000000011
0110000000010000010001100000000000000
0110000000010001011000010100000000000
0000000000010000010000000100000000000
0000000000001000100000000000000000000
0000000000000110000000000000000000000
0000000000000000000000000000000000000
`

function myTester( rowI, colI ) {
	return ( rowI < 5 && colI < 5 ) ? true : undefined
}

function checkerTester( rowI, colI ) {
	if ( rowI < 10 && colI < 10 ) {
		if ( ( rowI % 2 == 0 && colI % 2 == 0 ) || ( rowI % 2 == 1 && colI % 2 == 1 ) ) {
			return true
		}
	}
}

function gridFromTester( tester ) {

}



function Grid( input, dimensions ) {
	if ( typeof input === "string" ) {
		// split into rows and remove fluff rows
		const tmp = input.split( "\n" ).filter( row => row !== "" ).map( row => row.split( "" ) )
		this.grid = tmp.map( row => row.map( e => e === "1" ? true : false ) )
	} else if ( typeof input === "function" ) {
		this.grid = []
		rows = dimensions.y
		cols = dimensions.x
		for ( let rowI = 0; rowI < rows; rowI++ ) {
			this.grid.push( [] )
			for ( let colI = 0; colI < cols; colI++ ) {
				this.grid[ rowI ][ colI ] = tester( rowI, colI )
			}
		}
	}
}

function sendGrid( grid, valueOverwrite, offset ) {
	const changes = []
	const event = {}
	rows = grid.length
	cols = grid[ 0 ].length
	for ( let rowI = 0; rowI < rows; rowI++ ) {
		for ( let colI = 0; colI < cols; colI++ ) {
			var val = grid[ rowI ][ colI ]
			if ( val !== undefined ) {
				const change = {
					"Value": valueOverwrite,
					"Location": { "X": colI + offset.x, "Y": rowI + offset.y },
				}
				changes.push( change )
			}
		}
	}
	event[ "EventType" ] = "ChangeMany"
	event[ "Changes" ] = changes
	socket.send( JSON.stringify( event ) )
}

function printArray( arr ) {
	for ( let row of arr ) {
		console.log( row.map( e => {
			if ( e === undefined ) return "-"
			if ( e ) return "1"
			if ( !e ) return "0"

		} ).join( "" ) )
	}
}

for ( let socket of sockets ) {
	socket.on( "open", function open() {
		// printArray( gridFromFunction( clearTester ) )
		// writeFromGrid( gridFromFunction( checkerTester ) )
		// printArray( gridFromString( gunString ) )
		// sendGrid( gridFromString( gunString ) )
		sendGrid( gridFromTester( ( r, c ) => false ) )
		socket.addEventListener( "message", function ( event ) {
			console.log( "Message from server: ", event.data )
		} )
	} )
}
