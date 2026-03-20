const Productora = require('../models/Productora');

const getProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find().sort({ fechaCreacion: -1 });
    res.status(200).json({ ok: true, total: productoras.length, data: productoras });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener productoras', error: error.message });
  }
};

const getProductorasActivas = async (req, res) => {
  try {
    const productoras = await Productora.find({ estado: 'Activo' }).sort({ nombre: 1 });
    res.status(200).json({ ok: true, total: productoras.length, data: productoras });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener productoras activas', error: error.message });
  }
};

const getProductoraById = async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);
    if (!productora) return res.status(404).json({ ok: false, mensaje: 'Productora no encontrada' });
    res.status(200).json({ ok: true, data: productora });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener la productora', error: error.message });
  }
};

const createProductora = async (req, res) => {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;
    const productora = new Productora({ nombre, estado, slogan, descripcion });
    const guardada = await productora.save();
    res.status(201).json({ ok: true, mensaje: 'Productora creada exitosamente', data: guardada });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe una productora con ese nombre' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al crear la productora', error: error.message });
  }
};

const updateProductora = async (req, res) => {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;
    const productora = await Productora.findByIdAndUpdate(
      req.params.id,
      { nombre, estado, slogan, descripcion },
      { returnDocument: 'after', runValidators: true }  // ✅ corregido
    );
    if (!productora) return res.status(404).json({ ok: false, mensaje: 'Productora no encontrada' });
    res.status(200).json({ ok: true, mensaje: 'Productora actualizada exitosamente', data: productora });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe una productora con ese nombre' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar la productora', error: error.message });
  }
};

const deleteProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndDelete(req.params.id);
    if (!productora) return res.status(404).json({ ok: false, mensaje: 'Productora no encontrada' });
    res.status(200).json({ ok: true, mensaje: 'Productora eliminada exitosamente', data: productora });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar la productora', error: error.message });
  }
};

module.exports = { getProductoras, getProductorasActivas, getProductoraById, createProductora, updateProductora, deleteProductora };