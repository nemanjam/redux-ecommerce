import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../../components/Header';
import Product from '../../components/Product';
import Advertisement from '../../components/Advertisement';
import './styles.css';

import { getProductsPromise } from '../../fakebackend/data';

const Home = () => {
  let productsCache = [];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const _products = await getProductsPromise();
      productsCache = await getProductsPromise();
      console.log(_products);
      setProducts(_products);
    })();
  }, []);

  async function fetchMoreData() {
    const _products = products.concat(productsCache);
    setProducts(_products);
    productsCache = await getProductsPromise();
  }

  if (products.length === 0)
    return (
      <>
        <Header />
        <Spinner animation="border" className="center-spinner" />
      </>
    );

  return (
    <>
      <Header />
      <Container className="list-margin-top">
        <InfiniteScroll
          className="row"
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={true}
          loader={
            <Col xs={12} sm={6} lg={4} className="container h-100">
              <div className="row h-100 justify-content-center align-self-center">
                <Spinner animation="border" key={0} />
              </div>
            </Col>
          }
        >
          {products.map((product, i) =>
            i !== 0 && i % 4 === 0 ? (
              <Advertisement key={i} />
            ) : (
              <Product {...product} key={product.id} />
            ),
          )}
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default Home;
