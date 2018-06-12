// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'profilesDoctor'
angular.module('profilesDoctor').controller('ProfilesDoctorController',['$scope','$routeParams','$location','Authentication','ProfilesDoctor',
  function($scope, $routeParams, $location, Authentication, ProfilesDoctor) {
      // Exponer el service Authentication
      $scope.authentication = Authentication;

      // Crear un nuevo método controller para crear nuevos profilesDoctor
      $scope.create = function() {
        // Usar los campos form para crear un nuevo objeto $resource profileDoctor
        var profileDoctor = new ProfilesDoctor({
          numberColleged: this.numberColleged,
          healthCentre: this.healthCentre,
          specialties: this.specialties,
          email: this.email,
          startTime: this.startTime,
          endTime: this.endTime
        });

        // Usar el método '$save' de profileDoctor para enviar una petición POST apropiada
        profileDoctor.$save(function(response) {
          // Si un doctor fue creado de modo correcto, redireccionar al usuario a la página del perfil
          $location.path('profilesDoctor/' + response._id);
        }, function(errorResponse) {
          // En otro caso, presentar el mensaje de error al usuario
          $scope.error = errorResponse.data.message;
        });
      };

      // Crear un nuevo método controller para recuperar una lista de doctores
      $scope.find = function() {
        // Usar el método 'query' de profileDoctor para enviar una petición GET apropiada
        $scope.profilesDoctor = ProfilesDoctor.query();
      };

      // Crear un nuevo método controller para recuperar una único doctor
      $scope.findOne = function() {
        // Usar el método 'get' de profileDoctor para enviar una petición GET apropiada
        $scope.profileDoctor = ProfilesDoctor.get({
          profileDoctorId: $routeParams.profileDoctorId
        });
      };

      // Crear un nuevo método controller para actualizar un perfil de doctor
      $scope.update = function() {
        // Usar el método '$update' de appointment para enviar una petición PUT apropiada
        $scope.profileDoctor.$update(function() {
          // Si un perfil de doctor fue actualizado de modo correcto, redirigir al user a la página del perfil
          $location.path('profilesDoctor/' + $scope.profileDoctor._id);
        }, function(errorResponse) {
          // En otro caso, presentar al user un mensaje de error
          $scope.error = errorResponse.data.message;
        });
      };

      // Crear un nuevo método controller para borrar un único perfil de doctor
      $scope.delete = function(profileDoctor) {
        // Si un perfil fue enviado al método, borrarlo
        if (profileDoctor) {
          // Usar el método '$remove' del perfil para borrarlo
          profileDoctor.$remove(function() {
            // Eliminar el perfil la lista de perfiles de doctor
            for(var i in $scope.profilesDoctor) {
              if ($scope.profilesDoctor[i] === profileDoctor) {
                  $scope.profilesDoctor.splice(i,1);
              }
            }
          });
        } else {
          // En otro caso, usar el método '$remove' de perfil para borrarlo
          $scope.profileDoctor.$remove(function() {
            $location.path('/');
          });
        }
      };

  }
]);
