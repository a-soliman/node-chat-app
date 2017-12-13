const expect 	=require('expect');

const { generateMessage, generateLocationMessage } = require('./messages')

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		let from = 'senderName';
		let text = 'some text body'
		let res = generateMessage(from, text);
		
		expect(res.from).toBe(from)
		expect(res.text).toBe(text)
		expect(typeof res.createdAt).toBe('number');
		
	})
});

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		let from = 'SomeName';
		let latitude = 2;
		let longitude = 1;
		let url = `https://www.google.com/maps?q=${latitude},${longitude}`;

		let res = generateLocationMessage(from, latitude, longitude);

		expect(res.from).toBe(from);
		expect(res.url).toBe(url);
		expect(res.createdAt).toBeTruthy();
	})
})