
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



$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	})
})

let locationBtn = $('#send-location');
locationBtn.on('click', () => {
	if ( !navigator.geolocation ) {
		return alert('Geolocation is not supported by your browser!')
	}

	navigator.geolocation.getCurrentPosition(( position ) => {
		console.log(position)
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})

	}, () => {
		alert('Unable to fetch location.')
	})
})
