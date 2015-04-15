require('./index');

describe('angular typeahead', function() {
  'use strict';

  var scope,
    compile,
    // timeout,
    view;

  function testSchoolPicker(schools, config) {
    scope.form = {};

    if (angular.isDefined(schools)) {
      scope.form = {
        schools: schools
      };
    } else {
      scope.form = {
        school: ['Thom', 'Quee']
      };
    }

    if (angular.isDefined(config)) {
      scope.form = {
        config: config
      };
    }

    view = angular.element('.school');
    compile(view)(scope);
    scope.$apply();
    // timeout.flush();
  }

  beforeEach(angular.mock.module('form-typeahead'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
    // timeout = $timeout;
  }));

  it('displays the list of schools given an input', function() {
    var schools = ['Thom'];
    testSchoolPicker(schools);
    // view.find('.school').length.should.equal(1);
  });
});
