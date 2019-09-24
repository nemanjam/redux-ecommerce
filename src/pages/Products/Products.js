import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Product from '../../components/Product';
import Advertisement from '../../components/Advertisement';
import './styles.css';

import { loadProducts } from '../../store/actions/products';

const Products = ({ isLoading, products, loadProducts }) => {
  // did mount
  useEffect(() => {
    (async () => {
      loadProducts(null, false);
    })();
  }, []);

  function fetchMoreData(pageStart) {
    if (pageStart > 1) loadProducts(null, true);
  }

  if (isLoading)
    return (
      <>
        <Spinner animation="border" className="center-spinner" />
      </>
    );

  console.log(products);
  //hasMore prop has to be set false when there are no more filtered items, server must return that
  return (
    <>
      <InfiniteScroll
        className="row"
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={true}
        loader={
          <Col xs={12} sm={6} lg={4} key={0} className="container">
            <div className="row h-100 justify-content-center align-self-center h-301">
              <Spinner animation="border" className="align-self-center" />
            </div>
          </Col>
        }
      >
        {products.map((product, i) =>
          product.isAdvert ? (
            <Advertisement {...product} key={i} />
          ) : (
            <Product {...product} key={i} />
          ),
        )}
      </InfiniteScroll>
    </>
  );
};

export default connect(
  state => ({ products: state.productsReducer.products }),
  { loadProducts },
)(Products);
