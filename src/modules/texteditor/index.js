module.exports = (function(){
  'use strict';

  angular.module('form-texteditor', [
    'pascalprecht.translate',
    'schemaForm',
    'summernote'
  ]).config(require('./form-texteditor'));
})();