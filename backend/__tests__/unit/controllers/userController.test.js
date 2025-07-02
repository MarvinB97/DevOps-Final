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
    const mockUser = { id: 1, ...req.body };

    mockValidateUser.mockReturnValue({ value: req.body, error: null });
    User.create.mockResolvedValue(mockUser);

    await createUser(req, res);

    expect(mockValidateUser).toHaveBeenCalledWith(req.body);
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
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
      error: ['"email" is required'],
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
