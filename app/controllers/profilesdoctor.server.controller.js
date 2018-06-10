// Invocar modo 'strict' de JavaScript
'use strict'

// Cargar las dependdencias del módulo
var mongoose = require('mongoose'),
    ProfileDoctor = mongoose.model('ProfileDoctor'),
    User = require('mongoose').model('User');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors){
      if (err.errors[errName].message)
        return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

// Crear un nuevo método controller para crear nuev@s doctores
exports.create = function(req, res) {
  var profileDoctor = new ProfileDoctor(req.body);

  // Configurar los datos del doctor
  profileDoctor.creador = req.user;
  // profileDoctor.firstName = req.user.firstName;
  // profileDoctor.lastName = req.user.lastName;
  // profileDoctor.email = req.user.email;
  // profileDoctor.username = req.user.username;

  // Intentar guardar al doctor
  profileDoctor.save(function(err) {
    if (err) {
      // Si ocurre algún error enviar el mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {

      // Obtener el usuario usando el objeto 'request'
      var user = req.user;
      // Actualiza el campo 'rol' a 'doctor'
      user.rol = "doctor";

      // Intentar guardar al usuario actualizado el rol
      user.save(function(err) {
          if(err) {
            // Si ocurre un error enviar el mensaje de error
            return res.status(400).send({
              message: getErrorMessage(err)
            });
          }
      });

      // Enviar una representación JSON del doctor
      res.json(profileDoctor);
    }
  });
};

// Crear un nuevo método controller que recupera una lista de doctores
exports.list = function(req, res) {
  // Usar el método model 'find' para obtener una lista de doctores
  ProfileDoctor.find().sort('-created').populate('creador','firstName lastName fullName').exec(function(err, profilesDoctor){
    if (err){
      // Si ocurre un error enviar un mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una represtación JSON del perfil médico
      res.json(profilesDoctor);
    }
  });
};

// Crear un nuevo método controller que devuelve un doctor existente
exports.read = function(req, res) {
  res.json(req.profileDoctor);
};

// Crear un nuevo método controller que actualiza un doctor
exports.update = function(req, res) {
  // Obtener el perfil usando el objeto 'request'
  var profileDoctor = req.profileDoctor;

  // Actualiza los campos del doctor
  profileDoctor.healthCentre = req.body.healthCentre;
  profileDoctor.specialties = req.body.specialties;
  profileDoctor.startTime = req.body.startTime;
  profileDoctor.endTime = req.body.endTime;
  profileDoctor.email = req.body.email;
  // Intentar guardar el doctor actualizado
  profileDoctor.save(function(err) {
      if(err) {
        // Si ocurre un error enviar el mensaje de error
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        // Enviar una represtación JSON del doctor
        res.json(profileDoctor);
      }
  });
};

// Crear un nuevo método controller que borre el doctor existente
exports.delete = function(req, res) {
  var profileDoctor = req.profileDoctor;

  // Usa el método 'remove' para eliminar el doctor
  profileDoctor.remove(function(err){
    if (err) {
      // Si ocurre un error enviar el mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una represtación JSON del doctor
      res.json(profileDoctor);
    }
  });
};

// Crear un nuevo método controller middleware que recupera un único doctor existente
exports.profileDoctorByID = function(req, res, next, id) {
  // Usar el método static 'findOne' para encontrar una cita específica
  ProfileDoctor.findById(id).populate('creador','firstName lastName fullName').exec(function(err,profileDoctor) {
    if (err)
      // llama al siguiente middleware con un mensaje de error
      return next(err);
    if(!profileDoctor) return next(new Error('Failed to load doctor' + id));

    // Si un paciente es encontrado usar el objeto 'request' para pasarlo al siguiente middleware
    req.profileDoctor = profileDoctor;

    // Llamar al siguiente middleware
    next();
  });
};

// Crea un nuevo controller middleware para autorizar una operación doctor
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador de la cita, enviar el mensaje de error apropiado
	if (req.profileDoctor.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};
