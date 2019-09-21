import React, { useState, useRef } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import './styles.css';

const Product = ({ name, price, image, shortDescription, description }) => {
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);

  function imageLoaded() {
    counter.current += 1;
    if (counter.current >= 1) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Col
        xs={12}
        sm={6}
        lg={4}
        key={0}
        className="container"
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <div className="row h-100 justify-content-center align-self-center h-300">
          <Spinner animation="border" className="align-self-center" />
        </div>
      </Col>

      <Col
        xs={12}
        sm={6}
        lg={4}
        className="mb-3"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <Card>
          <Card.Img
            variant="top"
            src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
            alt="Vans"
            onLoad={imageLoaded}
          />
          <Card.ImgOverlay className="d-flex justify-content-end">
            <a href="#" className="card-link text-danger like">
              <i className="fa fa-heart"></i>
            </a>
          </Card.ImgOverlay>
          <Card.Body>
            <h4 className="card-title">{name}</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              Style: {shortDescription}
            </h6>
            <Card.Text>{description}</Card.Text>

            <div className="buy d-flex justify-content-between align-items-center">
              <div className="price text-success">
                <h5 className="mt-4">${price}</h5>
              </div>
              <Button variant="danger" className="mt-3">
                <i className="fa fa-shopping-cart"></i> Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Product;
