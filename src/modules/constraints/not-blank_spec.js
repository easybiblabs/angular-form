require('./index');

describe('notBlank constraint mapper', function() {
  'use strict';

  var mapper;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_Mapper_, _NotBlankConstraint_) {
    mapper = new _Mapper_(new _NotBlankConstraint_.Schema(), new _NotBlankConstraint_.Form());
  }));

  it('should map correct form constraints', function() {
    var formConstraint = {
      'testTitle': {
        validationMessage: {
          'default': 'required.message',
		  302: 'required.message'
        }
      }
    };

    mapper.map('testTitle', 'message', 'required.message');
    expect(formConstraint).to.deep.equal(mapper.getResult().form);
  });

  it('should map correct schema constraints', function() {
    var schemaConstraint = {
      'required': [
        'testTitle'
      ]
    };

    mapper.map('testTitle', 'NotBlank');
    expect(schemaConstraint).to.deep.equal(mapper.getResult().schema);
  });
});
