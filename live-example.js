(function (splitter) {
  "use strict";

  var box = document.getElementById('message');
  var infoText = document.getElementById('info');

  function update() {
    var info = splitter.split(box.value);
    infoText.value = JSON.stringify(info, undefined, 2);
  }

  box.onkeyup = update;

  box.value = 'Snowman shows off! ☃';
  update();

})(window.splitter);