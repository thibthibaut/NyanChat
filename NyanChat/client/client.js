var readline = require('readline');

var socketio = require('socket.io-client');

var util = require('util');

var nickName;

var publicKey = "chauca je te laisse implementer ce truc x)";

var socket = socketio.connect('localhost', {port: 1337});

var rl = readline.createInterface(process.stdin, process.stdout); 

rl.question("Please, tell me your name, and don't forget to follow the white rabbit..."), function(name) {
  
  //add easter eggs if the name is Neo :D
  nickName = name;

  var message = nickName + "has enter to NyanCat";

  socket.emit ('send', {msg : message, pk: publicKey, pseudo: nickName});

 rl.prompt(true); 
}
