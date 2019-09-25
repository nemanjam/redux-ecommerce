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
import { config } from '../../services/config';

const Products = ({ isLoading, products, loadProducts, header }) => {
  // did mount
  useEffect(() => {
    (async () => {
      loadProducts(
        {
          page: { index: 0, size: config.pageSize },
          sort: { key: 'none', direction: 'asc' },
          filter: 'none',
        },
        false,
      );
    })();
  }, []);

  function fetchMoreData(pageStart) {
    if (pageStart > 2) {
      loadProducts(
        {
          page: {
            index: (pageStart - 1) * config.pageSize,
            size: config.pageSize,
          },
          sort: header.sortBy,
          filter: header.filterBy,
        },
        true,
      );
    }
    console.log(pageStart);
  }

  if (isLoading)
    return (
      <>
        <Spinner animation="border" className="center-spinner" />
      </>
    );

  //console.log(products);
  //hasMore prop has to be set false when there are no more filtered items, server must return that
  return (
    <>
      <InfiniteScroll
        className="row"
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={products.hasMoreItems}
        loader={
          <Col xs={12} sm={6} lg={4} key={0} className="container">
            <div className="row h-100 justify-content-center align-self-center h-301">
              <Spinner animation="border" className="align-self-center" />
            </div>
          </Col>
        }
      >
        {products.products.map((product, i) =>
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
  state => ({
    products: state.productsReducer,
    header: state.headerReducer,
  }),
  { loadProducts },
)(Products);
