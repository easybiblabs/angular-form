window.jQuery = window.$ = require('jquery');
require('angular-schema-form');
require('angular-summernote');
require('ngSanitize');

require('./modules/sf-attrs');
require('./modules/datepicker');
require('./modules/decorators');
require('./modules/invalidator');
require('./modules/constraints');
require('./modules/texteditor');
require('./modules/select');

require('./utility/time');
require('./utility/objectpath');
require('./utility/summernote-lang');

module.exports = (function(){
  'use strict';

  angular.module('angular-form', [
    'form-constraints',
    'form-select',
    'form-invalidator',
    'form-texteditor',
    'form-decorators',
    'form-datepicker'
  ]);
})();
