
var socket = io();

socket.on('connect', function() {
	console.log('connected to server!');


});

socket.on('newMessage', function( message ) {
	let formatedTime = moment(message.createdAt).format('h:mm a');

	let template = $('#message-template').html();
	let html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formatedTime
	});

	$('#messages').append(html);
});

socket.on('newLocationMessage', ( message ) => {
	let formatedTime = moment(message.createdAt).format('h:mm a');

	let template = $('#location-message-template').html();
	let html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formatedTime
	});
	
	$('#messages').append(html);
})

socket.on('disconnect', function() {
	console.log('Disconnected!');
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
