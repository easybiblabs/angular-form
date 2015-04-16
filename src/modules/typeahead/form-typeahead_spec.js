(function() {
  'use strict';

  require('./index');
  require('../decorators');

  require('angular-schema-form');
  require('angular-ui-bootstrap-typeahead');

  describe('typeahead directive', function() {
    beforeEach(angular.mock.module('form-typeahead'));

    it('should use typeahead directive when format is "typeahead"', function() {
      inject(function($compile, $rootScope) {
        var scope = $rootScope.$new();

        scope.school = {
          name: 'Thomas'
        };

        scope.schema = {
          type: 'object',
          properties: {
            school: {
              title: 'School',
              type: 'string',
              format: 'typeahead'
            }
          }
        };

        scope.form = [{
          key: 'school'
        }];

        var el = angular.element('<form sf-schema="schema" sf-form="form" sf-model="school"></form>');

        // $compile(el)(scope);
        // $rootScope.$apply();
      });
    });
  });
}());
