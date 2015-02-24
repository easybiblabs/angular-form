require('./index');

describe('matchProperty constraint mapper', function() {
  'use strict';

  var mapper;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_Mapper_, _MatchPropertyConstraint_) {
    mapper = new _Mapper_(new _MatchPropertyConstraint_.Schema(), new _MatchPropertyConstraint_.Form());
  }));

  it('should map correct form constraints for the message', function() {
    var formConstraint = {
      'testTitle': {
        validationMessage: 'foo-message'
      }
    };

    mapper.map('testTitle', 'message', 'foo-message');
    expect(formConstraint).to.deep.equal(mapper.getResult().form);
  });

  it('should create correct onChange functions', function() {

    mapper.map('field1', 'message', 'foo-message');
    mapper.map('field1', 'property', 'field2');

    var result = mapper.getResult();
    expect(result.form.field1.validationMessage).to.equal('foo-message');

    expect(result.schema).to.be.an('object');
    expect(result.form.field1.onChange).to.be.a('function');
    expect(result.form.field2.onChange).to.be.a('function');
  });
});
