module.exports = (function() {
  'use strict';

  angular.module('form-invalidator', [
    'pascalprecht.translate',
    'schemaForm'
  ])
    .service('FormValidator', require('./form-validator'))
    .directive('sfInvalidator', require('./sf-invalidator'))
    .directive('sfInvalidate', require('./sf-invalidate'));
})();
