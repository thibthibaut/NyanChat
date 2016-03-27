var socketio = require('socket.io');

var io = socketio.listen(1337);

  io.on('connection', function(socket){

  console.log('hello world');
 
  socket.on('connect', function(v){

    console.log('coucou');
    console.log(v);

  }); 
});
