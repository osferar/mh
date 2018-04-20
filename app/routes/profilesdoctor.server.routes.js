// Invocar modo JavaScript 'strict'
'use strict';

//Cargar las dependencias del módulos
var users = require('../../app/controllers/users.server.controller'),
    profilesDoctor = require('../../app/controllers/profilesdoctor.server.controller');

// Definir el método routes de module
module.exports = function(app) {
  // Configurar la ruta base de 'profileDoctor'
  app.route('/api/profilesDoctor')
     .get(profilesDoctor.list)
     .post(users.requiresLogin, profilesDoctor.create);

  // Configurar las rutas 'profileDoctor' parametrizadas
  app.route('/api/profilesDoctor/:profileDoctorId')
     .get(profilesDoctor.read)
     .put(users.requiresLogin, profilesDoctor.hasAuthorization, profilesDoctor.update)
     .delete(users.requiresLogin, profilesDoctor.hasAuthorization, profilesDoctor.delete);

  // Configurar el parámetro middleware 'profileDoctorId'
  app.param('profileDoctorId', profilesDoctor.profileDoctorByID);
};
