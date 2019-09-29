import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

import { GoogleLogout } from 'react-google-login';

import {
  setSortBy,
  setFilterBy,
  setPageToLoad,
} from '../../store/actions/header';
import { loadProducts } from '../../store/actions/products';
import {
  getGoogleUser,
  logOutGoogleUser,
  getLocalUser,
  logoutLocalUser,
} from '../../store/actions/auth';
import { config } from '../../services/config';

import './styles.css';

const Header = ({
  location,
  header,
  loadProducts,
  setSortBy,
  setFilterBy,
  setPageToLoad,
  liked,
  cart,
  auth,
  getGoogleUser,
  logOutGoogleUser,
  getLocalUser,
  logoutLocalUser,
}) => {
  const { pathname } = location;

  useEffect(() => {
    getGoogleUser();
    getLocalUser();
  }, []);

  function setBrandFilterClick(val) {
    setFilterBy({ brand: val, color: header.filterBy.color });
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter: { brand: val, color: header.filterBy.color },
        sort: { ...header.sortBy },
      },
      false,
    );
    window.scrollTo(0, 0);
  }

  function setColorFilterClick(val) {
    setFilterBy({ color: val, brand: header.filterBy.brand });
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter: { color: val, brand: header.filterBy.brand },
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
        filter: { ...header.filterBy },
        sort: { key, direction },
      },
      false,
    );
    window.scrollTo(0, 0);
  }

  function calcCartLength() {
    const sum = cart.cartProducts
      .map(p => p.quantity)
      .reduce((a, b) => a + b, 0);
    return sum;
  }

  function logoutSuccess() {
    logOutGoogleUser();
  }

  function logoutLocalUserClick() {
    logoutLocalUser();
  }

  function getCurrentUser() {
    let user = null;
    user = auth.googleUser ? 'google' : auth.localUser ? 'local' : null;
    return user;
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
        <Navbar.Brand href="/home">Lure shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={pathname}>
            <LinkContainer to="/home">
              <Nav.Link>
                <i className="fa fa-home"></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>
                <i className="fa fa-product-hunt"></i> Products
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              disabled={pathname !== '/products'}
              title="Sort"
              id="collasible-nav-dropdown"
            >
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
            <NavDropdown
              disabled={pathname !== '/products'}
              title="Brand"
              id="collasible-nav-dropdown"
            >
              {[
                { label: 'Rapala', filter: 'rapala' },
                { label: 'Heddon', filter: 'heddon' },
                { label: 'Cotton Cordell', filter: 'cottoncordel' },
                { label: 'Rebel', filter: 'rebel' },
                { label: 'Mepps', filter: 'mepps' },
                { label: 'none', filter: 'none' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={header.filterBy.brand === item.filter}
                  key={i}
                  onClick={() => setBrandFilterClick(item.filter)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown
              disabled={pathname !== '/products'}
              title="Color"
              id="collasible-nav-dropdown"
            >
              {[
                { label: 'red', filter: 'red' },
                { label: 'blue', filter: 'blue' },
                { label: 'green', filter: 'green' },
                { label: 'yellow', filter: 'yellow' },
                { label: 'brown', filter: 'brown' },
                { label: 'black', filter: 'black' },
                { label: 'white', filter: 'white' },
                { label: 'any', filter: 'none' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={header.filterBy.color === item.filter}
                  key={i}
                  onClick={() => setColorFilterClick(item.filter)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <LinkContainer to="/liked">
              <Nav.Link>
                <i className="fa fa-heart"></i> Liked{' '}
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
                <i className="fa fa-shopping-cart"></i> Cart{' '}
                {calcCartLength() > 0 && (
                  <Badge pill variant="danger">
                    {calcCartLength()}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {!getCurrentUser() ? (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-sign-in"></i> Log in
                </Nav.Link>
              </LinkContainer>
            ) : (
              <NavDropdown
                title={
                  <>
                    <i className="fa fa-user"></i> <span>Logged in</span>
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <div
                    className="row"
                    style={{ minWidth: '15rem', maxHeight: '4rem' }}
                  >
                    <div className="col-lg-3 col-2 img-container">
                      <img
                        src={
                          getCurrentUser() === 'google'
                            ? auth.googleUser.imageUrl
                            : require(`../../static/products/mepps1.jpg`)
                        }
                        className="user-img"
                      />
                    </div>
                    <div className="col-lg-9 col-10 text-left">
                      <p className="">
                        <strong>
                          {getCurrentUser() === 'google'
                            ? auth.googleUser.name
                            : auth.localUser.name}
                        </strong>
                      </p>
                      <p className="small">
                        {getCurrentUser() === 'google'
                          ? auth.googleUser.email
                          : auth.localUser.email}
                      </p>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {getCurrentUser() === 'google' ? (
                  <GoogleLogout
                    clientId={config.clientId}
                    buttonText="Logout"
                    onLogoutSuccess={logoutSuccess}
                    render={renderProps => (
                      <>
                        <LinkContainer to="/profile">
                          <NavDropdown.Item className="text-center">
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          className="text-center"
                          onClick={renderProps.onClick}
                        >
                          Google log out
                        </NavDropdown.Item>
                      </>
                    )}
                  />
                ) : (
                  <>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="text-center">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      className="text-center"
                      onClick={logoutLocalUserClick}
                    >
                      Local log out
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            )}
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
    auth: state.authReducer,
  }),
  {
    setSortBy,
    setFilterBy,
    setPageToLoad,
    loadProducts,
    getGoogleUser,
    logOutGoogleUser,
    getLocalUser,
    logoutLocalUser,
  },
)(withRouter(Header));
