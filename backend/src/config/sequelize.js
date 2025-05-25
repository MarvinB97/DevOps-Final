const { Sequelize } = require('sequelize');
const config = require('./config'); // Ruta del archivo config

// Crear una instancia de Sequelize para la conexión con la base de datos
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a MySQL'))
  .catch((err) => console.error('No se pudo conectar a MySQL:', err));

module.exports = sequelize;
