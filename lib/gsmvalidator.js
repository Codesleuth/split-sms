var GSM = (function () {
  var GSM_chars = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f^{}\\[~]|€';
  var arr = [];
  for (var i = 0; i < GSM_chars.length; i++) {
    arr[GSM_chars[i]] = true;
  }
  return arr;
})();

var GSMe = (function () {
  var GSMe_chars = '\f|^€{}[~]\\';
  var arr = [];
  for (var i = 0; i < GSMe_chars.length; i++) {
    arr[GSMe_chars[i]] = true;
  }
  return arr;
})();

function validateCharacter(i) {
  return GSM[i] === true;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message[i]))
      continue;
    return false;
  }
  return true;
}

function validateExtendedCharacter(i) {
  return GSMe[i] === true;
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateMessage = validateMessage;
module.exports.validateExtendedCharacter = validateExtendedCharacter;