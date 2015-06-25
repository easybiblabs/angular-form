require('./index');
require('select2');

var fs = require('fs');
var path = require('path');
var html = fs.readFileSync(path.join(__dirname, '/fixtures/angular-select2-fixture.html')).toString();

describe('angular select2', function() {
  'use strict';

  var scope,
    compile,
    timeout,
    view;

  function testPicker(choices, config) {
    scope.form = {};

    if (angular.isDefined(choices)) {
      scope.form = {
        choices: choices
      };
    } else {
      scope.form = {
        choices: ['foo', 'bar', 'baz', 'batman']
      };
    }

    if (angular.isDefined(config)) {
      scope.form = {
        config: config
      };
    }

    view = angular.element(html);
    compile(view)(scope);

    scope.$apply();
    timeout.flush();
  }

  beforeEach(angular.mock.module('form-select'));

  beforeEach(inject(function($rootScope, $compile, $timeout) {
    scope = $rootScope.$new();
    compile = $compile;
    timeout = $timeout;
  }));

  it('displays correct number of options', function() {
    var choices = ['foo', 'bar', 'baz'];
    testPicker(choices);
    view.find('option').length.should.equal(choices.length + 1);
  });

  it('should be able to be access the api', function() {
    testPicker();
    view.find('select').select2.should.be.a('function');
  });

  it('should know when select is changed', function() {
    var choices = ['foo', 'bar', 'baz'];
    var index = 1;
    testPicker(choices);
    view.find('select').val('string:' + choices[index]).trigger('change').click().change();
    view.find('select').select2('val').should.equal('string:' + choices[index]);
    view.find('.select2-chosen').text().should.equal(choices[index]);
  });

  it('should be able to be read only', function() {
    testPicker();
    view.find('select').select2('readonly', true);
    view.find('.select2-container').hasClass('select2-container-disabled').should.equal(true);
    view.find('select').select2('readonly', false);
    view.find('.select2-container').hasClass('select2-container-disabled').should.equal(false);
  });

  it('should be able to accept config', function() {
    var choices = ['foo', 'bar', 'baz', 'batman'];
    var config = {
      containerCssClass: 'mr-freeze'
    };
    testPicker(choices, config);
    view.find('.mr-freeze').length.should.equal(1);
    view.find('.mr-freeze').hasClass('select2-container').should.equal(true);
  });
});
