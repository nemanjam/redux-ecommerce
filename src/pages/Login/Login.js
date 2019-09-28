import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import * as BForm from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './styles.css';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Password must be 2 characters at minimum.')
    .max(10, 'Password must be 10 characters at maximum.')
    .required('Required'),
});

const Login = () => {
  return (
    <Row>
      <Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
        <div className="card">
          <article className="card-body">
            <a href="" className="float-right btn btn-outline-primary">
              Sign up
            </a>
            <h4 className="card-title mb-4 mt-1">Sign in</h4>
            <p>
              <a href="" className="btn btn-block btn-outline-primary">
                {' '}
                <i className="fa fa-google"></i>   Login with Google
              </a>
            </p>
            <hr />

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validateOnChange={true}
              validateOnBlur={false}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
              onChange={e => console.log(e)}
              render={props => {
                const {
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                  isSubmitting,
                } = props;
                console.log(touched);
                return (
                  <BForm noValidate onSubmit={handleSubmit}>
                    <BForm.Group controlId="validationFormik1">
                      <BForm.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        isValid={touched.email && !errors.email}
                      />
                      <BForm.Control.Feedback>
                        Looks good!
                      </BForm.Control.Feedback>
                      <BForm.Control.Feedback type="invalid">
                        {errors.email}
                      </BForm.Control.Feedback>
                    </BForm.Group>
                    <BForm.Group controlId="validationFormik2">
                      <BForm.Control
                        name="password"
                        type="password"
                        placeholder="******"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <BForm.Control.Feedback type="invalid">
                        {errors.password}
                      </BForm.Control.Feedback>
                    </BForm.Group>
                    <BForm.Row>
                      <BForm.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik3"
                      >
                        <BForm.Group>
                          <Button
                            type="submit"
                            className="btn-block"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Please wait...' : 'Login'}
                          </Button>
                        </BForm.Group>
                      </BForm.Group>
                      <div className="col-md-6 text-right">
                        <a className="small" href="#">
                          Forgot password?
                        </a>
                      </div>
                    </BForm.Row>
                  </BForm>
                );
              }}
            />
          </article>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
