var readline = require('readline');

var io = require('socket.io-client');

var nickName;

var publicKey = "chauca je te laisse implementer ce truc x)";

var socket = io.connect('http://localhost', {port: 1337});

var rl = readline.createInterface(process.stdin, process.stdout); 


//When the client is launched, we need to have a nick name then send it to the server
rl.question("Please, tell me your name, and don't forget to follow the white rabbit..."), function(name) {
  
  //add easter eggs if the name is Neo :D
  nickName = name;

  var message = nickName + "has enter to NyanCat";

  socket.emit ('send', {msg : message, pk: publicKey, pseudo: nickName, type:'new member'});

 rl.prompt(true); 
}
