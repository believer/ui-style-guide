var chai       = require('chai');
var expect     = chai.expect;
var sinon      = require('sinon');
var util = require('../util.js');

describe('utilities', function() {
  it("should return an object", function() {
    expect(util).to.be.an('object');
  });

  describe("#convertToRgb", function() {
    it("should be a function", function() {
      expect(util.convertToRgb).to.be.a('function');
    });

    it("should convert #fff to 255 255 255", function() {
      expect(util.convertToRgb('#fff')).to.eql('255 255 255');
    });

    it("should convert #50dc82 to 80 220 130 ", function() {
      expect(util.convertToRgb('#50dc82')).to.eql('80 220 130');
    });

    it("should convert a hex color with uppercase characters", function() {
      expect(util.convertToRgb('#EeEEee')).to.eql('238 238 238');
    });
  });

});