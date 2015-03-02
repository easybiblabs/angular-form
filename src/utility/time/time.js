module.exports = function() {
  'use strict';

  return {
    /**
     * @param {String} dateString
     * @param {(String|Integer)} timezone
     * @returns {String}
     */
    getLocaleString: function(dateString, timezone) {
      var date = moment(dateString);
      date.zone(timezone);

      if (date.isValid() === false) {
        throw new Error(
          'Unable to convert date to locale timezone: ' +
          dateString
        );
      }

      return date.format();
    },

    /**
     * @param {String} dateString
     * @returns {String}
     */
    getUTCString: function(dateString) {
      var date = moment.utc(dateString);
      if (date.isValid() === false) {
        throw new Error(
          'Unable to convert date to UTC timezone: ' +
          dateString
        );
      }
      if (date.hour() === 0 && date.minute() === 0) {
        // adding UTC time because backend is validating against it
        // (and the datepicker only sends the date)
        var localDate = new Date();
        date.hour(localDate.getUTCHours());
        date.minute(localDate.getUTCMinutes());
      }
      return date.format();
    }
  };
};
