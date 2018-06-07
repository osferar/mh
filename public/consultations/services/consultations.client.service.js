// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'articles'
angular.module('consultations').factory('Consultations', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' consultation
    return $resource('api/consultations/:consultationId', {
        consultationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
