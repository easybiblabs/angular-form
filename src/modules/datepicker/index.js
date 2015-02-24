module.exports = (function() {
  'use strict';

  angular.module('form-datepicker', [
    'schemaForm'
  ])
    .directive('pickADate', require('./angular-pickadate'))
    .config(require('./form-datepicker'));
})();
