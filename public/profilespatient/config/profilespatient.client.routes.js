// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulp routes de 'profilesPatient'
angular.module('profilesPatient').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/profilesPatient', {
      templateUrl: 'profilespatient/views/list-profilespatient.client.view.html'
    }).
    when('/profilesPatient/create', {
      templateUrl: 'profilespatient/views/create-profilepatient.client.view.html'
    }).
    when('/profilesPatient/:profilePatientId', {
      templateUrl: 'profilespatient/views/view-profilepatient.client.view.html'
    }).
    when('/profilesPatient/:profilePatientId/edit', {
      templateUrl: 'profilespatient/views/edit-profilepatient.client.view.html'
    });
  }
]);
