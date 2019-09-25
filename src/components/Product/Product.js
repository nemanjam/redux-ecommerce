import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

import './styles.css';

import { likeProduct, unlikeProduct } from '../../store/actions/liked';
import {
  addProductToCart,
  removeProductFromCart,
} from '../../store/actions/cart';

const Product = ({
  product,
  likeProduct,
  unlikeProduct,
  addProductToCart,
  removeProductFromCart,
  liked,
  cart,
}) => {
  const { name, price, image, shortDescription, description } = product;
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);

  function imageLoaded() {
    counter.current += 1;
    if (counter.current >= 1) {
      setIsLoading(false);
    }
  }

  function toggleLike() {
    if (isLiked()) unlikeProduct(product);
    else likeProduct(product);
  }

  function isLiked() {
    const isLiked =
      liked.likedProducts.length > 0 &&
      liked.likedProducts.find(p => p.id === product.id);
    return isLiked;
  }

  function toggleAddProduct() {
    if (isAdded()) removeProductFromCart(product);
    else addProductToCart(product);
    //console.log(cart.cartProducts);
  }

  function isAdded() {
    const isAdded =
      cart.cartProducts.length > 0 &&
      cart.cartProducts.find(p => p.id === product.id);
    return isAdded;
  }

  return (
    <>
      <Col
        xs={12}
        sm={6}
        lg={4}
        xl={3}
        key={0}
        className="container"
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <div className="row justify-content-center align-self-center h-300">
          <Spinner animation="border" className="align-self-center" />
        </div>
      </Col>

      <Col
        xs={12}
        sm={6}
        xl={3}
        lg={4}
        className="mb-3"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <Card>
          <i
            onClick={toggleLike}
            className={
              isLiked()
                ? 'fa fa-heart text-success like'
                : 'fa fa-heart text-danger like'
            }
          ></i>
          <Link to="/product-details">
            <Card.Img
              variant="top"
              src={require(`../../static/products/${image}`)}
              alt="Vans"
              onLoad={imageLoaded}
            />
          </Link>
          <Card.Body>
            <h4 className="card-title">{name}</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              Style: {shortDescription}
            </h6>
            <Card.Text>{description}</Card.Text>

            <div className="buy d-flex justify-content-between align-items-center">
              <div className="price text-success">
                <h5 className="mt-4">${price}</h5>
              </div>
              <Button
                variant={!isAdded() ? 'primary' : 'danger'}
                onClick={toggleAddProduct}
                className="mt-3"
              >
                <i className="fa fa-shopping-cart"></i>{' '}
                {!isAdded() ? 'Add to Cart' : 'Added to Cart'}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default connect(
  state => ({
    liked: state.likedReducer,
    cart: state.cartReducer,
  }),
  { likeProduct, unlikeProduct, addProductToCart, removeProductFromCart },
)(Product);
