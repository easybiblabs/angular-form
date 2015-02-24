require('moment');
require('angular');
require('jquery');
window.ObjectPath = require('objectpath');
require('angular-loading-bar');
require('angular-translate');
require('schema-form');
require('angular-summernote');
require('summernote-lang');

require('./../utility/time');
require('./../utility/objectpath');

module.exports = function(){
  'use strict';

  angular.module('formApp', [
    'pascalprecht.translate',
    'schemaForm',
    'summernote'
  ]);
};