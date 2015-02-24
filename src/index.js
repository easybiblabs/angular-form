require('moment');
require('angular');
require('jquery');
window.ObjectPath = require('objectpath');
require('angular-loading-bar');
require('angular-translate');
require('schema-form');
require('angular-summernote');
require('summernote-lang');
require('select2');

require('./../modules/sf-attrs');
require('./../modules/datepicker');
require('./../modules/decorators');
require('./../modules/invalidator');
require('./../modules/constraints');
require('./../modules/select');

require('./../utility/time');
require('./../utility/objectpath');

module.exports = function(){
  'use strict';

  angular.module('angular-form', [
    'form-constraints',
    'form-select',
    'form-invalidator',
    'form-texteditor',
    'form-decorators',
    'form-datepicker'
  ]);
};
