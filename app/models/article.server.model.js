var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var ArticleSchema = new Schema({
  creado: {
    type: Date,
    // default:moment().format()
    default: Date.now
  //  default: moment(new Date()).format("LLLL")
  },
  titulo: {
    type: String,
    default: '',
    trim: true,
    required: 'El título no puede estar en blanco'
  },
  contenido: {
    type: String,
    default: '',
    trim: true
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

//Crear el model 'Article' a partir del 'ArticleSchema'
mongoose.model('Article', ArticleSchema);
