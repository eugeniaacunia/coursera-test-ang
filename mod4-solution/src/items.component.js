(function () {
'use strict';

angular.module('Data')
.component('items', {
  templateUrl: 'src/template/itemslist.template.html',
  bindings: {
    menuitems: '<'
  }
});

})();
