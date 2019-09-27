import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Error = () => {
  return (
    <div id="notfound" className="mt-0">
      <div className="notfound">
        <div className="notfound-404">
          <h1>:(</h1>
        </div>
        <h2>Something went wrong.</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to={'./home'}>Home page</Link>
      </div>
    </div>
  );
};

export default Error;
