module.exports = function(BaseConstraint, Time) {
  'use strict';

  /**
   *
   * @constructor
   */
  var Form = function() {
    this.result = {};
    this.constraints = {
      'min': 'minDate',
      'max': 'maxDate'
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

    try {
      this.result[fieldName][this.constraints[constrKey]] =
        Time.getLocaleString(constrVal);
    } catch (e) {
      this.result[fieldName][this.constraints[constrKey]] = constrVal;
    }
  };

  /**
   *
   * @constructor
   */
  var Schema = function() {
    this.result = {};
    this.constraints = {};
  };

  Schema.prototype = new BaseConstraint();
  Schema.prototype.constructor = Schema;

  /**
   * @inheritDoc
   * params: fieldName, constrKey, constrVal
   * currently no constraint for schema
   */
  Schema.prototype.add = function() {
  };

  return {Schema: Schema, Form: Form};
};
