var gsmValidator = require('./gsmvalidator'),
    gsmSplitter = require('./gsmsplitter'),
    unicodeSplitter = require('./unicodesplitter');

module.exports.split = function (message) {
  var isGsm = gsmValidator.validateMessage(message);
  var parts, maxSingle, maxMulti, byteModifier;

  if (isGsm) {
    parts = gsmSplitter.split(message);
    maxSingle = 160;
    maxMulti = 153;
    byteModifier = 1;
  } else {
    parts = unicodeSplitter.split(message);
    maxSingle = 70;
    byteModifier = 2;
    maxMulti = 67;
  }

  var bytes = parts.reduce(function (agg, e) { return agg + e.part.length * byteModifier; }, 0);
  var length = parts.reduce(function (agg, e) { return agg + e.length; }, 0);
  var remaining = (parts.length === 1 ? maxSingle : maxMulti) - parts[parts.length - 1].part.length;

  return {
    characterSet: isGsm ? 'GSM' : 'Unicode',
    parts: parts,
    bytes: bytes,
    length: length,
    remainingInPart: remaining
  };
};