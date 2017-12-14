const expect = require('expect');

const { isRealString } = require('./validations');

describe('isRealString', () => {
	it('Should return true if valid string', () => {
		let string = 'some truthy string'
		let res = isRealString(string);
		expect(res).toBe(true);
	});

	it('Should return false if passed spaces', () => {
		let string = '  ';
		let res = isRealString(string);
		expect(res).toBe(false);
	});

	it('Should return false if passed numbers', () => {
		let number = 545;
		let res = isRealString(number);
		expect(res).toBe(false);
	});
})