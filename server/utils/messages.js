let generateMessage = ( from, text ) => {
	return {
		from, 
		text, 
		createdAt: new Date().getTime()
	}
};

let generateLocationMessage = ( from, latitude, longitude ) => {
	return {
		from,
		createdAt: new Date().getTime(),
		url: `https://www.google.com/maps?q=${latitude},${longitude}`
	}
}

module.exports = { generateMessage, generateLocationMessage };