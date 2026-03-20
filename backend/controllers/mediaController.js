const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const getMedias = async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero', 'nombre estado')
      .populate('director', 'nombres estado')
      .populate('productora', 'nombre estado')
      .populate('tipo', 'nombre')
      .sort({ fechaCreacion: -1 });
    res.status(200).json({ ok: true, total: medias.length, data: medias });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener medias', error: error.message });
  }
};

const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('genero', 'nombre estado')
      .populate('director', 'nombres estado')
      .populate('productora', 'nombre estado')
      .populate('tipo', 'nombre');
    if (!media) return res.status(404).json({ ok: false, mensaje: 'Media no encontrada' });
    res.status(200).json({ ok: true, data: media });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener la media', error: error.message });
  }
};

const createMedia = async (req, res) => {
  try {
    const { serial, titulo, sinopsis, urlPelicula, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;

    const generoDoc = await Genero.findById(genero);
    if (!generoDoc) return res.status(404).json({ ok: false, mensaje: 'Género no encontrado' });
    if (generoDoc.estado !== 'Activo') return res.status(400).json({ ok: false, mensaje: 'El género no está activo' });

    const directorDoc = await Director.findById(director);
    if (!directorDoc) return res.status(404).json({ ok: false, mensaje: 'Director no encontrado' });
    if (directorDoc.estado !== 'Activo') return res.status(400).json({ ok: false, mensaje: 'El director no está activo' });

    const productoraDoc = await Productora.findById(productora);
    if (!productoraDoc) return res.status(404).json({ ok: false, mensaje: 'Productora no encontrada' });
    if (productoraDoc.estado !== 'Activo') return res.status(400).json({ ok: false, mensaje: 'La productora no está activa' });

    const tipoDoc = await Tipo.findById(tipo);
    if (!tipoDoc) return res.status(404).json({ ok: false, mensaje: 'Tipo no encontrado' });

    const media = new Media({ serial, titulo, sinopsis, urlPelicula, imagenPortada, anioEstreno, genero, director, productora, tipo });
    const guardada = await media.save();

    const populated = await Media.findById(guardada._id)
      .populate('genero', 'nombre estado')
      .populate('director', 'nombres estado')
      .populate('productora', 'nombre estado')
      .populate('tipo', 'nombre');

    res.status(201).json({ ok: true, mensaje: 'Media creada exitosamente', data: populated });
  } catch (error) {
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ ok: false, mensaje: `Ya existe una media con ese ${campo}` });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al crear la media', error: error.message });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { serial, titulo, sinopsis, urlPelicula, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;

    if (genero) {
      const generoDoc = await Genero.findById(genero);
      if (!generoDoc) return res.status(404).json({ ok: false, mensaje: 'Género no encontrado' });
      if (generoDoc.estado !== 'Activo') return res.status(400).json({ ok: false, mensaje: 'El género no está activo' });
    }
    if (director) {
      const directorDoc = await Director.findById(director);
      if (!directorDoc) return res.status(404).json({ ok: false, mensaje: 'Director no encontrado' });
      if (directorDoc.estado !== 'Activo') return res.status(400).json({ ok: false, mensaje: 'El director no está activo' });
    }
    if (productora) {
      const productoraDoc = await Productora.findById(productora);
      if (!productoraDoc) return res.status(404).json({ ok: false, mensaje: 'Productora no encontrada' });
      if (productoraDoc.estado !== 'Activo') return res.status(400).json({ ok: false, mensaje: 'La productora no está activa' });
    }
    if (tipo) {
      const tipoDoc = await Tipo.findById(tipo);
      if (!tipoDoc) return res.status(404).json({ ok: false, mensaje: 'Tipo no encontrado' });
    }

    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { serial, titulo, sinopsis, urlPelicula, imagenPortada, anioEstreno, genero, director, productora, tipo },
      { returnDocument: 'after', runValidators: true }  // ✅ corregido deprecated
    )
      .populate('genero', 'nombre estado')
      .populate('director', 'nombres estado')
      .populate('productora', 'nombre estado')
      .populate('tipo', 'nombre');

    if (!media) return res.status(404).json({ ok: false, mensaje: 'Media no encontrada' });
    res.status(200).json({ ok: true, mensaje: 'Media actualizada exitosamente', data: media });
  } catch (error) {
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ ok: false, mensaje: `Ya existe una media con ese ${campo}` });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar la media', error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ ok: false, mensaje: 'Media no encontrada' });
    res.status(200).json({ ok: true, mensaje: 'Media eliminada exitosamente', data: media });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar la media', error: error.message });
  }
};

module.exports = { getMedias, getMediaById, createMedia, updateMedia, deleteMedia };