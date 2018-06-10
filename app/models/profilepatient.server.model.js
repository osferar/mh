// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Definir un nuevo 'PatientSchema'
var ProfilePatientSchema = new Schema({

  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    //Crear un valor 'created' por defecto
    default: Date.now
  },
  dni: {
    type: String,
    required: 'El DNI/NIF no puede estar en blanco'
  },
  nationality:{
    type: String,
    default: '-',
    trim: true
  },
  city:{
    type: String,
    default: '-',
    trim: true
  },
  zipCode:{
    type: String,
    default: '-',
    trim: true
  },
  address:{
    type: String,
    default: '-',
    trim: true
  },
  phoneNumber:{
    type: String,
    default: '-',
  },
  email: {
    type: String,
    default: '-',
  },
  gender:{
    type: String,
    default: '-',
  },
  birthDate:{
    type: Date,
    required: 'La fecha de nacimiento no puede estar en blanco'
  },
  birthPlace:{
    type: String,
    default: '-'
  },
  civilStatus:{
    type: String,
    default: '-',
    trim: true
  },
  bloodType:{
    type: String,
    default: '-'
  },
  allergies:{
    type: String,
    default: 'Ninguna',
    trim: true
  }
});

//Crear el model 'Patient' a partir del 'PatientSchema'
mongoose.model('ProfilePatient', ProfilePatientSchema);
