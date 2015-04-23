module.exports = function($timeout) {
  'use strict';

  return {
    restrict: 'AEC',
    require: 'ngModel',
    templateUrl: 'templates/typeahead-popup.html',
    scope: {
      prompt: '@',
      title: '@',
      items: '=',
      model: '=',
      onSelect: '&'
    },
    link: function(scope) {
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
