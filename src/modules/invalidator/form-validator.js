module.exports = function(){
  'use strict';

  var FormValidator = function($rootScope) {
    this.$rootScope = $rootScope;
    this.manuallyInvalidated = false;
  };

  FormValidator.prototype.isValid = function(form, schema) {

    // Return if the form is invalid because we manually invalidated it after
    // receiving validation errors from the backend. We have to check that
    // *before* triggering the frontend validation because that would make it
    // valid again (that's how it got send to the backend in the first place).
    if (form.$invalid && this.manuallyInvalidated) {
      return false;
    }

    // Let the form validate itself - needed because validation is only
    // automatically triggered on changes, but on submit we also want
    // to validate the fields that didn't change yet.
    this.$rootScope.$broadcast('schemaFormValidate');

    if (form.$invalid) {
      return false;
    }

    // Form is valid: set all fields to valid - needed for the manual invalidation
    // to work (see FormValidator.prototype.invalidate)
    this.$rootScope.$emit('schemaFormInvalidate', {
      items: Object.keys(schema.properties).map(function(value) {
        return {
          name: value,
          message: ''
        };
      }), value: false
    });
    this.manuallyInvalidated = false;

    return true;
  };

  FormValidator.prototype.invalidate = function(items) {
    this.manuallyInvalidated = true;
    this.$rootScope.$emit('schemaFormInvalidate', {items: items, value: true});
  };
};