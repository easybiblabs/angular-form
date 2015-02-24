module.exports = function(){
  'use strict';

  angular.module('form-texteditor', [
    'ObjectPath',
    'pascalprecht.translate',
    'schemaForm',
    'summernote'
  ]).app.config(require('./form-texteditor'));
};