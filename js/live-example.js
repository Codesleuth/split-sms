(function (splitter) {

  var box = document.getElementById('message');
  var infoText = document.createTextNode("0");
  document.getElementById('info').appendChild(infoText);

  box.onkeyup = function (e) {
    var info = splitter.split(box.value);
    infoText.nodeValue = JSON.stringify(info, undefined, 2);
  };

})(window.splitter);