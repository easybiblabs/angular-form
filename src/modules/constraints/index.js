module.exports = (function() {
  'use strict';

  // this hack is needed because
  // we include it as require module
  // and schemaForm needs it as angular module
  // both is not supported - see
  //
  // https://github.com/mike-marcacci/objectpath/blob/master/lib/ObjectPath.js#L75
  //
  // so we make it supported.

  angular.module('form-constraints', [
    /*
     'ObjectPath',
     'schemaForm',*/
    'pascalprecht.translate',
     'time'

  ])
    .factory('BaseConstraint', require('./base'))
    .factory('ChoiceConstraint', require('./choice'))
    .factory('DateRangeConstraint', require('./date-range'))
    .factory('LengthConstraint', require('./length'))
    .factory('RegexConstraint', require('./regex'))
    .factory('NotBlankConstraint', require('./not-blank'))
    .factory('MatchPropertyConstraint', require('./match-property'))
    .service('Mapper', require('./mapper'))
    .service('ConstraintMapper', require('./constraint-mapper'))
    .service('ConstraintMerger', require('./constraint-merger'));
})();
