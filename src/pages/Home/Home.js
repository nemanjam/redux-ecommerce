import React, { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Product from '../../components/Product';
import Advertisement from '../../components/Advertisement';
import './styles.css';

import { getProductsPromise } from '../../fakebackend/data';
import { getAdvertisementsPromise } from '../../fakebackend/data';

const Home = () => {
  let productsCache = useRef([]);
  const [products, setProducts] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [isIdle, setIsIdle] = useState(false);

  // did mount
  useEffect(() => {
    (async () => {
      const _adverts = await getAdvertisementsPromise();
      setAdverts(_adverts);
    })();
  }, []);

  //adverts loaded
  useEffect(() => {
    (async () => {
      if (adverts.length > 0) {
        const _products = await getProductsPromise();
        await insertAdvert(_products);
        setIsIdle(true);
      }
    })();
  }, [adverts]);

  useEffect(() => {
    (async () => {
      if (isIdle) {
        productsCache.current = await getProductsPromise();
        setIsIdle(false);
      }
    })();
  }, [isIdle]);

  async function insertAdvert(productsState) {
    const size = 4;
    let advertIndex = 0;
    const justProducts = productsState.filter(product => !product.isAdvert);
    let resultArr = [];

    while (justProducts.length > 0) {
      // 2 same adds in the row
      while (
        adverts.length > advertIndex + 1 &&
        adverts[advertIndex].id === adverts[advertIndex + 1].id
      )
        advertIndex++;
      // 0,1,2..9,0,1,2
      adverts.length <= advertIndex + 1 ? (advertIndex = 0) : advertIndex++;

      //index is calculated
      const chunk = justProducts.splice(0, size);
      if (chunk.length === size)
        resultArr = resultArr.concat(chunk, [adverts[advertIndex]]);
    }
    console.log(resultArr);
    setProducts(resultArr);
  }

  async function fetchMoreData() {
    const _products = products.concat([...productsCache.current]);
    await insertAdvert(_products);
    setIsIdle(true);
  }

  if (typeof products === 'undefined' || products.length === 0)
    return (
      <>
        <Spinner animation="border" className="center-spinner" />
      </>
    );

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

export default Home;
