module.exports = (function(){
  'use strict';

  function ConstraintMerger(ConstraintMapper, $translate) {
    this.constraintMapper = ConstraintMapper;
    this.$translate = $translate;
  }

  function getFieldNames(schema) {
    return Object.keys(schema.properties);
  }

  function diff(backendConstraints, fieldNames) {
    var self = this;
    angular.forEach(fieldNames, function(fieldName) {
      angular.forEach(backendConstraints[fieldName],
          function(constraintValues, constrGrp) {
            // when constraint is available on the frontend
            // iterate though serverside constraints and map them to frontend
            angular.forEach(constraintValues, function(constrVal, constrKey) {
              var mapper = self.constraintMapper.getMapper(constrGrp);
              if (mapper) {
                if (angular.isString(constrVal)) {
                  constrVal = self.$translate.instant(constrVal);
                }
                // to work around less informative
                // constraint export from backend

                // until that gets improved
                // we need to check here
                // if we need to set that field to required
                if (constrGrp === 'NotBlank') {
                  mapper.map(fieldName, constrGrp);
                }

                mapper.map(fieldName, constrKey, constrVal);
              }
            });
          });
    });

    return self.constraintMapper.getResult();
  }

  function merge(_diff, form, schema) {
    // apply constraintsDiff
    // this is the part where we merge the diff into the frontend constraints
    // we're using jquery.extend because we don't want to overwrite existing properties
    // angular.extend causes properties to be overwritten
    // try it, there is a test for it =)
    angular.forEach(form[0].items, function(value) {
      if (angular.isDefined(_diff.form[value.name])) {
        jQuery.extend(true, value, _diff.form[value.name]);
      }
    });

    angular.forEach(schema.properties, function(value, key) {
      if (angular.isDefined(_diff.schema[key])) {
        jQuery.extend(value, _diff.schema[key]);
      }
    });

    if (angular.isDefined(_diff.schema.required)) {
      schema.required = angular.copy(_diff.schema.required);
    }
  }

  function translateRecursive(formDefinitions) {
    var self = this;
    angular.forEach(formDefinitions, function(value, key) {
      if (angular.isArray(value) || angular.isObject(value)) {
        translateRecursive.call(self, formDefinitions[key]);
      } else if (angular.isString(value)) {
        formDefinitions[key] = self.$translate.instant(value);
      }
    });
  }

  ConstraintMerger.prototype = {
    process: function(backendConstraints, frontendConstraints) {
      var form = frontendConstraints.form,
        schema = frontendConstraints.schema,
        myDiff = diff.call(this, backendConstraints, getFieldNames(schema || { properties: {}}));

      merge.call(this, myDiff, form, schema);
      translateRecursive.call(this, frontendConstraints);
    },
    // I feel like we need to expose the following three methods so we can test
    // them, but they really shouldn't be public / considered part of the API.
    // What to do?
    diff: diff,
    getFieldNames: getFieldNames,
    merge: merge
  };

  return ConstraintMerger;
})();
