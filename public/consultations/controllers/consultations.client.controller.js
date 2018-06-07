// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'consultations'
angular.module('consultations').controller('ConsultationsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Consultations',
    function($scope, $routeParams, $location, Authentication, Consultations) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

 // Crear un nuevo método controller para crear nuevas consultations
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource consultation
            var consultation = new Consultations({
              height: this.height,
              weight: this.weight,
              breathingFrequency: this.breathingFrequency,
              bloodPressure: this.bloodPressure,
              heartRate: this.heartRate,
              physicalExploration: this.physicalExploration,
              disorder: this.disorder,
              diagnosis: this.diagnosis,
              medicationPrescription: this.medicationPrescription,
              medicalInstructions: this.medicalInstructions
            });

            // Usar el método '$save' de consultation para enviar una petición POST apropiada
            consultation.$save(function(response) {
                // Si un artículo fue creado de modo correcto, redireccionar al usuario a la página del artículo
                $location.path('consultations/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de consultas
        $scope.find = function() {
            // Usar el método 'query' de consultation para enviar una petición GET apropiada
            $scope.consultations = Consultations.query();
        };

        // Crear un nuevo método controller para recuperar una única consulta
        $scope.findOne = function() {
            // Usar el método 'get' de consultation para enviar una petición GET apropiada
            $scope.consultation = Consultations.get({
              consultationId: $routeParams.consultationId
            });
        };

 // Crear un nuevo método controller para actualizar una única consultation
        $scope.update = function() {
            // Usar el método '$update' de consultation para enviar una petición PUT apropiada
            $scope.consultation.$update(function() {
                // Si una consultation fue actualizada de modo correcto, redirigir el user a la página del consultation
                $location.path('consultations/' + $scope.consultation._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para borrar una única consultation
        $scope.delete = function(consultation) {
            // Si una consulta fue enviado al método, borrarla
            if (consultation) {
                // Usar el método '$remove' de la consulta para borrarla
                artconsultationicle.$remove(function() {
                    // Eliminar la consulta de la lista de consultas
                    for (var i in $scope.consultations) {
                        if ($scope.consultations[i] === consultation) {
                            $scope.consultations.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de consultation para borrar la consultation
                $scope.consultation.$remove(function() {
                    $location.path('consultations');
                });
            }
        };

    }
]);
