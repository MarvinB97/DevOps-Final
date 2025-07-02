const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '"email" debe ser un correo válido',
      'any.required': '"email" es obligatorio',
      'string.empty': '"email" no puede estar vacío',
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .required(),
});

module.exports = loginSchema;
