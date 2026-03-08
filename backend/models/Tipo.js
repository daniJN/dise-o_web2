const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del tipo es obligatorio'],
      trim: true,
      unique: true,
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

module.exports = mongoose.model('Tipo', tipoSchema);