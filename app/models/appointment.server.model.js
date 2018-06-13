// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definición 'AppointmentSchema'
var AppointmentSchema = new Schema({
  created: {
    type: Date,
    // Crea el valor 'created' por defecto
    default: Date.now
  },
  date: {
    type: Date,
    // Validar existencia de valor Date
    required: 'Fecha es obligatoria / Date is require'
  },
  hour:{
    type: Date,
    // Validar existencia de valor Hour
    required: 'Hora es obligatoria / Hour is require'
  },
  doctor: {
    type: Schema.ObjectId,
    ref: 'ProfileDoctor',
    required: 'Elegir doctor es obligatorio / Choose doctor is require'
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  chiefComplaint: {
    type: String,
    default: '',
    trim: true,
    required: 'Motivo de consulta es obligatorio / Chief complaint is require'
  }
});

mongoose.model('Appointment', AppointmentSchema);
