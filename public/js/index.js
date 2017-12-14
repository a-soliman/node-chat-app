$(document).ready(function() {

	$.get( "/rooms", function( data ) {
		console.log(data)
		data.forEach((room) => {
	  		let option = $('<option></option>');
	  		option.attr('value', room.room);
	  		let users = room.users == 1? 'user.' : 'users.'
	  		option.text(room.room + ' : ' + room.users +  ' ' + users );
	  	
	  		$('#active-rooms').append(option);
	  	})
	});
})