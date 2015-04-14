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
          return scope.form.invalidate;
        }, function(value) {
          if (value) {
            scope.form.validationMessage = backupValidationMessage;
            console.log("VIEWVALUE", value, scope.form.invalidate, scope.form);
            if (typeof scope.form.invalidate !== 'undefined') {
              ngModel.$setValidity('schema', !(scope.form.invalidate));
            }
          }
        });

      }
    };
  }

  return SfInvalidate;
})();
