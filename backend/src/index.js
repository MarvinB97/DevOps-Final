const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const config = require('./config/config');
const { testConnection } = require('./config/sequelize');

const app = express();

app.use(cors());
app.set('port', config.port);
app.use(morgan(config.env === 'development' ? 'dev' : 'short'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo! El servidor está funcionando correctamente.');
});
async function startServer() {
  await testConnection();

  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
