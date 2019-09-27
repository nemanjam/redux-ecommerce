//
import './fakebackend/axiosData';

import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Container from 'react-bootstrap/Container';

import Home from './pages/Home';
import Products from './pages/Products';
import Liked from './pages/Liked';
import Cart from './pages/Cart';
import Login from './pages/Login/Login';
import ProductDetails from './pages/ProductDetails';
import Error from './pages/Error';
import Header from './components/Header';
import MyToast from './components/MyToast';
import rootReducer from './store/reducers';

import './index.css';

const Root = () => {
  //
  const initialState = {};

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Container className="margin-top">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/liked" exact component={Liked} />
            <Route
              path="/product-details/:id"
              exact
              component={ProductDetails}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/error" component={Error} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
          <MyToast />
        </Container>
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
