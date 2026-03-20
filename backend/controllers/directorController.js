const Director = require('../models/Director');

const getDirectores = async (req, res) => {
  try {
    const directores = await Director.find().sort({ fechaCreacion: -1 });
    res.status(200).json({ ok: true, total: directores.length, data: directores });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener directores', error: error.message });
  }
};

const getDirectoresActivos = async (req, res) => {
  try {
    const directores = await Director.find({ estado: 'Activo' }).sort({ nombres: 1 });
    res.status(200).json({ ok: true, total: directores.length, data: directores });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener directores activos', error: error.message });
  }
};

const getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json({ ok: false, mensaje: 'Director no encontrado' });
    res.status(200).json({ ok: true, data: director });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener el director', error: error.message });
  }
};

const createDirector = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const director = new Director({ nombres, estado });
    const guardado = await director.save();
    res.status(201).json({ ok: true, mensaje: 'Director creado exitosamente', data: guardado });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al crear el director', error: error.message });
  }
};

const updateDirector = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { nombres, estado },
      { returnDocument: 'after', runValidators: true }  // ✅ corregido deprecated
    );
    if (!director) return res.status(404).json({ ok: false, mensaje: 'Director no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Director actualizado exitosamente', data: director });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar el director', error: error.message });
  }
};

const deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) return res.status(404).json({ ok: false, mensaje: 'Director no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Director eliminado exitosamente', data: director });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar el director', error: error.message });
  }
};

module.exports = { getDirectores, getDirectoresActivos, getDirectorById, createDirector, updateDirector, deleteDirector };