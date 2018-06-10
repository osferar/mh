// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'prfilesPatient'
angular.module('profilesPatient').controller('ProfilesPatientController',['$scope','$routeParams','$location','Authentication','ProfilesPatient',
  function($scope, $routeParams, $location, Authentication, ProfilesPatient) {
      // Exponer el service Authentication
      $scope.authentication = Authentication;

      // Crear un nuevo método controller para crear nuevos profilesPatient
      $scope.create = function() {
        // Usar los campos form para crear un nuevo objeto $resource profileDoctor
        var profilePatient = new ProfilesPatient({
          dni: this.dni,
          nationality: this.nationality,
          city: this.city,
          zipCode: this.zipCode,
          address: this.address,
          phoneNumber: this.phoneNumber,
          email: this.email,
          gender: this.gender,
          birthDate: this.birthDate,
          birthPlace: this.birthPlace,
          civilStatus: this.civilStatus,
          bloodType: this.bloodType,
          allergies: this.allergies
        });

        // Usar el método '$save' de profilePatient para enviar una petición POST apropiada
        profilePatient.$save(function(response) {
          // Si un doctor fue creado de modo correcto, redireccionar al usuario a la página del perfil
          $location.path('profilesPatient/' + response._id);
        }, function(errorResponse) {
          // En otro caso, presentar el mensaje de error al usuario
          $scope.error = errorResponse.data.message;
        });
      };

      // Crear un nuevo método controller para recuperar una lista de pacientes
      $scope.find = function() {
        // Usar el método 'query' de appointment para enviar una petición GET apropiada
        $scope.profilesPatient = ProfilesPatient.query();
      };

      // Crear un nuevo método controller para recuperar una único paciente
      $scope.findOne = function() {
        // Usar el método 'get' de profilePatient para enviar una petición GET apropiada
        $scope.profilePatient = ProfilesPatient.get({
          profilePatientId: $routeParams.profilePatientId
        });
      };

      // Crear un nuevo método controller para actualizar un perfil de paciente
      $scope.update = function() {
        // Usar el método '$update' de appointment para enviar una petición PUT apropiada
        $scope.profilePatient.$update(function() {
          // Si un perfil de paciente fue actualizado de modo correcto, redirigir al user a la página del perfil
          $location.path('profilesPatient/' + $scope.profilePatient._id);
        }, function(errorResponse) {
          // En otro caso, presentar al user un mensaje de error
          $scope.error = errorResponse.data.message;
        });
      };

      // Crear un nuevo método controller para borrar un único perfil de paciente
      $scope.delete = function(profilePatient) {
        // Si un perfil fue enviado al método, borrarlo
        if (profilePatient) {
          // Usar el método '$remove' del perfil para borrarlo
          profilePatient.$remove(function() {
            // Eliminar el perfil la lista de perfiles de pacientes
            for(var i in $scope.profilesPatient) {
              if ($scope.profilesPatient[i] === profilePatient) {
                  $scope.profilesPatient.splice(i,1);
              }
            }
          });
        } else {
          // En otro caso, usar el método '$remove' de perfil para borrarlo
          $scope.profilePatient.$remove(function() {
            $location.path('/');
          });
        }
      };

  }
]);
