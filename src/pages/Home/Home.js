import React from 'react';
import Header from '../../components/Header';
import Product from '../../components/Product';
import Advertisement from '../../components/Advertisement';
import SortBy from '../../components/SortBy';
import './styles.css';

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <SortBy />
        </div>
        <div className="row">
          <Product />
          <Product />
          <Advertisement />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </>
  );
};

export default Home;
