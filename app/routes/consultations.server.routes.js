// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	consultations = require('../../app/controllers/consultations.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'consultations'
	app.route('/api/consultations')
	   .get(consultations.list)
	   .post(users.requiresLogin, consultations.create);

	// Configurar las rutas 'consultations' parametrizadas
	app.route('/api/consultations/:consultationId')
	   .get(consultations.read)
	   .put(users.requiresLogin, consultations.hasAuthorization, consultations.update)
	   .delete(users.requiresLogin, consultations.hasAuthorization, consultations.delete);

	// Configurar el parámetro middleware 'consultationId'
	app.param('consultationId', consultations.consultationByID);
};
