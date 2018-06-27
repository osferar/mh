var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var ArticleSchema = new Schema({
  // Fecha de creación
  creado: {
    type: Date,
    default: Date.now
  },
  // Título del artículo
  titulo: {
    type: String,
    default: '',
    trim: true,
    required: 'El título no puede estar en blanco'
  },
  // Contenido del artículo
  contenido: {
    type: String,
    default: '',
    trim: true
  },
  // Url del artículo
  url: {
    type: String,
    default: '',
    trim: true
  },
  // Creador (médico) del artículo
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

//Crear el model 'Article' a partir del 'ArticleSchema'
mongoose.model('Article', ArticleSchema);
