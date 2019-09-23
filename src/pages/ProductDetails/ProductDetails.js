import React, { useEffect, useState, useRef } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';

const ProductDetails = () => {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <aside className="col-sm-5 border-right">
          <article className="gallery-wrap">
            <div className="img-big-wrap">
              <div>
                <a href="images/items/1.jpg" data-fancybox="">
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={require(`../../static/products/mepps1.jpg`)}
                  />
                </a>
              </div>
            </div>
          </article>
        </aside>
        <aside className="col-sm-7">
          <article className="p-5">
            <h3 className="title mb-3">
              Original Version of Some product name
            </h3>

            <div className="mb-3">
              <var className="price h3 text-success">
                <span className="currency">US $</span>
                <span className="num">1299</span>
              </var>
            </div>
            <dl>
              <dt>Description</dt>
              <dd>
                <p>
                  Here goes description consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco{' '}
                </p>
              </dd>
            </dl>
            <dl className="row">
              <dt className="col-sm-3">Model#</dt>
              <dd className="col-sm-9">12345611</dd>

              <dt className="col-sm-3">Color</dt>
              <dd className="col-sm-9">Black and white </dd>

              <dt className="col-sm-3">Delivery</dt>
              <dd className="col-sm-9">Russia, USA, and Europe </dd>
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
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <span className="form-check-label">SM</span>
                    </label>
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <span className="form-check-label">MD</span>
                    </label>
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <span className="form-check-label">XXL</span>
                    </label>
                  </dd>
                </dl>
              </div>
            </div>
            <hr />
            <a href="#" className="btn  btn-primary">
              Buy now
            </a>
            <a href="#" className="btn  btn-outline-primary">
              <i className="fa fa-shopping-cart"></i> Add to cart
            </a>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default ProductDetails;
