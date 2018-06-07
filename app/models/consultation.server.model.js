// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definición 'ConsultationSchema'
var ConsultationSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  healthCentre: {
    type: String,
    default: '',
    trim: true
  },
  specialty: {
    type: String,
    default: '',
    trim: true
  },
  patient: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  height:{
    type: String
  },
  weight:{
    type: String
  },
  breathingFrequency: {
    type: String,
    default: '',
    trim: true
  },
  bloodPressure: {
    type: String,
    default: '',
    trim: true
  },
  heartRate: {
    type: String,
    default: '',
    trim: true
  },
  physicalExploration: {
    type: String,
    default: '',
    trim: true
  },
  disorder: {
    type: String,
    default: '',
    trim: true
  },
  diagnosis: {
    type: String,
    default: '',
    trim: true
  },
  medicationPrescription: {
    type: String,
    default: '',
    trim: true
  },
  medicalInstructions: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Consultation', ConsultationSchema);
