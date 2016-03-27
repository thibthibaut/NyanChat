var socketio = require('socket.io');

var io = socketio.listen(1337);

io.sockets.on('connection', (socket) => {
 
  socket.on('send', function(data){
 
    io.sockets.emit('message', data);
 
  });
});
