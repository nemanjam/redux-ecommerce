import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './styles.css';

const MySpinner = ({ text, ...rest }) => {
  return (
    <div
      {...rest}
      className="spinner-container d-flex align-items-center justify-content-center"
    >
      {text ? <h1>{`${text}...`}</h1> : <Spinner animation="border" />}
    </div>
  );
};

export default MySpinner;
