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

})();
