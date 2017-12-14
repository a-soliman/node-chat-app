$(document).ready(function() {

	$.get( "/rooms", function( data ) {

		data.forEach((room) => {
	  		let option = $('<option></option>');
	  		option.attr('value', room);
	  		option.text(room);
	  	
	  		$('#active-rooms').append(option);
	  	})
	});
})