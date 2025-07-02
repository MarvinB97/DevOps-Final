const { exec } = require('child_process');
const config = require('./config/config');

const dbHost = process.env.DB_HOST || config.db.host;
const dbUser = process.env.DB_USER || config.db.user;
const dbPassword = process.env.DB_PASSWORD || config.db.password;
const dbName = process.env.DB_NAME || config.db.name;

const maxRetries = 10;
let retries = 0;

function checkMySQL() {
  // Usamos el cliente mariadb con SSL desactivado y un comando SQL que siempre responde
  const cmd = `echo "SELECT 1;" | mariadb -h ${dbHost} -u${dbUser} -p${dbPassword} ${dbName} --ssl=DISABLED`;

  exec(cmd, (error) => {
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
      const server = exec('npm run dev', { env: process.env });
      server.stdout.pipe(process.stdout);
      server.stderr.pipe(process.stderr);
    }
  });
}

checkMySQL();
