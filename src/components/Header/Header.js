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
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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
