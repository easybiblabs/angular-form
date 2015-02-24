module.exports = (function(){
  'use strict';

  // this hack is needed because
  // we include it as require module
  // and schemaForm needs it as angular module
  // both is not supported - see
  //
  // https://github.com/mike-marcacci/objectpath/blob/master/lib/ObjectPath.js#L75
  //
  // so we make it supported.
  angular.module('ObjectPath', []).provider('ObjectPath', function() {
    this.parse = window.ObjectPath.parse;
    this.stringify = window.ObjectPath.stringify;
    this.normalize = window.ObjectPath.normalize;
    this.$get = function() {
      return window.ObjectPath;
    };
  });
})();