const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del género es obligatorio'],
      trim: true,
      unique: true,
    },
    estado: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Activo',
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
  }
);

module.exports = mongoose.model('Genero', generoSchema);