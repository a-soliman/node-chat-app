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

	socket.on('sendMessage', ( message ) => {
		console.log('sendMessage', message);
	})

	socket.on('disconnect', () => {
		console.log('Disconnected!')
	});

	socket.emit('newMessage', {
		from: 'Darwish',
		text: 'bla bla bla'
	});
})


server.listen(port, () => {
	console.log(`Server is working on port ${port}`)
});




