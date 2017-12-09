var assert = require('assert');
var calculator = require('./../calculator.js');

describe('Calculator', function() {
  describe('#calculate()', function() {
    it('should return 19 when the reqest is 10*(5 - 3)+(-2)/2', function() {
      assert.equal(calculator.calculate('10*(5 - 3)+(-2)/2'), 19);
    });
  });
  describe('#calculate()', function() {
    it('should return incorrect input when the string is just rubbish', function() {
      assert.equal(calculator.calculate('qwe'), 'Incorrect input!');
    });
  });
  describe('#calculate()', function() {
    it('should return incorrect input when brackets mismatch', function() {
      assert.equal(calculator.calculate('10 + ((9 - 2)'), 'Incorrect input!');
    });
  });
  describe('#calculate()', function() {
    it('should return infinity for the division by 0', function() {
      assert.equal(calculator.calculate('5/0'), 'Infinity');
    });
  });
});