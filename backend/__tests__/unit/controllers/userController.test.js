const mockValidateUser = jest.fn();

jest.mock('../../../src/validations/userValidation', () => ({
  validateUser: mockValidateUser,
}));

jest.mock('../../../src/models', () => ({
  User: {
    create: jest.fn(),
  },
}));

const { createUser } = require('../../../src/controllers/userController');
const { User } = require('../../../src/models');

describe('createUser controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Santiago',
        email: 'test@example.com',
        password: 'abc12345',
        role: 'user',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockValidateUser.mockReset();
    User.create.mockReset();
  });

  it('crea un usuario y responde con status 201', async () => {
    const mockUser = {
      id: 1,
      name: 'Santiago',
      email: 'test@example.com',
      role: 'user',
      password: 'abc12345', // O un hash, pero la función real borra el password de la respuesta
      toJSON() {
      // Lo que realmente regresa tu función (sin password)
        return {
          id: 1, name: 'Santiago', email: 'test@example.com', role: 'user',
        };
      },
    };

    mockValidateUser.mockReturnValue({ value: req.body, error: null });
    User.create.mockResolvedValue(mockUser);

    await createUser(req, res);

    expect(mockValidateUser).toHaveBeenCalledWith(req.body);
    // Solo asegúrate de que password existe y es string
    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      name: req.body.name,
      email: req.body.email,
      password: expect.any(String), // puede ser hash
      role: req.body.role,
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'Santiago',
      email: 'test@example.com',
      role: 'user',
    });
  });

  it('devuelve 400 si hay errores de validación', async () => {
    const fakeError = {
      details: [{ message: '"email" is required' }],
    };

    mockValidateUser.mockReturnValue({ error: fakeError });

    await createUser(req, res);

    expect(mockValidateUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['"email" is required'], // Cambiado a "errors" para coincidir con tu código y otros tests
      details: fakeError.details,
    });
  });

  it('devuelve 500 si hay error en la base de datos', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockValidateUser.mockReturnValue({ value: req.body, error: null });
    User.create.mockRejectedValue(new Error('Database failure'));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating user' });

    consoleSpy.mockRestore();
  });
});
