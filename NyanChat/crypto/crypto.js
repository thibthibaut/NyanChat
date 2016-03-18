var RSA = require('node-rsa')
var AES = require("crypto-js/aes");

module.exports = {

  test: function(a){
    return a*a;
  },

  generateRSAKeyPair: function(size){

    return; //Rsa keyPair
  }



  /**
   * generateAESKey - Should Generate a TRUE random AES key
   * 128/256 bits, it's up to you Chauca ;)
   *
   * @returns {undefined}
   */
  generateAESKey: function(){

    return; 
  }

  encryptAES: function(AESKey, RSAPubKey){

    return;//Encrypted AES Key
  }


  decryptAES: function(AESCypher, RSAPrivKey){

    return;//Plain AES Key
  }

  encryptMessage: function(message, key){

    return;
  }  

  decryptMessage: function(message, key){

    return;
  }

}
