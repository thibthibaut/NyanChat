var nodeAES = require('crypto-js');
var nodeRSA = require('node-rsa');



var key = new nodeRSA();

key.generateKeyPair(1024, 65537);

var texte = "coucou, ceci est un message test";

/*var encrypted = key.encrypt(texte, 'base64');

console.log(encrypted);

var decrypted = key.decrypt(encrypted, 'utf8');

console.log(decrypted);*/

var publicComponents = key.exportKey('components-public');

console.log(publicComponents);

var importedKey = new nodeRSA();
importedKey.importKey(publicComponents);


console.log(importedKey);

var encrypted = importedKey.encrypt(texte, 'base64');

console.log(encrypted);

var decrypted = key.decrypt(encrypted, 'utf8');

console.log(decrypted);










