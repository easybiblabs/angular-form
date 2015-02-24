define([
  'app/lib/time'
], function(Time) {
  'use strict';
  describe('Time', function() {

    it('should throw exception for invalid date string',
        function() {
          expect(function() {
            Time.getUTCString('not a date');
          })
            .to.throw('Unable to convert date to UTC timezone: not a date');

          expect(function() {
            Time.getLocaleString('not a date');
          })
            .to.throw('Unable to convert date to locale timezone: not a date');
        });

    it('should convert locale date time string into UTC date string',
        function() {
          var utcDate = Time.getUTCString('2014-09-16T15:23:55+0200');

          expect(utcDate).to.be.a('string');
          expect(utcDate).to.be.equal('2014-09-16T13:23:55+00:00');
        });

    it('should convert locale date string into UTC date string with added current time',
        function() {
          var utcDate = Time.getUTCString('2014-09-16');

          expect(utcDate).to.be.a('string');
          expect(utcDate).to.match(/2014-09-16T..:..:..+00:00/);
          expect(utcDate).to.not.equal('2014-09-16T00:00:00+00:00');
        });

    it('should convert UTC date time string into locale date string',
        function() {
          var localeDate = Time.getLocaleString(
              '2014-09-16T13:23:55+00:00', '+0200'
              );

          expect(localeDate).to.be.a('string');
          expect(localeDate).to.be.equal('2014-09-16T15:23:55+02:00');
        });
  });
});
