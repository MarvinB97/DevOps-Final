const { createUser } = require('../../src/controllers/userController');

// Mock de models/index.js que exporta User
jest.mock('../../src/models', () => ({
  User: {
    create: jest.fn(),
  },
}));

const { User } = require('../../src/models');

describe('userController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return 201 status', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'abc12345',
        role: 'admin',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const fakeUser = { id: 1, ...req.body };
    User.create.mockResolvedValue({ user: fakeUser });

    await createUser(req, res);

    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john@example.com',
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user: fakeUser });
  });

  it('should return 400 status for invalid user data', async () => {
    const req = {
      body: {
        name: 'Jo',
        email: 'invalid-email',
        password: '123',
        role: 'guest',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.arrayContaining([
        expect.stringContaining('"name" length must be at least 3 characters'),
        expect.stringContaining('"email" must be a valid email'),
        expect.stringContaining('"password" length must be at least 6 characters long'),
        expect.stringContaining('"password" with value "123" fails to match the required pattern'),
        expect.stringContaining('"role" must be one of [user, admin]'),
      ]),
      details: expect.any(Array),
    }));
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should return 500 status when database fails', async () => {
    const mockError = new Error('Database connection failed');
    User.create = jest.fn().mockRejectedValue(mockError);

    const req = {
      body: {
        name: 'Valid Name',
        email: 'valid@email.com',
        password: 'validPassword123',
        role: 'user',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(User.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error creating user',
    });
  });
});
