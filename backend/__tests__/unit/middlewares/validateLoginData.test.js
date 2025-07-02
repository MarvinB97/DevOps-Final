const express = require('express');
const request = require('supertest');
const validateLoginData = require('../../../src/middlewares/validateLoginData');

describe('Middleware validateLoginData', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.post('/login', validateLoginData, (req, res) => {
      res.status(200).json({ success: true, data: req.validatedData });
    });
  });

  it('debe permitir login válido', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'abc12345' }); // ✅ cumple el regex

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({
      email: 'test@example.com',
      password: 'abc12345',
    });
  });

  it('debe rechazar si falta el email', async () => {
    const response = await request(app)
      .post('/login')
      .send({ password: 'abc12345' });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: 'El email es obligatorio',
        }),
      ]),
    );
  });

  it('debe rechazar si el password es inválido', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: '123' }); // ❌ no cumple el regex

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'password',
          message: 'La contraseña debe contener letras y números (8-30 caracteres)',
        }),
      ]),
    );
  });
});
