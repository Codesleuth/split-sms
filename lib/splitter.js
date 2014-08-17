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

module.exports.splitUnicode = function (message) {
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

    part += c;
    length++;

    if (part.length == 67) bank();
  }

  if (length > 0) bank();

  if (messages.length === 2) {
    var firstPart = messages[0];
    var secondPart = messages[1];

    if (firstPart.part.length + secondPart.part.length <= 70) {
      firstPart.part += secondPart.part;
      firstPart.length += secondPart.length;

      return [firstPart];
    }
  }
  return messages;
};