// validations/userValidation.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': '"name" debe ser un texto',
      'string.empty': '"name" no puede estar vacío',
      'string.min': '"name" debe tener al menos {#limit} caracteres',
      'string.max': '"name" debe tener como máximo {#limit} caracteres',
      'any.required': '"name" es obligatorio',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '"email" debe ser un correo válido',
      'any.required': '"email" es obligatorio',
    }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .required(),

  role: Joi.string()
    .valid('user', 'admin')
    .default('user')
    .messages({
      'any.only': '"role" debe ser \'user\' o \'admin\'',
    }),

  isActive: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': '"isActive" debe ser true o false',
    }),
});

module.exports = userSchema;
