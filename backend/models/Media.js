const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: [true, 'El serial es obligatorio'],
      unique: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    sinopsis: {
      type: String,
      required: [true, 'La sinopsis es obligatoria'],
      trim: true,
    },
    urlPelicula: {
      type: String,
      required: [true, 'La URL de la película es obligatoria'],
      unique: true,
      trim: true,
    },
    imagenPortada: {
      type: String,
      trim: true,
      default: '',
    },
    anioEstreno: {
      type: Number,
      required: [true, 'El año de estreno es obligatorio'],
    },
    genero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genero',
      required: [true, 'El género es obligatorio'],
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director',
      required: [true, 'El director es obligatorio'],
    },
    productora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productora',
      required: [true, 'La productora es obligatoria'],
    },
    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tipo',
      required: [true, 'El tipo es obligatorio'],
    },
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
  }
);

module.exports = mongoose.model('Media', mediaSchema);