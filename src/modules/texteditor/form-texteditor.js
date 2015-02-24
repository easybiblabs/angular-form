module.exports = function() {
  'use strict';

  return function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

    var texteditor = function(name, schema, options) {
      if (schema.type === 'string' && schema.format === 'editor') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'texteditor';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(texteditor);

    // Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'scholarDecorator',
      'texteditor',
      'src/form/decorators/texteditor.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'texteditor',
      'src/form/decorators/texteditor.html'
    );
  }
};