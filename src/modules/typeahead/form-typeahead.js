module.exports = (function() {
  'use strict';

  /**
   * @ngInject
   */
  return function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

    var typeahead = function(name, schema, options) {
      if (schema.type === 'string' && schema.format === 'typeahead') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'typeahead';
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
