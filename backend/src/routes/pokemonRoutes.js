const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

router.post('/', pokemonController.createPokemon);
router.get('/', pokemonController.getAllPokemons);
router.get('/:id', pokemonController.getPokemonById);
router.put('/:id', pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;
