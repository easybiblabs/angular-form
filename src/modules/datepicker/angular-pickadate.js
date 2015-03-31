var moment = require('moment');

module.exports = function($timeout) {
  'use strict';

  // String dates for min and max is not supported
  // https://github.com/amsul/pickadate.js/issues/439
  // So strings we create dates from
  var formatDate = function(value) {
    // Strings or timestamps we make a date of
    if (angular.isString(value) || angular.isNumber(value)) {
      return new Date(value.replace(/-/g, '/'));
    }
    return value; // We hope it's a date object
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      minDate: '=',
      maxDate: '=',
      format: '='
    },
    link: function(scope, element, attrs, ngModel) {
      var inputText,
        picker,
        defaultFormat,
        onceMin,
        onceMax,
        onceFormat,
        error,
        defaultMinDate;

      var evalInParentScope = function(value) {
        return scope.$parent.$eval(value);
      };

      // Bail out gracefully if pickadate is not loaded.
      // Throw an error outside of the current queue
      // to prevent angular's bootstrap from clogging up.
      if (!element.pickadate) {
        error = new Error('jQuery pickadate has not been loaded for pickadate directive');
        $timeout(function() {
          throw error;
        });
        return;
      }

      // Defaultformat is for json schema date-time is ISO8601
      // i.e.  "yyyy-mm-dd"
      defaultFormat = evalInParentScope(attrs.format) || 'yyyy-mm-dd';
      defaultMinDate = evalInParentScope(attrs.minDate) || new Date();

      // bind once.
      if (angular.isDefined(attrs.format)) {
        onceFormat = scope.$watch('format', function(value) {
          if (value) {
            defaultFormat = value;
            onceFormat();
          }
        }, true);
      }

      if (angular.isDefined(attrs.minDate)) {
        onceMin = scope.$watch('minDate', function(value) {
          if (value) {
            defaultMinDate = formatDate(value);
            picker.set('min', defaultMinDate);
            onceMin();
          }
        }, true);
      }

      if (angular.isDefined(attrs.maxDate)) {
        onceMax = scope.$watch('maxDate', function(value) {
          if (value) {
            picker.set('max', formatDate(value));
            onceMax();
          }
        }, true);
      }

      // By setting formatSubmit to null we inhibit the
      // hidden field that pickadate likes to create.
      // We use ngModel formatters instead to format the value.
      element.pickadate({
        onClose: function() {
          element.blur();
        },
        onSet: function() {
          inputText.val(this.get('select', defaultFormat));
        },
        formatSubmit: null
      });

      picker = element.pickadate('picker');
      element.siblings('.calendar-icon').on('click', function(event) {
        if (!element.hasClass('picker__input--active')) {
          event.stopPropagation();
          picker.open();
        }
      });

      inputText = element.siblings('input.datepicker_editable_input').on({
        change: function() {
          var parsedDate = moment(this.value).toDate();
          if (parsedDate) {
            picker.set('select', [
              parsedDate.getFullYear(),
              parsedDate.getMonth(),
              parsedDate.getDate()
            ]);
          } else {
            picker.set('select', defaultMinDate);
          }
        },
        keyup: function() {
          inputText.toggleClass('editable-filled', inputText.val().length);
        },
        focus: function() {
          picker.open(false);
        },
        blur: function() {
          picker.close();
        }
      });

      picker.set('min', defaultMinDate);

      function formatModelForInput(value) {
        if (angular.isUndefined(value) || value === null) {
          return value;
        }

        // We set 'view' and 'highlight' instead of 'select'
        // since the latter also changes the input, which we do not want.
        picker.set('view', value, {format: defaultFormat});
        picker.set('highlight', new Date(value));

        // piggy back on highlight to and let pickadate do the transformation.
        return picker.get('highlight', defaultFormat);
      }

      /**
       * update on model change
       */
      scope.$watch('ngModel', function(value) {
        if (angular.isUndefined(value) || value === null) {
          return value;
        }

        inputText.val(formatModelForInput(value));
      });

      // The view value

      ngModel.$formatters.push(formatModelForInput);

      ngModel.$parsers.push(function() {
        return picker.get();
      });
    }
  };
};
