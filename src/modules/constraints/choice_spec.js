require('./index');

describe('choice constraint mapper', function() {
  'use strict';

  var mapper;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_ChoiceConstraint_, _Mapper_) {
    mapper = new _Mapper_(new _ChoiceConstraint_.Schema(), new _ChoiceConstraint_.Form());
  }));

  it('should map correct schema constraints', function() {
    var schemaConstraint = {
      'testTitle': {
        enum: ['foo', 'bar', 'baz', 'qux', 'quux']
      }
    };

    mapper.map('testTitle', 'choices', ['foo', 'bar', 'baz', 'qux', 'quux']);

    expect(mapper.getResult().schema).to.deep.equal(schemaConstraint);
  });
});
