var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(1337, function(){
  console.log('listening');
});

io.on('connection', function(socket){

  console.log('hello world');
 
  socket.on('connect', function(v){

    console.log('coucou');
    console.log(v);

  }); 

});
