var assert = require('assert'),
    random = require('./random');
var splitter = require('../');

function randomGsmString(length) {
  var gsm = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà';
  var result = '';
  for (var i = 0, max = gsm.length - 1; i < length; i++) {
    result += gsm[random.integer(0, max)];
  }
  return result;
}

function randomGsmExtendedString(length) {
  var gsme = '|^€{}[~]\\\f';
  var result = '';
  for (var i = 0, max = gsme.length - 1; i < length; i++) {
    result += gsme[random.integer(0, max)];
  }
  return result;
}

function randomNonGsmString(length) {
  // All symbols known in the BMP above the euro symbol: http://codepoints.net/U+20AC
  var min = 0x20AD;
  var max = 0x297F;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += String.fromCharCode(random.integer(min, max));
  }
  return result;
}

function randomSurrogatePairString(length) {
  var highMin = 0xD800;
  var highMax = 0xDB7F;
  var lowMin = 0xDC00;
  var lowMax = 0xDFFF;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += String.fromCharCode(random.integer(highMin, highMax));
    result += String.fromCharCode(random.integer(lowMin, lowMax));
  }
  return result;
}


describe('Acceptance Tests', function () {

  describe('Single part message of all GSM characters', function () {

    var message;
    var result;

    before(function () {
      message = randomGsmString(160);
      result = splitter.split(message);
    });

    it('should return characterset GSM', function () {
      assert.strictEqual(result.characterSet, 'GSM');
    });

    it('should return 160 length', function () {
      assert.strictEqual(result.length, 160);
    });

    it('should return 160 bytes', function () {
      assert.strictEqual(result.bytes, 160);
    });

    it('should return 1 part', function () {
      assert.strictEqual(result.parts.length, 1);
    });

    it('should return 0 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, message);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 160);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 160);
    });

  });

  describe('Multipart message of all GSM characters', function () {

    var part1;
    var part2;
    var result;

    before(function () {
      part1 = randomGsmString(153);
      part2 = randomGsmString(153);
      result = splitter.split(part1 + part2);
    });

    it('should return characterset GSM', function () {
      assert.strictEqual(result.characterSet, 'GSM');
    });

    it('should return 306 length', function () {
      assert.strictEqual(result.length, 306);
    });

    it('should return 306 bytes', function () {
      assert.strictEqual(result.bytes, 306);
    });

    it('should return 2 parts', function () {
      assert.strictEqual(result.parts.length, 2);
    });

    it('should return 0 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, part1);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 153);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 153);
    });

    it('should return the expected content in the second part', function () {
      assert.strictEqual(result.parts[1].content, part2);
    });

    it('should return the expected length in the second part', function () {
      assert.strictEqual(result.parts[1].length, 153);
    });

    it('should return the expected bytes in the second part', function () {
      assert.strictEqual(result.parts[1].bytes, 153);
    });

  });

  describe('Single part message of all GSM Extended characters', function () {

    var message;
    var result;

    before(function () {
      message = randomGsmExtendedString(80);
      result = splitter.split(message);
    });

    it('should return characterset GSM', function () {
      assert.strictEqual(result.characterSet, 'GSM');
    });

    it('should return 80 length', function () {
      assert.strictEqual(result.length, 80);
    });

    it('should return 160 bytes', function () {
      assert.strictEqual(result.bytes, 160);
    });

    it('should return 1 part', function () {
      assert.strictEqual(result.parts.length, 1);
    });

    it('should return 0 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, message);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 80);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 160);
    });

  });

  describe('Multipart message of all GSM Extended characters', function () {

    var part1;
    var part2;
    var result;

    before(function () {
      part1 = randomGsmExtendedString(76);
      part2 = randomGsmExtendedString(76);
      result = splitter.split(part1 + part2);
    });

    it('should return characterset GSM', function () {
      assert.strictEqual(result.characterSet, 'GSM');
    });

    it('should return 152 length', function () {
      assert.strictEqual(result.length, 152);
    });

    it('should return 304 bytes', function () {
      assert.strictEqual(result.bytes, 304);
    });

    it('should return 1 part', function () {
      assert.strictEqual(result.parts.length, 2);
    });

    it('should return 1 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 1);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, part1);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 76);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 152);
    });

    it('should return the expected content in the second part', function () {
      assert.strictEqual(result.parts[1].content, part2);
    });

    it('should return the expected length in the second part', function () {
      assert.strictEqual(result.parts[1].length, 76);
    });

    it('should return the expected bytes in the second part', function () {
      assert.strictEqual(result.parts[1].bytes, 152);
    });

  });

  describe('Single part message of all non-GSM characters', function () {

    var message;
    var result;

    before(function () {
      message = randomNonGsmString(70);
      result = splitter.split(message);
    });

    it('should return characterset Unicode', function () {
      assert.strictEqual(result.characterSet, 'Unicode');
    });

    it('should return 70 length', function () {
      assert.strictEqual(result.length, 70);
    });

    it('should return 140 bytes', function () {
      assert.strictEqual(result.bytes, 140);
    });

    it('should return 1 part', function () {
      assert.strictEqual(result.parts.length, 1);
    });

    it('should return 0 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, message);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 70);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 140);
    });

  });

  describe('Multipart message of all non-GSM characters', function () {

    var part1;
    var part2;
    var result;

    before(function () {
      part1 = randomNonGsmString(67);
      part2 = randomNonGsmString(67);
      result = splitter.split(part1 + part2);
    });

    it('should return characterset Unicode', function () {
      assert.strictEqual(result.characterSet, 'Unicode');
    });

    it('should return 134 length', function () {
      assert.strictEqual(result.length, 134);
    });

    it('should return 268 bytes', function () {
      assert.strictEqual(result.bytes, 268);
    });

    it('should return 2 parts', function () {
      assert.strictEqual(result.parts.length, 2);
    });

    it('should return 0 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, part1);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 67);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 134);
    });

    it('should return the expected content in the second part', function () {
      assert.strictEqual(result.parts[1].content, part2);
    });

    it('should return the expected length in the second part', function () {
      assert.strictEqual(result.parts[1].length, 67);
    });

    it('should return the expected bytes in the second part', function () {
      assert.strictEqual(result.parts[1].bytes, 134);
    });

  });

  describe('Single part message of all surrogate-pair characters', function () {

    var message;
    var result;

    before(function () {
      message = randomSurrogatePairString(35);
      result = splitter.split(message);
    });

    it('should return characterset Unicode', function () {
      assert.strictEqual(result.characterSet, 'Unicode');
    });

    it('should return 70 length', function () {
      assert.strictEqual(result.length, 35);
    });

    it('should return 140 bytes', function () {
      assert.strictEqual(result.bytes, 140);
    });

    it('should return 1 part', function () {
      assert.strictEqual(result.parts.length, 1);
    });

    it('should return 0 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, message);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 35);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 140);
    });

  });

  describe('Multipart message of all surrogate-pair characters', function () {

    var part1;
    var part2;
    var result;

    before(function () {
      part1 = randomSurrogatePairString(33);
      part2 = randomSurrogatePairString(33);
      result = splitter.split(part1 + part2);
    });

    it('should return characterset Unicode', function () {
      assert.strictEqual(result.characterSet, 'Unicode');
    });

    it('should return 66 length', function () {
      assert.strictEqual(result.length, 66);
    });

    it('should return 264 bytes', function () {
      assert.strictEqual(result.bytes, 264);
    });

    it('should return 2 parts', function () {
      assert.strictEqual(result.parts.length, 2);
    });

    it('should return 1 remaining in last part', function () {
      assert.strictEqual(result.remainingInPart, 1);
    });

    it('should return the expected content in the first part', function () {
      assert.strictEqual(result.parts[0].content, part1);
    });

    it('should return the expected length in the first part', function () {
      assert.strictEqual(result.parts[0].length, 33);
    });

    it('should return the expected bytes in the first part', function () {
      assert.strictEqual(result.parts[0].bytes, 132);
    });

    it('should return the expected content in the second part', function () {
      assert.strictEqual(result.parts[1].content, part2);
    });

    it('should return the expected length in the second part', function () {
      assert.strictEqual(result.parts[1].length, 33);
    });

    it('should return the expected bytes in the second part', function () {
      assert.strictEqual(result.parts[1].bytes, 132);
    });

  });

});
