(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/template/home.template.html'
  })

  .state('mainList', {
		  url: '/main-list',
		  templateUrl: 'src/template/main-categories.template.html',
		  controller: 'CategoriesController as categoriesCtrl',
		  resolve: {
			  categories: ['MenuDataService', function(MenuDataService){
				  return MenuDataService.getAllCategories();
			  }]
		  }
		})

 .state('itemList', {
		  url: '/items/{menuCategory}',
		  templateUrl: 'src/template/items.template.html',
		  controller: 'ItemsController as itemsCtrl',
		  resolve : {
			  menuitems: ['$stateParams','MenuDataService',
				function($stateParams, MenuDataService) {
					return MenuDataService.getItemsForCategory($stateParams.menuCategory);
				}
			  ]
		  }
		});

}

})();
