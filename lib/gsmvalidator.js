var GSM = (function () {
  var GSM_chars = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f^{}\\[~]|€';
  var arr = new Array(GSM_chars.length)
  for (var i = 0; i < arr.length; i++) {
    arr[GSM_chars[i]] = true;
  }
  return arr;
})();

var GSMe = (function () {
  var GSMe_chars = '\f|^€{}[~]\\';
  var arr = new Array(GSMe_chars.length);
  for (var i = 0; i < arr.length; i++) {
    arr[GSMe_chars[i]] = true;
  }
  return arr;
})();

function validateCharacter(char) {
  return GSM[char] === true;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message[i]))
      continue;
    return false;
  }
  return true;
}

function validateExtendedCharacter(char) {
  return GSMe[char] === true;
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateMessage = validateMessage;
module.exports.validateExtendedCharacter = validateExtendedCharacter;