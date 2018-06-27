// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Definir un nuevo 'ProfileDoctorSchema'
var ProfileDoctorSchema = new Schema({
  // Número de colegiado
  numberColleged: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{2}-\d{5}/.test(v);
      },
      message: '{VALUE} no es número de colegiado. (Formato: XX-YY-ZZZZZ)'
    },
    required: 'Es obligatorio introducir el número de colegiado'
  },
  // Nombre
  firstName: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Apellido
  lastName: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Email
  email: {
    type: String,
    // Validar el formato email
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"]
  },
  // Nombre de usuario
  username: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // creador
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Centro médico
  healthCentre: {
    type: String,
    trim: true,
    required: 'Tienes que introducir un centro de trabajo'
  },
  // Especialidad
  specialties: {
    type: String,
    trim: true,
    required: 'Tienes que introducir una especialidad'
  },
  // Hora de inicio de consulta
  startTime: {
    type: Date,
    required: 'Tienes que introducir una hora de inicio de consulta'
  },
  // Hora de fin de consulta
  endTime: {
    type: Date,
    required: 'Tienes que introducir una hora de fin de consulta'
  },
  // Fecha de creación
  created: {
    type: Date,
    //Crear un valor 'created' por defecto
    default: Date.now
  }
});

//Crear el model 'ProfileDoctor' a partir del 'ProfileDoctorSchema'
mongoose.model('ProfileDoctor', ProfileDoctorSchema);
