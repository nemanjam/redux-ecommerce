import React, { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header';
import Product from '../../components/Product';
import Advertisement from '../../components/Advertisement';
import './styles.css';

import { getProductData } from '../../fakebackend/data';

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const d = await getProductData();
      console.log(d);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Container className="list-margin-top">
        <Row>
          <Product />
          <Product />
          <Advertisement />
          <Product />
          <Product />
          <Product />
        </Row>
      </Container>
    </>
  );
};

export default Home;
