var assert = require('assert'),
    random = require('./random');
var splitter = require('../');

function randomGsmString(length) {
  var gsm = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += gsm[random.integer(0, gsm.length - 1)];
  }
  return result;
}


describe('Acceptance Tests', function () {

  describe('Message of all GSM characters', function () {

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

});
