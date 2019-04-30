var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 5000);
console.log("Server running on port 5000");

//Serving HTML
app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected',connections.length);

	//disconnect
	socket.on('disconnect', function(data){
		// if(!socket.username)	return;
		users.splice(users.indexOf(socket.username) , 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket) , 1);
		console.log('Disconnected: %s sockets connected',connections.length);
	});

	//Send messages
	  socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	});

	// New User
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		console.log('--'+data);
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit('get users',users);
	}
});