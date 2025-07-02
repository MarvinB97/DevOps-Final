const { Pokemon } = require('../models'); // Ajusta la ruta si es necesario
const { validatePokemon } = require('../validations/pokemonValidation');

// Crear un nuevo Pokémon
exports.createPokemon = async (req, res) => {
  const { error, value } = validatePokemon(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
      details: error.details,
    });
  }
  try {
    const pokemon = await Pokemon.create(value);
    return res.status(201).json(pokemon);
  } catch (err) {
    console.error('Error creating Pokémon:', err);
    return res.status(500).json({ error: 'Error creating Pokémon' });
  }
};

// Obtener todos los Pokémons
exports.getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    return res.json(pokemons);
  } catch (err) {
    console.error('Error fetching Pokémons:', err);
    return res.status(500).json({ error: 'Error fetching Pokémons' });
  }
};

// Obtener un Pokémon por ID
exports.getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    return res.json(pokemon);
  } catch (err) {
    console.error('Error fetching Pokémon:', err);
    return res.status(500).json({ error: 'Error fetching Pokémon' });
  }
};

// Actualizar un Pokémon
exports.updatePokemon = async (req, res) => {
  const { id } = req.params;
  const { error, value } = validatePokemon(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
      details: error.details,
    });
  }
  try {
    const [updated] = await Pokemon.update(value, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    const updatedPokemon = await Pokemon.findByPk(id);
    return res.json(updatedPokemon);
  } catch (err) {
    console.error('Error updating Pokémon:', err);
    return res.status(500).json({ error: 'Error updating Pokémon' });
  }
};

// Eliminar un Pokémon
exports.deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Pokemon.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('Error deleting Pokémon:', err);
    return res.status(500).json({ error: 'Error deleting Pokémon' });
  }
};
