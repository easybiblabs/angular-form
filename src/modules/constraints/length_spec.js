require('./index');

describe('length constraint mapper', function() {
  'use strict';

  var mapper;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_Mapper_, _LengthConstraint_) {
    mapper = new _Mapper_(new _LengthConstraint_.Schema(), new _LengthConstraint_.Form());
  }));

  it('should map correct form constraints', function() {
    var formConstraint = {
      'testTitle': {
        validationMessage: {
          200: 'test.min.message',
          201: 'test.max.message'
        }
      }
    };

    mapper.map('testTitle', 'minMessage', 'test.min.message');
    mapper.map('testTitle', 'maxMessage', 'test.max.message');
    expect(formConstraint).to.deep.equal(mapper.getResult().form);
  });

  it('should map correct schema constraints', function() {
    var schemaConstraint = {
      'testTitle': {
        maxLength: 5,
        minLength: 1
      }
    };

    mapper.map('testTitle', 'max', 5);
    mapper.map('testTitle', 'min', 1);

    expect(schemaConstraint).to.deep.equal(mapper.getResult().schema);
  });

  it('should support leaving one side empty', function() {
    var schemaConstraint = {
      'testTitle': {
        minLength: 1
      }
    };

    mapper.map('testTitle', 'max', null);
    mapper.map('testTitle', 'min', 1);

    expect(schemaConstraint).to.deep.equal(mapper.getResult().schema);
  });
});
