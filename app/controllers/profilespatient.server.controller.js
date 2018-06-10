// Invocar el modo 'strict'
'use strict';

// Cargar el módulo dependencies
var ProfilePatient = require('mongoose').model('ProfilePatient'),
    passport = require('passport');

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

// Crear un nuevo método controller para crear nuev@s pacientes
exports.create = function(req, res) {
  var profilePatient = new ProfilePatient(req.body);

  // Configurar las datos del paciente
  profilePatient.creador = req.user;

  // Intentar guardar al paciente
  profilePatient.save(function(err) {
    if (err) {
      // Si ocurre algún error enviar el mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {

      // Obtener el usuario usando el objeto 'request'
      var user = req.user;
      // Actualiza el campo 'rol' a 'patient'
      user.rol = "patient";

      // Intentar guardar al usuario actualizando el rol
      user.save(function(err) {
          if(err) {
            // Si ocurre un error enviar el mensaje de error
            return res.status(400).send({
              message: getErrorMessage(err)
            });
          }
      });

      // Enviar una representación JSON del paciente
      res.json(profilePatient);
    }
  });
};

// Crear un nuevo método controller que recupera una lista de pacientes
exports.list = function(req, res) {
  // Usar el método model 'find' para obtener una lista de doctores
  ProfilePatient.find().sort('-created').populate('creador','firstName lastName fullName specialties healthCentre  workingHours').exec(function(err, profilesPatient){
    if (err){
      // Si ocurre un error enviar un mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una represtación JSON del paciente
      res.json(profilesPatient);
    }
  });
};

// Crear un nuevo método controller que devuelve un paciente existente
exports.read = function(req, res) {
  res.json(req.profilePatient);
};

// Crear un nuevo método controller que actualiza un paciente
exports.update = function(req, res) {
  // Obtener el perfil usando el objeto 'request'
  var profilePatient = req.profilePatient;

  // Actualiza los campos del paciente
  profilePatient.dni = req.body.dni;
  profilePatient.nationality = req.body.nationality;
  profilePatient.city = req.body.city;
  profilePatient.zipCode = req.body.zipCode;
  profilePatient.address = req.body.address;
  profilePatient.phoneNumber = req.body.phoneNumber;
  profilePatient.email = req.body.email;
  profilePatient.gender = req.body.gender;
  profilePatient.birthDate = req.body.birthDate;
  profilePatient.birthPlace = req.body.birthPlace;
  profilePatient.civilStatus = req.body.civilStatus;
  profilePatient.bloodType = req.body.bloodType;
  profilePatient.allergies = req.body.allergies;

  // Intentar guardar el paciente actualizado
  profilePatient.save(function(err) {
      if(err) {
        // Si ocurre un error enviar el mensaje de error
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        // Enviar una represtación JSON del paciente
        res.json(profilePatient);
      }
  });
};

// Crear un nuevo método controller que borre el paciente existente
exports.delete = function(req, res) {
  var profilePatient = req.profilePatient;

  // Usa el método 'remove' para eliminar el paciente
  profilePatient.remove(function(err){
    if (err) {
      // Si ocurre un error enviar el mensaje de error
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Enviar una represtación JSON del paciente
      res.json(profilePatient);
    }
  });
};

// Crear un nuevo método controller middleware que recupera un único paciente existente
exports.profilePatientByID = function(req, res, next, id) {
  // Usar el método static 'findOne' para encontrar una cita específica
  ProfilePatient.findById(id).populate('creador','firstName lastName fullName nss email phoneNumber bloodType height weight gender ').exec(function(err,profilePatient) {
    if (err)
      // llama al siguiente middleware con un mensaje de error
      return next(err);
    if(!profilePatient) return next(new Error('Failed to load patient' + id));

    // Si un paciente es encontrado usar el objeto 'request' para pasarlo al siguiente middleware
    req.profilePatient = profilePatient;

    // Llamar al siguiente middleware
    next();
  });
};

// Crea un nuevo controller middleware para autorizar una operación paciente
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador de la cita, enviar el mensaje de error apropiado
	if (req.profilePatient.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};
