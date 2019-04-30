var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 5000);
console.log("Server running on port 5000");

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});