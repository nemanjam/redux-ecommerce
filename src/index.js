import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login/Login';
import Header from './components/Header';
import Context from './context';
import reducer from './reducer';

import './index.css';
import * as serviceWorker from './serviceWorker';

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Header />
        <Container className="margin-top">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Redirect to="/home" />
          </Switch>
        </Container>
      </Context.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
