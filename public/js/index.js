
var socket = io();

socket.on('connect', function() {
	console.log('connected to server!');


});

socket.on('newMessage', function( message ) {
	console.log('new message', message);

	let list = $('#messages');
	let li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`)
	list.prepend(li)
});

socket.on('disconnect', function() {
	console.log('Disconnected!')
});

socket.emit('createMessage', {
	from: 'Frank',
	text: 'Hi!!'
}, ( data ) => {
	console.log(data)
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	})
})
