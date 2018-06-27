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
    unique: true,
    validate: {
      validator: function (dni) {
        var numero
        var letr
        var letra
        var expresion_regular_dni

        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

        if (expresion_regular_dni.test(dni) == true) {
          numero = dni.substr(0, dni.length - 1);
          letr = dni.substr(dni.length - 1, 1);
          numero = numero % 23;
          letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
          letra = letra.substring(numero, numero + 1);
          if (letra != letr.toUpperCase()) {
            return /'Dni erroneo, la letra del NIF no se corresponde'/.test(dni);
            // alert('Dni erroneo, la letra del NIF no se corresponde');
          } else {
          }
        } else {
            return /'Dni erroneo, formato no válido'/.test(dni);
          // alert('Dni erroneo, );
        }
      },
      message: '{VALUE} no es número de DNI. (Formato: 1234567A)'
    },
    required: 'El DNI/NIF no puede estar en blanco'
  },
  nationality: {
    type: String,
    default: '-',
    trim: true
  },
  city: {
    type: String,
    trim: true,
    required: 'Introduzca ciudad de residencia'
  },
  zipCode: {
    type: String,
    trim: true,
    required: 'Introduzca código postal'
  },
  address: {
    type: String,
    trim: true,
    required: 'Introduzca domicilio'
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{9}/.test(v);
      },
      message: '{VALUE} no es número de teléfono. (Formato: 98765321)'
    },
    required: 'Es obligatorio introducir un número de teléfono'

  },
  email: {
    type: String,
    required: 'Introduzca una dirección de correo',
    // Validar el formato email
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"]
  },
  gender: {
    type: String,
    required: 'Introduzca género'
  },
  birthDate: {
    type: Date,
    required: 'La fecha de nacimiento no puede estar en blanco'
  },
  birthPlace: {
    type: String,
    required: 'Lugar de nacimiento'
  },
  civilStatus: {
    type: String,
    default: '-',
    trim: true
  },
  bloodType: {
    type: String,
    default: '-'
  },
  allergies: {
    type: String,
    default: 'Ninguna',
    trim: true
  }
});

//Crear el model 'Patient' a partir del 'PatientSchema'
mongoose.model('ProfilePatient', ProfilePatientSchema);
