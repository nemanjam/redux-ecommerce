import React from 'react';
import './styles.css';

const SortBy = () => {
  return (
    <div className="container margin-top">
      <div className="col-12 pl-0 py-2">
        <h5 className="d-inline mr-2">Sort by:</h5>
        <button type="button" className="btn btn-outline-primary btn-sm mr-3">
          ID
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm mr-3">
          Size
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm mr-3">
          Price
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm mr-3">
          None
        </button>
      </div>
    </div>
  );
};

export default SortBy;
