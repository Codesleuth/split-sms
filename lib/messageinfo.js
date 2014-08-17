var detector = require('./charactersetdetector'),
    splitter = require('./splitter');

module.exports.GetMessageInfo = function (message) {
  var characterSet = detector.DetectCharacterSet(message);
  var parts, maxSingle, maxMulti, byteModifier;

  if (characterSet === 'GSM') {
    parts = splitter.splitGsm(message);
    maxSingle = 160;
    maxMulti = 153;
    byteModifier = 1;
  } else {
    parts = splitter.splitUnicode(message);
    maxSingle = 70;
    byteModifier = 2;
    maxMulti = 67;
  }

  var bytes = parts.reduce(function (agg, e) { return agg + e.part.length * byteModifier; }, 0);
  var length = parts.reduce(function (agg, e) { return agg + e.length; }, 0);
  var remaining = (parts.length === 1 ? maxSingle : maxMulti) - parts[parts.length - 1].part.length;

  return {
    characterSet: characterSet,
    parts: parts,
    bytes: bytes,
    length: length,
    remainingInPart: remaining
  };
};