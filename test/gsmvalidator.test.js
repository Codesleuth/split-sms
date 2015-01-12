var assert = require('assert'),
    gsmValidator = require('../lib/gsmvalidator');

describe('GSM Validator', function () {

  describe('Validating a message of every valid GSM characters', function () {

    it('should return true', function () {
      var message = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';
      var result = gsmValidator.validateMessage(message);
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a message of one GSM character', function () {

    it('should return true', function () {
      var gsm = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';
      for (var i = 0; i < gsm.length; i++) {
        var result = gsmValidator.validateMessage(gsm[i]);
        assert.strictEqual(result, true, 'checking character "' + gsm[i] + '"');
      }
    });

  });

  describe('Validating a message of one non-GSM characters', function () {

    it('should return false', function () {
      var result = gsmValidator.validateMessage('\u1F433');
      assert.strictEqual(result, false);
    });

  });

  describe('Validating all GSM characters', function () {

    var gsm = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';

    it('should return true', function () {
      for (var i = 0; i < gsm.length; i++) {
        var result = gsmValidator.validateCharacter(gsm[i]);
        assert.strictEqual(result, true, 'checking character "' + gsm[i] + '"');
      }
    });

  });

  describe('Validating a non-GSM character', function () {

    it('should return false', function () {
      var result = gsmValidator.validateCharacter('\u1F433');
      assert.strictEqual(result, false);
    });

  });

  describe('Validating a GSM character with more than one character beginning with a GSM character', function () {

    it('should return true', function () {
      var result = gsmValidator.validateCharacter('EUe');
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a GSM character with more than one character beginning with a non-GSM character', function () {

    it('should return false', function () {
      var result = gsmValidator.validateCharacter('ȅUe');
      assert.strictEqual(result, false);
    });

  });

});