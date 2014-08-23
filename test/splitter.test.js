var assert = require('assert');
var gsmSplitter = require('../lib/gsmsplitter'),
    unicodeSplitter = require('../lib/unicodesplitter'),
    gsmTestData = require('./testdata/gsm.test.json'),
    unicodeTestData = require('./testdata/unicode.test.json');

function testMessage(testData, splitterFunction) {

  describe(testData.description, function () {

    var result;

    before(function () {
      result = splitterFunction(testData.message);
    });

    it('should have ' + testData.parts.length + ' parts', function () {
      assert.strictEqual(result.parts.length, testData.parts.length);
    });

    it('should have ' + testData.totalLength + ' total characters', function () {
      assert.strictEqual(result.totalLength, testData.totalLength);
    });

    it('should have ' + testData.totalBytes + ' total bytes', function () {
      assert.strictEqual(result.totalBytes, testData.totalBytes);
    });

    for (var i = 0; i < testData.parts.length; i++) {
      (function (i, expected) {
        it('should have the expected content in part ' + (i + 1), function () {
          assert.strictEqual(result.parts[i].content, expected.content);
        });

        it('should have the expected length in part ' + (i + 1), function () {
          assert.strictEqual(result.parts[i].length, expected.length);
        });

        it('should have the expected bytes in part ' + (i + 1), function () {
          assert.strictEqual(result.parts[i].bytes, expected.bytes);
        });
      })(i, testData.parts[i]);
    }

  });

}

function testMessageSummary(testData, splitterFunction) {

  describe(testData.description, function () {

    var result;

    before(function () {
      result = splitterFunction(testData.message, { summary: true });
    });

    it('should have ' + testData.parts.length + ' parts', function () {
      assert.strictEqual(result.parts, testData.parts.length);
    });

    it('should have ' + testData.totalLength + ' total characters', function () {
      assert.strictEqual(result.totalLength, testData.totalLength);
    });

    it('should have ' + testData.totalBytes + ' total bytes', function () {
      assert.strictEqual(result.totalBytes, testData.totalBytes);
    });

  });

}

describe('SMS Splitter', function () {

  describe('GSM Message', function () {

    for (var i = 0; i < gsmTestData.length; i++) {
      testMessage(gsmTestData[i], gsmSplitter.split);
    }

  });

  describe('GSM Message Summary', function () {

    for (var i = 0; i < gsmTestData.length; i++) {
      testMessageSummary(gsmTestData[i], gsmSplitter.split);
    }

  });

  describe('Unicode Message', function () {

    for (var i = 0; i < unicodeTestData.length; i++) {
      testMessage(unicodeTestData[i], unicodeSplitter.split);
    }

  });

  describe('Unicode Message Summary', function () {

    for (var i = 0; i < unicodeTestData.length; i++) {
      testMessageSummary(unicodeTestData[i], unicodeSplitter.split);
    }

  });

});