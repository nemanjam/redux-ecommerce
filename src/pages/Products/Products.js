import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

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

  if (products.isLoading) return <MySpinner key={0} text={'IsLoading'} />;

  console.log(products.products);
  return (
    <>
      <InfiniteScroll
        className="row"
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={products.hasMoreItems}
        loader={<MySpinner key={1} text={'Scrollbar'} />}
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
