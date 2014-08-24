var gsmValidator = require('./gsmvalidator'),
    gsmSplitter = require('./gsmsplitter'),
    unicodeSplitter = require('./unicodesplitter');

function calculateRemaining(parts, maxSingle, maxMulti) {
  return (parts.length === 1 ? maxSingle : maxMulti) - parts[parts.length - 1].content.length;
}

module.exports.split = function (message) {
  var isGsm = gsmValidator.validateMessage(message);
  var splitResult, maxSingle, maxMulti, byteModifier;

  if (isGsm) {
    splitResult = gsmSplitter.split(message);
    maxSingle = 160;
    maxMulti = 153;
    byteModifier = 1;
  } else {
    splitResult = unicodeSplitter.split(message);
    maxSingle = 70;
    maxMulti = 67;
    byteModifier = 2;
  }

  var remainingInPart = calculateRemaining(splitResult.parts, maxSingle, maxMulti);

  return {
    characterSet: isGsm ? 'GSM' : 'Unicode',
    parts: splitResult.parts,
    bytes: splitResult.totalBytes,
    length: splitResult.totalLength,
    remainingInPart: remainingInPart
  };
};
