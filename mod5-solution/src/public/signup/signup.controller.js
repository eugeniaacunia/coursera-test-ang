(function () {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuPreferenceService'];
  function SignUpController(MenuPreferenceService) {
    var signup = this;
    // signup.user=""

    signup.submit = function () {
      var number = signup.user.numdish;

      var promise = MenuPreferenceService.getMenuItem(number);
      promise.then(function (response) {
          signup.errMessage = false;

          /// save the user data and menu iten in an object
          var preferenceObject = response.data;
          preferenceObject.user = signup.user;
          preferenceObject.path = "https://eacuna-angular.herokuapp/images/" + signup.user.numdish + ".jpg";
          
          console.log(preferenceObject);

          MenuPreferenceService.savePreference(preferenceObject);
          signup.saveDataMessage = true;
      })
      .catch(function (error) {
          signup.saveDataMessage = false;
          signup.errMessage = true;
      });
      // signup.completed = false;
    };
  }
  })();
