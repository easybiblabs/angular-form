define(['form/application/bootstrap'], function(app) {
  'use strict';
  app.directive('sfAttrs', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var attrsToAdd = scope.$eval(attrs.sfAttrs);
        for (var attrName in attrsToAdd) {
          elem.attr(attrName, attrsToAdd[attrName]);
        }
      }
    };
  });
});
