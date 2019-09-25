import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

import {
  setSortBy,
  setFilterBy,
  setPageToLoad,
} from '../../store/actions/header';
import { loadProducts } from '../../store/actions/products';
import { config } from '../../services/config';

const Header = ({
  location,
  header,
  loadProducts,
  setSortBy,
  setFilterBy,
  setPageToLoad,
  liked,
  cart,
}) => {
  const { pathname } = location;

  function setFilterClick(filter) {
    setFilterBy(filter);
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter,
        sort: { ...header.sortBy },
      },
      false,
    );
    window.scrollTo(0, 0);
  }

  function setSortClick(key, direction) {
    setSortBy({ key, direction });
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter: header.filterBy,
        sort: { key, direction },
      },
      false,
    );
    window.scrollTo(0, 0);
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
              {[
                { label: 'price (asc)', key: 'price', direction: 'asc' },
                { label: 'price (desc)', key: 'price', direction: 'desc' },
                { label: 'weight (asc)', key: 'weight', direction: 'asc' },
                { label: 'weight (desc)', key: 'weight', direction: 'desc' },
                { label: 'size (asc)', key: 'size', direction: 'asc' },
                { label: 'size (desc)', key: 'size', direction: 'desc' },
                { label: 'none', key: 'none', direction: 'asc' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={
                    header.sortBy.key === item.key &&
                    header.sortBy.direction === item.direction
                  }
                  key={i}
                  onClick={() => setSortClick(item.key, item.direction)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Filter by" id="collasible-nav-dropdown">
              {[
                { label: 'Rapala', filter: 'rapala' },
                { label: 'Heddon', filter: 'heddon' },
                { label: 'Cotton Cordel', filter: 'cottoncordel' },
                { label: 'Rebel', filter: 'rebel' },
                { label: 'Mepps', filter: 'mepps' },
                { label: 'none', filter: 'none' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={header.filterBy === item.filter}
                  key={i}
                  onClick={() => setFilterClick(item.filter)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <LinkContainer to="/liked">
              <Nav.Link>
                Liked{' '}
                {liked.likedProducts.length > 0 && (
                  <Badge pill variant="light">
                    {liked.likedProducts.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav activeKey={pathname}>
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart <i className="fa fa-shopping-cart"></i>{' '}
                {cart.cartProducts.length > 0 && (
                  <Badge pill variant="danger">
                    {cart.cartProducts.length}
                  </Badge>
                )}
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
  state => ({
    header: state.headerReducer,
    liked: state.likedReducer,
    cart: state.cartReducer,
  }),
  { setSortBy, setFilterBy, setPageToLoad, loadProducts },
)(withRouter(Header));
