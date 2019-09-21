import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Container className="list-margin-top">
        <Row>
          {products.map((product, i) =>
            i !== 0 && i % 4 === 0 ? (
              <Advertisement />
            ) : (
              <Product {...product} key={product.id} />
            ),
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
