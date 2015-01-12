var GSM = (function () {
  var GSM_chars = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f^{}\\[~]|€';
  var arr = {};
  for (var i = 0; i < GSM_chars.length; i++) {
    arr[GSM_chars[i].charCodeAt(0)] = true;
  }
  return arr;
})();

var GSMe = (function () {
  var GSMe_chars = '\f|^€{}[~]\\';
  var arr = {};
  for (var i = 0; i < GSMe_chars.length; i++) {
    arr[GSMe_chars[i].charCodeAt(0)] = true;
  }
  return arr;
})();

function validateCharacter(character) {
  return GSM[character.charCodeAt(0)] === true;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message[i]))
      continue;
    return false;
  }
  return true;
}

function validateExtendedCharacter(character) {
  return GSMe[character.charCodeAt(0)] === true;
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateMessage = validateMessage;
module.exports.validateExtendedCharacter = validateExtendedCharacter;