const joi = require('joi');

const userSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(50).pattern(/^[a-zA-Z0-9]{8,30}$/)
    .required(),
  role: joi.string().valid('user', 'admin').default('user'),
});

module.exports = {
  validateUser: (data) => userSchema.validate(data, { abortEarly: false }),
};
