(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)

MenuDataService.$inject = ['$http']
function MenuDataService($http, ApiBasePath) {
  console.log("MenuDataService function");
  var service = this;

  service.getAllCategories = function () {
    console.log("Inside getAllCategories function");
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/categories.json")
    }).then(function(result){
      console.log(result.data);
      return result.data;
    });

    //return response;
  };


  service.getItemsForCategory = function (categoryShortName) {
    console.log("getItemsForCategory function");
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
      params: {
        category: categoryShortName
      }
    }).then(function(result){
      console.log("Menu Items recovered");
      console.log(result.data.menu_items);
      return result.data.menu_items;
    });

    //return response;
  };
}

})();
