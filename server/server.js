const path		= require('path');
const http		= require('http');
const express	= require('express');
const socketIO	= require('socket.io');

const publicPath 	= path.join(__dirname,'../public');
const port			= process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
let io = socketIO(server)
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected!');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'welcome newUser'
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'newUser joined!'
	})


	socket.on('createMessage', ( message ) => {
		console.log('sendMessage', message);

		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})

	socket.on('disconnect', () => {
		console.log('Disconnected!')
	});
})


server.listen(port, () => {
	console.log(`Server is working on port ${port}`)
});




