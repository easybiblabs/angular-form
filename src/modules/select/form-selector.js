module.exports = function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

  // creates an default titleMap list from an enum, i.e. a list of strings.
  var enumToTitleMap = function(enm) {
    var titleMap = []; // canonical titleMap format is a list.
    enm.forEach(function(name) {
      titleMap.push({name: name, value: name});
    });
    return titleMap;
  };

  var selector = function(name, schema, options) {
    if (schema.type === 'string' && schema.format === 'select') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'selector';
      if (!f.titleMap && 'enum' in schema) {
        f.titleMap = enumToTitleMap(schema.enum);
      }
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  schemaFormProvider.defaults.string.unshift(selector);

  // Add to the bootstrap directive
  schemaFormDecoratorsProvider.addMapping(
    'scholarDecorator',
    'selector',
    'src/form/decorators/selector.html'
  );
  schemaFormDecoratorsProvider.createDirective(
    'selector',
    'src/form/decorators/selector.html'
  );
};