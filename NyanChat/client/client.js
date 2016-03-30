'use strict'
const readline = require('readline');
const io = require('socket.io-client');
const colors = require('colors');
const crypto = require('../crypto/crypto');


var nickName;
var currentRoom = null;
var privateKey = crypto.generateRSAKeyPair(512);
var publicKey = crypto.generateRSAPublicKey(privateKey);
var AESKey = crypto.generateAESKey();


var socket = io.connect('http://localhost:1337');

var rl = readline.createInterface(process.stdin, process.stdout); 
rl.setPrompt('😼  '); //So badass


function sendMessage(data){
  if(data[0] == '/') //If we have a slash its a command (e.g /join)
    return executeCommand(data.substring(1)); //Call execute command with the command (whithout the '/')
	
  data = crypto.encryptMessage(data, AESKey);
  socket.emit('talk', {pseudo: nickName, room: currentRoom ,message: data})
  rl.prompt();
}

function executeCommand(data){
  //Separate command from parameter (e.g join #paki)
  let command = data.split(' ')[0];
  let parameter = data.split(' ')[1];

  switch(command){
    case 'join':
      socket.emit('join', parameter);
      currentRoom = parameter;
      break;
    case 'leave':
      socket.emit('leave', currentRoom);
      currentRoom = null;
    case 'aesForce':
      socket.emit('aesForce', AESKey);
      break;
    case 'help':
      //TODO
      break;

  }

  rl.prompt();
}

function displayMessage(data){
  let pseudo = data.pseudo;
  let message = data.message;
  var color;

  //Compute a random hash for the pseudo
  let sum = 0;
  for(var i=0; i<pseudo.length; i++) sum+=pseudo.charCodeAt(i);

  switch(sum%6){
    case 0:
      color = 'red'
    break;
    case 1:
      color = 'green'
    break;
    case 2:
      color = 'blue'
      break;
    case 3:
      color = 'magenta'
    break;
    case 4:
      color = 'cyan'
      break;
    case 5:
      color = 'gray'
      break;
  }
  colors.setTheme({
    pseudoColor: color
  })
  
  console.log( colors.pseudoColor(pseudo) + ': ' + message);
}



//When the client is launched, we need to have a nick name then send it to the server
rl.question("Please, tell me your name, and don't forget to follow the white rabbit...", function(name) {
  //add easter eggs if the name is Neo :D
  nickName = name;
  var message = nickName + " has enter to NyanCat";
  socket.emit ('add user', {msg : message, pk: publicKey, pseudo: nickName});
  rl.prompt();

});

rl.on('line',  (data) => sendMessage(data) )


//display the message for all users 
socket.on('welcome', (data) => {
  console.log( colors.yellow(data.message) );
  rl.prompt();
});
socket.on('message', (data) => {
  data.message = crypto.decryptMessage(data.message, AESKey);
  displayMessage(data);
  rl.prompt();
});
//Message from the server and for you only <3
  socket.on('serverInfo', (message) => {
  console.log(colors.yellow(message) ) 
  rl.prompt();
});
//Force to get aes key from another client, function to test crypto
  socket.on('aesForce', (data) => {
  AESKey = data.aesForce;
  console.log('ca a marche');
  rl.prompt();
});
