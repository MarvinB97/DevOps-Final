const pokemonSchema = require('../schemas/pokemonSchema');

module.exports = {
  validatePokemon: (data) => pokemonSchema.validate(
    data,
    { abortEarly: false, stripUnknown: true },
  ),
};
