var assert = require('assert');
var splitter = require('../lib/splitter'),
    gsmTestData = require('./testdata/gsm.test.json'),
    unicodeTestData = require('./testdata/unicode.test.json');

function testMessage(testData, splitterFunction) {

  describe(testData.description, function () {

    var result;

    before(function () {
      result = splitterFunction(testData.message);
    });

    it('should be ' + testData.parts.length + ' parts', function () {
      assert.equal(result.length, testData.parts.length);
    });

    for (var i = 0; i < testData.parts.length; i++) {
      (function (part, index) {
        it('should have the expected content in part ' + (index + 1), function () {
          assert.equal(result[index].part, part.message);
        });

        it('should have the expected length in part ' + (index + 1), function () {
          assert.equal(result[index].length, part.length);
        });
      })(testData.parts[i], i);
    }

  });

}

describe('SMS Splitter', function () {

  describe('GSM Message', function () {

    for (var i = 0; i < gsmTestData.length; i++) {
      testMessage(gsmTestData[i], splitter.splitGsm);
    }

  });

  describe('Unicode Message', function () {

    for (var i = 0; i < unicodeTestData.length; i++) {
      testMessage(unicodeTestData[i], splitter.splitUnicode);
    }

  });

});