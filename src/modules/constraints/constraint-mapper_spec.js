require('./index');

describe('constraint mapper service', function() {
  'use strict';

  var service;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_ConstraintMapper_) {
    service = _ConstraintMapper_;
  }));

  it('should map backend constraints correctly', function() {
    service.getMapper('Length')
      .map('testTitle', 'maxMessage', 'test.title.length.max');
    service.getMapper('NotBlank')
      .map('testTitle', 'message', 'test.required');
    service.getMapper('NotBlank')
      .map('testTitle', 'NotBlank');
    var result = service.getResult();

    expect(result.form).to.be.deep.equal({
      testTitle: {
        validationMessage: {
          201: 'test.title.length.max',
          'default': 'test.required'
        }
      }
    });

    expect(result.schema).to.be.deep.equal({
      required: [
        'testTitle'
      ]
    });
  });
});
