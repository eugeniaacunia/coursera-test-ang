(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['preferenceMenu'];
  function MyInfoController(preferenceMenu) {
    var myinfo = this;
    myinfo.preferenceMenu = preferenceMenu;

    console.log("myinfo.preferenceMenu");
      console.log(myinfo);
    if (preferenceMenu) {
    }
  }
})();
