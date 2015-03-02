module.exports = function(BaseConstraint) {
  'use strict';

  /**
   * @constructor
   */
  var Form = function() {
    this.result = {};
    /**
     * error codes
     * https://github.com/geraintluff/tv4/blob/master/tv4.js#L1317
     * tv4.errorCodes.STRING_PATTERN: 202
     */
    this.constraints = {
      'message': '202'
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
      'pattern': 'pattern'
    };

  };

  Schema.prototype = new BaseConstraint();
  Schema.prototype.constructor = Schema;

  /**
   * @inheritDoc
   */
  Schema.prototype.add = function(fieldName, constrKey, constrVal) {
    if (angular.isUndefined(this.result[fieldName])) {
      this.result[fieldName] = {pattern: ''};
    }
    // from backend: "/foo/", but we need "foo"
    var regexpString = constrVal.substring(1, constrVal.length - 1);
    this.result[fieldName].pattern = new RegExp(regexpString);
  };

  return {Schema: Schema, Form: Form};
};
