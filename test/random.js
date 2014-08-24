var randomNumber = module.exports.number = function (min, max) {
  min = min || 0;
  max = max || Number.MAX_VALUE - 1;
  return Math.random() * (max - min + 1) + min;
};

module.exports.integer = function (min, max) {
  min = min || 0;
  max = max || 4294967296;
  return Math.floor(randomNumber(min, max));
};
