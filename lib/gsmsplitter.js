var gsmvalidator = require('./gsmvalidator');

function isHighSurrogate(code) {
  return code >= 0xD800 && code <= 0xDBFF;
}

module.exports.split = function (message, options) {
  options = options || { summary: false };

  if (message === '') {
    return {
      parts: [{
        content: options.summary ? undefined : '',
        length: 0,
        bytes: 0
      }],
      totalLength: 0,
      totalBytes: 0
    };
  }

  var messages = [];
  var length = 0;
  var bytes = 0;
  var totalBytes = 0;
  var totalLength = 0;
  var messagePart = '';


  function bank() {
    var msg = {
      content: options.summary ? undefined : messagePart,
      length: length,
      bytes: bytes
    };
    messages.push(msg);

    totalLength += length;
    length = 0;
    totalBytes += bytes;
    bytes = 0;
    messagePart = '';
  }

  for (var i = 0, count = message.length; i < count; i++) {
    var c = message.charAt(i);

    if (!gsmvalidator.validateCharacter(c)) {
      if (isHighSurrogate(c.charCodeAt(0))) {
        i++;
      }
      c = '\u0020';
    } else if (gsmvalidator.validateExtendedCharacter(c)) {
      if (bytes === 152) bank();
      bytes++;
    }

    bytes++;
    length++;

    if (!options.summary) messagePart += c;

    if (bytes === 153) bank();
  }

  if (bytes > 0) bank();

  if (messages[1] && totalBytes <= 160) {
    return {
      parts: [{
        content: options.summary ? undefined : messages[0].content + messages[1].content,
        length: totalLength,
        bytes: totalBytes
      }],
      totalLength: totalLength,
      totalBytes: totalBytes
    };
  }

  return {
    parts: messages,
    totalLength: totalLength,
    totalBytes: totalBytes
  };
};
