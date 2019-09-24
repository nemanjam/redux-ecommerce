import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

import { setSortBy } from '../../store/actions/header';
import { loadProducts, sortProducts } from '../../store/actions/products';
import { config } from '../../services/config';

const Header = ({ location, sortProducts, header, loadProducts }) => {
  const { pathname } = location;

  function setFilterClick(filter) {
    loadProducts(
      { page: { index: 0, size: config.pageSize }, filter, sort: 'none' },
      false,
    );
  }

  function setSortClick(sortBy) {
    sortProducts(sortBy);
  }

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
              <NavDropdown.Item onClick={() => setSortClick('weight')}>
                Weight
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setSortClick('size')}>
                Size
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setSortClick('price')}>
                Price
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setSortClick('none')}>
                None
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filter by" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => setFilterClick('rapala')}>
                Rapala
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilterClick('heddon')}>
                Heddon
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilterClick('cottoncordel')}>
                Cotton Cordel
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilterClick('rebel')}>
                Rebel
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilterClick('mepps')}>
                Mepps
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilterClick('none')}>
                None
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              Liked{' '}
              {header.numberOfLikes > 0 && (
                <Badge pill variant="light">
                  {header.numberOfLikes}
                </Badge>
              )}
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
export default connect(
  state => ({ header: state.headerReducer }),
  { setSortBy, loadProducts, sortProducts },
)(withRouter(Header));
