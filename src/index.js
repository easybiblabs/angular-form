require('moment');
require('angular');
require('jquery');
require('objectpath');
require('angular-loading-bar');
require('angular-translate');
require('schema-form');
require('angular-summernote');
require('summernote-lang');

require('./../utility/time');

module.exports = function(){
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
    this.parse = ObjectPath.parse;
    this.stringify = ObjectPath.stringify;
    this.normalize = ObjectPath.normalize;
    this.$get = function() {
      return ObjectPath;
    };
  });

  angular.module('formApp', [
    'ObjectPath',
    'pascalprecht.translate',
    'schemaForm',
    'summernote'
  ]);
};