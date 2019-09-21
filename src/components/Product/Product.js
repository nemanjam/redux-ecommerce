import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const Product = ({ name, price, image, shortDescription, description }) => {
  if (!name) return <Spinner animation="border" />;

  return (
    <Col xs={12} sm={6} lg={4} className="mb-3">
      <Card>
        <Card.Img
          variant="top"
          src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
          alt="Vans"
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
  );
};

export default Product;
