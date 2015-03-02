require('./index');

describe('regex constraint mapper', function() {
  'use strict';

  var mapper;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_Mapper_, _RegexConstraint_) {
    mapper = new _Mapper_(new _RegexConstraint_.Schema(), new _RegexConstraint_.Form());
  }));

  it('should map correct form constraints', function() {
    var formConstraint = {
      'testTitle': {
        validationMessage: {
          202: 'test.message'
        }
      }
    };

    mapper.map('testTitle', 'message', 'test.message');
    expect(formConstraint).to.deep.equal(mapper.getResult().form);
  });

  it('should map correct schema constraints', function() {

    var schemaConstraint = {
      'testTitle': {
        pattern: /foo/
      }
    };
    mapper.map('testTitle', 'pattern', '/foo/');
    expect(schemaConstraint).to.deep.equal(mapper.getResult().schema);

    schemaConstraint = {
      'testTitle': {
        pattern: /fo\/o/
      }
    };
    mapper.map('testTitle', 'pattern', '/fo\\/o/');
    expect(schemaConstraint).to.deep.equal(mapper.getResult().schema);
  });
});
