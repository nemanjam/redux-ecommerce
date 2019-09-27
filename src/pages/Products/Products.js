import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Product from '../../components/Product';
import Advertisement from '../../components/Advertisement';
import MySpinner from '../../components/MySpinner';
import './styles.css';

import { loadProducts } from '../../store/actions/products';
import { setPageToLoad } from '../../store/actions/header';

import { config } from '../../services/config';

const Products = ({
  products: { isLoading, products, hasMoreItems, error },
  loadProducts,
  header,
  setPageToLoad,
}) => {
  // did mount
  useEffect(() => {
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        sort: { key: 'none', direction: 'asc' },
        filter: { brand: 'none', color: 'none' },
      },
      false,
    );
  }, []);

  function fetchMoreData(pageToLoad) {
    // console.log('pageToLoad: ', pageToLoad);
    if (pageToLoad > 0) {
      loadProducts(
        {
          page: {
            index: (header.pageToLoad + 1) * config.pageSize,
            size: config.pageSize,
          },
          sort: { ...header.sortBy },
          filter: { ...header.filterBy },
        },
        true,
        () => setPageToLoad(header.pageToLoad + 1), // this way or race loop!!!
      );
      //console.log('header.pageToLoad: ', header.pageToLoad);
    }
  }

  //console.log(products);
  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;

  return (
    <Fragment>
      <InfiniteScroll
        className="row"
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={hasMoreItems}
        initialLoad={false}
      >
        {products.map((product, i) =>
          product.isAdvert ? (
            <Advertisement {...product} key={i} />
          ) : (
            <Product product={product} key={i} />
          ),
        )}
      </InfiniteScroll>
      {!error && !hasMoreItems && (
        <Row className="mb-3">
          <Col>
            <h4 className="text-center">No more products</h4>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    products: state.productsReducer,
    header: state.headerReducer,
  }),
  { loadProducts, setPageToLoad },
)(Products);
