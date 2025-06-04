import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppCard = ({pokemonName}) => {
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
      // Obtener un Pokémon individual (por nombre o ID)
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
          setPokemon(response.data); // Guardamos el objeto completo
      })
      .catch((error) => {
          console.error("Error al obtener el Pokémon:", error);
      });
    }, [pokemonName]);

    // Evitar render hasta que los datos estén listos
    if (!pokemon || !pokemon.name || !pokemon.abilities) {
      return <p>Cargando Pokémon...</p>;
    }


    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <Card.Body>
            <Card.Title style={{ textTransform: 'capitalize' }}>{pokemon.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Habilidades:</Card.Subtitle>
            <ul>
                {pokemon.abilities.map((item, index) => (
                <li key={index}>{item.ability.name}</li>
                ))}
            </ul>
        </Card.Body>
        </Card>
    );
};

export default AppCard;
