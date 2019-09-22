import { createContext } from 'react';

const Context = createContext({
  productsInTheCart: [],
  likedProducts: [],
  sortBy: 'none',
  isAuth: false,
  currentUser: null,
});

export default Context;
