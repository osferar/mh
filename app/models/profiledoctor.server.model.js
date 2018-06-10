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
    default: '',
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
    default: '',
    trim: true
  },
  // Especialidad
  specialties: {
    type: String,
    default: '',
    trim: true,
    required: 'Al menos tiene que tener una especialidad'
  },
  // Hora de inicio de consulta
  startTime:{
    type:Date,
    default: '',
    trim:true
  },
  // Hora de fin de consulta
  endTime:{
    type:Date,
    default: '',
    trim:true
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
