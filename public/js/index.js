
var socket = io();

socket.on('connect', function() {
	console.log('connected to server!');


});

socket.on('newMessage', function( message ) {
	console.log('new message', message);

	let list = $('#messages');
	let li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`)
	list.append(li)
});

socket.on('newLocationMessage', ( message ) => {
	let list = $('#messages');
	let li = $('<li></li>');
	let ankor = $('<a target="_blank">My current location</a>');
	li.text(`${message.from}: `);
	ankor.attr('href', message.url);
	li.append(ankor);
	list.append(li);
})

socket.on('disconnect', function() {
	console.log('Disconnected!')
});



$('#message-form').on('submit', function(e) {
	e.preventDefault();

	let textInput = $('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: textInput.val()
	}, function() {
		clearInput(textInput);
	})

})

let locationBtn = $('#send-location');
locationBtn.on('click', () => {
	if ( !navigator.geolocation ) {
		return alert('Geolocation is not supported by your browser!')
	};

	locationBtn.attr('disabled', 'disabled').text('Sending Location...');

	navigator.geolocation.getCurrentPosition(( position ) => {
		locationBtn.removeAttr('disabled').text('Share Location');

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})

	}, () => {
		alert('Unable to fetch location.');
		locationBtn.removeAttr('disabled').text('Share Location');
	})
})

function clearInput( input ) {
	return input.val('');
}
