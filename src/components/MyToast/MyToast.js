import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import Toast from 'react-bootstrap/Toast';
import { showToast, hideToast } from '../../store/actions/toast';

const MyToast = ({ toast: { show, title, text }, showToast, hideToast }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5%',
        right: '2%',
        zIndex: 3,
      }}
    >
      <Toast
        onClose={() => hideToast()}
        show={show}
        delay={3000}
        animation={true}
        autohide
      >
        <Toast.Header>
          <img
            src={require(`../../static/products/mepps1.jpg`)}
            style={{ width: 20, height: 20, objectFit: 'cover' }}
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">{title}</strong>
          <small>right now</small>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </div>
  );
};

export default connect(
  state => ({
    toast: state.toastReducer,
  }),
  { showToast, hideToast },
)(MyToast);
