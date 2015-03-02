module.exports = (function() {
  'use strict';

  var app = angular.module('form-decorators', [
    'schemaForm'
  ]);

  require('./form-decorators-cache');

  var base = 'src/form/decorators/';

  app.config(['schemaFormDecoratorsProvider', function(decoratorsProvider) {
    decoratorsProvider.createDecorator('scholarDecorator', {
      textarea: base + 'textarea.html',
      fieldset: base + 'fieldset.html',
      array: base + 'array.html',
      tabarray: base + 'tabarray.html',
      tabs: base + 'tabs.html',
      section: base + 'section.html',
      conditional: base + 'section.html',
      actions: base + 'actions.html',
      checkbox: base + 'checkbox.html',
      checkboxes: base + 'checkboxes.html',
      number: base + 'default.html',
      password: base + 'default.html',
      submit: base + 'submit.html',
      button: base + 'submit.html',
      radios: base + 'radios.html',
      radiobuttons: base + 'radio-buttons.html',
      help: base + 'help.html',
      'default': base + 'default.html'
    }, [
      function(form) {
        if (form.readonly && form.key && form.type !== 'fieldset') {
          return base + 'readonly.html';
        }
      }
    ]);

    // manual use directives
    decoratorsProvider.createDirectives({
      textarea: base + 'textarea.html',
      checkbox: base + 'checkbox.html',
      checkboxes: base + 'checkboxes.html',
      number: base + 'default.html',
      submit: base + 'submit.html',
      button: base + 'submit.html',
      text: base + 'default.html',
      date: base + 'default.html',
      password: base + 'default.html',
      input: base + 'default.html',
      radios: base + 'radios.html',
      radiobuttons: base + 'radio-buttons.html'
    });
  }]);

  app.directive('sfFieldset', function() {
    return {
      transclude: true,
      scope: true,
      templateUrl: base + 'fieldset-trcl.html',
      link: function(scope, element, attrs) {
        scope.title = scope.$eval(attrs.title);
      }
    };
  });

})();
