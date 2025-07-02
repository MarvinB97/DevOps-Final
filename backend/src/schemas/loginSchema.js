const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com'] } })
    .required()
    .messages({
      'string.email': 'El email debe tener un formato válido (ej: usuario@dominio.com)',
      'string.empty': 'El email es obligatorio',
      'any.required': 'El email es obligatorio',
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .required()
    .messages({
      'string.pattern.base': 'La contraseña debe contener letras y números (8-30 caracteres)',
      'string.empty': 'La contraseña es obligatoria',
      'any.required': 'La contraseña es obligatoria',
    }),
});

module.exports = loginSchema;
