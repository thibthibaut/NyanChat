var nodeRSA = require('node-rsa');
var nodeAES = require('crypto-js');

module.exports = {

  test: function(a){
    return a*a;
  },

  generateRSAKeyPair: function(size){
    var key = new nodeRSA();
    key.generateKeyPair(size, 65537);
    return key; //Rsa keyPair
                //Carreful, this return a full key, private and public, do not sent that key to others
  },

  generateRSAPublicKey: function(generatedKeyPair){
    var publicRSAKey = generatedKeyPair.exportKey('components-public');
    return publicRSAKey;
  },

  /**
   * generateAESKey - Should Generate a TRUE random AES key
   * 128/256 bits, it's up to you Chauca ;)
   *
   * @returns {undefined}
   */
  generateAESKey: function(){

    return; 
  },

  encryptAES: function(AESKey, RSAPubKey){
    var publicKey = new nodeRSA();
    publicKey.importKey(RSAPubKey);

    var encryptedAES = publicKey.encrypt(AESKey, 'base64');
    
    return encryptedAES;//Encrypted AES Key
  },


  decryptAES: function(AESCypher, RSAPrivKey){
    
    var plainAES = RSAPrivKey.decrypt(AESCypher, 'base64'); //I admit I'm not sure of the final format

    return plainAES;//Plain AES Key
  },

  encryptMessage: function(message, key){
    var encrypted = nodeAES.AES.encrypt(message, key).toString(); 
    return encrypted;
  }, 

  decryptMessage: function(message, key){

    var decrypted = nodeAES.AES.decrypt(message.toString(), key);
    decrypted = decrypted.toString(nodeAES.enc.Utf8);
    return decrypted;
  }
}

//console.log(module.exports.test(5));
console.log("le programme commence");

var AES = "secret key 123";
var texte = "ceci est mon message a chiffrer";
var test = module.exports.encryptMessage(texte, AES);
console.log(test);
console.log(module.exports.decryptMessage(test, AES));


var keyRSA = module.exports.generateRSAKeyPair(2048);
var publicKey = module.exports.generateRSAPublicKey(keyRSA);

var encryptedAES = module.exports.encryptAES(AES, publicKey);

console.log(encryptedAES);

var decryptedAES = module.exports.decryptAES(encryptedAES, keyRSA);

console.log(decryptedAES);

console.log(module.exports.decryptMessage(test, AES));

console.log('le programme est termine');









