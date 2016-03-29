'use strict'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

  socket.on('join', (roomName) => {
    socket.join(roomName);
    console.log('user joined ' + roomName);
    socket.emit('serverInfo', 'You joined ' + roomName);
  });

   socket.on('leave', (roomName) => {
    socket.leave(roomName);
    console.log('user leaved ' + roomName);
    socket.emit('serverInfo', 'You leaved ' + roomName);
  });


  socket.on('talk', (data) => {

    let user = data.pseudo;
    let room = data.room;
    let message = data.message;
    socket.to(room).emit('message', {
      pseudo: user,
      message: message
    })

  });


});
