// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definición 'AppointmentSchema'
var AppointmentSchema = new Schema({
  // Fecha de creación
  created: {
    type: Date,
    // Crea el valor 'created' por defecto
    default: Date.now
  },
  // Fecha de la cita
  date: {
    type: Date,
    // Validar existencia de valor Date
    required: 'Fecha es obligatoria / Date is require'
  },
  // Hora de la cita
  hour:{
    type: Date,
    // Validar existencia de valor Hour
    required: 'Hora es obligatoria / Hour is require'
  },
  // Doctor al que solicitamos la cita
  doctor: {
    type: Schema.ObjectId,
    ref: 'ProfileDoctor',
    required: 'Elegir doctor es obligatorio / Choose doctor is require'
  },
  // Creador (paciente) de la cita
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Motivo de consulta
  chiefComplaint: {
    type: String,
    default: '',
    trim: true,
    required: 'Motivo de consulta es obligatorio / Chief complaint is require'
  }
});
//Crear el model 'Appointment' a partir del 'AppointmentSchema'
mongoose.model('Appointment', AppointmentSchema);
