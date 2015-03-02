require('./index');
require('angular-translate');

describe('constraintMerger', function() {
  'use strict';

  var ConstraintMerger;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_ConstraintMerger_) {
    ConstraintMerger = _ConstraintMerger_;
  }));

  describe('#diff()', function() {
    it('creates frontend constraints from backend constraints', function() {
      var backendConstraints = {
        'notTestedTitle': {
          'justForCoverage': true
        },
        'testTitle': {
          'Length': {
            'maxMessage': 'test.title.length.max',
            'minMessage': 'test.title.length.min',
            'max': 100,
            'min': 5,
            'charset': 'UTF-8'
          },
          'NotBlank': {
            'message': 'test.required'
          },
          'NotImplemented': {
            'someThing': 'a'
          }
        }
      };

      var diff = ConstraintMerger.diff(backendConstraints, ['testTitle']);
      diff.form.should.deep.equal({
        'testTitle': {
          validationMessage: {
            200: 'test.title.length.min',
            201: 'test.title.length.max',
            'default': 'test.required'
          }
        }
      });

      diff.schema.should.deep.equal({
        'testTitle': {
          minLength: 5,
          maxLength: 100
        },
        required: [
          'testTitle'
        ]
      });

    });

    it('merges backend constraints into frontend constraints', function() {
      var frontendConstraints = {
        schema: {
          properties: {
            testTitle: {
              title: 'Title'
            }
          }
        },
        form: [
          {
            items: [
              {
                name: 'testTitle'
              }
            ]
          }
        ]
      };

      var backendConstraints = {
        'testTitle': {
          'NotBlank': {
            'message': 'test.required'
          },
          'Length': {
            'maxMessage': 'test.title.length.max',
            'minMessage': 'test.title.length.min',
            'max': 100,
            'min': 5,
            'charset': 'UTF-8'
          }
        }
      };

      ConstraintMerger.process(backendConstraints, frontendConstraints);

      frontendConstraints.schema.properties.testTitle.should.deep.equal({
        title: 'Title',
        minLength: 5,
        maxLength: 100
      });

      frontendConstraints.form[0].items[0].should.deep.equal({
        name: 'testTitle',
        validationMessage: {
          200: 'test.title.length.min',
          201: 'test.title.length.max',
          'default': 'test.required'
        }
      });

    });
  });

  describe('process()', function() {
    it('should exist', function() {
      expect(ConstraintMerger.process).to.be.a('function');
    });

    it('preserves existing validation messages', function() {
      var frontendConstraints = {
        schema: {
          properties: {
            testTitle: {
              title: 'Title'
            }
          }
        },
        form: [
          {
            items: [
              {
                name: 'testTitle'
              }
            ]
          }
        ]
      };

      var backendConstraints = {
        'testTitle': {
          'NotBlank': {
            'message': 'test.required'
          },
          'Length': {
            'maxMessage': 'test.title.length.max',
            'minMessage': 'test.title.length.min',
            'max': 100,
            'min': 5,
            'charset': 'UTF-8'
          }
        }
      };

      frontendConstraints.form[0].items[0].validationMessage = {
        '205': 'Test title is required'
      };

      ConstraintMerger.process(backendConstraints, frontendConstraints);

      frontendConstraints.form[0].items[0].should.deep.equal({
        name: 'testTitle',
        validationMessage: {
          200: 'test.title.length.min',
          201: 'test.title.length.max',
          'default': 'test.required',
          '205': 'Test title is required'
        }
      });
    });
  });
});
