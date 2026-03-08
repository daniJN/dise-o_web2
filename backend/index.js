require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Cargar rutas una por una para ver cuál falla
try {
  app.use('/api/generos',     require('./routes/generoRoutes'));
  console.log('✅ generoRoutes OK');
  app.use('/api/directores',  require('./routes/directorRoutes'));
  console.log('✅ directorRoutes OK');
  app.use('/api/productoras', require('./routes/productoraRoutes'));
  console.log('✅ productoraRoutes OK');
  app.use('/api/tipos',       require('./routes/tipoRoutes'));
  console.log('✅ tipoRoutes OK');
  app.use('/api/medias',      require('./routes/mediaRoutes'));
  console.log('✅ mediaRoutes OK');
} catch (err) {
  console.log('❌ ERROR EN RUTA:', err.message);
}

app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: '🎬 API funcionando' });
});
app.use(express.json());
app.listen(port, () => {
  console.log(`--- 🚀 Servidor en puerto ${port} ---`);
  const { getConnection } = require('./bd/bd_connection_mongo');
  getConnection();
});