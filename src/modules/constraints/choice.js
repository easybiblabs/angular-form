module.exports = function(BaseConstraint) {
  'use strict';

  /**
   * @constructor
   */
  var Form = function() {
    this.result = {};
    this.constraints = {
      'message': 'message'
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
    this.result[fieldName].validationMessage = constrVal;
  };

  /**
   * @constructor
   */
  var Schema = function() {
    this.result = {};
    this.constraints = {
      'choices': 'enum'
    };

  };

  Schema.prototype = new BaseConstraint();
  Schema.prototype.constructor = Schema;

  /**
   * @inheritDoc
   */
  Schema.prototype.add = function(fieldName, constrKey, constrVal) {
    if (angular.isUndefined(this.result[fieldName])) {
      this.result[fieldName] = {};
    }
    this.result[fieldName][this.constraints[constrKey]] = constrVal;
  };

  return {Schema: Schema, Form: Form};
};
