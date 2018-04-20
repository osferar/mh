// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulp routes de 'profilesDoctor'
angular.module('profilesDoctor').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/profilesDoctor', {
      templateUrl: 'profilesdoctor/views/list-profilesdoctor.client.view.html'
    }).
    when('/profilesDoctor/create', {
      templateUrl: 'profilesdoctor/views/create-profiledoctor.client.view.html'
    }).
    when('/profilesDoctor/:profileDoctorId', {
      templateUrl: 'profilesdoctor/views/view-profiledoctor.client.view.html'
    }).
    when('/profilesDoctor/:profileDoctorId/edit', {
      templateUrl: 'profilesdoctor/views/edit-profiledoctor.client.view.html'
    });
  }
]);
