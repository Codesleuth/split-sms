var assert = require('assert'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru();

function stringRepeat (string, times) {
   return (new Array(times + 1)).join(string);
}

describe('Message Info', function () {

  describe('Get info for GSM single part message', function () {

    var result;
    var parts;

    before(function () {
      var message = '1234';
      parts = [{ part: message, length: 2 }];
      
      var messageinfo = proxyquire('../lib/messageinfo', { 
        './charactersetdetector': { DetectCharacterSet: sinon.stub().withArgs(message).returns('GSM') },
        './splitter': { splitGsm: sinon.stub().withArgs(message).returns(parts)}
      });
      result = messageinfo.GetMessageInfo(message);
    });

    it('should return GSM', function () {
      assert.equal(result.characterSet, 'GSM');
    });

    it('should return the expected parts', function () {
      assert.equal(result.parts, parts);
    });

    it('should return the expected length', function () {
      assert.equal(result.length, 2);
    });

    it('should return the expected bytes', function () {
      assert.equal(result.bytes, 4);
    });

    it('should have the expected characters remaining', function () {
      assert.equal(result.remainingInPart, 156);
    });

  });

  describe('Get info for full GSM single part message', function () {

    var result;
    var parts;

    before(function () {
      var message = stringRepeat('-', 160);
      parts = [{ part: message, length: 2 }];
      
      var messageinfo = proxyquire('../lib/messageinfo', { 
        './charactersetdetector': { DetectCharacterSet: sinon.stub().withArgs(message).returns('GSM') },
        './splitter': { splitGsm: sinon.stub().withArgs(message).returns(parts)}
      });
      result = messageinfo.GetMessageInfo(message);
    });

    it('should return GSM', function () {
      assert.equal(result.characterSet, 'GSM');
    });

    it('should return the expected parts', function () {
      assert.equal(result.parts, parts);
    });

    it('should return the expected length', function () {
      assert.equal(result.length, 2);
    });

    it('should return the expected bytes', function () {
      assert.equal(result.bytes, 160);
    });

    it('should have the expected characters remaining', function () {
      assert.equal(result.remainingInPart, 0);
    });

  });

  describe('Get info for GSM multi part message', function () {

    var result;
    var parts;

    before(function () {
      var message1 = stringRepeat('-', 153);
      var message2 = stringRepeat('-', 100);
      parts = [{ part: message1, length: 10 }, { part: message2, length: 20 }];

      var message = 'dfhdgfdfgd';
      
      var messageinfo = proxyquire('../lib/messageinfo', { 
        './charactersetdetector': { DetectCharacterSet: sinon.stub().withArgs(message).returns('GSM') },
        './splitter': { splitGsm: sinon.stub().withArgs(message).returns(parts)}
      });
      result = messageinfo.GetMessageInfo(message);
    });

    it('should return GSM', function () {
      assert.equal(result.characterSet, 'GSM');
    });

    it('should return the expected parts', function () {
      assert.equal(result.parts, parts);
    });

    it('should return the expected length', function () {
      assert.equal(result.length, 30);
    });

    it('should return the expected bytes', function () {
      assert.equal(result.bytes, 253);
    });

    it('should have the expected characters remaining', function () {
      assert.equal(result.remainingInPart, 53);
    });

  });

  describe('Get info for Unicode single part message', function () {

    var result;
    var parts;

    before(function () {
      var message = stringRepeat('-', 70);
      parts = [{ part: message, length: 18 }];
      
      var messageinfo = proxyquire('../lib/messageinfo', { 
        './charactersetdetector': { DetectCharacterSet: sinon.stub().withArgs(message).returns('Unicode') },
        './splitter': { splitUnicode: sinon.stub().withArgs(message).returns(parts)}
      });
      result = messageinfo.GetMessageInfo(message);
    });

    it('should return Unicode', function () {
      assert.equal(result.characterSet, 'Unicode');
    });

    it('should return the expected parts', function () {
      assert.equal(result.parts, parts);
    });

    it('should return the expected length', function () {
      assert.equal(result.length, 18);
    });

    it('should return the expected bytes', function () {
      assert.equal(result.bytes, 140);
    });

    it('should have the expected characters remaining', function () {
      assert.equal(result.remainingInPart, 0);
    });

  });

  describe('Get info for full Unicode single part message', function () {

    var result;
    var parts;

    before(function () {
      var message = 'espresso';
      parts = [{ part: message, length: 18 }];
      
      var messageinfo = proxyquire('../lib/messageinfo', { 
        './charactersetdetector': { DetectCharacterSet: sinon.stub().withArgs(message).returns('Unicode') },
        './splitter': { splitUnicode: sinon.stub().withArgs(message).returns(parts)}
      });
      result = messageinfo.GetMessageInfo(message);
    });

    it('should return Unicode', function () {
      assert.equal(result.characterSet, 'Unicode');
    });

    it('should return the expected parts', function () {
      assert.equal(result.parts, parts);
    });

    it('should return the expected length', function () {
      assert.equal(result.length, 18);
    });

    it('should return the expected bytes', function () {
      assert.equal(result.bytes, 16);
    });

    it('should have the expected characters remaining', function () {
      assert.equal(result.remainingInPart, 62);
    });

  });

  describe('Get info for Unicode multi part message', function () {

    var result;
    var parts;

    before(function () {
      var message1 = stringRepeat('-', 65);
      var message2 = stringRepeat('-', 45);
      parts = [{ part: message1, length: 55 }, { part: message2, length: 35 }];

      var message = 'sdsasdaasdsad';
      
      var messageinfo = proxyquire('../lib/messageinfo', { 
        './charactersetdetector': { DetectCharacterSet: sinon.stub().withArgs(message).returns('Unicode') },
        './splitter': { splitUnicode: sinon.stub().withArgs(message).returns(parts)}
      });
      result = messageinfo.GetMessageInfo(message);
    });

    it('should return Unicode', function () {
      assert.equal(result.characterSet, 'Unicode');
    });

    it('should return the expected parts', function () {
      assert.equal(result.parts, parts);
    });

    it('should return the expected length', function () {
      assert.equal(result.length, 90);
    });

    it('should return the expected bytes', function () {
      assert.equal(result.bytes, 220);
    });

    it('should have the expected characters remaining', function () {
      assert.equal(result.remainingInPart, 22);
    });

  });

});