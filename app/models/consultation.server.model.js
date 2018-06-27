// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definición 'ConsultationSchema'
var ConsultationSchema = new Schema({
  // Fecha de creación
  creado: {
    type: Date,
    default: Date.now
  },
  // Cita a la que es referida la consulta
  appointment:{
    type: Schema.ObjectId,
    ref: 'Appointment'
  },
  // Usuario (médico) que crea la consulta
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Antecedentes personales
  medicalHistory:{
    type: String,
    default: '-',
    trim: true
  },
  // Tratamiento actual
  currentTreatment:{
    type: String,
    default: '-',
    trim: true
  },
  // Antecedentes familiares
  familyHistory:{
    type: String,
    default: '-',
    trim: true
  },
  // Anamnesis
  presentComplaint:{
    type: String,
    default: '-',
    trim: true
  },
  // Altura
  height:{
    type: String,
    default: '-'
  },
  // Peso
  weight:{
    type: String,
    default: '-'
  },
  // Frecuencia respiratoria
  breathingFrequency: {
    type: String,
    default: '-',
    trim: true
  },
  // Presión arterial
  bloodPressure: {
    type: String,
    default: '-',
    trim: true
  },
  // Frecuencia cardiaca
  heartRate: {
    type: String,
    default: '-',
    trim: true
  },
  // Exploración física
  physicalExploration: {
    type: String,
    default: '-',
    trim: true
  },
  // Diagnostico
  diagnosis: {
    type: String,
    default: '-',
    trim: true
  },
  // Prescripción médica
  medicationPrescription: {
    type: String,
    default: '-',
    trim: true
  },
  // Instruciones médicas
  medicalInstructions: {
    type: String,
    default: '-',
    trim: true
  }
});

//Crear el model 'Consultation' a partir del 'ConsultationSchema'
mongoose.model('Consultation', ConsultationSchema);
