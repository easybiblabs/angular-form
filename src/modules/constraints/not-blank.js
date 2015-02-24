module.exports = function(BaseConstraint) {
  'use strict';

  /**
   * @constructor
   */
  var Form = function() {
    this.result = {};

    this.constraints = {
      'message': 'default'
    };
  };

  Form.prototype = new BaseConstraint();
  Form.prototype.constructor = Form;

  /**
   * @inheritDoc
   */
  Form.prototype.add = function(fieldName, constrKey, constrVal) {
    if (angular.isUndefined(this.result[fieldName])) {
      this.result[fieldName] = {'validationMessage': {}};
    }

    this.result[fieldName].
      validationMessage[this.constraints[constrKey]] = constrVal;
  };

  /**
   *
   * @constructor
   */
  var Schema = function() {
    this.result = {
      'required': []
    };
    this.constraints = {
      'NotBlank': 'NotBlank'
    };

  };

  Schema.prototype = new BaseConstraint();
  Schema.prototype.constructor = Schema;

  /**
   * @inheritDoc
   */
  Schema.prototype.add = function(fieldName) {
    this.result.required.push(fieldName);
  };

  return {Schema: Schema, Form: Form};
};
