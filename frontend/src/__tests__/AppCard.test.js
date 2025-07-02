import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
//import { act } from 'react';
import AppCard from '../components/AppCard';
import axios from 'axios';

jest.mock('axios');

describe('AppCard', () => {
  const mockPokemonData = {
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra "Cargando Pokémon..." al inicio y luego renderiza datos del Pokémon', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<AppCard pokemonName="pikachu" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      'https://example.com/pikachu.png'
    );
  });

  it('verifica que el título del Pokémon esté capitalizado', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<AppCard pokemonName="pikachu" />);

    await waitFor(() => {
      const titleElement = screen.getByText(/pikachu/i);
      expect(titleElement).toHaveStyle({ textTransform: 'capitalize' });
    });
  });

  it('muestra mensaje de carga si la petición nunca se resuelve', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // nunca se resuelve

    render(<AppCard pokemonName="charmander" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();
  });

  it('llama a la API con el nombre del Pokémon correcto', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<AppCard pokemonName="charizard" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/charizard'
      );
    });
  });

  it('renderiza múltiples habilidades correctamente', async () => {
    const pokemonConMuchasHabilidades = {
      name: 'mewtwo',
      sprites: {
        front_default: 'https://example.com/mewtwo.png',
      },
      abilities: [
        { ability: { name: 'pressure' } },
        { ability: { name: 'unnerve' } },
        { ability: { name: 'steadfast' } },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: pokemonConMuchasHabilidades });

    render(<AppCard pokemonName="mewtwo" />);

    await waitFor(() => {
      expect(screen.getByText(/pressure/i)).toBeInTheDocument();
      expect(screen.getByText(/unnerve/i)).toBeInTheDocument();
      expect(screen.getByText(/steadfast/i)).toBeInTheDocument();
    });
  });

  it('maneja Pokémon sin imagen', async () => {
    const pokemonSinImagen = {
      name: 'ditto',
      sprites: {
        front_default: null,
      },
      abilities: [
        { ability: { name: 'limber' } },
        { ability: { name: 'imposter' } },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: pokemonSinImagen });

    render(<AppCard pokemonName="ditto" />);

    await waitFor(() => {
      const image = screen.getByAltText(/ditto/i);
      expect(image.getAttribute('src')).toBeNull();
    });
  });

  it('maneja Pokémon sin habilidades', async () => {
    const pokemonSinHabilidades = {
      name: 'missingno',
      sprites: {
        front_default: 'https://example.com/missingno.png',
      },
      abilities: [],
    };

    axios.get.mockResolvedValueOnce({ data: pokemonSinHabilidades });

    render(<AppCard pokemonName="missingno" />);

    await waitFor(() => {
      expect(screen.getByText(/missingno/i)).toBeInTheDocument();
      expect(screen.getByText(/Habilidades:/i)).toBeInTheDocument();
    });
  });

  it('actualiza cuando cambia el nombre del Pokémon', async () => {
    const { rerender } = render(<AppCard pokemonName="pikachu" />);
    
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });

    // Cambiar a otro Pokémon
    const mockCharizardData = {
      name: 'charizard',
      sprites: {
        front_default: 'https://example.com/charizard.png',
      },
      abilities: [
        { ability: { name: 'blaze' } },
        { ability: { name: 'solar-power' } },
      ],
    };

    // Configurar el mock para la segunda llamada
    axios.get.mockResolvedValueOnce({ data: mockCharizardData });
    
    rerender(<AppCard pokemonName="charizard" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/charizard'
      );
    });
  });

  it('verifica la estructura del Card de Bootstrap', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<AppCard pokemonName="pikachu" />);

    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText(/Habilidades:/i)).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  it('maneja errores de la API correctamente', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Error de red'));

    render(<AppCard pokemonName="bulbasaur" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur'
      );
    });

    console.error.mockRestore();
  });

  it('no hace llamadas duplicadas a la API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });
    
    const { rerender } = render(<AppCard pokemonName="pikachu" />);
    rerender(<AppCard pokemonName="pikachu" />); // Mismo nombre
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1); // Solo una llamada
    });
  });

  it('maneja datos de API malformados', async () => {
    const datosMalformados = {
      name: 'pokemon',
      // Sin sprites ni abilities
    };
    
    axios.get.mockResolvedValueOnce({ data: datosMalformados });
    
    render(<AppCard pokemonName="pokemon" />);
    
    // Debería seguir mostrando "Cargando..." porque faltan propiedades requeridas
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();
  });

});
