module.exports = function($timeout) {
  'use strict';

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      config: '='
    },
    link: function(scope, element, attr, ngModel) {

      // ensure jquery element
      element = $(element);

      var evalInParentScope = function(value) {
        return scope.$parent.$eval(value);
      };

      var config = evalInParentScope(attr.config);

      if (!angular.isDefined(config)) {
        config = {};
      }

      $timeout(function() {
      }, 0);

      ngModel.$parsers.unshift(function(value) {
        ngModel.$setValidity('schema', true);
        return value;
      });

      // model -> DOM validation
      ngModel.$formatters.unshift(function(value) {
        if (typeof value === 'undefined') {
          ngModel.$setValidity('schema', false);
          return null;
        }

        /* eslint-disable no-debugger */
        debugger;
        /* eslint-enable no-debugger */
        return value;
      });

    }
  };
};
