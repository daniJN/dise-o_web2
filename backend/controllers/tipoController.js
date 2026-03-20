const Tipo = require('../models/Tipo');

const getTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find().sort({ fechaCreacion: -1 });
    res.status(200).json({ ok: true, total: tipos.length, data: tipos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener tipos', error: error.message });
  }
};

const getTipoById = async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    if (!tipo) return res.status(404).json({ ok: false, mensaje: 'Tipo no encontrado' });
    res.status(200).json({ ok: true, data: tipo });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener el tipo', error: error.message });
  }
};

const createTipo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const tipo = new Tipo({ nombre, descripcion });
    const guardado = await tipo.save();
    res.status(201).json({ ok: true, mensaje: 'Tipo creado exitosamente', data: guardado });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe un tipo con ese nombre' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al crear el tipo', error: error.message });
  }
};

const updateTipo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const tipo = await Tipo.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion },
      { returnDocument: 'after', runValidators: true }  // ✅ corregido
    );
    if (!tipo) return res.status(404).json({ ok: false, mensaje: 'Tipo no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Tipo actualizado exitosamente', data: tipo });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe un tipo con ese nombre' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar el tipo', error: error.message });
  }
};

const deleteTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) return res.status(404).json({ ok: false, mensaje: 'Tipo no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Tipo eliminado exitosamente', data: tipo });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar el tipo', error: error.message });
  }
};

module.exports = { getTipos, getTipoById, createTipo, updateTipo, deleteTipo };