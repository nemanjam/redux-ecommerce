import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import * as BForm from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './styles.css';

export const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Password must be 2 characters at minimum.')
    .max(10, 'Password must be 10 characters at maximum.')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Name must be 2 characters at minimum.')
    .max(10, 'Name must be 10 characters at maximum.')
    .required('Required'),
  repeatPassword: Yup.string()
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password must be the same',
      ),
    })
    .required('Required'),
});
const loginSchema = { ...registerSchema };
delete loginSchema.name;
delete loginSchema.repeatPassword;

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  function toggleRegisterClick() {
    setIsRegister(!isRegister);
  }

  return (
    <Row>
      <Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
        <div className="card">
          <article className="card-body">
            <Button
              onClick={toggleRegisterClick}
              variant="outline-primary"
              className="float-right"
            >
              {isRegister ? 'Login' : 'Register'}
            </Button>
            <h4 className="card-title mb-4 mt-1">Sign in</h4>
            <p>
              <Button variant="outline-primary" className="btn-block">
                {' '}
                <i className="fa fa-google"></i>   Login with Google
              </Button>
            </p>
            <hr />

            <Formik
              initialValues={
                isRegister
                  ? {
                      email: '',
                      password: '',
                      name: '',
                      repeatPassword: '',
                    }
                  : {
                      email: '',
                      password: '',
                    }
              }
              validationSchema={isRegister ? registerSchema : loginSchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                  actions.resetForm();
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
                  <>
                    <BForm noValidate onSubmit={handleSubmit}>
                      {isRegister && (
                        <BForm.Group controlId="validationFormik1">
                          <BForm.Control
                            name="name"
                            type="input"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                            isValid={touched.name && !errors.name}
                          />
                          <BForm.Control.Feedback>
                            Looks good!
                          </BForm.Control.Feedback>
                          <BForm.Control.Feedback type="invalid">
                            {errors.name}
                          </BForm.Control.Feedback>
                        </BForm.Group>
                      )}
                      <BForm.Group controlId="validationFormik2">
                        <BForm.Control
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                          isValid={touched.email && !errors.email}
                        />
                        <BForm.Control.Feedback>
                          Looks good!
                        </BForm.Control.Feedback>
                        <BForm.Control.Feedback type="invalid">
                          {errors.email}
                        </BForm.Control.Feedback>
                      </BForm.Group>
                      <BForm.Group controlId="validationFormik3">
                        <BForm.Control
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && !!errors.password}
                          isValid={touched.password && !errors.password}
                        />
                        <BForm.Control.Feedback>
                          Looks good!
                        </BForm.Control.Feedback>
                        <BForm.Control.Feedback type="invalid">
                          {errors.password}
                        </BForm.Control.Feedback>
                      </BForm.Group>
                      {isRegister && (
                        <BForm.Group controlId="validationFormik4">
                          <BForm.Control
                            name="repeatPassword"
                            type="password"
                            placeholder="Repeat Password"
                            value={values.repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.repeatPassword && !!errors.repeatPassword
                            }
                            isValid={
                              touched.repeatPassword && !errors.repeatPassword
                            }
                          />
                          <BForm.Control.Feedback>
                            Looks good!
                          </BForm.Control.Feedback>
                          <BForm.Control.Feedback type="invalid">
                            {errors.repeatPassword}
                          </BForm.Control.Feedback>
                        </BForm.Group>
                      )}
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
                              {isSubmitting
                                ? 'Please wait...'
                                : isRegister
                                ? 'Register'
                                : 'Login'}
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
                    <DisplayFormikState {...props} />
                  </>
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
