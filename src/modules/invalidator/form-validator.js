module.exports = (function() {
  'use strict';

  /**
   * @ngInject
   * @param $rootScope
   * @constructor
   */
  var FormValidator = function($rootScope) {
    this.$rootScope = $rootScope;
  };

  FormValidator.prototype.isValid = function(form) {
    this.$rootScope.$broadcast('schemaFormValidate');

    // set all manually invalidated fields to valid - needed for the manual
    // invalidation to work (see FormValidator.prototype.invalidate)
    if (form.$error && form.$error.backend) {
      var scope = this.$rootScope;
      var errors = [];

      angular.forEach(form.$error.backend, function(error) {
        errors.push(error.$name);
      });

      angular.forEach(errors, function(error) {
        scope.$broadcast('schemaForm.error.' + error, 'backend', true);
      });
    }

    return form.$valid;
  };

  FormValidator.prototype.invalidate = function(items, violationsName) {
    var scope = this.$rootScope;
    violationsName = violationsName || 'backend';

    angular.forEach(items, function(violation) {
      scope.$broadcast('schemaForm.error.' + violation.name, violationsName, violation.message);
    });
  };

  return FormValidator;
})();
