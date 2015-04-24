module.exports = function($timeout, $http) {
  'use strict';

  return {
    restrict: 'A',
    require: 'ngModel',
    templateUrl: 'template/typeahead/templateurl.html',
    scope: {
      schools: '=',
      config: '='
    },
    link: function(scope, element, attrs, ngModel) {

      /* eslint-disable */
      console.debug('___scope ', scope);
      console.debug('___el ', element);
      console.debug('___attrs ', attrs);
      console.debug('___ngModel ', ngModel);
      debugger;

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

        return $http.post(registerTeacherAutocomplete, params, requestHeaders)
          .then(function(response) {
            return response.data;
          });
      };

      /*
      scope.handleSelection = function(selectedItem) {
        scope.model = selectedItem;
        scope.current = 0;
        scope.selected = true;

        $timeout(function() {
          scope.onSelect();
        }, 200);
      };

      scope.current = 0;
      scope.selected = true;

      scope.isCurrent = function(index) {
        return scope.current === index;
      };

      scope.setCurrent = function(index) {
        scope.current = index;
      };
      */
    }
  };
};
