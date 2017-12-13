
var socket = io();

socket.on('connect', function() {
	console.log('connected to server!');

	socket.emit('createEmail', {to: 'jen@example.com'})
});

socket.on('disconnect', function() {
	console.log('Disconnected!')
});

socket.on('newEmail', function( email ) {
	console.log('new email...', email)
});
