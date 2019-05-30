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

  describe('Validating a message of every valid GSM Turkish shift table characters', function () {

    it('should return true', function () {
      var message = '@£$¥€éùıòÇ\nĞğ\rÅåΔ_ΦΓΛΩΠΨΣΘΞŞşßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?İABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§çabcdefghijklmnopqrstuvwxyzäöñüà\f^{}\[~]|';
      var result = gsmValidator.validateMessageWithShiftTable(message);
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a message of every valid GSM Spanish shift table characters', function () {

    it('should return true', function () {
      var message = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüàç\f^{}\\[~]|ÁÍÓÚá€íóú';
      var result = gsmValidator.validateMessageWithShiftTable(message);
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a message of every valid GSM Portuguese shift table characters', function () {

    it('should return true', function () {
      var message = '@£$¥êéúíóç\nÔô\rÁáΔ_ªÇÀ∞^\\€Ó|ÂâÊÉ\x20!"#º%&\'()*+,-./0123456789:;<=>?ÍABCDEFGHIJKLMNOPQRSTUVWXYZÃÕÚÜ§~abcdefghijklmnopqrstuvwxyzãõ`üà\fΦΓ^ΩΠΨΣΘ{}\\[~]|';
      var result = gsmValidator.validateMessageWithShiftTable(message);
      assert.strictEqual(result, true);
    });

  });

  describe('Validating a message of mixed valid GSM shift tables', function () {

    it('should return false', function () {
      var message = '∞Ø';
      var result = gsmValidator.validateMessageWithShiftTable(message);
      assert.strictEqual(result, false);
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

  describe('Validating all GSM turkish characters', function () {

    var gsm = '@£$¥€éùıòÇ\nĞğ\rÅåΔ_ΦΓΛΩΠΨΣΘΞŞşßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?İABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§çabcdefghijklmnopqrstuvwxyzäöñüà\f^{}\[~]|';

    it('should return true', function () {
      for (var i = 0; i < gsm.length; i++) {
        var result = gsmValidator.validateCharacterWithShiftTable(gsm[i]);
        assert.strictEqual(result, true, 'checking character "' + gsm[i] + '"');
      }
    });

  });

  describe('Validating all GSM spanish characters', function () {

    var gsm = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ\x20!"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüàç\f^{}\\[~]|ÁÍÓÚá€íóú';

    it('should return true', function () {
      for (var i = 0; i < gsm.length; i++) {
        var result = gsmValidator.validateCharacterWithShiftTable(gsm[i]);
        assert.strictEqual(result, true, 'checking character "' + gsm[i] + '"');
      }
    });

  });

  describe('Validating all GSM portuguese characters', function () {

    var gsm = '@£$¥êéúíóç\nÔô\rÁáΔ_ªÇÀ∞^\\€Ó|ÂâÊÉ\x20!"#º%&\'()*+,-./0123456789:;<=>?ÍABCDEFGHIJKLMNOPQRSTUVWXYZÃÕÚÜ§~abcdefghijklmnopqrstuvwxyzãõ`üà\fΦΓ^ΩΠΨΣΘ{}\\[~]|';

    it('should return true', function () {
      for (var i = 0; i < gsm.length; i++) {
        var result = gsmValidator.validateCharacterWithShiftTable(gsm[i]);
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
