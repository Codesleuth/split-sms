var GSM = (function () {
  var GSM_chars = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';
  var arr = [];
  for (var i = 0; i < GSM_chars.length; i++) {
    arr[GSM_chars[i]] = true;
  }
  return arr;
})();

function validateCharacter(char) {
  return GSM[char] === true;
}

function validateMessage(message) {
  for (var i = 0; i < message.length; i++) {
    if (validateCharacter(message[i]))
      continue;
    return false;
  }
  return true;
}

module.exports.validateCharacter = validateCharacter;
module.exports.validateMessage = validateMessage;