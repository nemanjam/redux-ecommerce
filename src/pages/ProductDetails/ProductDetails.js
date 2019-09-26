import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MySpinner from '../../components/MySpinner';

import { loadProduct } from '../../store/actions/productDetails';
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
  cart,
}) => {
  const { product, isLoading, error } = productDetails;

  useEffect(() => {
    console.log('radi');
    loadProduct(match.params.id);
  }, []);

  function toggleAddProduct() {
    if (isAdded()) removeProductFromCart(product);
    else addProductToCart(product);
    //console.log(cart.cartProducts);
  }

  function isAdded() {
    const isAdded =
      cart.cartProducts.length > 0 &&
      cart.cartProducts.find(p => p.product.id === product.id);
    return isAdded;
  }
  if (isLoading || _.isEmpty(product))
    return <MySpinner key={0} text={'IsLoading...'} />;

  console.log(productDetails);
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <aside className="col-sm-5 border-right">
          <div>
            <img
              className="main-img"
              src={require(`../../static/products/${product.image}`)}
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
                  <dt>Quantity: </dt>
                  <dd>
                    <select
                      className="form-control form-control-sm"
                      style={{ width: 70 }}
                    >
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                    </select>
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
            <a href="#" className="btn  btn-primary">
              Buy now
            </a>
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
  );
};

export default connect(
  state => ({
    productDetails: state.productDetailsReducer,
    cart: state.cartReducer,
  }),
  { loadProduct, addProductToCart, removeProductFromCart },
)(withRouter(ProductDetails));
