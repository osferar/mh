// Invocar modo JavaScript 'strict'
'use strict';

//Cargar las dependencias del módulos
var users = require('../../app/controllers/users.server.controller'),
    profilesPatient = require('../../app/controllers/profilespatient.server.controller');

// Definir el método routes de module
module.exports = function(app) {
  // Configurar la ruta base de 'profilePatient'
  app.route('/api/profilesPatient')
     .get(profilesPatient.list)
     .post(users.requiresLogin, profilesPatient.create);

  // Configurar las rutas 'profilePatient' parametrizadas
  app.route('/api/profilesPatient/:profilePatientId')
     .get(profilesPatient.read)
     .put(users.requiresLogin, profilesPatient.hasAuthorization, profilesPatient.update)
     .delete(users.requiresLogin, profilesPatient.hasAuthorization, profilesPatient.delete);

  // Configurar el parámetro middleware 'profileDoctorId'
  app.param('profilePatientId', profilesPatient.profilePatientByID);
};
