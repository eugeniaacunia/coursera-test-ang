(function () {
'use strict';

angular.module('Data')
.component('categories', {
  templateUrl: 'src/template/categorieslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
