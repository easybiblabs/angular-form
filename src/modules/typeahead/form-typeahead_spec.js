(function() {
  'use strict';

  require('./index');
  require('../decorators');

  require('angular-schema-form');
  require('angular-bootstrap-typeahead');

  describe('typeahead directive', function() {
    beforeEach(angular.mock.module('form-typeahead'));
    beforeEach(
      angular.mock.module(function() {
      })
    );

    it('should use typeahead directive when format is "typeahead"', function() {

      inject(function($compile, $rootScope) {
        var scope = $rootScope.$new();
        scope.person = {};

        scope.schema = {
          type: 'object',
          properties: {
            desc: {
              title: 'School',
              type: 'string',
              format: 'typeahead'
            }
          }
        };

        scope.form = [{
          key: 'school',
          options: {
          }
        }];

        var el = angular.element(
          '<form sf-schema="schema" sf-form="form" sf-model="school"></form>'
        );

        $compile(el)(scope);
        $rootScope.$apply();
        el.children().length.should.be.equal(1);
      });
    });
  });
}());
