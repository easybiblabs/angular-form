require('moment');
require('angular');
require('jquery');
window.ObjectPath = require('objectpath');
require('angular-loading-bar');
require('angular-translate');
require('angular-schema-form');
require('summernote');
require('angular-summernote');
require('select2');

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
