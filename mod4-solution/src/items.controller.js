(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['menuitems'];

function ItemsController(menuitems) {
	console.log("ItemsController called");
	var itemsCtrl = this;
	itemsCtrl.menuitems = menuitems;
	console.log("Inside ItemsController");
	console.log(itemsCtrl.menuitems);
}

// ItemsController.$inject = ['$stateParams', 'categories'];
//
// function ItemsController($stateParams, categories) {
// 	console.log("ItemsController called");
// 	var itemList = this;
// 	menuitems =categories[$stateParams.menuCategory];
// 	// itemsCtrl.menuitems = menuitems;
// 	// console.log("Inside ItemsController");
// 	// console.log(.menuitems);
// }


})();
