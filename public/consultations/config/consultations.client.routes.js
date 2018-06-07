// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'consultations'
angular.module('consultations').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/consultations', {
			templateUrl: 'consultations/views/list-consultations.client.view.html'
		}).
		when('/consultations/create', {
			templateUrl: 'consultations/views/create-consultation.client.view.html'
		}).
		when('/consultations/:consultationId', {
			templateUrl: 'consultations/views/view-consultation.client.view.html'
		}).
		when('/consultations/:consultationId/edit', {
			templateUrl: 'consultations/views/edit-consultation.client.view.html'
		});
	}
]);
