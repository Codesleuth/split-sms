var assert = require('assert'),
    detector = require('../lib/charactersetdetector');

describe('Message Character Set Detector', function () {

  describe('Detecting a message of all the known GSM characters', function () {

    it('should return GSM', function () {
      var message = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';
      var result = detector.DetectCharacterSet(message);
      assert.equal(result, 'GSM');
    });

  });

  describe('Detecting a message of one GSM character', function () {

    it('should return GSM', function () {
      var message = '@';
      var result = detector.DetectCharacterSet(message);
      assert.equal(result, 'GSM');
    });

  });

  describe('Detecting a message of one non-GSM characters', function () {

    it('should return Unicode', function () {
      var message = '\u1F433';
      var result = detector.DetectCharacterSet(message);
      assert.equal(result, 'Unicode');
    });

  });

});