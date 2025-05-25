require('dotenv').config({ path: 'src/.env' });

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'forms',
  },
  jwtSecret: process.env.JWT_SECRET || 'defaultsecretkey',
  env: process.env.NODE_ENV || 'development',
};

module.exports = config;
