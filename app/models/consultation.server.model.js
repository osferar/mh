// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definición 'ConsultationSchema'
var ConsultationSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  appointment:{
    type: Schema.ObjectId,
    ref: 'Appointment'
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  medicalHistory:{
    type: String,
    default: '-',
    trim: true
  },
  currentTreatment:{
    type: String,
    default: '-',
    trim: true
  },
  familyHistory:{
    type: String,
    default: '-',
    trim: true
  },
  presentComplaint:{
    type: String,
    default: '-',
    trim: true
  },
  height:{
    type: String,
    default: '-'
  },
  weight:{
    type: String,
    default: '-'
  },
  breathingFrequency: {
    type: String,
    default: '-',
    trim: true
  },
  bloodPressure: {
    type: String,
    default: '-',
    trim: true
  },
  heartRate: {
    type: String,
    default: '-',
    trim: true
  },
  physicalExploration: {
    type: String,
    default: '-',
    trim: true
  },
  diagnosis: {
    type: String,
    default: '-',
    trim: true
  },
  medicationPrescription: {
    type: String,
    default: '-',
    trim: true
  },
  medicalInstructions: {
    type: String,
    default: '-',
    trim: true
  }
});

mongoose.model('Consultation', ConsultationSchema);
