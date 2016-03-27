var io = require('socket.io')(1337);

io.sockets.on('connection', (socket) => {
 
  socket.on('send', function(data){
 
    io.sockets.emit('message', data);
 
  });
});
