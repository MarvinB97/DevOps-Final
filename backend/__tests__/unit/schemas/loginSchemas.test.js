const loginSchema = require('../../../src/schemas/loginSchema');

describe('loginSchema', () => {
  it('valida un login válido', () => {
    const result = loginSchema.validate({
      email: 'usuario@example.com',
      password: 'abc12345',
    });

    expect(result.error).toBeUndefined();
    expect(result.value).toEqual({
      email: 'usuario@example.com',
      password: 'abc12345',
    });
  });

  it('falla si falta el email', () => {
    const result = loginSchema.validate({ password: 'abc12345' });

    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toBe('El email es obligatorio');
    expect(result.error.details[0].path[0]).toBe('email');
  });

  it('falla si el email no tiene un TLD permitido', () => {
    const result = loginSchema.validate({
      email: 'usuario@dominio.org',
      password: 'abc12345',
    });

    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toBe('El email debe tener un formato válido (ej: usuario@dominio.com)');
    expect(result.error.details[0].path[0]).toBe('email');
  });

  it('falla si el email tiene un formato inválido', () => {
    const result = loginSchema.validate({
      email: 'usuario.com',
      password: 'abc12345',
    });

    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toBe('El email debe tener un formato válido (ej: usuario@dominio.com)');
  });

  it('falla si falta el password', () => {
    const result = loginSchema.validate({ email: 'usuario@example.com' });

    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toBe('La contraseña es obligatoria');
    expect(result.error.details[0].path[0]).toBe('password');
  });

  it('falla si el password no cumple el patrón', () => {
    const result = loginSchema.validate({
      email: 'usuario@example.com',
      password: 'passwordsolo',
    });

    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toBe('La contraseña debe contener letras y números (8-30 caracteres)');
  });

  it('falla si el password es muy corto', () => {
    const result = loginSchema.validate({
      email: 'usuario@example.com',
      password: 'abc1',
    });

    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toBe('La contraseña debe contener letras y números (8-30 caracteres)');
  });

  it('elimina campos no definidos si se activa `stripUnknown`', () => {
    const result = loginSchema.validate(
      {
        email: 'usuario@example.com',
        password: 'abc12345',
        otro: 'campoExtra',
      },
      { stripUnknown: true },
    );

    expect(result.error).toBeUndefined();
    expect(result.value).not.toHaveProperty('otro');
  });
});
