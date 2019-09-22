import React, { useEffect, useState, useRef } from 'react';
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
import { getAdvertisementsPromise } from '../../fakebackend/data';

const Home = () => {
  let productsCache = useRef([]);
  const [products, setProducts] = useState([]);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    (async () => {
      const _products = await getProductsPromise();
      await insertAdvert(_products);
      setIsIdle(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isIdle) {
        productsCache.current = await getProductsPromise();
        setIsIdle(false);
      }
    })();
  }, [isIdle]);

  async function insertAdvert(productsState) {
    let advertIndex = 0;
    const adverts = await getAdvertisementsPromise();
    const justProducts = productsState.filter(product => !product.isAdvert);
    justProducts.map((product, i) => {
      if (i !== 0 && i % 4 === 0) {
        while (
          adverts.length > advertIndex + 1 &&
          adverts[advertIndex].id === adverts[advertIndex + 1].id
        )
          advertIndex++;

        console.log(i);
        justProducts.splice(i, 0, adverts[advertIndex]);
        if (adverts.length <= advertIndex + 1) advertIndex = 0;
        else advertIndex++;
      }
    });
    console.log(justProducts);
    setProducts([...justProducts]);
  }

  async function fetchMoreData() {
    const _products = products.concat(productsCache.current);
    await insertAdvert(_products);
    setIsIdle(true);
  }

  if (typeof products === 'undefined' || products.length === 0)
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
      </Container>
    </>
  );
};

export default Home;
