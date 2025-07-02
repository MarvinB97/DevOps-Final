/* eslint-env jest */
import fs from 'fs';
import path from 'path';

// Lista de usuarios esperados (puedes automatizarla si quieres leer el directorio)
const users = ['Bob', 'Randy'];

describe('JSON structure validation for each user', () => {
  users.forEach((username) => {
    it(`validates structure of ${username}'s info.json`, () => {
      const filePath = path.resolve(__dirname, `../../public/${username}/info.json`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const info = JSON.parse(fileContent);

      // Verifica estructura general
      expect(info).toHaveProperty('user');
      expect(info).toHaveProperty('topic');
      expect(info).toHaveProperty('names');

      // Verifica contenido de 'user'
      expect(info.user).toMatchObject({
        username: expect.any(String),
        profileImage: expect.any(String),
        socialLink: expect.any(String),
      });
    });
  });
});
