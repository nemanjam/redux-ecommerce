import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

const Header = props => {
  const { pathname } = props.location;
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/home">Eshop-Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={pathname}>
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Sort by" id="collasible-nav-dropdown">
              <NavDropdown.Item>Weight</NavDropdown.Item>
              <NavDropdown.Item>Size</NavDropdown.Item>
              <NavDropdown.Item>Price</NavDropdown.Item>
              <NavDropdown.Item>None</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filter by" id="collasible-nav-dropdown">
              <NavDropdown.Item>Rapala</NavDropdown.Item>
              <NavDropdown.Item>Heddon</NavDropdown.Item>
              <NavDropdown.Item>Cotton Cordel</NavDropdown.Item>
              <NavDropdown.Item>Rebel</NavDropdown.Item>
              <NavDropdown.Item>Mepps</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              Liked{' '}
              <Badge pill variant="light">
                2
              </Badge>
            </Nav.Link>
          </Nav>
          <Nav activeKey={pathname}>
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart <i className="fa fa-shopping-cart"></i>{' '}
                <Badge pill variant="danger">
                  3
                </Badge>
              </Nav.Link>
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
