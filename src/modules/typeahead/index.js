module.exports = (function() {
  'use strict';

  angular.module('form-typeahead', [
    'ui.bootstrap.typeahead',
    'schemaForm',
    'form-decorators'
  ])
    .config(require('./form-typeahead'))
    .directive('typeahead', require('./angular-typeahead'));
})();
