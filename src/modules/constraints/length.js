module.exports = function(BaseConstraint) {
  'use strict';

  /**
   * @constructor
   */
  var Form = function() {
    this.result = {};
    /**
     * error codes
     *
     * read the source
     *
     * https://github.com/geraintluff/tv4/blob/master/tv4.js#L1317
     *
     * tv4.errorCodes.STRING_LENGTH_SHORT: 200
     * tv4.errorCodes.STRING_LENGTH_LONG: 201
     */

    this.constraints = {
      'maxMessage': '201',
      'minMessage': '200'
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
    this.result = {};
    this.constraints = {
      'max': 'maxLength',
      'min': 'minLength'
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
    if (constrVal === null) {
      return;
    }
    this.result[fieldName][this.constraints[constrKey]] = constrVal;
  };

  return {Schema: Schema, Form: Form};
};
