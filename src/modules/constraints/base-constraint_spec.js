require('./index');

describe('base constraint interface', function() {
  'use strict';

  var base;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_BaseConstraint_) {
    base = new _BaseConstraint_();
  }));

  it('should have methods', function() {
    ['hasConstraint', 'getResult', 'add'].map(function(fn) {
      expect(base[fn]).to.be.a('function');
    });
  });

  it('should have abstract add signature', function() {
    expect(function() {
      base.add();
    }).to.throw('Method add not implemented');
  });

});
