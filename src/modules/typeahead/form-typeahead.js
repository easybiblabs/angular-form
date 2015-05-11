module.exports = (function() {
  'use strict';

  var enumToTitleMap = function(enm) {
    var titleMap = []; // canonical titleMap format is a list.
    enm.forEach(function(name) {
      titleMap.push({name: name, value: name});
    });
    return titleMap;
  };

  /* @ngInject */
  return function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

    var typeahead = function(name, schema, options) {
      if (schema.type === 'string' && schema.format === 'typeahead') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'typeahead';
        if (!f.titleMap && 'enum' in schema) {
          f.titleMap = enumToTitleMap(schema.enum);
        }
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(typeahead);

    schemaFormDecoratorsProvider.addMapping(
      'scholarDecorator',
      'typeahead',
      'src/form/decorators/typeahead.html'
    );

    schemaFormDecoratorsProvider.createDirective(
      'typeahead',
      'src/form/decorators/typeahead.html'
    );
  };
}());
