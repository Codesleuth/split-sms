function validateCharacter(char) {
  var GSM = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\\f';
  return GSM.indexOf(char) > -1;
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