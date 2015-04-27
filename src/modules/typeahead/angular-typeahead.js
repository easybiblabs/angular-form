module.exports = function($timeout, $http) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    controller: function($scope) {
      $scope.getSchool = function(school) {
        console.debug('___school passed to getSchool', school);
        var params = {
          school: school || '',
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

        return $http.post(registerTeacherAutocomplete, params, requestHeaders)
          .then(function(response) {
            return response.data;
          });
      };
    },
    link: function(scope, element, attrs) {
      // scope.getSchool('MA'); works
    }
  };
};
