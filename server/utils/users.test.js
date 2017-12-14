const expect = require('expect');

const { Users } = require('./users');


describe('Users', () => {

	let users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node-course'
		},
		{
			id: '2',
			name: 'John',
			room: 'Node-course'
		},
		{
			id: '3',
			name: 'Phil',
			room: 'The Office Fans'
		}]
	});

	it('Should add new user', () => {
		let users = new Users();
		let newUser = { id: 'someId', name: 'UserName', room: 'some room' };
		users.addUser(newUser.id, newUser.name, newUser.room);
		let res = users.users;

		expect(res.length).toBe(1);
		expect(res[0].id).toBe(newUser.id);
		expect(res[0].name).toBe(newUser.name);
		expect(res[0].room).toBe(newUser.room);
	});

	it('sould return names for Node-course', () => {
		let res = users.getUsersList(users.users[0].room);
		expect(res.length).toBe(2);
		expect(res).toEqual(['Mike', 'John'])

	});

	it('Should retrurn an empty array if specified room does not exist', () => {
		let res = users.getUsersList('No Room');
		expect(res.length).toBe(0);
	})

	it('Should find User', () => {
		let id = users.users[0].id;
		let res = users.getUser(id);
		expect(res).toEqual(users.users[0])
	});

	it('Should Not find User', () => {
		let id = 'mmnnmm';
		let res = users.getUser(id);

		expect(res).toBe(undefined);
	});

	it('Should remove user', () => {
		let userToRemove = users.users[0];

		let res = users.removeUser(userToRemove.id);

		expect(res).toEqual(userToRemove);
		expect(users.users.length).toBe(2);

	});
})