import React from 'react';
import { render, screen } from '@testing-library/react';
import AppTitle from '../components/AppTitle';


describe('AppTitle component', () => {
  
  it('debe renderizar el título PokeDesk', () => {
    render(<AppTitle/>);
    expect(screen.getByText(/PokeDesk/i)).toBeInTheDocument();
  });
});
