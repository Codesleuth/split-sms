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

var HIGH_SURROGATE_START  = 0xF090;
var HIGH_SURROGATE_END    = 0xF09F;
var LOW_SURROGATE_START   = 0x8080;
var LOW_SURROGATE_END     = 0xA3BF;

function IsSurrogatePair(highSurrogate, lowSurrogate) {
  return ((highSurrogate >= HIGH_SURROGATE_START && highSurrogate <= HIGH_SURROGATE_END) &&
    (lowSurrogate >= LOW_SURROGATE_START && lowSurrogate <= LOW_SURROGATE_END));
}

module.exports.splitUnicode = function (message) {
  var messages = [];
  var part = '';
  var length = 0;
  var bytes = 0;
  var partBytes = 0;

  function bank() {
    console.log('banking part: ', new Buffer(part, 'utf-8'));

    var msg = { part: part, length: length };
    messages.push(msg);
    part = '';
    length = 0;
    bytes += partBytes;
    partBytes = 0;
  }

  var buff = new Buffer(message, 'utf-8');
  console.log('buff: ', buff);

  for (var i = 0, count = buff.length; i < count; i += 2) {

    var c = buff.slice(i, i + 4);
    var highSurrogate = c[0] << 8 | c[1];

    if (i < buff.length - 2) {
      var lowSurrogate = c[2] << 8 | c[3];

      if (IsSurrogatePair(highSurrogate, lowSurrogate)) {

        if (partBytes == 132) bank();

        i += 2;
        part += c.slice(0, 4).toString('utf-8');
        partBytes += 4;
      } else {
        part += c.slice(0, 2).toString('utf-8');
        partBytes += 2;
      }
    } else {
      part += c.slice(0, 2).toString('utf-8');
      partBytes += 2;
    }

    length++;

    if (partBytes == 134) bank();
  }

  if (length > 0) bank();

  if (messages.length > 1 && bytes <= 140) {
    var firstPart = messages[0];
    var secondPart = messages[1];
    firstPart.part += secondPart.part;
    firstPart.length += secondPart.length;

    return [firstPart];
  }
  return messages;
};