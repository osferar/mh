// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'appointments'
angular.module('appointments').controller('AppointmentsController', [
  '$scope',
  '$routeParams',
  '$location',
  'Authentication',
  'Appointments',
  'ProfilesDoctor',
  'ShareDataService',
  function($scope, $routeParams, $location, Authentication, Appointments, ProfilesDoctor, ShareDataService) {

    // Exponer el service Authentication
    $scope.authentication = Authentication;
    $scope.shared = ShareDataService;

    // Crear un nuevo método controller para crear nuevas citas
    $scope.create = function() {
      // Usar los campos form para crear un nuevo objeto $resource appointment
      var appointment = new Appointments({date: this.date, hour: this.hour, doctor: this.doctor, chiefComplaint: this.chiefComplaint});

      // Usar el método '$save' de appointment para enviar una petición POST apropiada
      appointment.$save(function(response) {
        // Si una cita fue creada de modo correcto, redireccionar al usuario a la página de la cita
        $location.path('appointments/' + response._id);
      }, function(errorResponse) {
        // En otro caso, presentar el mensaje de error al usuario
        $scope.error = errorResponse.data.message;
      });
    };

    // Crear un nuevo método controller para recuperar una lista de citas
    $scope.find = function() {
      // Usar el método 'query' de appointment para enviar una petición GET apropiada
      $scope.appointments = Appointments.query();
    };

    // Crear un nuevo método controller para recuperar una única cita
    $scope.findOne = function() {
      // Usar el método 'get' de appointment para enviar una petición GET apropiada
      $scope.appointment = Appointments.get({appointmentId: $routeParams.appointmentId});
      $scope.shared.idAppointment = $routeParams.appointmentId;
    };

    // Usar el método 'query' de ProfilesDoctor para enviar una petición GET apropiada
    $scope.findDoctors = function() {
      $scope.profilesDoctor = ProfilesDoctor.query();
    };

    // Crear un nuevo método controller para actualizar una única cita
    $scope.update = function() {
      // Usar el método '$update' de appointment para enviar una petición PUT apropiada
      $scope.appointment.$update(function() {
        // Si una cita fue actualizada de modo correcto, redirigir al user a la página de la cita
        $location.path('appointments/' + $scope.appointment._id);
      }, function(errorResponse) {
        // En otro caso, presentar al user un mensaje de error
        $scope.error = errorResponse.data.message;
      });
    };

    // Crear un nuevo método controller para borrar una única cita
    $scope.delete = function(appointment) {
      // Si una cita fue enviado al método, borrarlo
      if (appointment) {
        // Usar el método '$remove' de la cita para borrarla
        appointment.$remove(function() {
          // Eliminar la cita de la lista de citas
          for (var i in $scope.appointments) {
            if ($scope.appointments[i] === appointment) {
              $scope.appointments.splice(i, 1);
            }
          }
        });
      } else {
        // En otro caso, usar el método '$remove' de cita para borrar la cita
        $scope.appointment.$remove(function() {
          $location.path('appointments');
        });
      }
    };

  }
]);
