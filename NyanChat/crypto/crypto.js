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

  generateRSAPublicKey: function(){


    return;
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
    
    return;//Encrypted AES Key
  },


  decryptAES: function(AESCypher, RSAPrivKey){
    
    //var decryptedAES = RSAPrivKey.decrypt(AESCypher, 'utf8');

    return;//Plain AES Key
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
var test = module.exports.encryptMessage("ceci est mon message a chiffrer", "secret key 123");
console.log(test);
console.log(module.exports.decryptMessage(test, "secret key 123"));
console.log("le programme est termine");

var keyRSA = module.exports.generateRSAKeyPair(512);
//console.log(keyRSA);












