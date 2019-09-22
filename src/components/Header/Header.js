import React, { Fragment } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="#home">Eshop-Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <NavDropdown title="Sort by" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">ID</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Size</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Price</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">None</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Liked</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Cart</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
