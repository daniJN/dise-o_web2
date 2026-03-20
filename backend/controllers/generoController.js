const Genero = require('../models/Genero');

const getGeneros = async (req, res) => {
  try {
    const generos = await Genero.find().sort({ fechaCreacion: -1 });
    res.status(200).json({ ok: true, total: generos.length, data: generos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener géneros', error: error.message });
  }
};

const getGenerosActivos = async (req, res) => {
  try {
    const generos = await Genero.find({ estado: 'Activo' }).sort({ nombre: 1 });
    res.status(200).json({ ok: true, total: generos.length, data: generos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener géneros activos', error: error.message });
  }
};

const getGeneroById = async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id);
    if (!genero) return res.status(404).json({ ok: false, mensaje: 'Género no encontrado' });
    res.status(200).json({ ok: true, data: genero });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener el género', error: error.message });
  }
};

const createGenero = async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    const genero = new Genero({ nombre, estado, descripcion });
    const guardado = await genero.save();
    res.status(201).json({ ok: true, mensaje: 'Género creado exitosamente', data: guardado });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe un género con ese nombre' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al crear el género', error: error.message });
  }
};

const updateGenero = async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    const genero = await Genero.findByIdAndUpdate(
      req.params.id,
      { nombre, estado, descripcion },
      { returnDocument: 'after', runValidators: true }  // ✅ Cambiado aquí
    );
    if (!genero) return res.status(404).json({ ok: false, mensaje: 'Género no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Género actualizado exitosamente', data: genero });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe un género con ese nombre' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar el género', error: error.message });
  }
};

const deleteGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndDelete(req.params.id);
    if (!genero) return res.status(404).json({ ok: false, mensaje: 'Género no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Género eliminado exitosamente', data: genero });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar el género', error: error.message });
  }
};

module.exports = { getGeneros, getGenerosActivos, getGeneroById, createGenero, updateGenero, deleteGenero };