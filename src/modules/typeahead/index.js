module.exports = (function() {
  'use strict';

  angular.module('form-typeahead', [
    'form-decorators',
    'pascalprecht.translate',
    'schemaForm',
    'ui.bootstrap.typeahead'
  ]).config(require('./form-typeahead'));
})();
