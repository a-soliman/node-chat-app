const path		= require('path');
const http		= require('http');
const express	= require('express');
const socketIO	= require('socket.io');

const { generateMessage } = require('./utils/messages');


const publicPath 	= path.join(__dirname,'../public');
const port			= process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
let io = socketIO(server)
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected!');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'a new user Joined'))


	socket.on('createMessage', ( message, callback ) => {
		console.log('sendMessage', message);

		io.emit('newMessage', generateMessage( message.from, message.text ));
		callback('This is from the server')
	})

	socket.on('disconnect', () => {
		console.log('Disconnected!')
	});
})


server.listen(port, () => {
	console.log(`Server is working on port ${port}`)
});




