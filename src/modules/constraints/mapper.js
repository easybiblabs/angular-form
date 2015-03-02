module.exports = function() {
  'use strict';

  /**
   *
   * @param {Constraint} schemaMapper
   * @param {Constraint} formMapper
   * @constructor
   */
  var Mapper = function(schemaMapper, formMapper) {
    this.getResult = function() {
      return {
        form: formMapper.getResult(),
        schema: schemaMapper.getResult()
      };
    };

    this.map = function(fieldName, constrKey, constrVal) {

      if (schemaMapper.hasConstraint(constrKey)) {
        schemaMapper.add(fieldName, constrKey, constrVal);
      }
      if (formMapper.hasConstraint(constrKey)) {
        formMapper.add(fieldName, constrKey, constrVal);
      }
    };
  };

  return Mapper;
};
