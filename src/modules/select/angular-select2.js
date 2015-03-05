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
        $(element).select2(config).on('change', function(e) {
          if (e.added) {
            ngModel.$setViewValue(e.added.text);
          }
        });
      }, 0);

      ngModel.$parsers.unshift(function(value) {
        ngModel.$setValidity('schema', true);
        return value;
      });

      // model -> DOM validation
      ngModel.$formatters.unshift(function(value) {
        // make it so that not selecting any of the choices is an error
        if (typeof value === 'undefined') {
          ngModel.$setValidity('schema', false);
          return null;
        }
        // select2 stupidity: re-select the selected value
        var selectedValue = $('option').filter(function() {
          return $(this).html() === value;
        }).val();
        element.select2().select2('val', selectedValue);
        return value;
      });

    }
  };
};
