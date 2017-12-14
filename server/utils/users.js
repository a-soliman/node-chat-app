class Users {
	constructor () {
		this.users = [];
	}

	addUser (id, name, room) {
		let user = {id, name, room};
		this.users.push(user);
		return;
	};

	removeUser (id) {
		let user = this.getUser(id);

		if(user) {
			this.users = this.users.filter((user) => user.id !== id);
		};

		return user;
	};

	getUser ( id ) {
		return this.users.filter(( user ) => user.id === id)[0];
	};

	getUsersList ( room ) {
		let users = this.users.filter(( user ) => user.room === room);
		let namesArray = users.map(( user ) => user.name);

		return namesArray;
	};

	isUniqueUser ( room, name ) {
		let roomUsersList = this.getUsersList(room);
		let dublicated = roomUsersList.filter((user) => user === name);

		return dublicated.length ? false : true;
	};

	getRoomsList () {
		return this.users.map((user) => user.room);
	}


}

module.exports = { Users };