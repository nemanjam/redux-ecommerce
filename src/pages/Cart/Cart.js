import React, { useEffect, useState, useRef } from 'react';
import './styles.css';

const Cart = () => {
  return (
    <>
      <div className="card shopping-cart">
        <div className="card-header text-light">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shopping
          cart
          <a href="" className="btn btn-outline-primary btn-sm pull-right">
            Continiue shopping
          </a>
          <div className="clearfix"></div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-2 text-center">
              <img
                className="img-responsive"
                src={require(`../../static/products/rapala1.jpg`)}
                alt="prewiew"
                width="120"
                height="80"
              />
            </div>
            <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
              <h4 className="product-name">Product Name</h4>
              <p>
                Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
                natoque penatibus et magnis dis parturient montes.
              </p>
            </div>
            <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
              <div
                className="col-3 col-sm-3 col-md-6 text-md-right"
                style={{ paddingTop: 5 }}
              >
                <h5>
                  <strong>$25.00</strong>
                </h5>
              </div>
              <div className="col-4 col-sm-4 col-md-4">
                <div className="quantity">
                  <input type="button" value="+" className="plus" />
                  <input
                    type="number"
                    step="1"
                    max="99"
                    min="1"
                    value="1"
                    title="Qty"
                    className="qty"
                    size="4"
                  />
                  <input type="button" value="-" className="minus" />
                </div>
              </div>
              <div className="col-2 col-sm-2 col-md-2 text-right">
                <button type="button" className="btn btn-outline-danger btn-xs">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-12 col-sm-12 col-md-2 text-center">
              <img
                className="img-responsive"
                src={require(`../../static/products/rapala2.jpg`)}
                alt="prewiew"
                width="120"
                height="80"
              />
            </div>
            <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
              <h4 className="product-name">Product Name</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
            </div>
            <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
              <div
                className="col-3 col-sm-3 col-md-6 text-md-right"
                style={{ paddingTop: 5 }}
              >
                <h5>
                  <strong>$25.00</strong>
                </h5>
              </div>
              <div className="col-4 col-sm-4 col-md-4">
                <div className="quantity">
                  <input type="button" value="+" className="plus" />
                  <input
                    type="number"
                    step="1"
                    max="99"
                    min="1"
                    value="1"
                    title="Qty"
                    className="qty"
                    size="4"
                  />
                  <input type="button" value="-" className="minus" />
                </div>
              </div>
              <div className="col-2 col-sm-2 col-md-2 text-right">
                <button type="button" className="btn btn-outline-danger btn-xs">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <hr />
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
              Total price: <b>50.00€</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
