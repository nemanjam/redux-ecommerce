import React, { useEffect, useState, useRef } from 'react';
import ContainerDimensions from 'react-container-dimensions';

import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './styles.css';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <>
      <Row>
        <ContainerDimensions>
          {({ width, height }) => (
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={handleSelect}
              interval={null}
            >
              <Carousel.Item>
                <img
                  className="img-obj-fit"
                  src={require(`../../static/products/rapala1.jpg`)}
                  alt="First slide"
                  style={{ width }}
                />
                <div className="overlay"></div>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                  <Button variant="success" className="my-2">
                    Shop now
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-obj-fit"
                  src={require(`../../static/products/rapala2.jpg`)}
                  alt="Second slide"
                  style={{ width }}
                />
                <div className="overlay"></div>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Button variant="success" className="my-2">
                    Shop now
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-obj-fit"
                  src={require(`../../static/products/rapala3.jpg`)}
                  alt="Third slide"
                  style={{ width }}
                />
                <div className="overlay"></div>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                  <Button variant="success" className="my-2">
                    Shop now
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          )}
        </ContainerDimensions>
      </Row>

      <Row className="my-5">
        <Col xs={6} className="mx-auto">
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
              natoque penatibus et magnis dis parturient montes.
            </p>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </Col>
      </Row>
    </>
  );
};

export default Home;
