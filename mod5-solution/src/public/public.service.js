(function () {
  "use strict";

  angular.module('public')
  .service('MenuPreferenceService', MenuPreferenceService);

  MenuPreferenceService.$inject = ['$http'];
  function MenuPreferenceService($http) {
    var service = this;
    service.menuPreference = ""

    service.savePreference = function (menuPreference) {
      // console.log(menuPreference);
      service.menuPreference = menuPreference;
    };

    service.getPreference = function () {
      return service.menuPreference;
    };

    service.getMenuItem = function (shortName) {
      var response = $http({
        method: "GET",
        url: ("https://eacuna-angular.herokuapp.com/menu_items/" + shortName + ".json")
      });

      return response;
    };
  }

  })
();
