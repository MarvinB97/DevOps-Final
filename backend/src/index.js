const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const config = require('./config/config');
const db = require('./models');

const app = express();

app.use(cors());
app.set('port', config.port);
app.use(morgan(config.env === 'development' ? 'dev' : 'short'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync()
    .then(() => {
      console.log('Database connected');
      const port = app.get('port');
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }).catch((err) => {
      console.error('Error starting server:', err);
    });
}

module.exports = app;
