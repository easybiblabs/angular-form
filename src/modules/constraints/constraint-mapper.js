module.exports = (function() {
  'use strict';

  return function(
    DateRangeConstraint,
    LengthConstraint,
    NotBlankConstraint,
    ChoiceConstraint,
    RegexConstraint,
    MatchPropertyConstraint,
    Mapper
  ) {
    /**
     * map of backend validation constraint name => to frontend implementation of that constraint
     */
    var constraintMapper = {
      DateRange: DateRangeConstraint,
      Length: LengthConstraint,
      NotBlank: NotBlankConstraint,
      Choice: ChoiceConstraint,
      StateChoice: ChoiceConstraint,
      Regex: RegexConstraint,
      MatchProperty: MatchPropertyConstraint
    };
    var active = {};
    return {
      // because services are singleton
      // we need to reset the active list
      // to get a fresh mapper on next getMapper calls
      // to the same constraint group
      reset: function() {
        active = {};
      },
      getMapper: function(constrGrp) {
        if (angular.isDefined(active[constrGrp])) {
          return active[constrGrp];
        }
        if (angular.isUndefined(constraintMapper[constrGrp])) {
          return false;
        }
        // if mapped to shema or to form is listed here
        // https://github.com/Textalk/angular-schema-form/blob/master/docs/index.md
        var mapper = new Mapper(
          new constraintMapper[constrGrp].Schema(),
          new constraintMapper[constrGrp].Form()
        );
        active[constrGrp] = mapper;
        return mapper;
      },
      getResult: function() {
        var result = {form: {}, schema: {}};

        angular.forEach(active, function(val) {
          var part = val.getResult();

          jQuery.extend(true, result.form, part.form);
          // deep copy for schema is currently not needed
          // if so, set first arg to true
          jQuery.extend(result.schema, part.schema);
        });

        this.reset();

        return result;
      }
    };
  };
})();
