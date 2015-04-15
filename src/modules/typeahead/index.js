module.exports = (function() {
  'use strict';

  angular.module('form-typeahead', [
    'form-decorators',
    'pascalprecht.translate',
    'schemaForm',
    'ui.bootstrap.typeahead'
  ])
    .directive('typeahead', require('./angular-typeahead'))
    .config(require('./form-typeahead'));
})();
