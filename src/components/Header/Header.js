import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Header = props => {
  console.log(props);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">Eshop-Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={props.location.pathname}>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Sort by" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">ID</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Size</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Price</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">None</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Liked</Nav.Link>
          </Nav>
          <Nav activeKey={props.location.pathname}>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(Header);
