/* eslint-env jest */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppNavBar from '../components/AppNavBar';

/* eslint-env jest */

describe('AppNavBar Component', () => {
  const mockUsers = ['Ash', 'Misty', 'Brock'];
  const mockUser = 'Admin';
  const mockOnClick = jest.fn();
  const mockOnSearch = jest.fn();

  // Mock de matchMedia (debe ir antes del render)
  beforeAll(() => {
    window.matchMedia = window.matchMedia || function () {
      return {
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),    // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    };
  });

  // Render del componente antes de cada prueba
  beforeEach(() => {
    render(
      <AppNavBar
        users={mockUsers}
        user={mockUser}
        onClick={mockOnClick}
        onSearch={mockOnSearch}
      />
    );
  });

  it('renders the logged-in user name', () => {
    expect(screen.getByText(mockUser)).toBeInTheDocument();
  });

  it('renders user buttons', () => {
    mockUsers.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('calls onClick when a user button is clicked', () => {
    const userButton = screen.getByText('Misty');
    fireEvent.click(userButton);
    expect(mockOnClick).toHaveBeenCalledWith('Misty');
  });

  it('calls onSearch with input value on form submit', () => {
    const input = screen.getByPlaceholderText(/Buscar Pokémon/i);
    const searchButton = screen.getByRole('button', { name: /Buscar/i });

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });
});
