define([
  'jquery',
  'angular',
  'moment',
  'schema-form/schema-form.min',
  'form/application/app'
], function($, angular, moment) {
  'use strict';

  describe('datepicker addon', function() {

    describe('directive', function() {

      beforeEach(module('formApp'));

      it('should use the datepicker directive when the format is "date"', function() {

        inject(function($compile, $rootScope) {

          // setup

          var scope = $rootScope.$new();
          scope.person = { partee: '2014-01-01'};

          scope.schema = {
            type: 'object',
            properties: {
              partee: {
                type: 'string',
                format: 'date'
              }
            }
          };

          scope.form = [{
            key: 'partee',
            maxDate: '2022-02-02',
            minDate: '2011-01-11'
          }];

          var template = angular.element(
            '<form sf-schema="schema" sf-form="form" sf-model="person">' +
            '</form>'
          );

          $compile(template)(scope);
          scope.$apply();

          // assertions

          template.children().length.should.be.equal(1);

          var datepickerWrapper = template.children().eq(0).children().eq(0);
          datepickerWrapper.is('div').should.equal(true);

          var datepicker = datepickerWrapper.find('input[pick-a-date]');
          datepicker.length.should.be.at.least(1);

          datepicker.attr('max-date').should.equal('form.maxDate');
          datepicker.attr('min-date').should.equal('form.minDate');

          expect(datepicker.pickadate('picker').get('max').obj.getTime()).to.equal(
            moment(scope.form[0].maxDate).toDate().getTime()
          );
          expect(datepicker.pickadate('picker').get('min').obj.getTime()).to.equal(
            moment(scope.form[0].minDate).toDate().getTime()
          );
        });
      });
    });
  });
});
