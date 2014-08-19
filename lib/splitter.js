var extendedGsmCharacters = '\f|^€{}[~]\\';
function IsExtendedGsmChar(c) {
  return extendedGsmCharacters.indexOf(c) > -1;
}

module.exports.splitGsm = function (message) {
  var messages = [];
  var length = 0;
  var bytes = 0;
  var totalBytes = 0;
  var totalLength = 0;

  function bank() {
    var msg = { 
      part: message.substr(totalLength, length), 
      length: length, 
      bytes: bytes 
    };
    messages.push(msg);

    totalLength += length;
    length = 0;
    totalBytes += bytes;
    bytes = 0;
  }

  for (var i = 0, count = message.length; i < count; i++) {
    var c = message[i];

    if (IsExtendedGsmChar(c)) {
      if (bytes === 152) bank();
      bytes++;
    }

    bytes++;
    length++;

    if (bytes === 153) bank();
  }

  if (bytes > 0) bank();

  if (messages[1] && totalBytes <= 160) {
    return [{
      part: message,
      length: totalLength,
      bytes: totalBytes
    }];
  }
  return messages;
};

function isHighSurrogate(code) {
  return code >= 0xd800 && code <= 0xdfff;
}

module.exports.splitUnicode = function (message) {
  var messages = [];
  var length = 0;
  var bytes = 0;
  var totalBytes = 0;
  var totalLength = 0;
  var partStart = 0;

  function bank(partEnd) {
    var msg = { 
      part: partEnd ? message.substring(partStart, partEnd + 1) : message.substring(partStart), 
      length: length, 
      bytes: bytes
    };
    messages.push(msg);

    partStart = partEnd + 1;

    totalLength += length;
    length = 0;
    totalBytes += bytes;
    bytes = 0;
  }

  for (var i = 0, count = message.length; i < count; i++) {

    var code = message.charCodeAt(i);
    var highSurrogate = isHighSurrogate(code);

    if (highSurrogate) {
      if (bytes === 132) bank(i - 1);
      bytes += 2;
      i++;
    }

    bytes += 2;
    length++;

    if (bytes === 134) bank(i);
  }

  if (bytes > 0) bank();

  if (messages[1] && totalBytes <= 140) {
    return [{
      part: message,
      length: totalLength,
      bytes: totalBytes
    }];
  }
  return messages;
};