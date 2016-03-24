var nodeAES = require('crypto-js');
var nodeRSA = require('node-rsa');
var machin = require('crypto');

var truc;

for(var i = 0; i < 15; i++){
truc = machin.randomBytes(256);
console.log(truc.toString('base64'));
console.log(' ');
}
