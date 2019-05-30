// '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f^{}\\[~]|€'
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

// '\f|^€{}[~]\\'
var GSMe_charCodes = [12,91,92,93,94,123,124,125,126,8364];

// '@£$¥€éùıòÇ\nĞğ\rÅåΔ_ΦΓΛΩΠΨΣΘΞŞşßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?İABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§çabcdefghijklmnopqrstuvwxyzäöñüà\f^{}\[~]|'
var GSM_TR_charCodes = [
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
    123,124,125,126,163,164,165,
    167,196,197,199,201,209,214,
    220,223,224,228,229,231,233,
    241,242,246,249,252,286,287,
    304,305,350,351,915,916,920,
    923,926,928,931,934,936,937,
    8364
];

// '\f^{}\[~]|'
var GSMe_TR_charCodes = [12,91,92,93,94,123,124,125,126,286,287,304,305,350,351,8364];

// '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüàç\f^{}\\[~]|ÁÍÓÚá€íóú'
var GSM_ES_charCodes = [
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
    165,167,191,193,196,197,198,
    199,201,205,209,211,214,216,
    218,220,223,224,225,228,229,
    230,231,232,233,236,237,241,
    242,243,246,248,249,250,252,
    915,916,920,923,926,928,931,
    934,936,937,8364
];

// 'ç\f^{}\\[~]|ÁÍÓÚá€íóú'
var GSMe_ES_charCodes = [12,91,92,93,94,123,124,125,126,193,205,211,218,225,231,237,243,250,8364];

// '@£$¥êéúíóç\nÔô\rÁáΔ_ªÇÀ∞^\\€Ó|ÂâÊÉ\x20!"#º%&\'()*+,-./0123456789:;<=>?ÍABCDEFGHIJKLMNOPQRSTUVWXYZÃÕÚÜ§~abcdefghijklmnopqrstuvwxyzãõ`üà\fΦΓ^ΩΠΨΣΘ{}\\[~]|'
var GSM_PT_charCodes = [
    10,12,13,32,33,34,35,36,
    37,38,39,40,41,42,43,44,
    45,46,47,48,49,50,51,52,
    53,54,55,56,57,58,59,60,
    61,62,63,64,65,66,67,68,
    69,70,71,72,73,74,75,76,
    77,78,79,80,81,82,83,84,
    85,86,87,88,89,90,91,92,
    93,94,95,96,97,98,99,100,
    101,102,103,104,105,106,107,108,
    109,110,111,112,113,114,115,116,
    117,118,119,120,121,122,123,124,
    125,126,163,165,167,170,186,192,
    193,194,195,199,201,202,205,211,
    212,213,218,220,224,225,226,227,
    231,233,234,237,242,243,244,245,
    250,252,915,916,920,928,931,934,
    936,937,8364,8734
];

// '\fΦΓ^ΩΠΨΣΘ{}\\[~]|'
var GSMe_PT_charCodes = [
    12,91,92,93,94,123,124,125,
    126,193,194,195,202,205,211,212,
    213,218,225,226,227,231,234,237,
    242,243,245,250,915,920,928,931,
    934,936,937,8364
];

function existsInArray(code, array) {
  var len = array.length;
  var i = 0;
  while (i < len) {
    var e = array[i];
    if (code === e) return true;
    i++;
  }
  return false;
}

function validateCharacter(character) {
    return existsInArray(character.charCodeAt(0), GSM_charCodes);
}
function validateCharacterWithShiftTable(character) {
  var charCodes = GSM_charCodes.concat(GSM_TR_charCodes, GSM_ES_charCodes, GSM_PT_charCodes);
  return existsInArray(character.charCodeAt(0), charCodes);
}

function validateMessageInCharCodesList(message, charCodes) {
  for (var i = 0; i < message.length; i++) {
    if (!existsInArray(message.charCodeAt(i), charCodes))
      return false;
  }

  return true;
}
function validateMessage(message) {
  return validateMessageInCharCodesList(message, GSM_charCodes);
}
function validateMessageWithShiftTable(message) {
  var charCodes = [GSM_charCodes, GSM_TR_charCodes, GSM_ES_charCodes, GSM_PT_charCodes];
  for (var i = 0; i < charCodes.length; i++) {
    if (validateMessageInCharCodesList(message, charCodes[i]))
      return true;
  }

  return false;
}

function validateExtendedCharacter(character) {
  return existsInArray(character.charCodeAt(0), GSMe_charCodes);
}
function validateExtendedCharacterWithShiftTable(character) {
    var charCodes = GSMe_charCodes.concat(GSMe_TR_charCodes, GSMe_ES_charCodes, GSMe_PT_charCodes);
    return existsInArray(character.charCodeAt(0), charCodes);
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateCharacterWithShiftTable = validateCharacterWithShiftTable;
module.exports.validateMessage = validateMessage;
module.exports.validateMessageWithShiftTable = validateMessageWithShiftTable;
module.exports.validateExtendedCharacter = validateExtendedCharacter;
module.exports.validateExtendedCharacterWithShiftTable = validateExtendedCharacterWithShiftTable;
