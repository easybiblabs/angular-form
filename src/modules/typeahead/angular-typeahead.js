module.exports = function($timeout, $http) {
  'use strict';

  return {
    restrict: 'A',
    require: 'ngModel',
    templateUrl: '/template/typeahead/typeahead-popup.html',
    scope: {
      schools: '=',
      config: '='
    },
    controller: function(scope) {
      scope.schoolList = [
        {id: '41', school: 'Thomas Edison High School'},
        {id: '42', school: 'Kingsborough Community College'},
        {id: '43', school: 'Oakland University'}
      ];
    },
    link: function(scope, element, attrs) {
      scope.getSchool = function(school, district, state) {
        var params = {
          school: school || '',
          district: district || '',
          state: state || ''
        };

        // set these in form definition or elsewhere and access in attrs param here
        //  - $window.Config.autocomplete.registerTeacherAutocomplete
        //  - API_CONFIG.REQUEST_HEADERS
        var registerTeacherAutocomplete = 'http://easybibscholar.local/_register/teacher/autocomplete',
          requestHeaders = {
            headers: {
              'Accept': 'application/hal+json',
              'Content-type': 'application/json'
            },
            responseType: 'json'
          };

        return $http.post(attrs.registerTeacherAutocomplete || registerTeacherAutocomplete, params, requestHeaders)
          .then(function(response) {
            return response.data;
          });
      };
    }
  };
};
