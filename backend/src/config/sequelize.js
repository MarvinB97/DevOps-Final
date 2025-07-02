const { Sequelize } = require('sequelize');
const config = require('./config'); // Ruta del archivo config

// Crear una instancia de Sequelize para la conexión con la base de datos
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    ssl: false,
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a MySQL');

    await sequelize.sync({ alter: true });
    console.log('🔃 Modelos sincronizados');

    return true;
  } catch (error) {
    console.error('❌ Error de conexión:', error.original || error);
    return false;
  }
}

module.exports = { sequelize, testConnection };
