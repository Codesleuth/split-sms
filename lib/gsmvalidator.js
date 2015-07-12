var GSM_charCodes = [
  10,12,13,32,33,34,35,36,
  37,38,39,40,41,42,43,44,
  45,46,47,48,49,50,51,52,
  53,54,55,56,57,58,59,60,
  61,62,63,64,65,66,67,68,
  69,70,71,72,73,74,75,76,
  77,78,79,80,81,82,83,84,
  85,86,87,88,89,90,91,92,
  93,94,95,97,98,99,100,101,
  102,103,104,105,106,107,108,
  109,110,111,112,113,114,115,
  116,117,118,119,120,121,122,
  123,124,125,126,161,163,164,
  165,167,191,196,197,198,199,
  201,209,214,216,220,223,224,
  228,229,230,232,233,236,241,
  242,246,248,249,252,915,916,
  920,923,926,928,931,934,936,
  937,8364
];

var GSMe_charCodes = [12,91,92,93,94,123,124,125,126,8364];

function validateCharacter(character) {
  return GSM_charCodes.indexOf(character.charCodeAt(0)) > -1;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message.charAt(i)))
      continue;
    return false;
  }
  return true;
}

function validateExtendedCharacter(character) {
  return GSMe_charCodes.indexOf(character.charCodeAt(0)) > -1;
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateMessage = validateMessage;
module.exports.validateExtendedCharacter = validateExtendedCharacter;