module.exports = (function() {
  'use strict';

  angular.module('time', [])
    .service('Time', require('./time'));
})();
