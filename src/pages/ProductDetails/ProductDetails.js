import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import ReactImageMagnify from 'react-image-magnify';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MySpinner from '../../components/MySpinner';

import { loadProduct } from '../../store/actions/productDetails';
import { likeProduct, unlikeProduct } from '../../store/actions/liked';
import { showToast, hideToast } from '../../store/actions/toast';

import {
  addProductToCart,
  removeProductFromCart,
} from '../../store/actions/cart';

import './styles.css';

const ProductDetails = ({
  productDetails,
  loadProduct,
  match,
  addProductToCart,
  removeProductFromCart,
  likeProduct,
  unlikeProduct,
  cart,
  liked,
  showToast,
  hideToast,
}) => {
  const { product, isLoading, error } = productDetails;

  useEffect(() => {
    loadProduct(match.params.id);
  }, []);

  function toggleLike() {
    if (!isLiked()) {
      likeProduct(product);
      showToast({ title: 'Notification', text: 'You liked the product.' });
    } else {
      unlikeProduct(product);
      showToast({ title: 'Notification', text: 'You unliked the product.' });
    }
  }

  function isLiked() {
    const isLiked =
      liked.likedProducts.length > 0 &&
      liked.likedProducts.find(p => p.id === product.id);
    return isLiked;
  }

  function toggleAddProduct() {
    if (!isAdded()) {
      addProductToCart(product);
      showToast({
        title: 'Notification',
        text: 'You added product to the cart.',
      });
    } else {
      removeProductFromCart(product);
      showToast({
        title: 'Notification',
        text: 'You removed product from the cart.',
      });
    }
  }

  function isAdded() {
    const isAdded =
      cart.cartProducts.length > 0 &&
      cart.cartProducts.find(p => p.product.id === product.id);
    return isAdded;
  }
  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;

  //console.log(productDetails);
  return (
    product && (
      <div className="card mb-3">
        <div className="row no-gutters">
          <aside className="col-sm-5 border-right">
            <div>
              <img
                className="main-img d-md-none"
                src={require(`../../static/products/${product.image}`)}
              />
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.shortDescription,
                    isFluidWidth: true,
                    src: require(`../../static/products/${product.image}`),
                  },
                  largeImage: {
                    src: require(`../../static/products/${product.image}`),
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImageContainerStyle: {
                    zIndex: 9,
                    backgroundColor: 'white',
                    objectFit: 'cover',
                  },
                  enlargedImageContainerDimensions: {
                    width: '150%',
                    height: '120%',
                  },
                  className: 'd-none d-md-block ',
                }}
              />
            </div>
          </aside>
          <aside className="col-sm-7">
            <article className="p-5">
              <h3 className="title mb-3">{product.name}</h3>

              <div className="mb-3">
                <var className="price h3 text-success">
                  <span className="currency">US $</span>
                  <span className="num">{product.price.toFixed(2)}</span>
                </var>
              </div>
              <dl>
                <dt>Description</dt>
                <dd>
                  <p>{product.description}</p>
                </dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-3">Model#</dt>
                <dd className="col-sm-9">{product.modelNum}</dd>

                <dt className="col-sm-3">Color</dt>
                <dd className="col-sm-9">{product.color}</dd>

                <dt className="col-sm-3">Delivery</dt>
                <dd className="col-sm-9">{product.delivery}</dd>
              </dl>

              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <dl className="dlist-inline">
                    <dt>Weight: </dt>
                    <dd className="pl-2">
                      <span className="form-check-label">{`${product.weight} g`}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-sm-7">
                  <dl className="dlist-inline">
                    <dt>Size: </dt>
                    <dd>
                      <span className="form-check-label">{`${product.size} cm`}</span>
                    </dd>
                  </dl>
                </div>
              </div>
              <hr />
              <button
                onClick={toggleLike}
                className={isLiked() ? 'btn btn-success' : 'btn btn-primary'}
              >
                {isLiked() ? 'Liked' : 'Like it'}
              </button>
              <button
                onClick={toggleAddProduct}
                className={
                  !isAdded()
                    ? 'btn  btn-outline-primary'
                    : 'btn  btn-outline-danger'
                }
              >
                <i className="fa fa-shopping-cart"></i>{' '}
                {!isAdded() ? 'Add to Cart' : 'Added to Cart'}
              </button>
            </article>
          </aside>
        </div>
      </div>
    )
  );
};

export default connect(
  state => ({
    productDetails: state.productDetailsReducer,
    cart: state.cartReducer,
    liked: state.likedReducer,
  }),
  {
    loadProduct,
    addProductToCart,
    removeProductFromCart,
    likeProduct,
    unlikeProduct,
    showToast,
    hideToast,
  },
)(withRouter(ProductDetails));
