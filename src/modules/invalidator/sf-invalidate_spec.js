require('./index');
require('angular-schema-form');

describe('sfInvalidate', function() {
  'use strict';

  beforeEach(angular.mock.module('form-invalidator'));

  var scope, input;

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    var html = [
      '<form name="form">',
      '<input ng-model="model.username" name="username" sf-invalidate="{{ invalidate }}" />',
      '</form>'
    ].join('');

    scope = _$rootScope_.$new();
    scope.model = {
      username: 'directive test'
    };

    var view = _$compile_(html)(scope);
    scope.$apply();

    input = $(view).find('input');
  }));

  it('should enable invalidation', function() {
    expect(scope.form.username.$valid).to.be.equal(true);

    scope.invalidate = true;
    scope.$apply();

    expect(input.attr('sf-invalidate')).to.be.equal('true');
  });

  it('should disable invalidation', function() {
    scope.invalidate = true;
    scope.$apply();

    expect(input.attr('sf-invalidate')).to.be.equal('true');

    scope.invalidate = false;
    scope.$apply();

    expect(input.attr('sf-invalidate')).to.be.equal('false');
  });
});
