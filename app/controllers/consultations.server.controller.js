// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
		Consultation = mongoose.model('Consultation');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller para crear nuevas consultas
exports.create = function(req, res) {
	// Crear un nuevo objeto artículo
	var consultation = new Consultation(req.body);

	// Configurar la propiedad 'creador' de la consulta
	consultation.creador = req.user;

	// Intentar salvar la consutla
	consultation.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la consulta
			res.json(consultation);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de consultas
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de consultas
	Consultation.find().sort('-creado')
	.populate('creador' , 'firstName lastName fullName')
	.populate('patient' , 'firstName lastName fullName')
	.exec(function(err, consultations) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la consulta
			res.json(consultations);
		}
	});
};

// Crear un nuevo método controller que devuelve una consulta existente
exports.read = function(req, res) {
	res.json(req.consultation);
};

// Crear un nuevo método controller que actualiza una consulta existente
exports.update = function(req, res) {
	// Obtener la consulta usando el objeto 'request'
	var consultation = req.consultation;

	// Actualizar los campos de la consulta
	consultation.height = req.body.height;
	consultation.weight = req.body.weight;
	consultation.breathingFrequency = req.body.breathingFrequency;
	consultation.bloodPressure = req.body.bloodPressure;
	consultation.heartRate = req.body.heartRate;
	consultation.physicalExploration = req.body.physicalExploration;
	consultation.disorder = req.body.disorder;
	consultation.diagnosis = req.body.diagnosis;
	consultation.medicationPrescription = req.body.medicationPrescription;
	consultation.medicalInstructions = req.body.medicalInstructions;

	// Intentar salvar la consulta actualizada
	consultation.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la consulta
			res.json(consultation);
		}
	});
};

// Crear un nuevo método controller que borre una consulta existente
exports.delete = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var consultation = req.consultation;

	// Usar el método model 'remove' para borrar la consulta
	consultation.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la consulta
			res.json(consultation);
		}
	});
};

// Crear un nuevo controller middleware que recupera una única consulta existente
exports.consultationByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar una única consulta
	Consultation.findById(id)
	.populate('creador' , 'firstName lastName fullName')
	.populate('patient' , 'firstName lastName fullName')
	.exec(function(err, consultation) {
		if (err) return next(err);
		if (!consultation) return next(new Error('Fallo al cargar la consulta' + id));

		// Si una consulta es encontrada, usar el objeto 'request' para pasarlo al siguietne middleware
		req.consultation = consultation;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación consultation
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador de la consulta, enviar el mensaje de error apropiado
	if (req.consultation.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};
