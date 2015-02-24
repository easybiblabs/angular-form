module.exports = function() {
  'use strict';

  var BaseConstraint = function() {
  };
  BaseConstraint.prototype.hasConstraint = function(constrKey) {
    return angular.isDefined(this.constraints[constrKey]);
  };

  BaseConstraint.prototype.getResult = function() {
    return this.result;
  };

  /**
   * @param {string} fieldName
   * @param {string} constrKey
   * @param {string} constrVal
   */
  BaseConstraint.prototype.add = function(/*fieldName, constrKey, constrVal*/) {
    /** logic to add the constraint to this.result needs to be implemented **/
    throw new Error('Method add not implemented');
  };

  return BaseConstraint;
};
