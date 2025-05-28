const { exec } = require('child_process');
const config = require('./config/config');

const maxRetries = 10;
let retries = 0;

function checkMySQL() {
  exec(`mysqladmin ping -h ${config.db.host} -u ${config.db.user} -p${config.db.password}`, (error) => {
    if (error) {
      retries += 1;
      if (retries >= maxRetries) {
        console.error('⏳ MySQL no disponible después de múltiples intentos');
        throw new Error('MySQL no disponible después de múltiples intentos');
      }
      console.log(`🔄 Esperando a MySQL (intento ${retries}/${maxRetries})...`);
      setTimeout(checkMySQL, 5000);
    } else {
      console.log('🎉 MySQL está listo!');
      // Ejecuta el servidor una vez que MySQL esté disponible
      const server = exec('npm run dev');
      server.stdout.pipe(process.stdout);
      server.stderr.pipe(process.stderr);
    }
  });
}

checkMySQL();
