var expect = require('chai').expect;
var helper = require('./../app/helpers/helper');
var res;

describe('Helper Functions', function () {
  it('isEmptyObject', function () {
    res = helper.isEmptyObject({});
    expect(res).to.be.equal(true);
    res = helper.isEmptyObject({name : 'atul'});
    expect(res).to.be.equal(false);
  });

  it('isEmail', function () {
    res = helper.isEmail('atulrupnar@gmail.com');
    expect(res).to.be.equal(true);
    res = helper.isEmail('atulrupnar');
    expect(res).to.be.equal(false);
  });

  it('isDate', function () {
    res = helper.isDate(new Date());
    expect(res).to.be.equal(true);
    res = helper.isDate('100000');
    expect(res).to.be.equal(false);
  });

  it('isPhone', function () {
    res = helper.isPhone('7028460990');
    expect(res).to.be.equal(true);
    res = helper.isPhone(1000);
    expect(res).to.be.equal(false);
  });

  it('isObject', function () {
    res = helper.isObject({name : 'atul'});
    expect(res).to.be.equal(true);
    res = helper.isObject("name : atul");
    expect(res).to.be.equal(false);
  });

  it('isArray', function () {
    res = helper.isArray([1, 2, 3]);
    expect(res).to.be.equal(true);
    res = helper.isArray(123);
    expect(res).to.be.equal(false);
  });
});