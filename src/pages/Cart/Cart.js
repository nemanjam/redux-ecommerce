import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';

import {
  addProductToCart,
  removeProductFromCart,
} from '../../store/actions/cart';

import './styles.css';

const Cart = ({
  cart: { cartProducts },
  addProductToCart,
  removeProductFromCart,
}) => {
  return (
    <Fragment>
      {cartProducts.length === 0 ? (
        <Row className="justify-content-center">
          <h4>There are no products in the cart yet.</h4>
        </Row>
      ) : (
        <Fragment>
          <div className="card shopping-cart">
            <div className="card-header text-light">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
              Shopping cart
              <a href="" className="btn btn-outline-primary btn-sm pull-right">
                Continiue shopping
              </a>
              <div className="clearfix"></div>
            </div>
            <div className="card-body">
              {cartProducts.map(({ product, quantity }, i) => (
                <Fragment key={i}>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 text-center">
                      <img
                        className="img-responsive cart-img-obj-fit"
                        src={require(`../../static/products/${product.image}`)}
                        alt="prewiew"
                        width="120"
                        height="80"
                      />
                    </div>
                    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                      <h4 className="product-name">{product.name}</h4>
                      <p>{product.description}</p>
                    </div>
                    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                      <div
                        className="col-3 col-sm-3 col-md-6 text-md-right"
                        style={{ paddingTop: 5 }}
                      >
                        <h5>
                          <strong>${product.price.toFixed(2)}</strong>
                        </h5>
                      </div>
                      <div className="col-4 col-sm-4 col-md-4">
                        <div className="quantity">
                          <input
                            onClick={() => addProductToCart(product)}
                            type="button"
                            defaultValue={'+'}
                            className="plus"
                          />
                          <input
                            type="number"
                            step="1"
                            max="99"
                            min="1"
                            value={quantity}
                            title="Qty"
                            className="qty"
                            size="4"
                          />
                          <input
                            onClick={() => removeProductFromCart(product)}
                            type="button"
                            defaultValue={'-'}
                            className="minus"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-sm-2 col-md-2 text-right">
                        <button
                          onClick={() => removeProductFromCart(product)}
                          type="button"
                          className="btn btn-outline-danger btn-xs"
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}

              <div className="pull-right">
                <a href="" className="btn btn-outline-primary pull-right">
                  Update shopping cart
                </a>
              </div>
            </div>
            <div className="card-footer">
              <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                <div className="row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="cupone code"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="submit"
                      className="btn btn-default"
                      value="Use cupone"
                    />
                  </div>
                </div>
              </div>
              <div className="pull-right" style={{ margin: 10 }}>
                <a href="" className="btn btn-primary pull-right">
                  Checkout
                </a>
                <div className="pull-right" style={{ margin: 5 }}>
                  Total price:{' '}
                  <b>
                    $
                    {cartProducts
                      .map(p => p.product.price * p.quantity)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    cart: state.cartReducer,
  }),
  { addProductToCart, removeProductFromCart },
)(Cart);
