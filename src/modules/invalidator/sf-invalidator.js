module.exports = (function() {
  'use strict';

  /**
   * @ngInject
   */
  function SfInvalidator($rootScope) {

    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        console.log(attr)
        $rootScope.$on('schemaFormInvalidate', function(event, data) {

          var form = scope.$eval(attr.sfForm);
          angular.forEach(form[0].items, function(field) {
            angular.forEach(data.items, function(item) {
              if (item.name === field.name) {
                field.invalidate = data.value;
                if (item.message) {
                  field.validationMessage = {
                    default: item.message
                  };
                }
              }
            });
          });
        });
      }
    };
  }

  return SfInvalidator;
})();
