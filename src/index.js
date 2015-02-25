require('./utility/objectpath');
require('./utility/time');
require('./utility/summernote-lang');

module.exports = (function(){
  'use strict';

  var app = angular.module('angular-form', [
    'time',
    'angular-sanitize',
    'summernote',
    'pascalprecht.translate',
    'schemaForm'
  ]);

  app.factory('BaseConstraint', require('./modules/constraints/base'))
    .factory('ChoiceConstraint', require('./modules/constraints/choice'))
    .factory('DateRangeConstraint', require('./modules/constraints/date-range'))
    .factory('LengthConstraint', require('./modules/constraints/length'))
    .factory('RegexConstraint', require('./modules/constraints/regex'))
    .factory('NotBlankConstraint', require('./modules/constraints/not-blank'))
    .factory('MatchPropertyConstraint', require('./modules/constraints/match-property'))
    .service('Mapper', require('./modules/constraints/mapper'))
    .service('ConstraintMapper', require('./modules/constraints/constraint-mapper'))
    .service('ConstraintMerger', require('./modules/constraints/constraint-merger'));

  app.directive('pickADate', require('./modules/datepicker/angular-pickadate'))
    .config(require('./modules/datepicker/form-datepicker'));

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

  app.run(["$templateCache", function($templateCache) {$templateCache.put("src/form/decorators/actions-trcl.html","<div class=\"btn-group {{ form.containerStyle }}\" ng-transclude=\"\"></div>");
    $templateCache.put("src/form/decorators/actions.html","<div class=\"btn-group {{ form.containerStyle }}\"><input ng-repeat-start=\"item in form.items\" type=\"submit\" class=\"btn {{ item.style || \'btn-primary\' }}\" name=\"{{ item.name }}\" value=\"{{item.title}}\" ng-if=\"item.type === \'submit\'\" sf-attrs=\"{{item.attributes}}\"> <button ng-repeat-end=\"\" class=\"btn {{ item.style || \'btn-default\' }}\" type=\"button\" name=\"{{ item.name }}\" ng-if=\"item.type !== \'submit\'\" ng-click=\"buttonClick($event,item)\" sf-attrs=\"{{item.attributes}}\"><i ng-if=\"item.iconBefore\"></i> {{item.title}} <i ng-if=\"item.iconAfter\"></i></button></div>");
    $templateCache.put("src/form/decorators/array.html","<div sf-array=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" class=\"{{ form.containerStyle }}\"><h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3><ul class=\"list-group\" ng-model=\"modelArray\" ui-sortable=\"\"><li class=\"list-group-item\" ng-repeat=\"item in modelArray track by $index\"><button ng-click=\"deleteFromArray($index)\" style=\"position: relative; z-index: 20;\" type=\"button\" class=\"close pull-right\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button><sf-decorator form=\"copyWithIndex($index)\"></sf-decorator></li><div class=\"clearfix\" style=\"padding: 15px;\"><button ng-click=\"appendToArray()\" type=\"button\" class=\"btn {{ form.style.add || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</button></div><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div></ul></div>");
    $templateCache.put("src/form/decorators/checkbox.html","<div class=\"checkbox {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\"><label><input type=\"checkbox\" sf-changed=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\"> <span ng-bind-html=\"form.title\"></span></label><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div></div>");
    $templateCache.put("src/form/decorators/checkboxes.html","<div sf-array=\"form\" class=\"form-group {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\"><label ng-show=\"showTitle()\">{{form.title}}</label><div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\"><label><input type=\"checkbox\" sf-changed=\"form\" ng-model=\"titleMapValues[$index]\"> <span ng-bind-html=\"form.titleMap[$index].name\"></span></label></div><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div></div>");
    $templateCache.put("src/form/decorators/datepicker.html","<div class=\"form-group datepicker {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><input class=\"datepicker_input form-control\" style=\"display: none;\" ng-show=\"form.key\" type=\"date\" ng-required=\"form.required\" schema-validate=\"form\" ng-model=\"$$value$$\" pick-a-date=\"\" ng-class=\"{filled: $$value$$.length}\" format=\"form.format\" min-date=\"form.minDate\" max-date=\"form.maxDate\"> <input class=\"datepicker_editable_input form-control\" name=\"{{ form.name }}\" ng-required=\"form.required\" ng-class=\"{filled: $$value$$.length}\" sf-attrs=\"{{ form.attributes }}\"> <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label> <label class=\"ghost-label\" translate=\"application.date.format\"></label> <i class=\"calendar-icon\"></i> <span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div></div>");
    $templateCache.put("src/form/decorators/default.html","<div class=\"form-group {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><input ng-show=\"form.key\" sf-invalidate=\"{{ form.invalidate }}\" type=\"{{form.type}}\" name=\"{{ form.name }}\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control\" ng-required=\"form.required\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" schema-validate=\"form\" disable-auto-size=\"{{!form.autoSize}}\" auto-size-input=\"\" ng-class=\"{filled: $$value$$.length}\" maxlength=\"{{ form.maxlength }}\" sf-attrs=\"{{form.attributes}}\"> <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label> <span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div><div class=\"form-info-link\" ng-if=\"form.infoLink\"><a ui-sref=\"{{form.infoLink.route}}\">{{form.infoLink.text | translate}}</a></div></div>");
    $templateCache.put("src/form/decorators/fieldset-trcl.html","<fieldset class=\"{{ form.containerStyle }}\" ng-disabled=\"form.readonly\"><legend ng-show=\"form.title\">{{ form.title }}</legend><div ng-transclude=\"\"></div></fieldset>");
    $templateCache.put("src/form/decorators/fieldset.html","<fieldset class=\"{{ form.containerStyle }}\" ng-disabled=\"form.readonly\"><legend ng-show=\"form.title\">{{ form.title }}</legend><sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator></fieldset>");
    $templateCache.put("src/form/decorators/help.html","<div class=\"form-helpvalue {{ form.style }}\" ng-include=\"form.templateUrl\"></div>");
    $templateCache.put("src/form/decorators/radio-buttons.html","<div class=\"form-group {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\"><div><label ng-show=\"showTitle()\">{{form.title}}</label></div><div class=\"btn-group\"><label class=\"btn {{ (item.value === $$value$$) ? form.style.selected || \'btn-primary\' : form.style.unselected || \'btn-primary\'; }}\" ng-class=\"{ active: item.value === $$value$$ }\" ng-repeat=\"item in form.titleMap\"><input type=\"radio\" sf-changed=\"form\" style=\"display: none;\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" ng-value=\"item.value\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div></div>");
    $templateCache.put("src/form/decorators/radios.html","<div class=\"form-group {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\"><label ng-show=\"showTitle()\">{{form.title}}</label><div class=\"radio\" ng-repeat=\"item in form.titleMap\"><label><input type=\"radio\" sf-changed=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" ng-value=\"item.value\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div></div>");
    $templateCache.put("src/form/decorators/readonly.html","<div class=\"form-group {{ form.containerStyle }}\"><input ng-if=\"form.type !== \'textarea\'\" type=\"text\" disabled=\"\" class=\"form-control\" value=\"{{$$value$$}}\"> <label ng-show=\"showTitle()\">{{form.title}}</label> <textarea ng-if=\"form.type === \'textarea\'\" disabled=\"\" class=\"form-control\">{{$$value$$}}</textarea><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div></div>");
    $templateCache.put("src/form/decorators/section.html","<div class=\"{{ form.containerStyle }}\" ng-if=\"!form.condition || evalExpr(form.condition,{ model: model })\"><sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator></div>");
    $templateCache.put("src/form/decorators/selector.html","<div class=\"form-group {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}\"><select ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" sf-changed=\"form\" class=\"form-control\" schema-validate=\"form\" select-two=\"\" config=\"form.config\" ng-required=\"form.required\" ng-class=\"{filled: $$value$$.length}\" ng-options=\"option.value as option.name for option in form.titleMap\"><option></option></select><label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label> <span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div></div>");
    $templateCache.put("src/form/decorators/submit.html","<div class=\"form-group {{ form.containerStyle }}\"><input name=\"{{ form.name }}\" type=\"submit\" class=\"btn {{ form.style || \'btn-primary\' }}\" value=\"{{form.title}}\" ng-if=\"form.type === \'submit\'\" sf-attrs=\"{{form.attributes}}\"> <button class=\"btn {{ form.style || \'btn-default\' }}\" type=\"button\" name=\"{{ form.name }}\" ng-click=\"buttonClick($event,form)\" ng-if=\"form.type !== \'submit\'\" sf-attrs=\"{{form.attributes}}\"><i ng-if=\"form.iconBefore\"></i> {{form.title}} <i ng-if=\"form.iconAfter\"></i></button></div>");
    $templateCache.put("src/form/decorators/tabarray.html","<div sf-array=\"form\" ng-init=\"selected = { tab: 0 }\" class=\"clearfix {{ form.containerStyle }}\"><div ng-if=\"!form.tabType || form.tabType !== \'right\'\" ng-class=\"{\'col-xs-3\': !form.tabType || form.tabType === \'left\'}\"><ul class=\"nav nav-tabs\" ng-class=\"{ \'tabs-left\': !form.tabType || form.tabType === \'left\'}\" style=\"margin-bottom: 15px\"><li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{evalExpr(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-click=\"$event.preventDefault() || appendToArray()\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li></ul></div><div ng-class=\"{\'col-xs-9\': !form.tabsType || form.tabsType === \'left\' || form.tabsType === \'right\'}\"><div class=\"tab-content\"><div class=\"tab-pane clearfix\" ng-repeat=\"item in modelArray track by $index\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><sf-decorator form=\"copyWithIndex($index)\"></sf-decorator><button ng-click=\"deleteFromArray($index)\" type=\"button\" class=\"btn {{ form.style.remove || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-trash\"></i> {{ form.remove || \'Remove\'}}</button></div></div></div><div ng-if=\"form.tabType === \'right\'\" class=\"col-xs-3\"><ul class=\"nav nav-tabs tabs-right\" style=\"margin-bottom: 15px\"><li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{evalExpr(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-click=\"$event.preventDefault() || appendToArray()\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li></ul></div></div>");
    $templateCache.put("src/form/decorators/tabs.html","<div ng-init=\"selected = { tab: 0 }\" class=\"{{ form.containerStyle }}\"><ul class=\"nav nav-tabs\" style=\"margin-bottom: 15px\"><li ng-repeat=\"tab in form.tabs\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{ tab.title }}</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane\" ng-repeat=\"tab in form.tabs\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><bootstrap-decorator ng-repeat=\"item in tab.items\" form=\"item\"></bootstrap-decorator></div></div></div>");
    $templateCache.put("src/form/decorators/textarea.html","<div class=\"form-group has-feedback {{ form.containerStyle }}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\"><label ng-show=\"showTitle()\">{{form.title}}</label> <textarea class=\"form-control\" sf-changed=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\"></textarea><span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span></div>");
    $templateCache.put("src/form/decorators/texteditor.html","<div class=\"form-group texteditor {{form.containerStyle}}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><summernote class=\"textarea\" ng-class=\"{filled: $$value$$.length}\" ng-model=\"$$value$$\" config=\"form.options\" sf-attrs=\"{{form.attributes}}\"></summernote><label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label></div>");}]);

  app.service('FormValidator', require('./modules/invalidator/form-validator'))
    .directive('sfInvalidator', require('./modules/invalidator/sf-invalidator'))
    .directive('sfInvalidate', require('./modules/invalidator/sf-invalidate'));

  app.config(require('./modules/select/form-selector'))
    .directive('selectTwo', require('./modules/select/angular-select2'));


  app.directive('sfAttrs', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var attrsToAdd = scope.$eval(attrs.sfAttrs);
        for (var attrName in attrsToAdd) {
          elem.attr(attrName, attrsToAdd[attrName]);
        }
      }
    };
  });

  app.config(require('./modules/texteditor/form-texteditor'));
})();
