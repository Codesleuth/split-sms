var assert = require('assert'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru();

function stringRepeat(string, times) {
   return (new Array(times + 1)).join(string);
}

describe('Split-SMS', function () {

  describe('Split GSM single part message', function () {

    var message;
    var splitResult;
    var validateMessageStub;
    var splitStub;
    var result;

    before(function () {
      message = '6546544';

      splitResult = {
        parts: [{
          content: "1234",
          length: 4,
          bytes: 4
        }],
        totalLength: 3636,
        totalBytes: 68678
      };

      validateMessageStub = sinon.stub().returns(true);
      splitStub = sinon.stub().returns(splitResult);

      var splitter = proxyquire('../lib/index', {
        './gsmvalidator': { validateMessage: validateMessageStub },
        './gsmsplitter': { split: splitStub }
      });

      result = splitter.split(message);
    });

    it('should validate the message to be GSM', function () {
      sinon.assert.calledWith(validateMessageStub, message);
    });

    it('should split the message', function () {
      sinon.assert.calledWith(splitStub, message);
    });

    it('should return GSM', function () {
      assert.strictEqual(result.characterSet, 'GSM');
    });

    it('should return the expected parts', function () {
      assert.strictEqual(result.parts, splitResult.parts);
    });

    it('should return the expected length', function () {
      assert.strictEqual(result.length, splitResult.totalLength);
    });

    it('should return the expected bytes', function () {
      assert.strictEqual(result.bytes, splitResult.totalBytes);
    });

    it('should have the expected characters remaining', function () {
      assert.strictEqual(result.remainingInPart, 156);
    });

  });

  describe('Split full GSM single part message', function () {

    var splitResult;
    var result;

    before(function () {
      splitResult = {
        parts: [{
          content: stringRepeat('\f', 5) + stringRepeat('a', 150),
          length: 155,
          bytes: 160
        }],
        totalLength: 345,
        totalBytes: 45
      };

      var splitter = proxyquire('../lib/index', {
        './gsmvalidator': { validateMessage: sinon.stub().returns(true) },
        './gsmsplitter': { split: sinon.stub().returns(splitResult) }
      });

      result = splitter.split('6465');
    });

    it('should have the expected characters remaining', function () {
      assert.strictEqual(result.remainingInPart, 0);
    });

  });

  describe('Split for GSM multipart message', function () {

    var splitResult;
    var result;

    before(function () {
      splitResult = {
        parts: [{}, {
          content: '1234',
          length: 4,
          bytes: 4
        }],
        totalLength: 3636,
        totalBytes: 68678
      };

      var splitter = proxyquire('../lib/index', {
        './gsmvalidator': { validateMessage: sinon.stub().returns(true) },
        './gsmsplitter': { split: sinon.stub().returns(splitResult) }
      });

      result = splitter.split('dfhswh');
    });

    it('should have the expected characters remaining', function () {
      assert.strictEqual(result.remainingInPart, 149);
    });

  });

  describe('Split Unicode single part message', function () {

      var message;
      var splitResult;
      var validateMessageStub;
      var splitStub;
      var result;

      before(function () {
        message = 'sdakdjaklsd';

        splitResult = {
          parts: [{
            content: "1234",
            length: 4,
            bytes: 8
          }],
          totalLength: 234,
          totalBytes: 345
        };

        validateMessageStub = sinon.stub().returns(false);
        splitStub = sinon.stub().returns(splitResult);

        var splitter = proxyquire('../lib/index', {
          './gsmvalidator': { validateMessage: validateMessageStub },
          './unicodesplitter': { split: splitStub }
        });

        result = splitter.split(message);
      });

      it('should validate the message to be Unicode', function () {
        sinon.assert.calledWith(validateMessageStub, message);
      });

      it('should split the message', function () {
        sinon.assert.calledWith(splitStub, message);
      });

      it('should return Unicode', function () {
        assert.strictEqual(result.characterSet, 'Unicode');
      });

      it('should return the expected parts', function () {
        assert.strictEqual(result.parts, splitResult.parts);
      });

      it('should return the expected length', function () {
        assert.strictEqual(result.length, splitResult.totalLength);
      });

      it('should return the expected bytes', function () {
        assert.strictEqual(result.bytes, splitResult.totalBytes);
      });

      it('should have the expected characters remaining', function () {
        assert.strictEqual(result.remainingInPart, 66);
      });

  });

  describe('Split full Unicode single part message', function () {

      var splitResult;
      var result;

      before(function () {
        splitResult = {
          parts: [{
            length: 70,
            bytes: 140
          }],
          totalLength: 777,
          totalBytes: 666
        };

        var splitter = proxyquire('../lib/index', {
          './gsmvalidator': { validateMessage: sinon.stub().returns(false) },
          './unicodesplitter': { split: sinon.stub().returns(splitResult) }
        });

        result = splitter.split('Some Message');
      });

      it('should have the expected characters remaining', function () {
        assert.strictEqual(result.remainingInPart, 0);
      });

  });

  describe('Split Unicode multipart message', function () {

      var splitResult;
      var result;

      before(function () {
        splitResult = {
          parts: [{}, {
            content: '1234',
            length: 4,
            bytes: 8
          }],
          totalLength: 888,
          totalBytes: 999
        };

        var splitter = proxyquire('../lib/index', {
          './gsmvalidator': { validateMessage: sinon.stub().returns(false) },
          './unicodesplitter': { split: sinon.stub().returns(splitResult) }
        });

        result = splitter.split('Some Message');
      });

      it('should have the expected characters remaining', function () {
        assert.strictEqual(result.remainingInPart, 63);
      });

  });

});
