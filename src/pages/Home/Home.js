import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const _products = await getProductsPromise();
      console.log(_products);
      setProducts(_products);
    })();
  }, []);

  async function fetchMoreData() {
    let _products = await getProductsPromise();
    _products = _products.concat(products);
    setProducts(_products);
  }

  if (products.length === 0)
    return <Spinner animation="border" className="center-spinner" />;

  return (
    <>
      <Header />
      <Container className="list-margin-top">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Spinner animation="border" />}
          className="row"
        >
          {products.map((product, i) =>
            i !== 0 && i % 4 === 0 ? (
              <Advertisement />
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
