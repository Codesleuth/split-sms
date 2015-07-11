(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.splitter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./gsmvalidator":2}],2:[function(require,module,exports){
var GSM = (function () {
  var GSM_chars = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f^{}\\[~]|€';
  var arr = {};
  for (var i = 0; i < GSM_chars.length; i++) {
    var code = GSM_chars.charCodeAt(i);
    arr[code] = true;
  }
  return arr;
})();

var GSMe = (function () {
  var GSMe_chars = '\f|^€{}[~]\\';
  var arr = {};
  for (var i = 0; i < GSMe_chars.length; i++) {
    var code = GSMe_chars.charCodeAt(i);
    arr[code] = true;
  }
  return arr;
})();

function validateCharacter(character) {
  return GSM[character.charCodeAt(0)] === true;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message.charAt(i)))
      continue;
    return false;
  }
  return true;
}

function validateExtendedCharacter(character) {
  return GSMe[character.charCodeAt(0)] === true;
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateMessage = validateMessage;
module.exports.validateExtendedCharacter = validateExtendedCharacter;
},{}],3:[function(require,module,exports){
var gsmValidator = require('./gsmvalidator'),
    gsmSplitter = require('./gsmsplitter'),
    unicodeSplitter = require('./unicodesplitter');

function calculateRemaining(parts, singleBytes, multiBytes, charBytes) {
  var max = parts.length === 1 ? singleBytes : multiBytes;
  return (max - parts[parts.length - 1].bytes) / charBytes;
}

var UNICODE = module.exports.UNICODE = 'Unicode';
var GSM = module.exports.GSM = 'GSM';

Object.defineProperty(module.exports, 'UNICODE', { writable: false });
Object.defineProperty(module.exports, 'GSM', { writable: false });

module.exports.split = function (message, options) {
  var characterset = options && options.characterset;

  options = {
    summary: options && options.summary
  };

  var isGsm = (characterset === undefined && gsmValidator.validateMessage(message)) || characterset === GSM;
  var splitResult, singleBytes, multiBytes, charBytes;

  if (isGsm) {
    splitResult = gsmSplitter.split(message, options);
    singleBytes = 160;
    multiBytes = 153;
    charBytes = 1;
  } else {
    splitResult = unicodeSplitter.split(message, options);
    singleBytes = 140;
    multiBytes = 134;
    charBytes = 2;
  }

  var remainingInPart = calculateRemaining(splitResult.parts, singleBytes, multiBytes, charBytes);

  return {
    characterSet: isGsm ? GSM : UNICODE,
    parts: splitResult.parts,
    bytes: splitResult.totalBytes,
    length: splitResult.totalLength,
    remainingInPart: remainingInPart
  };
};

},{"./gsmsplitter":1,"./gsmvalidator":2,"./unicodesplitter":4}],4:[function(require,module,exports){
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
  var partStart = 0;

  function bank(partEnd) {
    var msg = {
      content: options.summary ? undefined : (partEnd ? message.substring(partStart, partEnd + 1) : message.substring(partStart)),
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
    return {
      parts: [{
        content: options.summary ? undefined : message,
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

},{}]},{},[3])(3)
});