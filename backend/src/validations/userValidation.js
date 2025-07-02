const userSchema = require('../schemas/userSchema');
// s
module.exports = {
  validateUser: (data) => userSchema.validate(data, { abortEarly: false }),
};
