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

	socket.on('createEmail', ( newEmail ) => {
		console.log('CreateEmail', newEmail);
	})
	
	socket.on('disconnect', () => {
		console.log('Disconnected!')
	});

	socket.emit('newEmail', {
		from: 'mike@example.com',
		subject: 'What up?',
		text: 'Hey dude, what is going on?'
	});


})


server.listen(port, () => {
	console.log(`Server is working on port ${port}`)
});




