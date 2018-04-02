//21.  Esta archivo es creado por 20. es la implementacion del interceptor
// de los eventos

// El interceptor es un factory, es decir crea la fn LoadingHttpInterceptor
// y retorna un valor para esta fn.
(function() {
"use strict";

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  //21. se incremente y decrementa el contador loadingCount y lo usamos porque estas
  // solicitudes son asincrónicas es totalmente posible y de hecho ocurre todo el
  // tiempo cuando algunas solicitudes ocurrieron al mismo tiempo.
  // Entonces, por ejemplo, el servicio HTTP puede cargar algunas plantillas al
  // mismo tiempo y haciendo algunas solicitudes al mismo tiempo.
  // No querríamos apagarlo completamente cuando volviera la primera solicitud
  // mientras que la segunda solicitud aún está pendiente.
  // Lo que significa que necesitamos un contador, un contador de incremento cada
  // vez que hay un nueva solicitud y un contador de decrementos cada vez que vuelve
  // una de las solicitudes. Entonces, mientras tengamos solicitudes pendientes,
  // este indicador de carga seguirá funcionando y no lanzaremos otro evento con la
  // propiedad on igual a false. SE va a esperar hasta que reduzcamos el contador
  // hasta el punto donde no hay nada de carga en absoluto, entonces es un 0.
  //  Y luego, transmitiremos que puedes seguir y apagar.
  var loadingCount = 0;

  var loadingEventName = 'spinner:activate';

//21.  el return de esta fn tiene una declaracion object literal
// y tiene 3 propiedades: request, response y responseError
  return {
    // request propiety  es una fn q tiene como arg config object
    // y este obj es todo lo que se necesita para $http service
    // haga el request xq ej. the url, the header request, etc
    // Entonces cuando http service hace un request, viene por esta
    //propiedad primero antes de hacer el request
    request: function (config) {
       // console.log("Inside interceptor, config: ", config);

      if (++loadingCount === 1) {
        // se engancha el proceso de transmitir (broadcast) al $rootScope
        // cambiando el estado del evento loadingEventName = 'spinner:activate
        // con el valor de on = a true. Se enciente o lanza el spinner
        $rootScope.$broadcast(loadingEventName, {on: true});
      }

      return config;
    },

    response: function (response) {
      if (--loadingCount === 0) {
        // y cuando la respuesta esté de vuelta,, nosotros podemos again
        // transmitir o broadcas usando $rootScope cambiamos a false la
        //propiedad on, entonces apagamos el spinner
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        // si hay algun error en la respuesta igual se apaga el spinner
        $rootScope.$broadcast(loadingEventName, {on: false});
      }
// se hace un reject del promise si no se hace hace se retorna responseError
// siempre como un exitoso.. que no siempre es el caso

// ¿Qué pasaría si omitiéramos la siguiente línea de código en la función
// 'responseError' del interceptor?
// La llamada volverá a la persona que llama y se verá como nuestra promesa
// "resuelta" cuando sea cierto, la promesa falló. El código de la persona que
//  llama tratará el objeto de respuesta como si fuera el resultado esperado,
//  lo que probablemente cause errores.

      return $q.reject(response);
    }
  };
}

})();
