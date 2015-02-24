// from http://victorblog.com/2014/01/12/fixing-autocomplete-autofill-on-angularjs-form-submit/
// via http://stackoverflow.com/a/21073094/1070069
define([
  'form/application/bootstrap',
  'angular'
], function(
  app,
  angular
) {
  'use strict';
  app.directive('autofillFix', function($timeout, $interval) {
    return function(scope, elem, attrs) {
      // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
      elem.prop('method', 'POST');

      // catch submit so that submitting autofilled fields works
      if (attrs.ngSubmit) {
        $timeout(function() {
          elem.unbind('submit').submit(function(e) {
            e.preventDefault();
            elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
            scope.$apply(attrs.ngSubmit);
          });
        }, 0);
      }

      // check for autofilled values every half-second, so the checkmarks appear
      // for autofilled values, too
      $interval(function() {
        elem.find('input, textarea, select').each(function() {
          var target = angular.element(this);
          if (target.val() !== '') {
            $timeout(function() {
              target.trigger('input').trigger('change').trigger('keydown');
            }, 0);
          }
        });
      }, 500);
    };
  });
});
