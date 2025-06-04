import {Button,Container,Form,Nav,Navbar,Offcanvas,} from 'react-bootstrap';
import { useState } from 'react';

function AppNavBar({ users, user, onClick, onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const expand = false;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga
    onSearch(searchValue); // Enviar el valor al padre
  };

  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">{user}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Lista de pokemons
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {users.map((userName, index) => (
                <Button key={index} onClick={() => onClick(userName)}>
                  {userName}
                </Button>
              ))}
            </Nav>

            {/* FORMULARIO DE BÚSQUEDA */}
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Buscar Pokémon"
                className="me-2"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Buscar
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;