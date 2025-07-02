const loginSchema = require('../schemas/loginSchema');

function validateLoginData(req, res, next) {
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const formattedErrors = error.details.map((detail) => ({
      field: detail.path[0],
      code: detail.type.replace('string.', '').toUpperCase(),
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }

  // Asignar los valores validados al requests
  req.validatedData = value;
  return next();
}

module.exports = validateLoginData;
