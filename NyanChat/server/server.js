//'use strict'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(1337, function(){
  console.log('listening');
});

var users = 0;
var roomsAndUsers;
var parki = [];
var socketMap = {};

io.on('connection', function(socket){

  socketMap[socket.id] = socket;

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

 socket.on('aesForce', function(data){
    socket.broadcast.emit('aesForce', {
      aesForce: data
    });
  });

 socket.on('sendRSAPublic', function(data){
    socket.broadcast.emit('sendRSAPublic', {
      sendRSAPublic: data
    });
  });

  socket.on('disconnect', function(){
    --users;

    console.log("WOW SHIT !");
    socket.broadcast.emit('left', {
      message: socket.nickname + " has left the chat"    
     });    
  });

  socket.on('join', function(data){
    var roomName = data.roomName;
    var userName = data.userName;
    var publicKey = data.publicKey;
    var socketID = socket.id;
    var user = { name: userName, key: publicKey, socketID: socketID }

    //TODO: Check if pubKey is valid
    console.log('debug: ');
    console.log(user);

    socket.join(roomName);
    parki.push(user);
    
    console.log('user joined ' + roomName);
    socket.emit('serverInfo', 'You joined ' + roomName);
    
    //If user is the first in the room, he or she is OP
    if( parki.length == 1 ){
      console.log( userName + ' is OP');
      //Alert OP they are OP
      socket.emit('youAreTheOP');
    }
    else{ //User is not OP, he or she need the AES Key
      //Ask OP to encrypt AES and send it back

      var op_socket = socketMap[parki[0].socketID];

      op_socket.emit('plzEncryptAES', user);
    }
  
  });
  
  socket.on('hereIsEncryptedAES', function(message){
    
    guy_asking_for_aes_socket = socketMap[ message.user.socketID ];
    guy_asking_for_aes_socket.emit('encryptedAES', message);

  });
  
   socket.on('leave', function(roomName){
    socket.leave(roomName);
    console.log('user leaved ' + roomName);
    socket.emit('serverInfo', 'You leaved ' + roomName);
  });

   socket.on('test', function(data){
    var target = data.target;
    var message = data.data;
    var user = data.user;
    //socket.
     

});


  socket.on('talk', function(data){

    var user = data.pseudo;
    var room = data.room;
    var message = data.message;
    console.log('Message transiting');
    console.log(message);
    socket.to(room).emit('message', {
      pseudo: user,
      message: message
    })

  });


});
