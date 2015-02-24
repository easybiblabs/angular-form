module.exports = (function() {
  'use strict';

  angular.module('form-select', [
    'schemaForm',
    'form-decorators'
  ])
    .config(require('./form-selector'))
    .directive('selectTwo', require('./angular-select2'));
})();
