const expect 	=require('expect');

const { generateMessage } = require('./messages')

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