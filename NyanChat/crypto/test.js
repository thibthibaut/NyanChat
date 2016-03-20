var nodeAES = require('crypto-js');
var nodeRSA = require('node-rsa');






var key = new nodeRSA()
var texte = "euh, j'sais pas, genre fais comme si y'avait des trucs ecrits ici ok?";
key.generateKeyPair(512, 65537);


var encrypted = key.encrypt(texte, 'base64');
var encryptedAES = nodeAES.AES.encrypt(texte, 'secret key 123');

console.log('chiffre RSA: ' + encrypted);
console.log('chiffre AES: ' + encryptedAES);

var decrypted = key.decrypt(encrypted, 'utf8');
var decryptedAES = nodeAES.AES.decrypt(encryptedAES.toString(), 'secret key 123');
decryptedAES = decryptedAES.toString(nodeAES.enc.Utf8);

console.log('dechiffre RSA: ' + decrypted);
console.log('dechiffre AES: ' + decryptedAES);
//Here you can test your functions
//console.log(crypto.test(5));

//console.log(process.argv[2]);


