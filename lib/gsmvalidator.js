var GSM = (function () {
  var GSM_chars = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f^{}\\[~]|€';
  var arr = {};
  for (var i = 0; i < GSM_chars.length; i++) {
    var code = GSM_chars.substr(i, 1).charCodeAt(0);
    arr[code] = true;
  }
  return arr;
})();

var GSMe = (function () {
  var GSMe_chars = '\f|^€{}[~]\\';
  var arr = {};
  for (var i = 0; i < GSMe_chars.length; i++) {
    var code = GSMe_chars.substr(i, 1).charCodeAt(0);
    arr[code] = true;
  }
  return arr;
})();

function validateCharacter(character) {
  return GSM[character.charCodeAt(0)] === true;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message.substr(i, 1)))
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