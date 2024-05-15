//create web server
var express = require('express');
var app = express();

//create server
var http = require('http').Server(app);

//create socket
var io = require('socket.io')(http);

//create comments array
var comments = [];

//create connection
io.on('connection', function(socket){
  //console.log(socket);
  console.log('A user connected');
  socket.emit('load_comments', comments);

  //on disconnect
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  //on comment
  socket.on('comment', function(comment){
    console.log('Comment: ' + comment);
    comments.push(comment);
    io.emit('comment', comment);
  });
});

//create route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//listen to port
http.listen(3000, function(){
  console.log('listening on *:3000');
});
