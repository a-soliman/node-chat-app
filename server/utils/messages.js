const moment	= require('moment');

let generateMessage = ( from, text ) => {
	return {
		from, 
		text, 
		createdAt: moment().valueOf()
	}
};

let generateLocationMessage = ( from, latitude, longitude ) => {
	return {
		from,
		createdAt: moment().valueOf(),
		url: `https://www.google.com/maps?q=${latitude},${longitude}`
	}
}

module.exports = { generateMessage, generateLocationMessage };