const loginSchema = require('../schemas/loginSchema');

module.exports = {
  validateLogin: (data) => loginSchema.validate(data, { abortEarly: false, stripUnknown: true }),
};
