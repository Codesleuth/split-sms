(function (splitter) {
  "use strict";

  var box = document.getElementById('message');
  var infoText = document.getElementById('info');

  box.onkeyup = function (e) {
    var info = splitter.split(box.value);
    infoText.value = JSON.stringify(info, undefined, 2);
  };

})(window.splitter);