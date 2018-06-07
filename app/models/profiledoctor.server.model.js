// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir un nuevo 'ProfileDoctorSchema'
var ProfileDoctorSchema = new Schema({
  numberColleged: {
    type: String,
    required: 'Es obligatorio introducir el número de colegiado'
  },
  firstName: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  lastName: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  username: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // TODO: lista de centros médicos donde ejerce
  healthCentre: {
    type: String,
    default: '',
    trim: true
  },
  // TODO: lista de especialidades médicas que ejerce
  specialties: {
    type: String,
    default: '',
    trim: true,
    required: 'Al menos tiene que tener una especialidad'
  },
  // TODO: lista de horas disponible para citas
  workingHours:{
    type:Date,
    default: '',
    trim:true
  },
  created: {
    type: Date,
    //Crear un valor 'created' por defecto
    default: Date.now
  }
});

//Crear el model 'ProfileDoctor' a partir del 'ProfileDoctorSchema'
mongoose.model('ProfileDoctor', ProfileDoctorSchema);
