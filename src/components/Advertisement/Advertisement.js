import React, { useState, useRef } from 'react';
import moment from 'moment';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import './styles.css';

const Advertisement = ({ name, image, description, link1, link2, time }) => {
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
        xl={3}
        key={0}
        className="container"
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <div className="row h-100 justify-content-center align-self-center h-302">
          <Spinner animation="border" className="align-self-center" />
        </div>
      </Col>

      <Col
        xs={12}
        sm={6}
        lg={4}
        xl={3}
        className="mb-3"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <Card className="mb-3">
          <Card.Header>Advertisement</Card.Header>
          <Card.Img
            style={{
              height: 200,
              width: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
            src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt="Card image"
            onLoad={imageLoaded}
          />
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Card.Link href={link1}>Link 1</Card.Link>
              <Card.Link href={link2}>Link 2</Card.Link>
            </ListGroup.Item>
          </ListGroup>

          <Card.Footer>
            {moment().diff(time, 'hours') + ' hours ago'}
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default Advertisement;
