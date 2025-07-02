const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

// Modelo para la tabla "pokemons"
const Pokemon = sequelize.define(
  'pokemons',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    // Estadísticas base
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999,
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999,
      },
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999,
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999,
      },
    },
    // Altura (en metros) y peso (en kg)
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.1,
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.1,
      },
    },
    // Tipos (puede tener uno o dos), los guardamos como JSON
    types: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isArrayOfStrings(value) {
          if (
            !Array.isArray(value)
                        || value.length < 1
                        || value.length > 2
                        || !value.every((t) => typeof t === 'string')
          ) {
            throw new Error('Debe ser un array de 1 o 2 tipos de Pokémon');
          }
        },
      },
    },
    // Indica si es legendario
    isLegendary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // URL opcional de una imagen
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'pokemons',
  },
);

module.exports = Pokemon;
