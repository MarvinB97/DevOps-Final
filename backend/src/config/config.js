require('dotenv').config({ path: 'src/.env' });

const config = {
  port: process.env.PORT || 3005,
  db: {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345',
    name: process.env.DB_NAME || 'pokedex',
  },
  jwtSecret: process.env.JWT_SECRET || 'defaultsecretkey',
  env: process.env.NODE_ENV || 'development',
};

module.exports = config;
