module.exports.DetectCharacterSet = function (message) {
  var GSM = '@Δ\x200¡P¿p£_!1AQaq$Φ"2BRbr¥Γ#3CScsèΛ¤4DTdtéΩ%5EUeuùΠ&6FVfvìΨ\'7GWgwòΣ(8HXhxÇΘ)9IYiy\nΞ*:JZjzØ+;KÄkäøÆ,<LÖlö\ræ-=MÑmñÅß.>NÜnüåÉ/?O§oà|^€{}[~]\\';
  for (var i = 0; i < message.length; i++) {
    if (GSM.indexOf(message[i]) === -1)
      return 'Unicode';
  }
  return 'GSM';
};