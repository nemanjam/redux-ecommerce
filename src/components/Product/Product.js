import React from 'react';

const Product = () => {
  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-3">
      <div className="card">
        <img
          className="card-img"
          src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
          alt="Vans"
        />
        <div className="card-img-overlay d-flex justify-content-end">
          <a href="#" className="card-link text-danger like">
            <i className="fas fa-heart"></i>
          </a>
        </div>
        <div className="card-body">
          <h4 className="card-title">Vans Sk8-Hi MTE Shoes</h4>
          <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6>
          <p className="card-text">
            The Vans All-Weather MTE Collection features footwear and apparel
            designed to withstand the elements whilst still looking cool.{' '}
          </p>

          <div className="buy d-flex justify-content-between align-items-center">
            <div className="price text-success">
              <h5 className="mt-4">$125</h5>
            </div>
            <a href="#" className="btn btn-danger mt-3">
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
