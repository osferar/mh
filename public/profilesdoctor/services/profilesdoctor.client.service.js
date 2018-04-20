// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'profilesDoctor'
angular.module('profilesDoctor').factory('ProfilesDoctor', ['$resource', function($resource) {
  // Usar el service '$resource' para devolver un objeto '$resource' profileDoctor
  return $resource('api/profilesDoctor/:profileDoctorId', {
    profileDoctorId: '@_id'
  },{
    update: {
      method: 'PUT'
    }
  });
}]);
