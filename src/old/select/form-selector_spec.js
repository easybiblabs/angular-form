define([
  'jquery',
  'angular',
  'select2',
  'schema-form/schema-form.min',
  'form/application/app'
], function($, angular) {
  'use strict';

  describe('select2 addon', function() {

    describe('directive', function() {

      beforeEach(module('formApp'));

      it('should use the select-two directive when the format is "select"', function() {

        inject(function($compile, $rootScope, $timeout) {

          // setup

          var scope = $rootScope.$new();
          scope.person = { partee: 'foo'};

          scope.schema = {
            type: 'object',
            properties: {
              partee: {
                type: 'string',
                enum: ['foo', 'bar', 'baz', 'batman'],
                format: 'select'
              }
            }
          };

          scope.form = [{
            key: 'partee'
          }];

          var template = angular.element(
            '<form sf-schema="schema" sf-form="form" sf-model="person">' +
            '</form>'
          );

          $compile(template)(scope);
          scope.$apply();
          $timeout.flush();

          // assertions

          template.children().length.should.be.equal(1);

          var select2Wrapper = template.children().eq(0);

          select2Wrapper.find('.select2-container').length.should.equal(1);

          select2Wrapper.find('select').length.should.equal(1);

          select2Wrapper.find('option').eq(1).length.should.equal(1);

          select2Wrapper.find('option').eq(1).text().should.equal('foo');
        });
      });
    });
  });
});
