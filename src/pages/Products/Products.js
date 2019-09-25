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
import { setPageToLoad } from '../../store/actions/header';

import { config } from '../../services/config';

const Products = ({
  isLoading,
  products,
  loadProducts,
  header,
  setPageToLoad,
}) => {
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

  //(type, {v, ...d}) => type === 'incr-v' ? {...d, v: v+1} :
  function fetchMoreData(pageToLoad) {
    if (pageToLoad > 2) {
      loadProducts(
        {
          page: {
            index: (header.pageToLoad + 1) * config.pageSize,
            size: config.pageSize,
          },
          sort: header.sortBy,
          filter: header.filterBy,
        },
        true,
        () => setPageToLoad(header.pageToLoad + 1), // this way or race loop!!!
      );
      console.log(header.pageToLoad);
    }
  }

  if (isLoading)
    return (
      <>
        {/* <Spinner animation="border" className="center-spinner" /> */}
        <Col xs={12} sm={6} lg={4} key={0} className="container">
          <div className="row h-100 justify-content-center align-self-center h-301">
            <h1>Loading isLoading</h1>
          </div>
        </Col>
      </>
    );

  console.log(products.products);
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
              {/* <Spinner animation="border" className="align-self-center" /> */}
              <h1>Loading scroll</h1>
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

      {!products.hasMoreItems && (
        <Row className="mb-3">
          <Col>
            <h4 className="text-center">No more products</h4>{' '}
          </Col>
        </Row>
      )}
    </>
  );
};

export default connect(
  state => ({
    products: state.productsReducer,
    header: state.headerReducer,
  }),
  { loadProducts, setPageToLoad },
)(Products);
