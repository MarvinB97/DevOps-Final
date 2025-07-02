const Joi = require('joi');

const pokemonSchema = Joi.object({
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

  hp: Joi.number()
    .integer()
    .min(1)
    .max(999)
    .required()
    .messages({
      'number.base': '"hp" debe ser un número',
      'number.integer': '"hp" debe ser un entero',
      'number.min': '"hp" debe ser al menos {#limit}',
      'number.max': '"hp" debe ser como máximo {#limit}',
      'any.required': '"hp" es obligatorio',
    }),

  attack: Joi.number()
    .integer()
    .min(1)
    .max(999)
    .required()
    .messages({
      'number.base': '"attack" debe ser un número',
      'number.integer': '"attack" debe ser un entero',
      'number.min': '"attack" debe ser al menos {#limit}',
      'number.max': '"attack" debe ser como máximo {#limit}',
      'any.required': '"attack" es obligatorio',
    }),

  defense: Joi.number()
    .integer()
    .min(1)
    .max(999)
    .required()
    .messages({
      'number.base': '"defense" debe ser un número',
      'number.integer': '"defense" debe ser un entero',
      'number.min': '"defense" debe ser al menos {#limit}',
      'number.max': '"defense" debe ser como máximo {#limit}',
      'any.required': '"defense" es obligatorio',
    }),

  speed: Joi.number()
    .integer()
    .min(1)
    .max(999)
    .required()
    .messages({
      'number.base': '"speed" debe ser un número',
      'number.integer': '"speed" debe ser un entero',
      'number.min': '"speed" debe ser al menos {#limit}',
      'number.max': '"speed" debe ser como máximo {#limit}',
      'any.required': '"speed" es obligatorio',
    }),

  height: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': '"height" debe ser un número',
      'number.positive': '"height" debe ser un valor positivo',
      'any.required': '"height" es obligatorio',
    }),

  weight: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': '"weight" debe ser un número',
      'number.positive': '"weight" debe ser un valor positivo',
      'any.required': '"weight" es obligatorio',
    }),

  types: Joi.array()
    .items(Joi.string().min(3).max(20))
    .min(1)
    .max(2)
    .required()
    .messages({
      'array.base': '"types" debe ser un arreglo',
      'array.min': '"types" debe tener al menos {#limit} tipo',
      'array.max': '"types" debe tener como máximo {#limit} tipos',
      'any.required': '"types" es obligatorio',
    }),

  isLegendary: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': '"isLegendary" debe ser true o false',
    }),

  imageUrl: Joi.string()
    .uri()
    .messages({
      'string.uri': '"imageUrl" debe ser una URL válida',
    }),
});

module.exports = pokemonSchema;
