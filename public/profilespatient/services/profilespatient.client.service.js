// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'profilesPatient'
angular.module('profilesPatient').factory('ProfilesPatient', ['$resource', function($resource) {
  // Usar el service '$resource' para devolver un objeto '$resource' profilePatient
  return $resource('api/profilesPatient/:profilePatientId', {
    profilePatientId: '@_id'
  },{
    update: {
      method: 'PUT'
    }
  });
}]);
