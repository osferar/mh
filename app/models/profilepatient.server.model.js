// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
  crypto = require('crypto'),
  Schema = mongoose.Schema;

// Definir un nuevo 'PatientSchema'
var ProfilePatientSchema = new Schema({
  // Usuario que crea el perfil
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Fecha de creación
  created: {
    type: Date,
    //Crear un valor 'created' por defecto
    default: Date.now
  },
  // DNI del paciente
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
  // Nacionalidad
  nationality: {
    type: String,
    default: '-',
    trim: true
  },
  // Ciudad de residencia
  city: {
    type: String,
    trim: true,
    required: 'Introduzca ciudad de residencia'
  },
  // Codigo postal de residencia
  zipCode: {
    type: String,
    trim: true,
    required: 'Introduzca código postal'
  },
  // Dirección de residencia
  address: {
    type: String,
    trim: true,
    required: 'Introduzca domicilio'
  },
  // Número de teléfono de contacto
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
  // Correo electrónico de contacto
  email: {
    type: String,
    required: 'Introduzca una dirección de correo',
    // Validar el formato email
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"]
  },
  // Género
  gender: {
    type: String,
    required: 'Introduzca género'
  },
  // Fecha de nacimiento
  birthDate: {
    type: Date,
    required: 'La fecha de nacimiento no puede estar en blanco'
  },
  // Lugar de nacimiento
  birthPlace: {
    type: String,
    required: 'Lugar de nacimiento'
  },
  // Estado civil
  civilStatus: {
    type: String,
    default: '-',
    trim: true
  },
  // Grupo sanguíneo
  bloodType: {
    type: String,
    default: '-'
  },
  // Alergias
  allergies: {
    type: String,
    default: 'Ninguna',
    trim: true
  }
});

//Crear el model 'Patient' a partir del 'PatientSchema'
mongoose.model('ProfilePatient', ProfilePatientSchema);
