const userSchema = require('../../../src/schemas/userSchema');

describe('userSchema', () => {
  const validUser = {
    name: 'Santiago',
    email: 'santiago@example.com',
    password: 'abc12345',
    role: 'user',
  };

  it('valida un usuario válido', () => {
    const result = userSchema.validate(validUser);
    expect(result.error).toBeUndefined();
    expect(result.value).toEqual(validUser);
  });

  it('falla si falta el nombre', () => {
    const { error } = userSchema.validate({ ...validUser, name: undefined });
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('name');
  });

  it('falla si el nombre es muy corto', () => {
    const { error } = userSchema.validate({ ...validUser, name: 'Jo' });
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('name');
  });

  it('falla si el email es inválido', () => {
    const { error } = userSchema.validate({ ...validUser, email: 'sin-arroba.com' });
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('email');
  });

  it('falla si el password es muy corto', () => {
    const { error } = userSchema.validate({ ...validUser, password: 'abc' });
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('password');
  });

  it('falla si el password tiene caracteres no permitidos', () => {
    const { error } = userSchema.validate({ ...validUser, password: 'abc123$%' });
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('password');
  });

  it('falla si el rol no es válido', () => {
    const { error } = userSchema.validate({ ...validUser, role: 'moderator' });
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('role');
  });

  it('asigna el rol por defecto si no se envía', () => {
    const userWithoutRole = { ...validUser };
    delete userWithoutRole.role;

    const { error, value } = userSchema.validate(userWithoutRole);
    expect(error).toBeUndefined();
    expect(value.role).toBe('user');
  });
});
