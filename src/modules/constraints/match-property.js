module.exports = function(BaseConstraint) {
  'use strict';

  /**
   * @constructor
   */
  var Form = function() {
    this.result = {};

    this.constraints = {
      'message': 'message',
      'property': 'property'
    };
  };

  Form.prototype = new BaseConstraint();
  Form.prototype.constructor = Form;

  /**
   * @inheritDoc
   */
  Form.prototype.add = function(fieldName, constrKey, constrVal) {

    if (angular.isUndefined(this.result[fieldName])) {
      this.result[fieldName] = {};
    }

    if (constrKey === 'message') {

      // add error message
      this.result[fieldName].validationMessage = constrVal;

    } else if (constrKey === 'property') {

      // add actual validation

      var quoteIntoRegexp = function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      };

      // update when _this_ field changes (say, "confirmPassword")
      this.result[fieldName].onChange = function(modelValue, formElement) {
        var compareTo = $('input[ng-model][name=' + constrVal + ']').val();
        formElement.schema.pattern = new RegExp('^' + quoteIntoRegexp(compareTo) + '$');
      };

      // trigger update when the compared field changes (say, "password")
      if (angular.isUndefined(this.result[constrVal])) {
        this.result[constrVal] = {};
      }
      this.result[constrVal].onChange = function(modelValue) {
        if (typeof modelValue === 'undefined') {
          return;
        }
        // get the scope for the "changePassword" field
        var originalField = $('input[ng-model][name=' + fieldName + ']');
        var element = angular.element(originalField.parent()[0]);
        var scope = element.scope();
        // update "changePassword"'s schema + trigger validation if there's something in there
        scope.form.schema.pattern = new RegExp('^' + quoteIntoRegexp(modelValue) + '$');
        if (originalField.val().length > 0) {
          scope.$broadcast('schemaFormValidate');
        }
      };
    }
  };

  /**
   * @constructor
   */
  var Schema = function() {
    this.result = {};
    this.constraints = {};
  };

  Schema.prototype = new BaseConstraint();
  Schema.prototype.constructor = Schema;

  return {Schema: Schema, Form: Form};
};
