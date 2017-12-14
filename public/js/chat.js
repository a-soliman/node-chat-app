
var socket = io();

function scrollToButtom() {
	// Selectors
	let messages = $('#messages');
	let newMessage = messages.children('li:last-child');
	// Heights
	let clientHeight	= messages.prop('clientHeight');
	let scrollTop 		= messages.prop('scrollTop');
	let scrollHeight	= messages.prop('scrollHeight');

	let newMessageHeight	= newMessage.innerHeight();
	let lastMessageHeight	= newMessage.prev().innerHeight()

	if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ) {
		messages.scrollTop(scrollHeight);
	}
};

socket.on('connect', function() {
	console.log('connected to server!');
	let params = $.deparam(window.location.search);

	socket.emit('join', params, ( err ) => {
		if( err ) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error')
		}
	})


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
	scrollToButtom()
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
	scrollToButtom();
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
