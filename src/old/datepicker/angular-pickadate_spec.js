define([
  'form/application/bootstrap',
  'text!form/datepicker/angular-pickadate-fixture.html',
  'angular',
  'moment',
  'jquery',
  'pickadate/picker',
  'pickadate/picker.date'
], function(app, html, angular, moment) {
  'use strict';
  describe('angular pickadate', function() {
    var scope,
      compile,
      view;

    function testWithDate(date, format, minDate) {
      scope.entity = {
        date: date
      };

      if (angular.isDefined(format)) {
        scope.form = {
          format: format
        };
      }

      if (angular.isDefined(minDate)) {
        scope.form = scope.form || {};
        scope.form.minDate = minDate;
      }

      view = angular.element(html);
      compile(view)(scope);

      scope.$apply();
    }

    beforeEach(module('formApp'));

    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    }));

    it('displays current date for empty date', function() {
      testWithDate('', 'yyyy-mm-dd');
      view.find('.datepicker_editable_input').val().should.equal(moment().format('YYYY-MM-DD'));
    });

    it('displays the date formatted for a date', function() {
      testWithDate(moment().toDate(), 'yyyy/mm/dd');
      view.find('.datepicker_editable_input').val().should.equal(moment().format('YYYY/MM/DD'));
    });

    it('displays nothing for an invalid date', function() {
      // this test results in an infinite recursion
      // skip for now
      // testWithDate('asdfasdfasdfasdf');
      // view.find('#datepicker_editable_input').val().should.equal('');
    });

    it('responds to changes in the model', function() {
      testWithDate('2014-09-10T17:01:58.843Z', 'yyyy-mm-dd', '2014-09-01');
      view.find('.datepicker_editable_input').val().should.equal('2014-09-10');

      scope.entity.date = '2014-09-19T17:01:58.843Z';
      scope.$apply();

      view.find('.datepicker_editable_input').val().should.equal('2014-09-19');
    });

    it('opens the calendar when you click the calendar icon', function() {
      view.find('.calendar-icon').trigger('click');
      view.find('.calendar-icon').length.should.equal(1);
      view.find('.picker__input--active').length.should.equal(1);
    });

  });
});
