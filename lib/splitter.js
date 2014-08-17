var extendedGsmCharacters = '|^€{}[~]\\';
function IsExtendedGsmChar(c) {
  return extendedGsmCharacters.indexOf(c) > -1;
}

module.exports.splitGsm = function (message) {
  var messages = [];
  var part = '';
  var length = 0;

  function bank() {
    var msg = { part: part, length: length };
    messages.push(msg);
    part = '';
    length = 0;
  }

  for (var i = 0, count = message.length; i < count; i++) {
    var c = message[i];

    if (IsExtendedGsmChar(c)) {
      if (part.length == 152) bank();
      part += '\x1B';
    }

    part += c;
    length++;

    if (part.length == 153) bank();
  }

  if (length > 0) bank();

  if (messages.length === 2) {
    var firstPart = messages[0];
    var secondPart = messages[1];

    if (firstPart.part.length + secondPart.part.length <= 160) {
      firstPart.part += secondPart.part;
      firstPart.length += secondPart.length;

      return [firstPart];
    }
  }
  return messages;
};

function isHighSurrogate(code) {
  return code >= 0xd800 && code <= 0xdfff;
}

module.exports.splitUnicode = function (message) {
  var messages = [];
  var part = '';
  var length = 0;
  var bytes = 0;
  var totalBytes = 0;

  function bank() {
    var msg = { part: part, length: length, bytes: bytes };
    messages.push(msg);
    totalBytes += bytes;

    part = '';
    length = 0;
    bytes = 0;
  }

  for (var i = 0, count = message.length; i < count; i++) {

    var code = message.charCodeAt(i);
    var highSurrogate = isHighSurrogate(code);

    if (highSurrogate) {
      if (bytes == 132) bank();

      part += message[i];
      bytes += 2;
      i++;
    }

    part += message[i];
    bytes += 2;

    length++;

    if (bytes == 134) bank();
  }

  if (length > 0) bank();

  if (messages.length > 1 && totalBytes <= 140) {
    var firstPart = messages[0];
    var secondPart = messages[1];
    firstPart.part += secondPart.part;
    firstPart.length += secondPart.length;
    firstPart.bytes += secondPart.bytes;

    return [firstPart];
  }
  return messages;
};