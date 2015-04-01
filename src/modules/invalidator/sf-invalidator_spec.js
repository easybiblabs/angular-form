require('./index');
require('./../decorators');

require('angular-schema-form');
require('angular-translate');

describe('sfInvalidator', function() {
  'use strict';

  beforeEach(angular.mock.module('form-decorators'));
  beforeEach(angular.mock.module('form-invalidator'));
  beforeEach(
    // We don't need no sanitation. We don't need no though control.
    angular.mock.module(function($sceProvider) {
      $sceProvider.enabled(false);
    })
  );

  var scope,
    formScope,
    formFieldErrors = [
      {
        name: 'username',
        message: 'Username is wrong'
      },
      {
        name: 'password',
        message: 'Password is wrong'
      }
    ];

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    var html = [
      '<form name="form" sf-invalidator ',
      'sf-schema="sf.schema" sf-form="sf.form" sf-model="model">',
      '</form>'
    ].join('');

    scope = _$rootScope_.$new();
    scope.sf = {};
    scope.sf.schema = {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    };
    scope.sf.form = [
      {
        type: 'fieldset',
        items: [
          {
            name: 'username',
            key: 'username'
          },
          {
            name: 'password',
            key: 'password'
          }
        ]
      }
    ];

    scope.model = {
      username: 'directive test',
      password: 'super secret'
    };

    var view = _$compile_(html)(scope);
    scope.$apply();
    formScope = angular.element(view).isolateScope();
  }));

  it('should enable invalidation', function() {

    expect(formScope.formCtrl.$valid).to.be.equal(true);

    scope.$emit('schemaFormInvalidate', {items: formFieldErrors, value: true});
    scope.$apply();

    expect(formScope.formCtrl.$valid).to.be.equal(false);
    expect($('input[name=username]').closest('help-block').text('Username is wrong'));
    expect($('input[name=password]').closest('help-block').text('Password is wrong'));
  });

  it('should disable invalidation', function() {
    expect(formScope.formCtrl.$valid).to.be.equal(true);

    scope.$emit('schemaFormInvalidate', {items: formFieldErrors, value: false});
    scope.$apply();

    expect(formScope.formCtrl.$valid).to.be.equal(true);
  });
});
