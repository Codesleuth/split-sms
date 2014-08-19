var extendedGsmCharacters = '\f|^€{}[~]\\';
function IsExtendedGsmChar(c) {
  return extendedGsmCharacters.indexOf(c) > -1;
}

module.exports.split = function (message) {
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