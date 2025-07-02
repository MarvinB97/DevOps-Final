const jwt = require('jsonwebtoken');
const auth = require('../../src/middlewares/auth');

jest.mock('jsonwebtoken');

describe('Test Auth middleware', () => {
  it('should return 403 if no token is provided', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token not provided',
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it('should return 401 if the token is invalid', () => {
    const req = { headers: { authorization: 'Bearer invalid_token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid or expired token',
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it('should call next() if the token is valid', () => {
    const req = { headers: { authorization: 'Bearer valid_token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    jwt.verify.mockReturnValue({
      user: 'test_user',
    });

    auth(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });
});
