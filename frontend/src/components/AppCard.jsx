import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppCard = ({pokemonName}) => {
    const [pokemon, setPokemon] = useState();

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
    if (!pokemon || !pokemon.name || !pokemon.abilities || !pokemon.sprites) {
      return <p>Cargando Pokémon...</p>;
    }

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={pokemon.sprites.front_default || undefined} alt={pokemon.name} />
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





//COMPLEJIDAD CICLOMATICA ALTA
/*
import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppCard = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState();
  const [error, setError] = useState(null);
  const [showAbilities, setShowAbilities] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el Pokémon:', error);
        setError(error);
      });
  }, [pokemonName]);

  if (error) {
    return <p>Error al cargar el Pokémon.</p>;
  }

  // Aquí aumenta la complejidad por múltiples condiciones
  if (!pokemon || !pokemon.name || !pokemon.abilities || !pokemon.sprites || !pokemon.sprites.front_default) {
    return <p>Cargando Pokémon...</p>;
  }

  // También aumenta con lógica condicional y de renderizado
  const renderAbilities = () => {
    if (!showAbilities) return null;
    if (pokemon.abilities.length === 0) return <p>No tiene habilidades.</p>;
    if (pokemon.abilities.length > 5) return <p>Demasiadas habilidades para mostrar.</p>;
    if (pokemon.abilities.length === 1) return <p>Una sola habilidad: {pokemon.abilities[0].ability.name}</p>;

    return (
      <ul>
        {pokemon.abilities.map((item, index) => (
          <li key={index}>{item.ability.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <Card.Body>
        <Card.Title style={{ textTransform: 'capitalize' }}>{pokemon.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Habilidades:</Card.Subtitle>
        {renderAbilities()}
        <Button onClick={() => setShowAbilities(!showAbilities)}>Toggle habilidades</Button>
      </Card.Body>
    </Card>
  );
};

export default AppCard;
*/