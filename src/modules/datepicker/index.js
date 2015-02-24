module.exports = (function(){
  angular.module('form-datepicker', [
    'schemaForm'
  ])
    .directive('pickADate', require('./angular-pickadate'))
    .config(require('./form-datepicker'))
})();