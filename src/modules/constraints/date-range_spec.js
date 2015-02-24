require('./index');
require('./../../utility/time');
require('moment');

describe('date range constraint mapper', function() {
  'use strict';

  var mapper;

  beforeEach(angular.mock.module('form-constraints'));

  beforeEach(inject(function(_Mapper_, _DateRangeConstraint_) {
    mapper = new _Mapper_(new _DateRangeConstraint_.Schema(), new _DateRangeConstraint_.Form());
  }));

  it('should map correct form constraints date while mapping', function() {
    var formConstraint = {
      'testTitle': {
        minDate: 'some date',
        maxDate: 'another date'
      }
    };

    mapper.map('testTitle', 'min', 'some date');
    mapper.map('testTitle', 'max', 'another date');

    expect(formConstraint).to.deep.equal(mapper.getResult().form);
  });

  // skipped until we found a nice way to spoof the timezone
  it.skip('should transform date while mapping', function() {
    var formConstraint = {
      'testTitle': {
        minDate: '2014-09-18T02:00:00+02:00',
        maxDate: '2014-09-19T02:00:00+02:00'
      }
    };

    mapper.map('testTitle', 'min', '2014-09-18T00:00:00+0000');
    mapper.map('testTitle', 'max', '2014-09-19T00:00:00+0000');

    expect(formConstraint).to.deep.equal(mapper.getResult().form);
  });
});
