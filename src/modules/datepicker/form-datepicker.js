module.exports = function() {
  'use strict';

  function Datepicker(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

    var datepicker = function(name, schema, options) {
      if (schema.type === 'string' && schema.format === 'date') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'datepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(datepicker);

    // Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'scholarDecorator',
      'datepicker',
      'src/form/decorators/datepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'datepicker',
      'src/form/decorators/datepicker.html'
    );
  }

  return Datepicker;
};
