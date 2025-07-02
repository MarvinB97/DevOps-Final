const pokemonSchema = require('../schemas/pokemonSchema');

function validatePokemonData(req, res, next) {
  const { error, value } = pokemonSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    const formattedErrors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    return res.status(400).json({ success: false, errors: formattedErrors });
  }

  req.validatedData = value;
  return next();
}

module.exports = validatePokemonData;
