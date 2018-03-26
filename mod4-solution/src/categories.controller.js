(function () {
'use strict';
angular.module('Data')
.controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['categories'];

function CategoriesController(categories) {
	var categoriesCtrl = this;
	categoriesCtrl.categories = categories;
	console.log("categories " + categories);
}

})();
