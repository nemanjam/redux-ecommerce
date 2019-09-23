import React, { useEffect, useState, useRef } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';

const Login = () => {
  return (
    <Row>
      <Col sm={4} className="mx-auto mt-5">
        <div className="card">
          <article className="card-body">
            <a href="" className="float-right btn btn-outline-primary">
              Sign up
            </a>
            <h4 className="card-title mb-4 mt-1">Sign in</h4>
            <p>
              <a href="" className="btn btn-block btn-outline-primary">
                {' '}
                <i className="fa fa-google"></i>   Login via Google
              </a>
            </p>
            <hr />
            <form>
              <div className="form-group">
                <input
                  name=""
                  className="form-control"
                  placeholder="Email or login"
                  type="email"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="******"
                  type="password"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      {' '}
                      Login{' '}
                    </button>
                  </div>
                </div>
                <div className="col-md-6 text-right">
                  <a className="small" href="#">
                    Forgot password?
                  </a>
                </div>
              </div>
            </form>
          </article>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
