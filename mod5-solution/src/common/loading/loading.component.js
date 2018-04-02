// 20.  En la lectura 53 se va a implementar el uso de $http interceptors
// se necesita que algo lance el event handler spinner:activate
// Se podría intentar lanzar el evento spinner: active en cualquier lugar del
// sistema cada vez que haya algo q es asincrónico está a punto de suceder.
 // Por ejemplo, cuando tratamos de extraer datos del servidor del restaurante,
 // justo antes de hacer eso podríamos lanzar el evento spinner con el encendido
 // igual a verdadero, y después de que regrese para manejar la respuesta,
 // o nuestra promise, podríamos lanzar otro evento con el spinner.active=false
 // Y creo que eso probablemente estaría bien, sin embargo, hay un par de problemas
 // con eso:
 // 1) Es que realmente tendríamos que ir x todo el codigo intentado usar el
 // servicio $ HTP.
 // 2) Es que hay momentos en los que usamos el servicio http sin siquiera
 // conocer nosotros mismos al respecto.
 // Por ejemplo, si vamos al módulo público y miramos nuestras rutas,
 // verá que, por ejemplo, cuando vamos a este estado público y
 // especialmente public.home traerá este home.html
 // en realidad, primero extraerá html público y luego instalará home.html.
 // Las solicitudes de estos fragmentos de html son en realidad
 // llamadas asincrónicas hechas por angular usando el servicio $ http.
 // Entonces, uno no tiene en este caso una especie de habilidad normal para decir
 // que siga adelante y enciende o apgague el spinner .
 // Bueno, sucede que el servicio $HTTP proporciona una capacidad para
 // configurarlo para que realmente se conecte a todo el ciclo de vida
 // y enviar la solicitud y recibir la solicitud de manera que podamos capturar
 // la solicitud mientras se apaga y captar la respuesta a medida que regresa.
 // Y esos se llaman interceptores, en carpeta de carga común common,
 // vamos a crear el archivo loading.interceptor.js.


//11. en la lectura 52 se implementó el controller para lanzar y usar el spinner

(function() {
"use strict";

//11. se atacha el modulo common
angular.module('common')
// el componente se llama loading
.component('loading', {
  // se carga una img cuando $ctrl.show es true
  template: '<img src="images/spinner.svg" ng-if="$ctrl.show">',
  controller: LoadingController
});

// al controller LoadingController se inyecta $rootScope
LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;

 // $onInit es a lifecycle metodo, que se usa para inicializar
 //el controller LoadingController
  $ctrl.$onInit = function() {
    $ctrl.show = false; // no muestra el spinner

    //$rootScope.$on indica que varios eventos podrian suceder en la app
    // es decir alguien podria requerir algun url, otra accion asincrona, y
    // el user need saber que algo está sucediendo
    // se lanza o se enciende el spinner con $on
    //spinner:activate= spinner es el nombre del evento y action es el evento
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
  };

// cuando se reliza un unload, se requere unregister el sppiner
// y para ello se requiere el uso de la var listener que es una fn
// con eso se evita memory leaks
  $ctrl.$onDestroy = function() {
    listener();
  };

//onSpinnerActivate es el manejador de los eventos
// data= tiene los datos asociados al evento event
//
  function onSpinnerActivate(event, data) {
    // data.on tiene dos valores true o false
    $ctrl.show = data.on;
  }
}

})();
