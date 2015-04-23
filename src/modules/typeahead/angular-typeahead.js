module.exports = function($timeout) {
  'use strict';

  return {
    restrict: 'AE',
    require: 'ngModel',
    scope: {
      prompt: '@',
      title: '@',
      items: '=',
      model: '=',
      onSelect: '&'
    },
    link: function(scope, element, attrs, viewValue) {
      /* eslint-disable */
      console.debug('___scope ', scope);
      console.debug('___el ', element);
      console.debug('___attrs ', attrs);
      console.debug('___viewValue ', viewValue);
      /* eslint-enable */

      scope.handleSelection = function(selectedItem) {
        scope.model = selectedItem;
        scope.current = 0;
        scope.selected = true;

        $timeout(function() {
          scope.onSelect();
        }, 200);
      };

      scope.current = 0;
      scope.selected = true;

      scope.isCurrent = function(index) {
        return scope.current === index;
      };

      scope.setCurrent = function(index) {
        scope.current = index;
      };
    }
  };
};
