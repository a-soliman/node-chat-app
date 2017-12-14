const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
	it('Should add new user', () => {
		let users = new Users();
		let newUser = { id: 'someId', name: 'UserName', room: 'some room' };
		users.addUser(newUser.id, newUser.name, newUser.room);
		let res = users.users;

		expect(res.length).toBe(1);
		expect(res[0].id).toBe(newUser.id);
		expect(res[0].name).toBe(newUser.name);
		expect(res[0].room).toBe(newUser.room);
	})
})