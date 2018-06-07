// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Definir un nuevo 'PatientSchema'
var ProfilePatientSchema = new Schema({
  nss: String,
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
  phoneNumber:{
    type: String
  },
  username: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    //Crear un valor 'created' por defecto
    default: Date.now
  },
  bloodType:{
    type: String
  },
  height:{
    type: String
  },
  weight:{
    type: String
  },
  gender:{
    type: String
  }
});

//Crear el model 'Patient' a partir del 'PatientSchema'
mongoose.model('ProfilePatient', ProfilePatientSchema);
