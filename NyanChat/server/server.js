var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(1337, function(){
  console.log('listening');
});

var users = 0;

io.on('connection', function(socket){

  users += 1;

  socket.on('add user', function(data){
    socket.nickname = data.pseudo;
    ++users;
    socket.broadcast.emit('welcome', {
      message: data.msg + ", " + users + " users connected"
    });
  }); 

  socket.on('message', function(data){
    socket.broadcast.emit('message', {
      message: data.pseudo + " : " + data.message
    });
  });

  socket.on('disconnect', function(){
    --users;
    socket.broadcast.emit('left', {
      message: socket.nickname + " has left the chat"    
     });    
  });
});
