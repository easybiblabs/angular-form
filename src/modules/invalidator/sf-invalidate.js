module.exports = (function() {
  'use strict';

  /**
   * @ngInject
   * @returns {{restrict: string, require: string, link: Function}}
   * @constructor
   */
  function SfInvalidate() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        var backupValidationMessage = angular.copy(scope.form.validationMessage);

        scope.$watch(function() {
          return ngModel.$viewValue;
        }, function(value) {
          if (value) {
            element.attr('sf-invalidate', false);
            scope.form.validationMessage = backupValidationMessage;
          }
        });

        scope.$watch(function() {
          return attr.sfInvalidate;
        }, function(value) {
          if (scope.$eval(value)) {
            ngModel.$setValidity('schema', false);
          }
        });
      }
    };
  }

  return SfInvalidate;
})();
