var assert = require('assert'),
    gsmValidator = require('../lib/gsmvalidator');

describe('GSM Validator', function () {

  describe('Validating a message of all the known GSM characters', function () {

    it('should return GSM', function () {
      var message = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';
      var result = gsmValidator.validateMessage(message);
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a message of one GSM character', function () {

    it('should return GSM', function () {
      var message = '@';
      var result = gsmValidator.validateMessage(message);
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a message of one non-GSM characters', function () {

    it('should return false', function () {
      var message = '\u1F433';
      var result = gsmValidator.validateMessage(message);
      assert.strictEqual(result, false);
    });

  });

  describe('Validating all GSM characters', function () {

    var gsm = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';

    for (var i = 0; i < gsm.length; i++) {
      (function (char) {
        it('should return true', function () {
          var message = '\u1F433';
          var result = gsmValidator.validateCharacter(char);
          assert.strictEqual(result, true);
        });
      })(gsm[i]);
    }

  });

  describe('Validating a non-GSM character', function () {

    it('should return false', function () {
      var char = '\u1F433';
      var result = gsmValidator.validateCharacter(char);
      assert.strictEqual(result, false);
    });

  });

});