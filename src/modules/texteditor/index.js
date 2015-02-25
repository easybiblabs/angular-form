module.exports = (function() {
  'use strict';

  angular.module('form-texteditor', [
    'form-decorators',
    'pascalprecht.translate',
    'schemaForm',
    'summernote'
  ]).config(require('./form-texteditor'));
})();
