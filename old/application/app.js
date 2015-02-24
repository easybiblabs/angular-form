define([
  'form/application/bootstrap',
  'form/decorators/form-decorators-cache',
  'form/decorators/form-decorators',
  'form/datepicker/form-datepicker',
  'form/datepicker/angular-pickadate',
  'form/texteditor/form-texteditor',
  'form/select/angular-select2',
  'form/select/form-selector',
  'form/directives/autofill-fix',
  'form/directives/sf-attrs',
  'form/invalidator/index',
  'form/lib/form-validator'
], function(app) {
  'use strict';
  /**
   * this file is needed to circumvent circular dependencies between
   * form-decorators - schemaForm - formApp
   */
  return app;
});
