var chai       = require('chai');
var expect     = chai.expect;
var sinon      = require('sinon');
var styleshiet = require('../index.js');

describe('styleshiet', function() {
  it("should return an object", function() {
    expect(styleshiet).to.be.an('object');
  });

  describe("#convert", function() {
    it("should contain the function convert", function() {
      expect(styleshiet.convert).to.be.a('function');
    });

    it("should throw an error if no source has been supplied", function() {
      expect(styleshiet.convert.bind(styleshiet)).to.throw('No source has been supplied');
    });

    it("should throw an error if no destination has been supplied", function() {
      expect(styleshiet.convert.bind(styleshiet, './')).to.throw('No destination folder has been supplied');
    });

    xit("should return undefined if file extension is not .json", function() {
      expect(styleshiet.convert('./data/*.json','./out')).to.be.undefined;
    });
  });
});